interface ClubIdealListProps {
  onClose: () => void;
  groupIdeals: GroupIdeal[];
}

// 임시 데이터
const tempGroupIdeals: GroupIdeal[] = [
  {
    question: "개발",
    ideals: [
      "지속적인 학습과 성장을 추구하는 개발자",
      "팀워크와 협업 능력이 뛰어난 개발자",
      "사용자 중심의 사고를 하는 개발자",
      "문제 해결 능력이 뛰어난 개발자",
      "새로운 기술에 대한 호기심과 도전 정신이 있는 개발자"
    ]
  },
  {
    question: "디자인",
    ideals: [
      "사용자 경험을 최우선으로 생각하는 디자이너",
      "트렌드를 선도하는 창의적인 디자이너",
      "개발자와의 원활한 소통이 가능한 디자이너",
      "데이터 기반의 디자인 의사결정을 하는 디자이너",
      "지속적으로 포트폴리오를 발전시키는 디자이너"
    ]
  },
  {
    question: "기획",
    ideals: [
      "사용자의 니즈를 정확히 파악하는 기획자",
      "논리적이고 체계적인 사고를 하는 기획자",
      "개발과 디자인에 대한 기본적인 이해가 있는 기획자",
      "시장 트렌드를 빠르게 캐치하고 적용할 수 있는 기획자",
      "데이터 분석 능력이 뛰어난 기획자"
    ]
  }
];

export default function ClubIdealList({
  onClose,
  groupIdeals
}: ClubIdealListProps) {
  //FIX: 실제 데이터 또는 임시 데이터 사용
  const groupIdealsData =
    groupIdeals && groupIdeals.length > 0 ? groupIdeals : tempGroupIdeals;

  return (
    <div className="absolute left-[-600px] top-[15px] w-[590px] h-[810px] overflow-y-scroll text-left custom-shadow bg-white-100 border border-gray-200 rounded-lg  py-[29px] px-[28px]">
      <img
        src="/assets/ic-close.svg"
        alt="운영진 평가 보기 닫기"
        className="absolute right-[22px] top-[24px] w-4 h-4"
        onClick={onClose}
      />

      {groupIdealsData.map((groupIdeal, index) => (
        <section key={index}>
          <h1 className="text-gray-1100 text-title3 mb-[26px] mt-[40px]">
            {groupIdeal.question}
          </h1>
          <div className="mb-6">
            {groupIdeal.ideals.map((ideal, idealIndex) => (
              <div
                key={idealIndex}
                className="text-subheadline text-gray-500 py-[11px] px-5 border border-gray-200 rounded-lg my-[15px]"
              >
                {ideal}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
