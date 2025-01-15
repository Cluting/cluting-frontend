import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { on } from "events";
import {
  getAppListComplete,
  updateDocEvaluationStatus
} from "../../../../_03_document_evaluation/service/Step3";
import { getMe } from "../../../../../signup/services/User";
import {
  useRecruitmentStepStore,
  useStepThreeStore
} from "../../../../../../store/useStore";
import FitMemberList from "../../../../_03_document_evaluation/_02/list/FitMemberList";
import { BUTTON_TEXT } from "../../../../../../constants/recruting";
import StepCompleteModal from "../../../../common/StepCompleteModal";
import DecisionPassFailModal from "../../../../_03_document_evaluation/_02/common/DecisionPassFailModal";

interface Applicant {
  id: string;
  name: string;
  phone: string;
  group: string;
  incomplete: number;
  all: number;
  isPass: boolean;
  evaluators: undefined;
  isDecisionMode: boolean;
  isDisputed: boolean;
  createdAt: string;
  applicationNumClubUser: string;
}

const transformApiResponse = (
  apiData: CompletedApplicant[] | undefined
): Applicant[] => {
  if (!apiData) return [];

  return apiData.map(
    (item): Applicant => ({
      id: item.applicationId.toString(),
      name: item.applicantName,
      phone: item.applicantPhone,
      group: item.groupName || "미지정",
      incomplete: 0,
      all: 0,
      isPass: false, // 기본값으로 설정, API에서 제공되지 않음
      evaluators: undefined,
      isDecisionMode: false,
      isDisputed: false,
      createdAt: item.createdAt,
      applicationNumClubUser: item.applicationNumClubUser
    })
  );
};

interface CompletedEvaluationProps {
  filter: string;
  sortType: string;
}

