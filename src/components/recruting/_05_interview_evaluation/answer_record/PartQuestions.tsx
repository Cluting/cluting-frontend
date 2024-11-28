import { useState } from "react";

export default function PartQuestions() {
  const [openQuestions, setOpenQuestions] = useState<Record<number, boolean>>(
    {}
  );

  const handleToggle = (index: number) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  //FIX: 질문 임시 데이터
  const questions = [
    "팀 플레이 상황에서 만약 갈등 상황이 생긴다면 어떻게 대처하시겠습니까?",
    "본인의 강점과 약점은 무엇인가요?"
  ];

  return (
    <div className="w-full flex-col mt-[27px]">
      <p className="font-semibold text-[18px] text-[#7E7E7E] text-left">
        파트별 질문
      </p>

      {questions.map((question, index) => (
        <div key={index}>
          <div
            onClick={() => handleToggle(index)} // 클릭 시 해당 질문 토글
            className="flex-col my-[27px] px-[30px] py-[24px] bg-gray-100 border border-gray-200 rounded-lg cursor-pointer"
          >
            <div className="flex gap-[32px]">
              <img
                src="/assets/ic-toggleButton-right.svg"
                alt={openQuestions[index] ? "질문 닫기" : "질문 열기"}
                className={`transition-transform duration-300 ${
                  openQuestions[index] ? "rotate-90" : "rotate-0"
                }`}
              />
              <p className="flex items-center font-semibold text-[18px]">
                <p className="text-main-500 font-bold mr-3">공통 질문</p>
                {question}
              </p>
            </div>

            {openQuestions[index] && (
              <div className="flex gap-[40px] text-left mt-4">
                <div className="w-full p-4 bg-gray-100 border border-gray-200 custom-shadow rounded-lg">
                  <p className="font-bold text-[20px]">김민지 답변</p>
                  <textarea
                    className="input-style input-background w-full h-[170px] mt-[18px] text-[16px]"
                    placeholder="면접자의 답변을 기록해 주세요."
                  />
                </div>

                <div className="w-full p-4 bg-gray-100 border border-gray-200 custom-shadow rounded-lg">
                  <p className="font-bold text-[20px]">이태준 답변</p>
                  <textarea
                    className="input-style input-background w-full h-[170px] mt-[18px] text-[16px]"
                    placeholder="면접자의 답변을 기록해 주세요."
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
