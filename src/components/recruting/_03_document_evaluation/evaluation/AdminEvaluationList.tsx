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

export default function AdminEvaluationList({
  onClose,
  evaluatorScores
}: AdminEvaluationListProps) {
  console.log("냥", evaluatorScores);
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

      {evaluatorScores?.map((evaluator, index) => (
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
