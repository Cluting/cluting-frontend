//운영진 초대 수락 모달

import { ModalPortal } from "../../../common/ModalPortal";

type AddAdminModalProps = {
  onClose: () => void;
};

export default function AcceptAdminModal({ onClose }: AddAdminModalProps) {
  return (
    <ModalPortal>
      <div className="modal-style">
        <div className="modal-animation relative m-[30px] flex flex-col items-center bg-white-100 w-[545px] h-auto rounded-[12px]">
          <h1 className="text-title3 mt-[28px] mb-[19px]">
            '잇타' 운영진 초대
          </h1>
          <img
            onClick={() => onClose()}
            src="/assets/ic-close.svg"
            alt="모달 닫기"
            className="absolute top-[30px] right-[20px] w-[16px] h-[16px] mx-3"
          />

          <hr className="w-full py- border border-gray-200 " />

          <div className="mt-[55px] mb-[30px] text-callout text-center leading-7">
            '잇타' 운영진에 초대되었습니다.
            <br /> 아직 회원가입이 진행되지 않았습니다.
            <br />
            <span className="text-main-100">
              먼저 회원가입을 진행해 주세요.
            </span>
          </div>

          <button className="flex-center mb-[30px] py-[11px] px-[37px] button-main-light hover:bg-main-500 text-body hover:text-white-100 rounded-[7px]">
            회원가입
          </button>
        </div>
      </div>
    </ModalPortal>
  );
}
