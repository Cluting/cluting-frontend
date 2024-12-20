import { useState } from "react";

export default function Common() {
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
    "팀 플레이 상황에서 만약 갈등 상황이 생긴다면 어떻게 대처하시겠습니까?",
    "본인의 강점과 약점은 무엇인가요?"
  ];
  const answer = [
    "갈등 상황이 발생했을 때 가장 먼저 중요한 것은 문제의 원인을 명확히 파악하는 것입니다. 저는 상황을 감정적으로 대응하기보다는, 갈등의 원인을 분석하고 상대방의 입장을 이해하려고 노력합니다. 예를 들어, 이전 프로젝트에서 일정에 대한 의견 충돌이 있었던 적이 있었는데, 각자의 우선순위를 정리한 뒤 함께 해결책을 모색했습니다. 결과적으로 더 나은 일정 관리 방안을 도출할 수 있었습니다. 이처럼 저는 열린 대화와 협업을 통해 문제를 해결하고 팀의 목표를 달성하는 데 중점을 둡니다.",
    "제 강점은 문제를 논리적으로 접근하고 체계적으로 해결하려는 태도입니다. 특히, 프로젝트를 진행할 때 세부적인 계획을 세우고 이를 실행에 옮기는 데 강점이 있습니다. 예를 들어, 팀 프로젝트에서 일정 관리와 작업 분담을 체계적으로 진행한 덕분에 기한 내에 성공적으로 프로젝트를 완수한 경험이 있습니다. 반면, 제 약점은 새로운 환경에 적응할 때 조금 더 시간이 걸린다는 점입니다. 하지만 이를 보완하기 위해 초기 단계에서 많은 자료를 조사하고 학습하는 습관을 들이고 있습니다. 이런 노력 덕분에 적응 기간을 점점 줄이고 있고, 팀에 기여할 수 있는 역량을 빠르게 발휘하고자 노력 중입니다."
  ];

  return (
    <div className="w-full flex-col">
      <p className="font-semibold text-[18px] text-[#7E7E7E] text-left">
        공통 질문
      </p>

      {questions.map((question, index) => (
        <div key={index}>
          <div
            onClick={() => handleToggle(index)} // 클릭 시 해당 질문 토글
            className="flex-col my-[27px] px-[30px] py-[24px] bg-main-300 border border-gray-200 rounded-lg cursor-pointer"
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
                <div className="bg-white-100 text-gray-1100 text-[15px] px-5 py-3 border border-gray-200 rounded-lg">
                  {answer[index]}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
