import { useState } from "react";
import { useRecruitmentStepStore } from "../../../store/useStore";
import RecrutingCalenderPicker from "../_02_prepare/_01/RecruitingCalenderPicker";
import PrepareStepRoles from "./PrepareStepRoles";
import GroupCreate from "../_02_prepare/_01/GroupCreate";
import { BUTTON_TEXT } from "../../../constants/recruting";
import StepCompleteModal from "../common/StepCompleteModal";
import { FormProvider, useForm } from "react-hook-form";

interface PrepStage {
  stageName: string;
  stageOrder: number;
  clubUserIds: number[];
}

interface RecruitSchedule {
  stage1Start: string;
  stage1End: string;
  stage2Start: string;
  stage2End: string;
  stage3Start: string;
  stage3End: string;
  stage4Start: string;
  stage4End: string;
  stage5Start: string;
  stage5End: string;
  stage6Start: string;
  stage6End: string;
  stage7Start: string;
  stage7End: string;
  stage8Start: string;
  stage8End: string;
}

interface PrepareStepRolesFormValues {
  prepStages: PrepStage[];
  recruitSchedules: RecruitSchedule;
  applicantGroups: string[];
}

export default function RecruitingPlanContainer() {
  const { completedSteps, completeStep } = useRecruitmentStepStore();

  // 1단계 완료 여부 처리
  const isStepOneCompleted = completedSteps[0] || false;

  //완료 확인 모달
  const [isStepCompleteModalOpen, setStepCompleteModalOpen] = useState(false);
  const handleCloseStepCompleteModal = () => {
    setStepCompleteModalOpen(false);
  };

  const handleConfirmStepComplete = () => {
    completeStep(0);
    setStepCompleteModalOpen(false); // 모달 닫기
  };

  const methods = useForm<PrepareStepRolesFormValues>();
  const { handleSubmit, setValue } = methods;

  const handlePrepStagesSubmit = (prepStages: PrepStage[]) => {
    console.log("Submitted prepStages:", prepStages);
    setValue("prepStages", prepStages);
  };
  const onSubmit = (data: PrepareStepRolesFormValues) => {
    console.log("API 제출 데이터:", data);
    // 여기에 실제 API 호출 로직을 추가하세요
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
            isStepOneCompleted ? "pointer-events-none" : ""
          } w-full h-auto bg-white-100 py-6 mx-8 px-[13px] rounded-[12px]`}
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
          <RecrutingCalenderPicker />
        </section>
        <PrepareStepRoles onPrepStagesSubmit={handlePrepStagesSubmit} />
        <div className=" w-full flex flex-col items-center ml-8">
          <GroupCreate />
          <button
            type="submit"
            aria-label={
              isStepOneCompleted ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE
            }
            className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
              isStepOneCompleted
                ? "bg-main-400 border border-main-100 text-main-100 "
                : "bg-main-100 text-white-100 "
            }  text-body flex-center hover:bg-main-500`}
          >
            {isStepOneCompleted ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
          </button>

          {isStepCompleteModalOpen && (
            <StepCompleteModal
              onClose={handleCloseStepCompleteModal}
              onConfirm={handleConfirmStepComplete}
              stepIndex={0} // 현재 단계 번호 전달 , index는 -1
            />
          )}

          {isStepOneCompleted && (
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
