import { useState } from "react";

export default function IndividualQuestion() {
  const [openQuestions, setOpenQuestions] = useState<Record<number, boolean>>(
    {}
  ); // 질문별 토글 상태 관리

  const handleToggle = (index: number) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index] // 해당 질문 상태 반전
    }));
  };

  //FIX: 질문 임시 데이터
  const questions = [
    "팀 플레이 상황에서 만약 갈등 상황이 생긴다면 어떻게 대처하시겠습니까 대처하시겠습니까 대처하시겠습니까?",
    "본인의 강점과 약점은 무엇인가요?"
  ];

  return (
    <div className="w-full flex-col">
      <p className="font-semibold text-[18px] text-[#7E7E7E] text-left">
        개인 질문
      </p>
      <div className="w-full flex items-center gap-[25px]">
        <section>
          {questions.map((question, index) => (
            <div key={index} className="w-[520px]">
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
                  <div className="font-semibold text-[18px]">
                    <p className="whitespace-nowrap">
                      <span className="text-main-500 font-bold">
                        이태준 개인 질문
                      </span>
                      <span className="ml-4 whitespace-normal">{question}</span>
                    </p>
                  </div>
                </div>

                {openQuestions[index] && (
                  <div className=" mt-4">
                    <textarea
                      onClick={(e) => e.stopPropagation()}
                      className="input-style input-background w-full h-[170px] mt-[18px] text-[16px]"
                      placeholder="지원자의 답변을 기록해 주세요."
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        <section>
          {questions.map((question, index) => (
            <div key={index} className="w-[520px]">
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

                  <div className="font-semibold text-[18px]">
                    <p className="whitespace-nowrap">
                      <span className="text-main-500 font-bold">
                        이태준 개인 질문
                      </span>
                      <span className="ml-4 whitespace-normal">{question}</span>
                    </p>
                  </div>
                </div>

                {openQuestions[index] && (
                  <div className=" mt-4">
                    <textarea
                      onClick={(e) => e.stopPropagation()}
                      className="input-style input-background w-full h-[170px] mt-[18px] text-[16px]"
                      placeholder="지원자의 답변을 기록해 주세요."
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
