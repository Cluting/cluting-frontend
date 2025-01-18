import { ModalPortal } from "../../../../common/ModalPortal";

interface SubmissionModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

export default function SubmissionModal({
  onClose,
  onSubmit
}: SubmissionModalProps) {
  return (
    <ModalPortal>
      <div className="modal-style">
        <div className="modal-animation relative m-[30px] flex flex-col items-center bg-white-100 w-[358px] h-auto rounded-[12px]">
          <div className="flex items-center mt-[27px] mb-[22px]">
            <h1 className="text-title2">지원 서류 제출</h1>
          </div>

          <hr className="w-full  border border-gray-200 " />

          <div className="flex flex-col items-center mt-[24px] mb-[28px] text-center ">
            <p className="text-subheadline text-gray-1400">
              지원 서류를 제출하시겠습니까?
            </p>
            <p className="text-caption3 text-gray-1100 mt-[5px] mb-[15px]">
              제출을 완료하면{" "}
              <span className="text-red-100">수정이 불가능합니다.</span>
              <br /> 작성 내용을 최종적으로 확인해주세요.
            </p>

            <div className="flex gap-[17px] text-caption1 mt-[25px] ">
              <button
                onClick={() => onClose()}
                className="py-[9px] px-[45px] bg-gray-200 text-body rounded-[7px]"
              >
                닫기
              </button>
              <button
                onClick={() => onSubmit()}
                className=" py-[9px] px-[30px] button-main-bg  text-body rounded-[7px] hover:bg-main-500"
              >
                제출하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
