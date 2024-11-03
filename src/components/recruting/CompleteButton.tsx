import { useState } from "react";

interface CompleteButtonProps {
  isSubmitting?: boolean;
}

export default function CompleteButton({ isSubmitting }: CompleteButtonProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClick = () => {
    setIsSubmitted(true);
  };

  return (
    <>
      <button
        type="submit"
        onClick={handleClick}
        disabled={isSubmitting}
        className={`w-[210px] h-[54px] rounded-[11px] bg-gray-850 text-white-100 text-[17px] font-semibold flex-center ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitted ? "수정하기" : "완료하기"}
      </button>
      {/* 
      //tODO: 아래 고정된 부분 수정해야해요..ㅠ 뭔가 이상하게 안됨..
      {isSubmitted && (  
      <div className="fixed bottom-0 left-[338px] bg-gray-400">
          <div className="w-[1015px] h-[79px] rounded-[11px] pl-[31px] flex items-center text-[16px] font-semibold text-gray-800">
            확정된 내용만을 서류 평가 시에 참고할 수 있습니다.
          </div>
        </div>
      )} */}
    </>
  );
}
