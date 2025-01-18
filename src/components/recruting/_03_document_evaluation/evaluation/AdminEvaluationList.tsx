interface EvaluatorScore {
  evaluatorName: string;
  scores: number[];
  totalScore: number;
  comment: string;
}

interface AdminEvaluationListProps {
  onClose: () => void;
  evaluatorScores?: EvaluatorScore[];
}

//FIX: 임시 평가자 점수 데이터
const tempEvaluatorScores: EvaluatorScore[] = [
  {
    evaluatorName: "user20",
    scores: [85, 90, 88],
    totalScore: 88,
    comment:
      "지원자는 파트에 대한 이해도가 높고 기술적 능력이 우수합니다. 팀 프로젝트 경험에서 보여준 협업 능력도 인상적입니다. 다만, 일부 최신 기술에 대한 이해가 더 필요해 보입니다."
  },
  {
    evaluatorName: "user22",
    scores: [92, 88, 95],
    totalScore: 92,
    comment:
      "전반적으로 우수한 지원자입니다. 특히 인성 면에서 뛰어난 점수를 받았습니다. 문제 해결 능력과 의사소통 스킬이 탁월해 보입니다. 기술적인 부분에서 약간의 보완이 필요하지만, 빠르게 성장할 수 있는 잠재력이 있습니다."
  },
  {
    evaluatorName: "user33",
    scores: [89, 93, 91],
    totalScore: 91,
    comment:
      "기술 이해도가 특히 뛰어난 지원자입니다. 프로젝트 경험을 통해 실제 문제 해결 능력을 잘 보여주었습니다. 팀 내에서의 역할과 기여도도 명확히 설명했습니다. 다만, 일부 질문에 대한 답변이 다소 불명확한 부분이 있어 의사소통 스킬을 조금 더 개선할 필요가 있습니다."
  }
];

export default function AdminEvaluationList({
  onClose,
  evaluatorScores
}: AdminEvaluationListProps) {
  //FIX: 실제 데이터 또는 임시 데이터 사용
  const evaluatorScoresData =
    evaluatorScores && evaluatorScores.length > 0
      ? evaluatorScores
      : tempEvaluatorScores;
  return (
    <div className="absolute left-[-400px] top-[160px] w-[391px] custom-shadow bg-white-100 border border-gray-200 rounded-lg  py-4 px-[17px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-headline text-gray-1000 mr-1">운영진 평가 보기</p>
          <p className="text-callout text-gray-500">3/4</p>
        </div>
        <img
          src="/assets/ic-close.svg"
          alt="운영진 평가 보기 닫기"
          className="w-4 h-4"
          onClick={onClose}
        />
      </div>

      {evaluatorScoresData?.map((evaluator, index) => (
        <section
          key={index}
          className="my-[22px] bg-gray-100 border border-gray-200 rounded-[6.35px] p-[10px]"
        >
          <div className="flex justify-between">
            <div className="flex items-center">
              <img
                src="/assets/ic-profile.svg"
                alt="운영진 프로필"
                className="w-7 h-7 mr-2"
              />
              <p className="text-subheadline text-gray-1400">
                {evaluator.evaluatorName}
              </p>
            </div>
            <div className="flex-center gap-[3px] px-[10px] py-[5px]">
              <p className="text-caption3 text-gray-1100 ">
                {evaluator.totalScore}
              </p>
              <p className="text-caption2 text-gray-600">/100점</p>
            </div>
          </div>

          <div className="flex items-center text-[12px] mt-3">
            {evaluator.scores.map((score, scoreIndex) => (
              <div key={scoreIndex} className="flex items-center mr-[13px]">
                <p className="text-[#8D8B8B] mr-2">
                  {scoreIndex === 0
                    ? "파트 적합성"
                    : scoreIndex === 1
                      ? "기술 이해도"
                      : "인성"}
                </p>
                <p className="text-[#5B5151]">{score}점</p>
              </div>
            ))}
          </div>

          <div className="bg-white-100 rounded-1 mt-2 py-[7px] px-[9px] text-[12px] text-[#595959] text-justify">
            {evaluator.comment}
          </div>
        </section>
      ))}
    </div>
  );
}
