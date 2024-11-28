import { useState } from "react";

export default function CommonQuestions() {
  const [openQuestions, setOpenQuestions] = useState<Record<number, boolean>>(
    {}
  ); // 질문별 토글 상태 관리

  const handleToggle = (index: number) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index] // 해당 질문 상태 반전
    }));
  };

  const questions = [
    "공통 질문 1. 팀 플레이 상황에서 만약 갈등 상황이 생긴다면 어떻게 대처하시겠습니까?",
    "공통 질문 2. 본인의 강점과 약점은 무엇인가요?"
  ];

  return (
    <div className="w-full flex-col">
      <p className="font-semibold text-[18px] text-[#7E7E7E] text-left">
        공통 질문
      </p>

      {questions.map((question, index) => (
        <div key={index}>
          {/* 질문 토글 */}
          <div
            onClick={() => handleToggle(index)} // 클릭 시 해당 질문 토글
            className="flex gap-[32px] my-[27px] px-[30px] py-[24px] bg-gray-100 border border-gray-200 custom-shadow rounded-lg cursor-pointer"
          >
            <img
              src="/assets/ic-toggle.svg"
              alt={openQuestions[index] ? "질문 닫기" : "질문 열기"}
              className={`transition-transform duration-300 ${
                openQuestions[index] ? "rotate-90" : "rotate-0"
              }`}
            />
            <p className="font-semibold text-[18px]">{question}</p>
          </div>

          {/* 숨겨진 답변 입력란 */}
          {openQuestions[index] && (
            <div className="flex gap-[40px] text-left">
              <div className="w-full p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-[18px]">김민지 - {question}</p>
                <textarea
                  className="input-style input-background w-full h-[170px] mt-[18px] text-[16px]"
                  placeholder="면접자의 답변을 기록해 주세요."
                />
              </div>

              <div className="w-full p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-[18px]">이태준 - {question}</p>
                <textarea
                  className="input-style input-background w-full h-[170px] mt-[18px] text-[16px]"
                  placeholder="면접자의 답변을 기록해 주세요."
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
