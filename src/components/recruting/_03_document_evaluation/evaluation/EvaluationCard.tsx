import { UseFormRegister } from "react-hook-form";

interface EvaluationCardProps {
  index: number;
  register: UseFormRegister<DocEvaluationRequest>;
}

//FIX: 임시 평가 기준 데이터
const tempEvaluationCriteria = [
  {
    title: "파트 적합성",
    criteria: [
      "지원한 파트에 대한 이해도가 충분한가?",
      "관련 기술이나 도구에 대한 경험이 있는가?",
      "파트와 관련된 프로젝트 경험을 잘 설명했는가?"
    ]
  },
  {
    title: "문제 해결 능력",
    criteria: [
      "문제 상황을 정확히 파악하고 있는가?",
      "창의적이고 효과적인 해결 방안을 제시했는가?",
      "실제 문제 해결 경험을 구체적으로 설명했는가?"
    ]
  },
  {
    title: "팀워크 및 의사소통 능력",
    criteria: [
      "팀 프로젝트 경험에서 본인의 역할을 명확히 설명했는가?",
      "팀원들과의 갈등 해결 경험을 잘 서술했는가?",
      "효과적인 의사소통 방법에 대한 이해를 보여주는가?"
    ]
  }
];

export default function EvaluationCard({
  index,
  register
}: EvaluationCardProps) {
  const criteriaData =
    tempEvaluationCriteria[index % tempEvaluationCriteria.length];

  return (
    <div className="bg-gray-100 border border-gray-200 rounded-[6.35px] my-[10px] py-[11px] px-[10px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="flex-center mr-2 py-[6px] px-[14px] text-main-100 rounded-full bg-main-400 font-bold text-[15.71px]">
            {index}
          </div>
          <p className="text-subheadline text-gray-1400">
            {criteriaData.title}
          </p>
        </div>
        <div className="flex-center gap-[3px] bg-white-100 border border-gray-200 rounded-[5px] px-[10px] py-[5px]">
          <input
            {...register(`criteriaEvaluations.${index}.score`, {
              required: true,
              min: 0,
              max: 100,
              valueAsNumber: true
            })}
            className="text-caption3 text-gray-1100 w-[25px] focus:outline-none"
          />
          <p className="text-caption2 text-gray-600">/100점</p>
        </div>
      </div>

      {criteriaData.criteria.map((criterion, criterionIndex) => (
        <div
          key={criterionIndex}
          className="bg-white-100 rounded-1 mb-2 py-[7px] px-[9px] text-[12px] text-left text-[#595959]"
        >
          {criterion}
        </div>
      ))}

      <input
        type="hidden"
        {...register(`criteriaEvaluations.${index}.criteriaId`)}
        value={index + 1}
      />
    </div>
  );
}
