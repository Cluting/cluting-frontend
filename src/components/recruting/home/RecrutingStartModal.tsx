//리크루팅 시작하기 모달

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ModalPortal } from "../../common/ModalPortal";

type RecrutingStartModalProps = {
  onClose: () => void;
};

export default function RecrutingStartModal({
  onClose
}: RecrutingStartModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RecrutingStartFormValue>({ mode: "onChange" });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    onClose(); // 폼 제출 후 모달 닫기
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // 선택된 옵션의 상태를 관리

  const handleOptionChange = (value: string) => {
    setSelectedOption(value); // 선택된 값으로 상태 업데이트
  };

  return (
    <ModalPortal>
      <div className="z-[1000] fixed inset-0 bg-gray-900 bg-opacity-30 flex items-center justify-center z-50">
        <div className="m-[30px] flex flex-col items-center bg-white-100 w-[545px] h-[430px] rounded-[12px]">
          <h1 className="text-title3 mt-[28px] mb-[19px]">
            '잇타' 리크루팅 시작하기
          </h1>
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
              {...register("sessionNumber")}
              type="text"
              placeholder="1기"
              required
              className="w-[257px] h-[42px] mt-[17px] rounded-[7px] input-background text-center text-gray-600 text-headline"
            />

            <hr className="w-[369px] my-[25px] py- border border-gray-200 " />

            <p className="text-callout">
              <span className="text-main-100 mr-[5px]">*</span>전형을 선택해
              주세요.
            </p>
            <div className="flex gap-5 mt-[17px] mb-11">
              <label className="flex items-center cursor-pointer">
                <input
                  {...register("interviewType")}
                  type="radio"
                  name="selection"
                  value="서류(1차)"
                  className="hidden" // 라디오 버튼 숨기기
                />
                <span className="w-[149px] h-[43px] text-gray-900 text-headline p-2  rounded-[7px] input-background hover:bg-gray-100 ">
                  서류(1차)
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  {...register("interviewType")}
                  type="radio"
                  name="selection"
                  value="서류(1차) + 면접(2차)"
                  className="hidden" // 라디오 버튼 숨기기
                />
                <span className="w-[180px] h-[43px] text-gray-900 text-headline p-2  rounded-[7px] input-background hover:bg-gray-100 ">
                  서류(1차) + 면접(2차)
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="py-[9px] px-[30px] bg-gray-900 text-body text-gray-400 hover:text-white-100 rounded-[7px]"
            >
              리크루팅 시작하기
            </button>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
