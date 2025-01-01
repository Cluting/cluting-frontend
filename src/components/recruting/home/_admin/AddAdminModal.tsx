//운영진 추가 모달

import { useState } from "react";
import { ModalPortal } from "../../../common/ModalPortal";
import { useMutation } from "@tanstack/react-query";
import { postAdminInvite } from "./service/Admin";
import { useParams } from "react-router-dom";

type AddAdminModalProps = {
  onClose: () => void;
};

export default function AddAdminModal({ onClose }: AddAdminModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [inviteLink, setInviteLink] = useState("");

  const params = useParams<{ clubId: string }>();
  const clubId = params.clubId ? parseInt(params.clubId, 10) : undefined;

  const mutation = useMutation(
    () => {
      if (clubId === undefined) {
        throw new Error("Club ID is undefined");
      }
      return postAdminInvite(clubId);
    },
    {
      onSuccess: (data) => {
        setInviteLink(data);
        console.log("초대 링크 생성 완료", inviteLink);
        navigator.clipboard.writeText(inviteLink);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      },
      onError: (error) => {
        console.error("운영진 초대 링크 생성 중 오류 발생:", error);
      }
    }
  );

  const handleCopyLink = () => {
    mutation.mutate();
  };

  return (
    <ModalPortal>
      <div className="modal-style">
        <div className="modal-animation relative m-[30px] flex flex-col items-center bg-white-100 w-[545px] h-auto rounded-[12px]">
          <h1 className="text-title3 mt-[28px] mb-[19px]">운영진 추가</h1>
          <img
            onClick={() => onClose()}
            src="/assets/ic-close.svg"
            alt="모달 닫기"
            className="absolute top-[30px] right-[20px] w-[16px] h-[16px] mx-3"
          />

          <hr className="w-full py- border border-gray-200 " />

          <div className="mt-[55px] mb-[30px] text-callout text-center leading-7">
            '잇타' 6기 리크루팅을 함께할 <br /> 운영진들에게 링크를 공유하세요.{" "}
            <br />
            <span className="text-red-100">
              (클루팅 미가입자와 가입자 상관없이 링크를 공유해 주세요.)
            </span>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex-center mb-[30px] py-[9px] pr-[26px] button-main-bg hover:bg-main-500 text-body hover:text-white-100 rounded-[7px]"
          >
            <img
              src="/assets/ic-link.svg"
              alt="링크 복사 아이콘"
              className="w-[20px] h-[20px] mr-[7px] ml-[14px]"
            />
            링크 복사
          </button>

          {/* 링크 복사 알림 모달 */}
          {isCopied && (
            <div className="modal-animation absolute bg-white-100 top-[-80px] px-10 py-4 bg-black rounded-[11px] text-center text-body">
              링크가 복사되었습니다.
            </div>
          )}
        </div>
      </div>
    </ModalPortal>
  );
}
