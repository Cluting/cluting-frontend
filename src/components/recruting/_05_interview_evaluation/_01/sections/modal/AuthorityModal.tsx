import React from "react";

interface AuthorityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthorityModal: React.FC<AuthorityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="flex flex-col h-auto gap-2 p-2 w-80 bg-white-100 rounded-xl">
      <div className="flex flex-col gap-2">
        <button className="bg-[#F1F3FF] rounded-lg w-12 h-6 flex flex-center text-gray-1100 font-medium text-xs">
          기획
        </button>
        <div className="flex flex-col p-2">
          <div className="flex items-center gap-3">
            {/* 추후 실제 이미지의 경우 rounded 작업도 함께 필요 */}
            <img src="/assets/ic-profile.svg" alt="프로필 사진" />
            <div className="flex flex-col gap-1 ">
              <h3 className="text-xs font-semibold text-left font-Pretendard text-gray-1100">
                홍준서
              </h3>
              <span className="text-[11px] text-[#727586] font-Pretendard font-normal">
                test@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorityModal;
