import { useState } from "react";
import { BUTTON_TEXT } from "../../constants/recruting";

interface CompleteButtonProps {
  isSubmitting?: boolean;
}

export default function CompleteButton({ isSubmitting }: CompleteButtonProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <button
        type="submit"
        disabled={isSubmitting}
        aria-label={isSubmitted ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
        aria-busy={isSubmitting}
        className={`w-[210px] h-[54px] rounded-[11px] bg-gray-850 text-white-100 text-[17px] font-semibold flex-center ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitted ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
      </button>

      {isSubmitted && (
        <div className="fixed bottom-[16px]">
          <div className="w-[1015px] h-[79px] bg-gray-400 rounded-[11px] pl-[31px] flex items-center text-[16px] font-semibold text-gray-800 overflow-hidden">
            확정된 내용만을 서류 평가 시에 참고할 수 있습니다.
          </div>
        </div>
      )}
    </>
  );
}
