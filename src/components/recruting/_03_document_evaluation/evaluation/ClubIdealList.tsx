interface ClubIdealListProps {
  onClose: () => void;
  groupIdeals: GroupIdeal[];
}

export default function ClubIdealList({
  onClose,
  groupIdeals
}: ClubIdealListProps) {
  return (
    <div className="absolute left-[-600px] top-[15px] w-[590px] h-[810px] overflow-y-scroll text-left custom-shadow bg-white-100 border border-gray-200 rounded-lg  py-[29px] px-[28px]">
      <img
        src="/assets/ic-close.svg"
        alt="운영진 평가 보기 닫기"
        className="absolute right-[22px] top-[24px] w-4 h-4"
        onClick={onClose}
      />

      {groupIdeals.map((groupIdeal, index) => (
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
