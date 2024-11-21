// 합격, 불합격 안내 메시지 미리보기 모달

import { ModalPortal } from "../../../common/ModalPortal";

interface previewModalProps {
  onClose: () => void;
  onSend: () => void;
  type: string;
  message: string;
}

export default function PreviewModal({
  onClose,
  onSend,
  type,
  message
}: previewModalProps) {
  return (
    <ModalPortal>
      <div className="modal-style">
        <div className="modal-animation custom-shadow relative m-[30px] flex flex-col items-center bg-white-100 w-[740px] h-[640px] rounded-[12px]">
          <div className=" flex items-center mt-[27px] mb-[22px]">
            <h1 className="text-subheadline ">{type} 메시지 전송 (미리보기)</h1>
            <img
              onClick={() => onClose()}
              src="/assets/ic-close.svg"
              alt="모달 닫기"
              className="absolute top-[30px] right-[20px] w-[16px] h-[16px] mx-3"
            />
          </div>

          <hr className="w-full border border-gray-200 mb-[22px]" />

          <p className="text-body text-main-100">
            {" "}
            *지원자 입장에서 보이는 본문 모습입니다.
          </p>
          <div className="overflow-scroll py-[40px] px-[60px]">{message}</div>
          <button
            onClick={() => {
              onSend();
              onClose();
            }}
            className=" py-[9px] px-[45px] mb-[39px] button-main-bg hover:bg-main-500 text-body rounded-[7px]"
          >
            전송
          </button>
        </div>
      </div>
    </ModalPortal>
  );
}
