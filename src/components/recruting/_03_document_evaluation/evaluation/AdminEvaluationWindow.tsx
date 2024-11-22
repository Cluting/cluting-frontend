import { useRef } from "react";
import EvaluationCard from "./EvaluationCard";

export default function AdminEvaluationWindow() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이를 초기화하여 높이 재계산
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용 높이에 맞게 설정
    }
  };

  return (
    <div className="absolute top-[90px] right-[-420px] z-50 w-[386px] p-[17px] bg-gray-50 rounded-lg border border-gray-200 custom-shadow">
      <button className="flex-center w-full py-[13px] button-main-light border border-main-400 hover:text-white-100 hover:bg-main-100 font-semibold rounded-[7px]">
        <img src="/assets/ic-ideal.svg" alt="인재상" className="w-6 h-6 mr-2" />
        우리 동아리 인재상 확인하기
      </button>
      <div className="flex items-center bg-gray-100 rounded-[7px] mt-[31px] py-[15px] px-[87px] flex-center">
        <p className="text-gray-800 font-semibold text-[15.71px]">총점 평균</p>
        <p className="font-bold text-[18px] ml-1">{"89.5점"}</p>
        <p className="text-gray-800 font-semibold text-[15.71px] ml-1">
          /100점
        </p>
      </div>
      <button className="flex justify-between items-center w-full hover:bg-main-300 border border-main-400 text-gray-1100 text-[15.71px] font-semibold rounded-[5.24px] px-[19px] py-4 mt-3">
        다른 운영진 평가 보기
        <img
          src="/assets/ic-next.svg"
          alt="운영진 평가 보기"
          className="w-[15px] h-[15px]"
        />
      </button>

      <section className="w-full mt-10">
        <div className="flex justify-between">
          <div className="flex items-center">
            <p className="text-title3">{"최예은"}</p>
            <p className="text-subheadline text-[#949494] ml-1">평가자</p>
          </div>
          <div className="flex-center gap-[3px] bg-gray-100 rounded-[5px] pl-[26px] py-[5px] pr-1">
            <p className="text-callout text-gray-1100 ">{"95"}</p>
            <p className="text-caption3 text-gray-600">/100점</p>
          </div>
        </div>
        <EvaluationCard />
        <EvaluationCard />
        <EvaluationCard />
      </section>

      <section className="mt-10 mb-[27px] bg-main-300 rounded-[6.35px] p-3 ">
        <p className="text-left text-body text-gray-1100">코멘트</p>
        <textarea
          ref={textareaRef}
          placeholder="작성하신 코멘트는 운영진 평가 보기에서 다른 팀원들에게 보여집니다."
          className="input-background input-style w-full text-[12.7px] overflow-hidden resize-none"
          rows={4} // 기본 최소 높이 설정
          onInput={handleInput} // 입력 이벤트 핸들러 연결
        />
      </section>

      <button className="button-main-bg hover:bg-main-500 py-4 px-[56px] text-body rounded-[11px]">
        평가 완료
      </button>
    </div>
  );
}
