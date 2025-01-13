//2-3 공고 작성 (컨테이너)

import { FormProvider, useForm } from "react-hook-form";
import { BUTTON_TEXT } from "../../../../constants/recruting";
import { useStepTwoStore } from "../../../../store/useStore";
import AnnouncementContent from "./AnnouncementContent";
import AnnouncementDetails from "./AnnouncementDetails";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPrepare3AnnouncementInfo, postPrepare3 } from "../service/Step2";
import { useEffect } from "react";

// 리크루팅 아이디 (하드코딩)
const RECRUIT_ID = 1;

export default function AnnouncementContainer() {
  //현재 단계 완료 여부 (전역 상태)
  const { setStepCompleted, steps } = useStepTwoStore();

  // Mutation 설정
  const mutation = useMutation(
    (data: AnnouncementForm) => postPrepare3(RECRUIT_ID, data),
    {
      onSuccess: (data) => {
        console.log("등록 성공", data); // 성공 데이터 처리
      },
      onError: (error: any) => {
        alert(`모집하기3 등록에에 실패하였습니다`);
      }
    }
  );

  //Form 제출
  const methods = useForm<AnnouncementForm>();
  const { handleSubmit, reset } = methods;

  const onSubmit = (data: AnnouncementForm) => {
    console.log(data);
    mutation.mutate(data);
  };

  //FIX:
  const recruitId = 1;
  const { data: announcementInfo } = useQuery(
    ["announcementInfo", recruitId],
    () => getPrepare3AnnouncementInfo(recruitId)
  );

  useEffect(() => {
    if (announcementInfo) {
      reset(announcementInfo);
    }
  }, [announcementInfo, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className=" mb-[147px]">
        <div className={`${steps[2].completed ? "pointer-events-none" : ""}`}>
          <div className="flex items-center mx-8 my-4">
            <h1 className="section-title">
              <span className="text-main-100 mr-[0.25em]">* </span>공고 세부
              사항
            </h1>
            <div className=" ml-3 tooltip">
              우리 동아리의 공고를 작성해 주세요.
            </div>
          </div>
          <AnnouncementDetails />
          <div className="flex items-center mx-8 my-4">
            <h1 className="section-title">
              <span className="text-main-100 mr-[0.25em]">* </span>본문 작성
            </h1>
            <div className=" ml-3 tooltip ">
              우리 동아리 공고의 본문을 작성해 주세요.
            </div>
          </div>
          <AnnouncementContent />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={() => {
              setStepCompleted(2, true);
            }}
            aria-label={
              steps[2].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE
            }
            className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
              steps[2].completed
                ? "bg-main-400 border border-main-100 text-main-100 " //수정하기
                : "bg-main-100 text-white-100 " //완료하기
            }  text-body flex-center hover:bg-main-500`}
          >
            {steps[2].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
          </button>
        </div>

        {!steps[2].completed && (
          <div className="fixed animate-dropdown bottom-[16px]">
            <div className="relative custom-shadow ml-8 w-[1016px] h-[79px] bg-main-300 border border-main-400 rounded-[11px] pl-[31px] flex items-center text-callout text-gray-800 overflow-hidden">
              우리 동아리에 지원하는 지원자의 입장으로 보고싶으신가요?
              <button className="absolute right-[15px] bg-gray-1100 hover:bg-gray-1300 text-white-100 py-[13px] px-[25px] rounded-[10px]">
                미리보기
              </button>
            </div>
          </div>
        )}
        {steps[2].completed && (
          <div className="fixed animate-dropdown bottom-[16px]">
            <div className="relative custom-shadow ml-8 w-[1016px] h-[79px] bg-main-300 border border-main-400 rounded-[11px] pl-[31px] flex items-center text-callout text-gray-800 overflow-hidden">
              해당 단계는 완료되었습니다. 이후 일정을 위해 다음 일정으로
              넘어갔을 시, 수정을 권하지 않습니다.
              <button className="absolute right-[15px] bg-gray-1100 hover:bg-gray-1300 text-white-100 py-[13px] px-[25px] rounded-[10px]">
                미리보기
              </button>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
