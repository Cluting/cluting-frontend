// 합격, 불합격 안내 메시지 미리보기 모달

import { useState } from "react";
import { ModalPortal } from "../../../common/ModalPortal";
import StepCompleteModal from "../../common/StepCompleteModal";
import {
  useRecruitmentStepStore,
  useStepSixStore
} from "../../../../store/useStore";

interface previewModalProps {
  onClose: () => void;
  onSendPass: () => void; // 합격 메시지 전송 완료 콜백
  onSendFail: () => void; // 불합격 메시지 전송 완료 콜백
  passMessage: string;
  failMessage: string;
  isPreview?: boolean;
}

export default function PreviewModal({
  onClose,
  onSendPass,
  onSendFail,
  passMessage,
  failMessage,
  isPreview
}: previewModalProps) {
  const [isSendPass, setIsSendPass] = useState(false); // 합격 메시지 전송 여부
  const [isSendFail, setIsSendFail] = useState(false); // 불합격 메시지 전송 여부

  const [isSendPassModalVisible, setIsSendPassModalVisible] = useState(false); // 합격 알림 모달 상태
  const [isSendFailModalVisible, setIsSendFailModalVisible] = useState(false); // 불합격 알림 모달 상태

  // 합격 전송 처리
  const handleSendPass = () => {
    setIsSendPassModalVisible(true); // 합격 알림 모달 표시
    setIsSendPass(true);
    onSendPass(); // 상위 컴포넌트에 합격 전송 상태 전달
    setTimeout(() => setIsSendPassModalVisible(false), 2000); // 2초 후 숨김
  };

  // 불합격 전송 처리
  const handleSendFail = () => {
    setIsSendFailModalVisible(true); // 불합격 알림 모달 표시
    setIsSendFail(true);
    onSendFail(); // 상위 컴포넌트에 불합격 전송 상태 전달
    setTimeout(() => setIsSendFailModalVisible(false), 2000);
  };

  // 메시지 모달 닫았을 때
  const handleClose = () => {
    if (isSendPass && isSendFail) {
      console.log({ isSendPass, isSendFail, isStepCompleteModalOpen });
      setStepCompleteModalOpen(!isStepCompleteModalOpen);
    } else {
      console.log({ isSendPass, isSendFail, isStepCompleteModalOpen });
      onClose();
    }
  };

  // 닫고 6단계 완료 모달
  const { setStepCompleted } = useStepSixStore();
  const { completeStep } = useRecruitmentStepStore();

  const [isStepCompleteModalOpen, setStepCompleteModalOpen] = useState(false);
  const handleConfirmStepComplete = () => {
    completeStep(5); //전체 6단계 완료
    setStepCompleted(1, true); //6-2 단계 완료
    setStepCompleteModalOpen(false); // StepCompleteModal 닫기
    onClose(); // PreviewModal 닫기
  };
  const handleCloseStepCompleteModal = () => setStepCompleteModalOpen(false);

  return (
    <ModalPortal>
      <div className=" modal-style">
        {/* 합격 전송 알림 */}
        {isSendPassModalVisible && (
          <div className="modal-animation absolute bg-white-100 top-[80px] left-[650px] px-10 py-4 bg-black rounded-[11px] text-center text-body z-[50]">
            전송이 완료되었습니다.
          </div>
        )}

        {/* 불합격 전송 알림 */}
        {isSendFailModalVisible && (
          <div className="modal-animation absolute bg-white-100 top-[80px] right-[650px] px-10 py-4 bg-black rounded-[11px] text-center text-body z-[50]">
            전송이 완료되었습니다.
          </div>
        )}
        <div className="modal-animation custom-shadow relative m-[30px] flex flex-col items-center bg-white-100 w-[1000px] h-[640px] rounded-[12px]">
          <div className=" flex items-center mt-[27px] mb-[22px]">
            <h1 className="text-title3 ">
              {isPreview ? "메시지 미리보기" : " 메시지 전송하기"}
            </h1>
            <img
              onClick={handleClose}
              src="/assets/ic-close.svg"
              alt="모달 닫기"
              className="absolute top-[30px] right-[20px] w-[16px] h-[16px] mx-3"
            />
          </div>

          <hr className="w-full border border-gray-200 mb-[22px]" />
          <div className="w-full grid grid-cols-2 auto-cols-max">
            <section className="text-left w-full  px-[47px] ">
              <div className="flex justify-center ">
                <div className="bg-gray-100 rounded-[11px] p-2 text-[#416AFF] text-callout ">
                  합격
                </div>
              </div>
              <p className="h-[420px] mt-3 overflow-scroll "> {passMessage}</p>

              {!isPreview && (
                <div className="flex justify-center">
                  <button
                    onClick={handleSendPass}
                    disabled={isSendPass} // 이미 전송 완료된 경우 비활성화
                    className={`py-[9px] px-[45px] mb-[39px] rounded-[7px] ${
                      isSendPass
                        ? "bg-gray-500 text-white-100 "
                        : "button-main-bg hover:bg-main-500 text-body"
                    }`}
                  >
                    {isSendPass ? "전송 완료" : "전송하기"}
                  </button>
                </div>
              )}
            </section>
            <div className="absolute left-1/2 top-[75px] h-[565px] border-l border-gray-300 "></div>
            <section className="text-left  w-full h-min-[178px]  px-[47px] ">
              <div className="flex justify-center ">
                <div className="bg-gray-100 rounded-[11px] p-2 text-red-100 text-callout ">
                  불합격
                </div>
              </div>
              <p className="h-[420px] mt-3 overflow-scroll "> {failMessage}</p>

              {!isPreview && (
                <div className="flex justify-center">
                  <button
                    onClick={handleSendFail}
                    disabled={isSendFail} // 이미 전송 완료된 경우 비활성화
                    className={`py-[9px] px-[45px] mb-[39px] rounded-[7px] ${
                      isSendFail
                        ? "bg-gray-500 text-white-100 "
                        : "button-main-bg hover:bg-main-500 text-body"
                    }`}
                  >
                    {isSendFail ? "전송 완료" : "전송하기"}
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {isStepCompleteModalOpen && (
        <StepCompleteModal
          onConfirm={handleConfirmStepComplete}
          onClose={handleCloseStepCompleteModal}
          stepIndex={5}
        />
      )}
    </ModalPortal>
  );
}
