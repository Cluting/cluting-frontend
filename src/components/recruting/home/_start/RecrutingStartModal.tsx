//리크루팅 시작하기 모달

import { useForm } from "react-hook-form";
import { ModalPortal } from "../../../common/ModalPortal";
import { ERROR_MESSAGES } from "../../../../constants/recruting";
import {
  useRecruitmentSessionStore,
  useRecruitmentStartStore
} from "../../../../store/useStore";

type RecrutingStartModalProps = {
  onClose: () => void;
};

export default function RecrutingStartModal({
  onClose
}: RecrutingStartModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<RecrutingStartFormValue>({ mode: "onChange" });

  const selectedInterviewType = watch("interviewType");
  const { setSessionNumber } = useRecruitmentSessionStore();
  const { startRecruiting } = useRecruitmentStartStore();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setSessionNumber(data.sessionNumber); // 동아리 기수 Store에 반영
    startRecruiting(); //리크루팅 프로세스 시작 여부 Store에 반영
    window.scrollTo(0, 0);
    onClose(); // 폼 제출 후 모달 닫기
  });

  return (
    <ModalPortal>
      <div className="modal-style">
        <div className="modal-animation relative m-[30px] flex flex-col items-center bg-white-100 w-[545px] h-auto rounded-[12px]">
          <h1 className="text-title3 mt-[28px] mb-[19px]">
            '잇타' 리크루팅 시작하기
          </h1>

          <img
            onClick={() => onClose()}
            src="/assets/ic-close.svg"
            alt="모달 닫기"
            className="absolute top-[30px] right-[20px] w-[16px] h-[16px] mx-3"
          />

          <hr className="w-full py- border border-gray-200 " />

          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center mt-[35px]"
          >
            <p className="text-callout">
              <span className="text-main-100 mr-[5px]">*</span>기수를 입력해
              주세요.
            </p>
            <input
              {...register("sessionNumber", { required: true })}
              type="text"
              placeholder="1기"
              className="w-[257px] h-[42px] mt-[17px] rounded-[7px] input-background text-center text-gray-600 text-headline"
            />
            {errors?.sessionNumber?.type === "required" && (
              <p className="text-state-error">{ERROR_MESSAGES.required}</p>
            )}

            <hr className="w-[369px] my-[25px] py- border border-gray-200 " />

            <p className="text-callout">
              <span className="text-main-100 mr-[5px]">*</span>전형을 선택해
              주세요.
            </p>

            <div className="flex gap-5 mt-[17px] text-center">
              <label className="flex items-center cursor-pointer">
                <input
                  {...register("interviewType", { required: true })}
                  type="radio"
                  value="서류(1차)"
                  className="hidden" // 라디오 버튼 숨기기
                />
                <span
                  className={`w-[180px] h-[43px] text-gray-900 text-headline p-2  rounded-[7px] input-background hover:bg-gray-100 ${
                    selectedInterviewType === "서류(1차)"
                      ? "bg-main-300 border-main-400"
                      : ""
                  } `}
                >
                  서류(1차)
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  {...register("interviewType", { required: true })}
                  type="radio"
                  value="서류(1차) + 면접(2차)"
                  className="hidden" // 라디오 버튼 숨기기
                />
                <span
                  className={`w-[180px] h-[43px] text-gray-900 text-headline p-2  rounded-[7px] input-background hover:bg-gray-100 ${
                    selectedInterviewType === "서류(1차) + 면접(2차)"
                      ? "bg-main-300 border-main-400"
                      : ""
                  } `}
                >
                  서류(1차) + 면접(2차)
                </span>
              </label>
            </div>
            {errors?.interviewType?.type === "required" && (
              <p className="text-state-error">{ERROR_MESSAGES.required}</p>
            )}

            <button
              type="submit"
              className="button-main-bg mt-11 mb-[30px] py-[9px] px-[30px] text-body hover:bg-main-500 rounded-[7px]"
            >
              시작하기
            </button>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