const CompletedEvaluation: React.FC<CompletedEvaluationProps> = ({
  filter,
  sortType
}) => {
  const [members, setMembers] = useState<Applicant[]>([]);
  const [filteredData, setFilteredData] = useState<Applicant[]>([]);
  const [filteredData2, setFilteredData2] = useState<Applicant[]>([]);

  const recruitId = 1;
  const queryClient = useQueryClient();

  const { data: completedApplicants } = useQuery<CompletedApplicant[]>(
    ["completedApplicants", recruitId],
    () => getAppListComplete(recruitId),
    {
      onSuccess: (data) => {
        console.log(data);
      }
    }
  );

  const { data: user } = useQuery(["me"], getMe);

  useEffect(() => {
    if (user && completedApplicants) {
      const transformedApplicants = transformApiResponse(completedApplicants);
      setMembers(transformedApplicants);

      // 합격자와 불합격자 분리
      const filteredAccepted =
        transformedApplicants.filter((item) => item.isPass === true) ?? [];

      const filteredRejected =
        transformedApplicants.filter((item) => item.isPass === false) ?? [];

      const sortData = (data: Applicant[]) =>
        sortType === "가나다순"
          ? [...data].sort((a, b) => a.name.localeCompare(b.name))
          : data;

      setFilteredData(
        filter === "전체"
          ? sortData(filteredAccepted)
          : sortData(filteredAccepted.filter((item) => item.group === filter))
      );

      setFilteredData2(
        filter === "전체"
          ? sortData(filteredRejected)
          : sortData(filteredRejected.filter((item) => item.group === filter))
      );
    }
  }, [filter, sortType, completedApplicants, user]);

  const handleDispute = (id: string) => {
    setMembers((prevMembers) =>
      prevMembers?.map((member) =>
        member.id === id
          ? {
              ...member,
              state: "이의 제기중",
              isDecisionMode: !member.isDisputed,
              isDisputed: true
            }
          : member
      )
    );
  };

  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );

  const handleDecisionClick = (id: string) => {
    const applicant = members?.find((member) => member.id === id);
    setSelectedMemberId(id);
    setSelectedApplicant(applicant || null);
    setShowDecisionModal(true);
  };

  //ToDO: 여기서 API 연결, 모달 확정 화면 전환

  const updateStatusMutation = useMutation({
    mutationFn: ({
      recruitId,
      applicationId,
      result
    }: {
      recruitId: number;
      applicationId: number;
      result: "PASS" | "FAIL";
    }) => updateDocEvaluationStatus(recruitId, applicationId, result),
    onSuccess: () => {
      console.log("서류 평가 합불 여부 변경 성공");
      queryClient.invalidateQueries(["applicants", recruitId]);
    }
  });

  const handleDecision = (isPass: boolean) => {
    if (selectedMemberId) {
      const applicationId = parseInt(selectedMemberId);
      const result = isPass ? "PASS" : "FAIL";

      updateStatusMutation.mutate({
        recruitId,
        applicationId,
        result
      });

      setMembers((prevMembers) =>
        prevMembers?.map((member) =>
          member.id === selectedMemberId
            ? {
                ...member,
                isPass: isPass,
                isDecisionMode: false
              }
            : member
        )
      );
    }
    setShowDecisionModal(false);
    setSelectedMemberId(null);
  };

  const { completedSteps, completeStep } = useRecruitmentStepStore();
  const [isStepCompleteModalOpen, setStepCompleteModalOpen] = useState(false);

  const { setStepCompleted, steps } = useStepThreeStore();

  const handleStepThreeSubmit = () => {
    if (!completedSteps[0]) {
      setStepCompleteModalOpen(true);
    }
  };

  const handleCloseStepCompleteModal = () => setStepCompleteModalOpen(false);

  const handleConfirmStepComplete = () => {
    completeStep(2, true);
    setStepCompleted(1, true);
    setStepCompleteModalOpen(false);
  };

  return (
    <>
      <div className="w-[1016px] flex items-start gap-[22px] p-[20px] self-stretch rounded-[21px] border border-[#D0D4E7] bg-white-100">
        <div className="flex flex-col gap-4 w-[476px]">
          <h2 className="text-left text-gray-1100 text-title3">
            결과를 수정하려면 이의를 제기해주세요.
          </h2>
          <FitMemberList
            items={filteredData}
            state="평가 완료"
            isDispute
            isEvaluationDone
            onDispute={handleDispute}
            onDecision={handleDecisionClick}
          />
        </div>

        <div className="flex flex-col gap-4 w-[476px]">
          <h2 className="text-left text-gray-1100 text-title3 h-[24px]"></h2>
          <FitMemberList
            items={filteredData2}
            state="평가 완료"
            isEvaluationDone
            isDispute
            onDispute={handleDispute}
            onDecision={handleDecisionClick}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          onClick={handleStepThreeSubmit}
          className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
            steps[1].completed
              ? "bg-main-400 border border-main-100 text-main-100"
              : "bg-main-100 text-white-100"
          } text-body flex-center hover:bg-main-500`}
        >
          {steps[1].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
        </button>
      </div>
      {isStepCompleteModalOpen && (
        <StepCompleteModal
          onClose={handleCloseStepCompleteModal}
          onConfirm={handleConfirmStepComplete}
          stepIndex={2}
        />
      )}
      {!steps[1].completed ? (
        <div className="fixed animate-dropdown bottom-[16px]">
          <div className="relative w-[1016px] h-[79px] bg-gray-200 rounded-[11px] pl-[31px] flex items-center text-callout text-gray-800">
            이의 제기 중입니다. 합불을 결정한 뒤, 완료 버튼을 눌러주세요.
          </div>
        </div>
      ) : (
        <div className="fixed animate-dropdown bottom-[16px]">
          <div className="relative w-[1016px] h-[79px] bg-gray-300 rounded-[11px] pl-[31px] flex items-center text-callout text-gray-800">
            해당 단계는 완료되었습니다. 다음 단계로 넘어갈 시, 수정을 권하지
            않습니다.
          </div>
        </div>
      )}

      {showDecisionModal && (
        <DecisionPassFailModal
          onClose={() => setShowDecisionModal(false)}
          onDecision={handleDecision}
          applicant={selectedApplicant}
        />
      )}
    </>
  );
};

export default CompletedEvaluation;
