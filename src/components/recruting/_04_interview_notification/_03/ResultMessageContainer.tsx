import { FormEvent, useState } from "react";
import {
  useRecruitmentStepStore,
  useStepFourStore
} from "../../../../store/useStore";
import StepCompleteModal from "../../common/StepCompleteModal";
import PreviewModal from "./PreviewModal";
import { useForm } from "react-hook-form";

// 4-2 합불 안내 메시지 (컨테이너)
export default function ResultMessageContainer() {
  const [messageType, setMessageType] = useState<"pass" | "fail">("pass");
  const [isVisible, setIsVisible] = useState(true); //예시 이미지 여부
  const [isSendPass, setIsSendPass] = useState(false); // 합격 메시지 전송 여부
  const [isSendFail, setIsSendFail] = useState(false); // 불합격 메시지 전송 여부
  const [showError, setShowError] = useState(false); //전송하지 않고 완료했을 때의 에러
  const [textareaErrors, setTextareaErrors] = useState({
    pass: false,
    fail: false
  });
  const [textareaValues, setTextareaValues] = useState({
    pass: "", // 합격 메시지 입력값
    fail: "" // 불합격 메시지 입력값
  });
  //전송 클릭 시 미리보기 모달
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const handleClosePreviewModal = () => {
    setShowPreviewModal(false);
  };

  const handleTextareaChange = (
    event: FormEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.currentTarget;
    setTextareaValues({ ...textareaValues, [name]: value });
    setTextareaErrors({ ...textareaErrors, [name]: false }); // 입력 시 에러 숨김
  };

  // 전송 완료 처리
  const handleSend = () => {
    if (messageType === "pass") {
      setIsSendPass(true); // 합격 메시지 전송 완료
    } else {
      setIsSendFail(true); // 불합격 메시지 전송 완료
    }
  };

  // 전송 완료 클릭 시 실행
  const handleSendComplete = () => {
    const passMessageEmpty = textareaValues.pass.trim() === "";
    const failMessageEmpty = textareaValues.fail.trim() === "";

    // 입력값 검증
    if (passMessageEmpty || failMessageEmpty) {
      setTextareaErrors({
        pass: passMessageEmpty,
        fail: failMessageEmpty
      });
      setShowPreviewModal(false); // 모달 닫힌 상태 유지
    } else {
      setTextareaErrors({
        pass: false,
        fail: false
      });
      setShowPreviewModal(true); // 모달 열기
    }
  };

  //Form 제출
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResultMessageForm>({
    mode: "onSubmit"
  });
  // Form 제출 처리
  const onSubmit = handleSubmit((data) => {
    console.log("Form Submitted:", data);
  });

  //4단계 완료
  const { setStepCompleted, steps } = useStepFourStore();
  const { completedSteps, completeStep } = useRecruitmentStepStore();
  const [isStepCompleteModalOpen, setStepCompleteModalOpen] = useState(false);
  const handleCloseStepCompleteModal = () => setStepCompleteModalOpen(false);
  const handleConfirmStepComplete = () => {
    completeStep(3); //전체 4단계 완료
    setStepCompleted(2, true); //4-3 단계 완료
    setStepCompleteModalOpen(false);
  };
  const handleStepTwoSubmit = handleSubmit(
    () => {
      // 폼 유효성 검사가 통과되었을 때만 실행
      if (!isSendPass || !isSendFail) {
        setShowError(true); // 전송 여부를 만족하지 않으면 에러 표시
        return;
      } else {
        setShowError(false); // 에러 숨김
      }
      if (!completedSteps[0]) {
        setStepCompleteModalOpen(true);
        setShowError(false); // 에러 숨김
      }
    },
    () => {
      // 폼 유효성 검사 실패 시
      console.log("유효성 검사:", errors);
    }
  );

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="w-full ml-1 flex items-center gap-0">
        <button
          onClick={() => {
            setMessageType("pass");
          }}
          className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${messageType === "pass" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"} `}
        >
          합격
        </button>
        <button
          onClick={() => {
            setMessageType("fail");
          }}
          className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${messageType === "fail" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"}`}
        >
          불합격
        </button>
        <div className="tooltip ml-5">
          모든 지원자에게 해당하는 정의를 클릭해 본문을 추가해 주세요.
        </div>
        {showError && (
          <p className="text-callout text-[12px] text-red-100 ml-3">
            먼저 문자 전송을 완료해 주세요.
          </p>
        )}
      </div>
      <div className="relative">
        <div className="bg-gray-50 border border-gray-200 rounded-t-[6.65px]">
          <div className="flex items-center bg-white-100 border border-gray-200 rounded-t-[6.65px] py-[13px] px-[17px]">
            <p className="mr-[15px] text-gray-600 text-[12px]">개별 정의</p>
            <div className="flex-center bg-gray-600 text-white-100 rounded-lg mr-[11px] py-[4px] px-[7px] text-caption3">
              <img
                src="/assets/ic-add.svg"
                className="w-[14px] h-[14px] mr-1"
              />
              지원자
            </div>

            <div className="flex-center bg-gray-600 text-white-100 rounded-lg mr-[11px] py-[4px] px-[7px]  text-caption3">
              <img
                src="/assets/ic-add.svg"
                className="w-[14px] h-[14px] mr-1"
              />
              파트
            </div>

            <div className="flex-center bg-gray-600 text-white-100 rounded-lg mr-[21px] py-[4px] px-[7px]  text-caption3">
              <img
                src="/assets/ic-add.svg"
                className="w-[14px] h-[14px] mr-1"
              />
              면접 시간대 링크
            </div>
          </div>
          <div className="relative bg-white-100 h-[690px] rounded-b-[6.65px]">
            {isVisible && (
              <img
                onClick={() => {
                  setIsVisible(false);
                }}
                src="/assets/messageExample.jpg"
                className="absolute w-[929px] top-[20px] left-[25px]"
              />
            )}

            <textarea
              {...register(messageType, { required: "필수 작성 내용입니다." })}
              placeholder="서류 합격 및 면접 안내에 대한 메시지를 작성해 주세요."
              value={textareaValues[messageType]} // 현재 messageType에 해당하는 값
              onChange={handleTextareaChange}
              className={`w-full h-full overflow-scroll rounded-b-[6.65px] cursor-pointer focus:outline-none  px-[26px] py-[22px] text-gray-1100 `}
            />

            {messageType === "pass" && textareaErrors.pass && (
              <p className="text-state-error text-red-100 mt-2">
                필수 작성 내용입니다.
              </p>
            )}
            {messageType === "fail" && textareaErrors.fail && (
              <p className="text-state-error text-red-100 mt-2">
                필수 작성 내용입니다.
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSendComplete}
            className={` w-[210px] h-[54px] rounded-[11px] mt-[50px] text-white-100 text-body flex-center ${
              (messageType === "pass" && isSendPass) ||
              (messageType === "fail" && isSendFail)
                ? "bg-gray-500 "
                : "bg-main-100 hover:bg-main-500 "
            } `}
          >
            {messageType === "pass" && isSendPass
              ? "전송 완료"
              : messageType === "fail" && isSendFail
                ? "전송 완료"
                : "전송하기"}
          </button>
        </div>
      </div>
      {showPreviewModal && (
        <PreviewModal
          onSendFail={handleSend}
          onSendPass={handleSend}
          onClose={handleClosePreviewModal}
          passMessage={textareaValues["pass"]}
          failMessage={textareaValues["fail"]}
        />
      )}

      {isStepCompleteModalOpen && (
        <StepCompleteModal
          onClose={handleCloseStepCompleteModal}
          onConfirm={handleConfirmStepComplete}
          stepIndex={3}
        />
      )}
      {!steps[2].completed && (
        <div className="fixed animate-dropdown bottom-[16px]">
          <div className="relative  w-[1016px] h-[79px] bg-gray-200  rounded-[11px] pl-[31px] flex items-center text-callout text-gray-800 overflow-hidden">
            지원자에게 문자로 전달될 내용을 미리 확인해 보세요.
            <button className="absolute right-[15px] bg-gray-800 hover:bg-gray-1300 text-white-100 py-[13px] px-[25px] rounded-[10px]">
              미리보기
            </button>
          </div>
        </div>
      )}
      {steps[2].completed && (
        <div className="fixed animate-dropdown bottom-[16px]">
          <div className="relative custom-shadow w-[1016px] h-[79px] bg-main-300 border border-main-400 rounded-[11px] pl-[31px] flex items-center text-callout text-gray-800">
            해당 단계는 완료되었습니다. 이후 일정을 위해 다음 일정으로 넘어갔을
            시, 수정을 권하지 않습니다.
            <button
              type="button"
              className="absolute right-[15px] bg-gray-1100 hover:bg-gray-1300 text-white-100 py-[13px] px-[25px] rounded-[10px]"
            >
              미리보기
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
