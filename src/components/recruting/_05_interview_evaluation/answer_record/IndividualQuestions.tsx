import { useState } from "react";
import { INTERVIEWEES } from "./interviewees";

export default function IndividualQuestion() {
  // 면접자별 질문 상태 관리
  const [openQuestions, setOpenQuestions] = useState<
    Record<number, Record<number, boolean>>
  >({});

  // 토글 핸들러: 면접자 ID와 질문 인덱스를 기반으로 상태 관리
  const handleToggle = (intervieweeId: number, questionIndex: number) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [intervieweeId]: {
        ...prev[intervieweeId],
        [questionIndex]: !prev[intervieweeId]?.[questionIndex] // 질문 상태 반전
      }
    }));
  };

  return (
    <div className="w-full flex-col">
      <p className="font-semibold text-[18px] text-[#7E7E7E] text-left">
        개인 질문
      </p>
      <div className="w-full flex flex-wrap gap-[25px]">
        {INTERVIEWEES.map((interviewee) => (
          <section key={interviewee.id} className="w-[520px]">
            {/* 면접자 정보 */}
            <div className="flex flex-col items-start bg-main-100 rounded-lg text-white-100 px-5 py-[14px] mt-5">
              <p className="text-gray-200 text-caption2">
                면접자{interviewee.id}
              </p>
              <div className="flex items-center gap-4">
                <p className="font-bold text-[20px]">{interviewee.name}</p>
                <p className="text-[16px]">{interviewee.role}</p>
              </div>
            </div>

            {/* 질문들 */}
            {interviewee.questions.map((question, index) => (
              <div key={index}>
                <div
                  onClick={() => handleToggle(interviewee.id, index)} // 면접자 ID와 질문 인덱스를 기반으로 토글
                  className="flex-col my-[27px] px-[30px] py-[24px] bg-gray-100 border border-gray-200 rounded-lg cursor-pointer"
                >
                  <div className="flex items-start gap-[32px]">
                    <img
                      src="/assets/ic-toggleButton-right.svg"
                      alt={
                        openQuestions[interviewee.id]?.[index]
                          ? "질문 닫기"
                          : "질문 열기"
                      }
                      className={`mt-3 transition-transform duration-300 ${
                        openQuestions[interviewee.id]?.[index]
                          ? "rotate-90"
                          : "rotate-0"
                      }`}
                    />
                    <div className="font-semibold text-[18px] text-left">
                      <p className="whitespace-nowrap">
                        <span className="text-main-500 font-bold">
                          {interviewee.name} 개인 질문
                        </span>
                        <span className="ml-4 whitespace-normal">
                          {question}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* 답변 입력 */}
                  {openQuestions[interviewee.id]?.[index] && (
                    <div className="mt-4">
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
        ))}
      </div>
    </div>
  );
}
