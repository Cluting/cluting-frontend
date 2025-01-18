import { useQuery } from "@tanstack/react-query";
import { getDocEvaluationContent } from "../_03_document_evaluation/service/Step3";
import { useParams } from "react-router-dom";

//FIX: 임시 데이터 생성
const tempQuestionAndAnswers = [
  {
    question: "지원 동기와 IT 분야에 관심을 갖게 된 계기를 설명해주세요.",
    answer:
      "저는 대학 시절 참여한 학술동아리 활동을 통해 IT 분야에 관심을 갖게 되었습니다. 다양한 전공의 학생들과 함께 프로젝트를 진행하면서 기술이 사회에 미치는 영향력을 직접 체감할 수 있었습니다. 특히 사용자 경험을 개선하고 새로운 가치를 창출하는 IT 서비스의 잠재력에 매료되어, 이 분야에서 커리어를 쌓고 싶다는 결심을 하게 되었습니다. 귀사의 혁신적인 프로젝트들과 사용자 중심의 접근 방식에 깊은 인상을 받아 지원하게 되었습니다."
  },
  {
    question: "팀 프로젝트 경험과 그 과정에서 배운 점을 설명해주세요.",
    answer:
      "대학교 3학년 때 '지역 상권 활성화 앱' 개발 프로젝트에 참여한 경험이 가장 기억에 남습니다. 이 프로젝트에서 저는 기획과 UX 디자인을 담당했습니다. 사용자 조사를 통해 지역 상인들과 소비자들의 니즈를 파악하고, 이를 바탕으로 앱의 주요 기능을 설계했습니다. 프로젝트 진행 중 개발팀과의 소통 과정에서 기술적 제약사항을 고려한 현실적인 기획의 중요성을 배웠습니다. 또한, 디자인팀과 협업하며 사용자 경험과 시각적 디자인의 조화를 이루는 방법을 익혔습니다. 이 경험을 통해 다양한 분야의 전문가들과 효과적으로 협업하는 능력을 기를 수 있었습니다."
  },
  {
    question: "본인의 강점과 그것을 어떻게 활용할 계획인지 설명해주세요.",
    answer:
      "제 가장 큰 강점은 창의적 문제 해결 능력과 끊임없는 학습 의지입니다. 새로운 기술과 트렌드를 빠르게 습득하고 이를 실제 프로젝트에 적용하는 것을 즐깁니다. 예를 들어, 최근에는 AI와 머신러닝 기술에 관심을 갖고 관련 온라인 강의를 수강하며 토이 프로젝트를 진행했습니다. 이러한 강점을 활용하여 회사의 혁신적인 프로젝트에 기여하고 싶습니다. 또한, 다양한 배경을 가진 팀원들과의 협업 경험을 바탕으로, 부서 간 원활한 소통과 협력을 이끌어내는 데 도움이 되고자 합니다. 지속적인 자기 계발을 통해 회사와 함께 성장하는 인재가 되겠습니다."
  }
];

//3 - 리크루팅 : 서류 평가하기 단계  지원 문항
export default function ApplicationQuestion() {
  const { id } = useParams<{ id: string }>();
  //FIX: 리크루팅 아이디, 지원자 아이디 하드 코딩
  const recruitId = 1;
  const { data: evaluationContent } = useQuery(
    ["evaluationContent", recruitId, id],
    () => getDocEvaluationContent(recruitId, parseInt(id!, 10)),
    {
      enabled: !!id
    }
  );

  //FIX: 실제 데이터 또는 임시 데이터 사용
  const questionAndAnswers =
    evaluationContent?.questionAndAnswers &&
    evaluationContent.questionAndAnswers.length > 0
      ? evaluationContent.questionAndAnswers
      : tempQuestionAndAnswers;

  return (
    <div className="flex flex-col items-start h-full pt-6 bg-gray-100 mb-[1200px]">
      <p className="evalutation-title mb-[9px]">지원 문항</p>
      {questionAndAnswers.map((qa, index) => (
        <section
          key={index}
          className="w-full mb-[24px] py-[27px] px-[17px] bg-main-300 border border-gray-200 rounded-lg"
        >
          <p className="text-headline text-left text-gray-1100 pl-[5px]">
            {index + 1}. {qa.question}
          </p>
          <div className="bg-white-100 rounded-lg border border-gray-200 mt-[18px] p-[19px] text-qustion text-justify text-gray-1000">
            {qa.answer}
          </div>
        </section>
      ))}
    </div>
  );
}
