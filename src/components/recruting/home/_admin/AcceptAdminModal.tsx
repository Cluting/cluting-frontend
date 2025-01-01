//운영진 초대 수락 모달

import { Link } from "react-router-dom";
import { ModalPortal } from "../../../common/ModalPortal";
import { useAuthStore } from "../../../../store/useAuthStore";

type AddAdminModalProps = {
  onClose: () => void;
  onAccept: () => void;
  club: ClubData;
};

export default function AcceptAdminModal({
  onClose,
  onAccept,
  club
}: AddAdminModalProps) {
  const { isLogin } = useAuthStore();
  return (
    <ModalPortal>
      <div className="modal-style">
        <div className="modal-animation relative m-[30px] flex flex-col items-center bg-white-100 w-[545px] h-auto rounded-[12px]">
          <h1 className="text-title3 mt-[28px] mb-[19px]">
            '{club.name}' 운영진 초대
          </h1>
          <img
            onClick={() => onClose()}
            src="/assets/ic-close.svg"
            alt="모달 닫기"
            className="absolute top-[30px] right-[20px] w-[16px] h-[16px] mx-3"
          />

          <hr className="w-full py- border border-gray-200 " />
          {isLogin ? (
            <>
              <div className="mt-[34px] mb-[30px] text-callout text-center leading-7 text-gray-1000">
                <div className="flex items-center bg-gray-100 py-[21px] px-[18px] rounded-[14px] mb-7 border border-main-300">
                  <img
                    src="/assets/ic-profile.svg"
                    alt="동아리 프로필"
                    className="w-[50px] h-[50px] mr-3 "
                  />
                  <div className="text-left">
                    <p className="text-body text-black-900 mb-[5px]">
                      {club.name}
                    </p>
                    <p className="text-gray-1100 text-caption1">
                      {!club.isRecruiting && "-"}
                    </p>
                  </div>
                </div>
                '{club.name}' 운영진에 초대되었습니다.
                <br /> 잇타의 리크루팅을 함께 진행하려면
                <br />
                초대를 수락해 주세요.
              </div>

              <button
                onClick={() => onAccept()}
                className="flex-center mb-[30px] py-[11px] px-[37px] button-main-light hover:bg-main-500 text-body hover:text-white-100 rounded-[7px]"
              >
                수락하기
              </button>
            </>
          ) : (
            <>
              <div className="mt-[55px] mb-[30px] text-callout text-center leading-7">
                '잇타' 운영진에 초대되었습니다.
                <br /> 아직 회원가입이 진행되지 않았습니다.
                <br />
                <span className="text-main-100">
                  먼저 회원가입을 진행해 주세요.
                </span>
              </div>
              <Link
                to="/signup"
                className="flex-center mb-[30px] py-[11px] px-[37px] button-main-light hover:bg-main-500 text-body hover:text-white-100 rounded-[7px]"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </ModalPortal>
  );
}
