// 합격, 불합격 안내 메시지 미리보기 모달

import { ModalPortal } from "../../../common/ModalPortal";

interface previewModalProps {
  onClose: () => void;
  onSend: () => void;
  passMessage: string;
  failMessage: string;
}

export default function PreviewModal({
  onClose,
  onSend,
  passMessage,
  failMessage
}: previewModalProps) {
  return (
    <ModalPortal>
      <div className="modal-style">
        <div className="modal-animation custom-shadow relative m-[30px] flex flex-col items-center bg-white-100 w-[1000px] h-[640px] rounded-[12px]">
          <div className=" flex items-center mt-[27px] mb-[22px]">
            <h1 className="text-title3 ">메시지 전송하기</h1>
            <img
              onClick={() => onClose()}
              src="/assets/ic-close.svg"
              alt="모달 닫기"
              className="absolute top-[30px] right-[20px] w-[16px] h-[16px] mx-3"
            />
          </div>

          <hr className="w-full border border-gray-200 mb-[22px]" />
          <div className="w-full grid grid-cols-2 auto-cols-max">
            <section className="text-left w-full  pl-[47px] pr-[19px]">
              <div className="flex justify-center ">
                <div className="bg-gray-100 rounded-[11px] p-2 text-[#416AFF] text-callout ">
                  합격
                </div>
              </div>
              <p className="h-[420px] mt-3 overflow-scroll "> {passMessage}</p>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    onSend();
                  }}
                  className=" py-[9px] px-[45px] mb-[39px] button-main-bg hover:bg-main-500 text-body rounded-[7px]"
                >
                  전송하기
                </button>
              </div>
            </section>
            <section className="text-left  w-full h-min-[178px]  pr-[47px] pl-[19px]">
              <div className="flex justify-center ">
                <div className="bg-gray-100 rounded-[11px] p-2 text-red-100 text-callout ">
                  불합격
                </div>
              </div>
              <p className="h-[420px] mt-3 overflow-scroll "> {failMessage}</p>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    onSend();
                  }}
                  className="flex justify-center py-[9px] px-[45px] mb-[39px] button-main-bg hover:bg-main-500 text-body rounded-[7px]"
                >
                  전송하기
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
