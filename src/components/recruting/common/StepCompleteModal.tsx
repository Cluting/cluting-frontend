// 스텝 완료 확인 모달
import { RECRUIT_STEP_ITEMS } from "../../../constants/recruting";
import { ModalPortal } from "../../common/ModalPortal";

interface CompleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  stepIndex: number;
}

export default function StepCompleteModal({
  onClose,
  onConfirm,
  stepIndex
}: CompleteModalProps) {
  return (
    <ModalPortal>
      <div className="modal-style">
        <div className="modal-animation relative m-[30px] flex flex-col items-center bg-white-100 w-[358px] h-auto rounded-[12px]">
          <div className="flex items-center mt-[27px] mb-[22px]">
            <div className="flex-center w-[33px] h-[30px] mr-[9px] bg-main-300 text-main-100 border border-gray-300 rounded-[8px]">
              {stepIndex + 1}
            </div>
            <h1 className="text-title3 ">{RECRUIT_STEP_ITEMS[stepIndex]}</h1>
          </div>

          <hr className="w-full  border border-gray-200 " />

          <div className="mt-[33px] mb-[28px]  text-center ">
            <p className="text-headline mb-[5px]">
              해당 단계를 완료하시겠습니까?
            </p>
            <p className="text-caption3 mb-[32px]">
              단계 완료 후에 수정을 권하지 않습니다.
            </p>

            <div className="flex">
              <button
                onClick={onClose}
                className=" py-[9px] px-[45px] mr-[17px] bg-gray-200 hover:bg-gray-400 text-body text-gray-1100 rounded-[7px]"
              >
                닫기
              </button>
              <button
                onClick={onConfirm}
                className=" py-[9px] px-[30px] button-main-bg hover:bg-main-500 text-body rounded-[7px]"
              >
                완료하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
