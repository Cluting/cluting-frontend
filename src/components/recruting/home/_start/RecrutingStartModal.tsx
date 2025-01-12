//리크루팅 시작하기 모달

import { useForm } from "react-hook-form";
import { ModalPortal } from "../../../common/ModalPortal";
import { ERROR_MESSAGES } from "../../../../constants/recruting";
import { useClubInfoStore } from "../../../../store/useStore";
import { useMutation } from "@tanstack/react-query";
import { startClubRecruiting } from "../../../club/service/Club";
import { useNavigate, useParams } from "react-router-dom";

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

  const navigate = useNavigate();
  const params = useParams<{ clubId: string }>();
  const clubId = params.clubId ? parseInt(params.clubId, 10) : undefined;
  const selectedInterviewType = watch("isInterview");
  console.log(selectedInterviewType);
  const { clubName } = useClubInfoStore();

  const { mutate } = useMutation(
    (data: { clubId: number; clubData: RecrutingStartFormValue }) =>
      startClubRecruiting(data.clubId, data.clubData),
    {
      onSuccess: (data) => {
        console.log("리크루팅이 성공적으로 시작되었습니다!");
        window.scrollTo(0, 0);
        onClose(); // 폼 제출 후 모달 닫기
        navigate("/recruting/01_plan");
      },
      onError: (error) => {
        console.error("리크루팅 시작 중 오류 발생:", error);
      }
    }
  );
  const onSubmit = (data: RecrutingStartFormValue) => {
    if (clubId === undefined) {
      console.error("Club ID is undefined");
      return;
    }
    mutate({ clubId, clubData: data });
    console.log("제출 데이터", data);
  };

  return (
    <ModalPortal>
      <div className="modal-style">
        <div className="modal-animation relative m-[30px] flex flex-col items-center bg-white-100 w-[545px] h-auto rounded-[12px]">
          <h1 className="text-title3 mt-[28px] mb-[19px]">
            '{clubName}' 리크루팅 시작하기
          </h1>

          <img
            onClick={() => onClose()}
            src="/assets/ic-close.svg"
            alt="모달 닫기"
            className="absolute top-[30px] right-[20px] w-[16px] h-[16px] mx-3"
          />

          <hr className="w-full py- border border-gray-200 " />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center mt-[35px]"
          >
            <p className="text-callout">
              <span className="text-main-100 mr-[5px]">*</span>기수를 입력해
              주세요.
            </p>
            <input
              {...register("generation", { required: true })}
              type="text"
              placeholder="1"
              className="w-[257px] h-[42px] mt-[17px] rounded-[7px] input-background text-center text-gray-600 text-headline"
            />
            {errors?.generation?.type === "required" && (
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
                  {...register("isInterview", { required: true })}
                  type="radio"
                  value="false"
                  className="hidden" // 라디오 버튼 숨기기
                />
                <span
                  className={`w-[180px] h-[43px] text-gray-900 text-headline p-2  rounded-[7px] input-background hover:bg-gray-100 ${
                    selectedInterviewType === false
                      ? "bg-main-300 border-main-400"
                      : ""
                  } `}
                >
                  서류(1차)
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  {...register("isInterview", { required: true })}
                  type="radio"
                  value="true"
                  className="hidden" // 라디오 버튼 숨기기
                />
                <span
                  className={`w-[180px] h-[43px] text-gray-900 text-headline p-2  rounded-[7px] input-background hover:bg-gray-100 ${
                    selectedInterviewType === true
                      ? "bg-main-300 border-main-400"
                      : ""
                  } `}
                >
                  서류(1차) + 면접(2차)
                </span>
              </label>
            </div>
            {errors?.isInterview?.type === "required" && (
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
