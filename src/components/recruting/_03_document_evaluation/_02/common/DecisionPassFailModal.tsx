import { useState } from "react";
import { ModalPortal } from "../../../../common/ModalPortal";

interface DecisionPassFailModalProps {
  onClose: () => void;
  onDecision: (isPass: boolean) => void;
  applicant: Applicant | null;
}

export default function DecisionPassFailModal({
  onClose,
  onDecision,
  applicant
}: DecisionPassFailModalProps) {
  //FIX: 지원자 합격, 불합격 임시 데이터
  const [applicantState, setApplicantState] = useState<"PASS" | "FAIL">("PASS");
  console.log("합격 여부 결정 모달 - 지원자 데이터", applicant);
  return (
    <ModalPortal>
      <div className="modal-style">
        <div className="modal-animation relative m-[30px] flex flex-col items-center bg-white-100 w-[446px] h-auto rounded-[12px]">
          <div className="flex items-center mt-[27px] mb-[22px]">
            <h1 className="text-title2">합격 여부 결정</h1>
            <img
              onClick={() => onClose()}
              src="/assets/ic-close.svg"
              alt="모달 닫기"
              className="absolute top-[30px] right-[20px] w-[16px] h-[16px] mx-3"
            />
          </div>

          <hr className="w-full  border border-gray-200 " />

          <div className="flex flex-col items-center mt-[24px] mb-[28px] text-center ">
            <p className="text-headline">최종 합격 여부를 선택해 주세요.</p>
            <p className="text-caption3 text-red-100 mt-[5px] mb-[15px]">
              잘 못 선택하시면 다시 이의제기를 해야 합니다.
            </p>

            <div className="flex justify-center items-center bg-gray-100 rounded-lg py-3 px-[19px] w-fit">
              <div className="bg-main-300 text-gray-900 font-semibold text-[12px] h-fit py-1 px-3 mr-3 rounded-[38px]">
                지원자
              </div>
              <div className="flex flex-col items-start">
                <div className="flex">
                  <p className="text-headline">김민지</p>
                  <p className="text-subheadline">(기획)</p>
                </div>
                <p className="text-gray-900 text-[12px] ">010-****-5678</p>
              </div>
            </div>
            <div className="flex justify-center gap-[18px] bg-gray-100 rounded-lg py-3 px-[22px] w-fit mt-[11px] mb-[33px]">
              <p>이전 결과</p>
              <p className="text-main-300">|</p>
              <p
                className={`${applicantState === "PASS" ? "text-[#007AFF]" : "text-[#FF5252]"} font-semibold`}
              >
                {applicantState === "PASS" ? "합격" : "불합격"}
              </p>
            </div>

            <div className="flex gap-[17px] text-caption1 ">
              <button
                onClick={() => onDecision(true)}
                className="py-[9px] px-[45px] bg-[#007AFF] hover:bg-main-500 text-white-100 text-body rounded-[7px]"
              >
                합격
              </button>
              <button
                onClick={() => onDecision(false)}
                className="py-[9px] px-[45px] bg-[#FF5252] hover:bg-[#CC2E2E] text-white-100 text-body rounded-[7px]"
              >
                불합격
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
