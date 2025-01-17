import { useEffect, useState } from "react";
import { useRecruitmentStepStore } from "../../../store/useStore";
import RecrutingCalenderPicker from "../_02_prepare/_01/RecruitingCalenderPicker";
import PrepareStepRoles from "./PrepareStepRoles";
import GroupCreate from "../_02_prepare/_01/GroupCreate";
import { BUTTON_TEXT } from "../../../constants/recruting";
import StepCompleteModal from "../common/StepCompleteModal";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPlanningData, patchPrep, postStepPlan } from "./service/Prep";

export default function RecruitingPlanContainer() {
  const { completedSteps, completeStep } = useRecruitmentStepStore();
  //수정하기
  const [isEditMode, setIsEditMode] = useState(false);

  // 1단계 완료 여부 처리
  const isStepOneCompleted = completedSteps[0] || false;

  //완료 확인 모달
  const [isStepCompleteModalOpen, setStepCompleteModalOpen] = useState(false);
  const handleCloseStepCompleteModal = () => {
    setStepCompleteModalOpen(false);
  };

  const handleConfirmStepComplete = () => {
    completeStep(0, true);
    setStepCompleteModalOpen(false); // 모달 닫기
  };

  const methods = useForm<PrepareStepRolesFormValues>();
  const { handleSubmit, setValue } = methods;

  const handlePrepStagesSubmit = (prepStages: PrepStage[]) => {
    console.log("Submitted prepStages:", prepStages);
    setValue("prepStages" as any, prepStages);
  };

  // 계획하기 불러오기
  const recruitId = 1;
  const { data: apiPlanningData } = useQuery(
    ["planningData", recruitId],
    () => getPlanningData(recruitId),
    {
      onSuccess: (data: RecruitmentPlanningData) => {
        console.log(data);
        completeStep(0, true);
      }
    }
  );

  const stepPlanMutation = useMutation(
    ({
      recruitId,
      planningData
    }: {
      recruitId: number;
      planningData: PrepareStepRolesFormValues;
    }) => postStepPlan(recruitId, planningData),
    {
      onSuccess: (data) => {
        console.log("계획하기 단계가 성공적으로 등록되었습니다!");
      },
      onError: (error) => {
        console.error("계획하기 단계 오류 발생:", error);
      }
    }
  );

  const patchPlanMutation = useMutation(
    ({
      recruitId,
      planningData
    }: {
      recruitId: number;
      planningData: PrepareStepPatchFormValues;
    }) => patchPrep(recruitId, planningData),
    {
      onSuccess: (data) => {
        console.log("계획하기 단계가 성공적으로 수정되었습니다!");
      }
    }
  );

  const handleButtonClick = () => {
    if (isStepOneCompleted) {
      setIsEditMode(true);
      completeStep(0, false);
    } else {
      setStepCompleteModalOpen(true);
    }
  };

  useEffect(() => {
    if (apiPlanningData) {
      methods.reset({
        recruitSchedules: apiPlanningData.schedule,
        prepStages: apiPlanningData?.prepStages?.map((stage, index) => ({
          stageName: stage.stageName,
          stageOrder: index + 1,
          clubUserIds: []
        })),
        applicantGroups: apiPlanningData.groups
      });
    }
  }, [apiPlanningData, methods]);

  const onSubmit = async (data: PrepareStepRolesFormValues) => {
    try {
      const formattedPatchData: PrepareStepPatchFormValues = {
        recruitSchedules: [data.recruitSchedules],
        prepStages: data.prepStages.map((stage) => ({
          ...stage,
          clubUserIds: stage.admins.map((admin) => admin.id)
        })),
        applicantGroups: data.applicantGroups
      };

      console.log(
        "isEdit:",
        isEditMode,
        "Submitting data:",
        isEditMode ? formattedPatchData : data
      );

      if (isEditMode) {
        await patchPlanMutation.mutateAsync({
          recruitId: 1,
          planningData: formattedPatchData
        });
      } else {
        await stepPlanMutation.mutateAsync({
          recruitId: 1,
          planningData: data
        });
      }
      setIsEditMode(false);
      completeStep(0, true);
    } catch (error) {
      console.error("제출 중 에러 발생:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center ml-8 mb-[18px]">
          <div className="flex-center mr-3 w-[33px] h-[30px] bg-white-100 border border-gray-500 rounded-[8px]">
            1
          </div>
          <h1 className="text-title1 mr-3">계획하기</h1>
        </div>

        <section
          className={`${
            isStepOneCompleted && !isEditMode ? "pointer-events-none" : ""
          }
           w-full h-auto bg-white-100 py-6 mx-8 px-[13px] rounded-[12px]`}
        >
          <div className="flex items-center mx-8 my-4">
            <h1 className="section-title">
              <span className="mr-[0.25em] text-main-100 text-left">* </span>
              리크루팅 일정
            </h1>
            <img
              src="/assets/ic-noticeCircle.svg"
              alt="리크루팅 일정 알림 아이콘"
              className="w-[21px] h-[21px] mx-[6px] "
            />
            <div className="ml-3 tooltip">
              주어진 일정을 클릭 후 달력에 드래그해주세요. 정해진 일정은
              리크루팅 진행 단계에 적용됩니다
            </div>
          </div>
          <RecrutingCalenderPicker apiSchedule={apiPlanningData?.schedule} />
        </section>
        {apiPlanningData && (
          <PrepareStepRoles
            apiPrepareStepRoles={apiPlanningData?.prepStages}
            isStepOneCompleted={isStepOneCompleted && !isEditMode}
            onPrepStagesSubmit={handlePrepStagesSubmit}
          />
        )}
        <div className=" w-full flex flex-col items-center ml-8">
          <GroupCreate apiGroups={apiPlanningData?.groups} />
          <button
            type="submit"
            onClick={handleButtonClick}
            aria-label={
              isEditMode
                ? BUTTON_TEXT.COMPLETE
                : isStepOneCompleted
                  ? BUTTON_TEXT.EDIT
                  : BUTTON_TEXT.COMPLETE
            }
            className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
              isEditMode || !isStepOneCompleted
                ? "bg-main-100 text-white-100"
                : "bg-main-400 border border-main-100 text-main-100"
            } text-body flex-center hover:bg-main-500`}
          >
            {isEditMode
              ? BUTTON_TEXT.COMPLETE
              : isStepOneCompleted
                ? BUTTON_TEXT.EDIT
                : BUTTON_TEXT.COMPLETE}
          </button>

          {isStepCompleteModalOpen && (
            <StepCompleteModal
              onClose={handleCloseStepCompleteModal}
              onConfirm={handleConfirmStepComplete}
              stepIndex={0} // 현재 단계 번호 전달 , index는 -1
            />
          )}

          {isStepOneCompleted && !isEditMode && (
            <div className="fixed animate-dropdown bottom-[16px]">
              <div className="w-[1015px] h-[79px] bg-gray-400 rounded-[11px] pl-[31px] flex items-center text-[16px] font-semibold text-gray-800 overflow-hidden">
                해당 단계는 완료되었습니다. 다음 단계로 넘어갈 시, 수정을 권하지
                않습니다.
              </div>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
