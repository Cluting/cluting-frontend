import { FormEvent, useRef, useState } from "react";
import { useStepFourStore } from "../../../../store/useStore";
import PreviewModal from "./PreviewModal";
import { useForm } from "react-hook-form";

// 4-2 합불 안내 메시지 (컨테이너)
export default function ResultMessageContainer() {
  const { steps } = useStepFourStore();
  const [messageType, setMessageType] = useState<"pass" | "fail">("pass");
  const [isVisible, setIsVisible] = useState(true); //예시 이미지 여부
  const [isSendPass, setIsSendPass] = useState(false); // 합격 메시지 전송 여부
  const [isSendFail, setIsSendFail] = useState(false); // 불합격 메시지 전송 여부

  //FIX: 모달에서 전송 완료 여부에 맞춰 전송 완료 안 눌렀을 때 오류 추가
  const [showError, setShowError] = useState(false); //전송하지 않고 완료했을 때의 에러
  const [textareaErrors, setTextareaErrors] = useState({
    pass: false,
    fail: false
  });
  const [textareaValues, setTextareaValues] = useState({
    pass: "", // 합격 메시지 입력값
    fail: "" // 불합격 메시지 입력값
  });
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSendwModal, setShowSendModal] = useState(false);
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

  // 개별 정의 삽입
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // textarea 참조
  const handleInsertText = (text: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart; // 현재 커서 시작 위치
    const end = textarea.selectionEnd; // 현재 커서 끝 위치
    const value = textareaValues[messageType];

    // 새로운 값 계산
    const newValue = value.substring(0, start) + text + value.substring(end);

    // 상태 업데이트
    setTextareaValues({ ...textareaValues, [messageType]: newValue });

    // 커서 위치 재설정
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const handleSend = () => {
    if (messageType === "pass") {
      setIsSendPass(true); // 합격 메시지 전송 완료
    } else {
      setIsSendFail(true); // 불합격 메시지 전송 완료
    }
  };

  // 전송 완료 클릭 시
  const handleSendComplete = () => {
    const passMessageEmpty = textareaValues.pass.trim() === "";
    const failMessageEmpty = textareaValues.fail.trim() === "";
    if (passMessageEmpty || failMessageEmpty) {
      setTextareaErrors({
        pass: passMessageEmpty,
        fail: failMessageEmpty
      });
      setShowSendModal(false);
    } else {
      setTextareaErrors({
        pass: false,
        fail: false
      });
      setShowSendModal(true);
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
  const onSubmit = handleSubmit((data) => {
    console.log("Form Submitted:", data);
  });

  //TODO: 개별정의 데이터 연결 필요

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
            <button
              onClick={() => handleInsertText("지원자")}
              className="flex-center bg-gray-600 text-white-100 rounded-lg mr-[11px] py-[4px] px-[7px] text-caption3"
            >
              <img
                src="/assets/ic-add.svg"
                className="w-[14px] h-[14px] mr-1"
              />
              지원자
            </button>

            <button
              onClick={() => handleInsertText("파트")}
              className="flex-center bg-gray-600 text-white-100 rounded-lg mr-[11px] py-[4px] px-[7px]  text-caption3"
            >
              <img
                src="/assets/ic-add.svg"
                className="w-[14px] h-[14px] mr-1"
              />
              파트
            </button>

            <button
              onClick={() => handleInsertText("면접 시간대 링크")}
              className="flex-center bg-gray-600 text-white-100 rounded-lg mr-[21px] py-[4px] px-[7px]  text-caption3"
            >
              <img
                src="/assets/ic-add.svg"
                className="w-[14px] h-[14px] mr-1"
              />
              면접 시간대 링크
            </button>
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
              ref={textareaRef}
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
          isPreview
        />
      )}

      {showSendwModal && (
        <PreviewModal
          onSendFail={handleSend}
          onSendPass={handleSend}
          onClose={handleClosePreviewModal}
          passMessage={textareaValues["pass"]}
          failMessage={textareaValues["fail"]}
        />
      )}

      {!steps[2].completed && (
        <div className="fixed animate-dropdown bottom-[16px]">
          <div className="relative  w-[1016px] h-[79px] bg-gray-200  rounded-[11px] pl-[31px] flex items-center text-callout text-gray-800 overflow-hidden">
            지원자에게 문자로 전달될 내용을 미리 확인해 보세요.
            <button
              onClick={() => {
                setShowPreviewModal(true);
              }}
              className="absolute right-[15px] bg-gray-800 hover:bg-gray-1300 text-white-100 py-[13px] px-[25px] rounded-[10px]"
            >
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
