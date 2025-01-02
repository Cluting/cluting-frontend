import InterviewAvailableTime from "./InterviewAvailableTime";
import InterviewFormat from "./InterviewFormat";
import InterviewTime from "./InterviewTime";
import TimeSlot from "./TimeSlot";

import AdminsSchedule from "./AdminsSchedule";
import { useStepTwoStore } from "../../../../store/useStore";
import { BUTTON_TEXT } from "../../../../constants/recruting";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";

//2-4 운영진 면접 일정 조정 (컨테이너)
export default function ScheduleInterviewsContainer() {
  //현재 스텝 완료 여부 (전역 상태)
  const { setStepCompleted, steps } = useStepTwoStore();

  const methods = useForm<InterviewSetup>({
    defaultValues: {
      interviewer: 0,
      interviewee: 0,
      interviewDuration: 0
    }
  });

  const { watch, handleSubmit } = methods;

  const onSubmit = (data: InterviewSetup) => {
    console.log("제출", data);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      console.log("Form values changed:", value); // 디버깅용
      if (
        Number(value.interviewer) > 0 &&
        Number(value.interviewee) > 0 &&
        Number(value.interviewDuration) > 0
      ) {
        console.log("Submitting form..."); // 디버깅용
        handleSubmit(onSubmit)();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, handleSubmit, onSubmit]);

  return (
    <div className="mb-[147px]">
      <div className={`${steps[3].completed ? "pointer-events-none" : ""}`}>
        <FormProvider {...methods}>
          <div className="flex items-center mx-8 my-4">
            <h1 className="section-title">
              <span className="text-main-100 mr-[0.25em]">* </span>면접 형식
              설정하기
            </h1>
            <div className="tooltip ">
              면접 진행 시 면접관과 면접자의 비율을 설정해 주세요.
            </div>
          </div>
          <InterviewFormat />

          <div className="flex items-center mx-8 my-4">
            <h1 className="section-title">
              <span className="text-main-100 mr-[0.25em] ">* </span>면접 시간
              설정하기
            </h1>
            <div className="tooltip">면접 시간을 설정해 주세요. </div>
          </div>
          <InterviewTime />
        </FormProvider>

        <div className="flex items-center mx-8 my-4">
          <h1 className="section-title">
            <span className="text-main-100 mr-[0.25em]">* </span>면접 진행
            시간대 선택
          </h1>
          <div className="tooltip">
            하루 중 언제부터 언제까지 면접을 진행하실 건가요?
          </div>
        </div>
        <TimeSlot interviewDuration={60} />

        <div className="flex items-center mx-8 my-4 ">
          <h1 className="section-title">
            <span className="text-main-100 mr-[0.25em]">* </span>면접 가능 시간
            선택
          </h1>
          <div className="tooltip ">본인이 가능한 시간대를 선택해 주세요.</div>
        </div>
        <InterviewAvailableTime />

        <div className="flex items-center mx-8 my-4">
          <h1 className="section-title">
            <span className="text-main-100 mr-[0.25em]">* </span>면접관 일정
            확인하기
          </h1>
          <div className="tooltip">
            면접에 들어갈 면접관 수에 맞게 클릭해 확정해 주세요.
          </div>
        </div>
        <AdminsSchedule />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          onClick={() => {
            setStepCompleted(3, true);
          }}
          aria-label={
            steps[3].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE
          }
          className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
            steps[3].completed
              ? "bg-main-400 border border-main-100 text-main-100 " //수정하기
              : "bg-main-100 text-white-100 " //완료하기
          }  text-body flex-center hover:bg-main-500`}
        >
          {steps[3].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
        </button>
      </div>
    </div>
  );
}
