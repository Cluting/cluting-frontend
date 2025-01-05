interface ClubIdealListProps {
  onClose: () => void;
}

// 임시 데이터
const commonIdeals = [
  "열정적이고 적극적인 태도로 활동에 참여하는 사람",
  "팀워크를 중요시하며 협력적인 자세를 가진 사람",
  "창의적인 아이디어를 제시하고 실행할 수 있는 사람"
];

const groupIdeals = [
  {
    group: "개발팀",
    ideals: [
      "새로운 기술에 대한 학습 의지가 강한 사람",
      "문제 해결 능력이 뛰어난 사람"
    ]
  },
  {
    group: "디자인팀",
    ideals: [
      "창의적인 디자인 능력을 가진 사람",
      "사용자 경험을 중요시하는 사람"
    ]
  },
  {
    group: "기획팀",
    ideals: ["논리적인 사고력을 가진 사람", "커뮤니케이션 능력이 뛰어난 사람"]
  }
];

export default function ClubIdealList({ onClose }: ClubIdealListProps) {
  return (
    <div className="absolute left-[-600px] top-[15px] w-[590px] h-[810px] overflow-y-scroll text-left custom-shadow bg-white-100 border border-gray-200 rounded-lg  py-[29px] px-[28px]">
      <img
        src="/assets/ic-close.svg"
        alt="운영진 평가 보기 닫기"
        className="absolute right-[22px] top-[24px] w-4 h-4"
        onClick={onClose}
      />

      <section>
        <h1 className="text-gray-1100 text-title3 mb-[26px]">공통 인재상</h1>
        {commonIdeals.map((ideal, index) => (
          <div
            key={index}
            className="text-subheadline text-gray-500 py-[11px] px-5 border border-gray-200 rounded-lg my-[15px]"
          >
            {ideal}
          </div>
        ))}
      </section>

      <section>
        <h1 className="text-gray-1100 text-title3 mb-[26px] mt-[40px]">
          그룹 별 인재상
        </h1>
        {groupIdeals.map((groupIdeal, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <div className="text-callout text-gray-1000 py-3 px-[65px] w-fit bg-gray-100 rounded-lg mb-3">
              {groupIdeal.group}
            </div>
            {groupIdeal.ideals.map((ideal, idealIndex) => (
              <div
                key={idealIndex}
                className="text-subheadline text-gray-500 py-[11px] px-5 border border-gray-200 rounded-lg my-[15px]"
              >
                {ideal}
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
