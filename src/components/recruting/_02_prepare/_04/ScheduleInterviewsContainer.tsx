import InterviewAvailableTime from "./InterviewAvailableTime";
import InterviewFormat from "./InterviewFormat";
import InterviewTime from "./InterviewTime";
import TimeSlot from "./TimeSlot";

import AdminsSchedule from "./AdminsSchedule";
import { useStepTwoStore } from "../../../../store/useStore";
import { BUTTON_TEXT } from "../../../../constants/recruting";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { postPrepare4InterviewSetup } from "../service/Step2";
import { useMutation } from "@tanstack/react-query";

//2-4 운영진 면접 일정 조정 (컨테이너)
export default function ScheduleInterviewsContainer() {
  //현재 스텝 완료 여부 (전역 상태)
  const { setStepCompleted, steps } = useStepTwoStore();
  const [isEditMode, setIsEditMode] = useState(false); // 추가

  const methods = useForm<InterviewSetup>({
    defaultValues: {
      interviewer: 0,
      interviewee: 0,
      interviewDuration: 0
    }
  });

  const { watch, handleSubmit } = methods;

  //FIX: 하드 코딩
  const RECRUIT_ID = 1;
  const mutation = useMutation(
    (data: InterviewSetup) =>
      postPrepare4InterviewSetup(Number(RECRUIT_ID), data),
    {
      onSuccess: (data) => {
        console.log("모집하기(4) 인터뷰어, 인터뷰이, 기간 API 연결 성공", data);
        // 성공 시 추가 작업 (예: 알림 표시, 페이지 이동 등)
      },
      onError: (error: any) => {
        console.error("API 호출 실패:", error);
        alert(`면접 일정 설정에 실패했습니다: ${error.message}`);
      }
    }
  );

  const onSubmit = (data: InterviewSetup) => {
    const submissionData = {
      ...data,
      interviewDuration: Number(data.interviewDuration)
    };
    console.log("제출", submissionData);
    mutation.mutate(submissionData);
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (
        name === "interviewer" ||
        name === "interviewee" ||
        name === "interviewDuration"
      ) {
        const { interviewer, interviewee, interviewDuration } = value;

        if (
          Number(interviewer) > 0 &&
          Number(interviewee) > 0 &&
          Number(interviewDuration) > 0
        ) {
          console.log("조건 만족, 폼 제출 중...");
          handleSubmit(onSubmit)();
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, handleSubmit, onSubmit]);

  const handleButtonClick = () => {
    if (steps[3].completed && !isEditMode) {
      setIsEditMode(true);
      setStepCompleted(3, false); // form 활성화를 위해 completed 상태를 false로
    } else {
      setStepCompleted(3, true);
      setIsEditMode(false);
    }
  };

  return (
    <div className="mb-[147px]">
      <div
        className={`${steps[3].completed && !isEditMode ? "pointer-events-none" : ""}`}
      >
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
        <TimeSlot />

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
          type="button"
          onClick={handleButtonClick}
          aria-label={
            steps[3].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE
          }
          className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
            steps[3].completed && !isEditMode
              ? "bg-main-400 border border-main-100 text-main-100 " //수정하기
              : "bg-main-100 text-white-100 " //완료하기
          }  text-body flex-center hover:bg-main-500`}
        >
          {steps[3].completed && !isEditMode
            ? BUTTON_TEXT.EDIT
            : BUTTON_TEXT.COMPLETE}
        </button>
      </div>
    </div>
  );
}
