import { useState } from "react";

export default function IndividualQuestion() {
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
  const personalQuestions = [
    {
      name: "김민지",
      questions: [
        "지난 프로젝트에서 가장 어려웠던 점은 무엇이었나요?",
        "본인의 단기 목표와 장기 목표는 무엇인가요?"
      ]
    },
    {
      name: "이태준",
      questions: [
        "새로운 환경에서 적응하기 위해 어떤 노력을 하나요?",
        "팀워크에서 본인이 맡은 역할은 무엇이었나요?"
      ]
    }
  ];

  return (
    <div className="w-full flex-col mt-[27px]">
      <p className="font-semibold text-[18px] text-[#7E7E7E] text-left">
        개인 질문
      </p>

      <div className="flex gap-[43px]">
        <div>
          {personalQuestions.map((data, index) => (
            <div key={index}>
              {/* 질문 토글 */}
              <div
                onClick={() => handleToggle(index)} // 클릭 시 해당 질문 토글
                className="flex gap-[32px] my-[27px] px-[30px] py-[24px] bg-gray-100 border border-gray-200 custom-shadow rounded-lg cursor-pointer"
              >
                <img
                  src="/assets/ic-toggleButton-right.svg"
                  alt={openQuestions[index] ? "질문 닫기" : "질문 열기"}
                  className={`transition-transform duration-300 ${
                    openQuestions[index] ? "rotate-90" : "rotate-0"
                  }`}
                />
                <p className="font-semibold text-[18px]">{data.questions}</p>
              </div>

              {/* 숨겨진 답변 입력란 */}
              {openQuestions[index] && (
                <div className="flex gap-[40px] text-left">
                  <div className="w-full p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-[18px]">
                      김민지 - {data.questions}
                    </p>
                    <textarea
                      className="input-style input-background w-full h-[170px] mt-[18px] text-[16px]"
                      placeholder="면접자의 답변을 기록해 주세요."
                    />
                  </div>

                  <div className="w-full p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-[18px]">
                      이태준 - {data.questions}
                    </p>
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
        <div>
          {personalQuestions.map((data, index) => (
            <div key={index}>
              {/* 질문 토글 */}
              <div
                onClick={() => handleToggle(index)} // 클릭 시 해당 질문 토글
                className="flex gap-[32px] my-[27px] px-[30px] py-[24px] bg-gray-100 border border-gray-200 custom-shadow rounded-lg cursor-pointer"
              >
                <img
                  src="/assets/ic-toggleButton-right.svg"
                  alt={openQuestions[index] ? "질문 닫기" : "질문 열기"}
                  className={`transition-transform duration-300 ${
                    openQuestions[index] ? "rotate-90" : "rotate-0"
                  }`}
                />
                <p className="font-semibold text-[18px]">
                  <p className="text-main-500 font-bold mr-3">개인 질문</p>
                  {data.questions}
                </p>
              </div>

              {/* 숨겨진 답변 입력란 */}
              {openQuestions[index] && (
                <div className="flex gap-[40px] text-left">
                  <div className="w-full p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-[18px]">
                      김민지 - {data.questions}
                    </p>
                    <textarea
                      className="input-style input-background w-full h-[170px] mt-[18px] text-[16px]"
                      placeholder="면접자의 답변을 기록해 주세요."
                    />
                  </div>

                  <div className="w-full p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-[18px]">
                      이태준 - {data.questions}
                    </p>
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
      </div>
    </div>
  );
}
