// 전체 지원자 수

import { useGroupStore } from "../../../../../store/useGroupStore";

export default function TotalApplicantsCounter() {
  const { group } = useGroupStore();
  return (
    <div>
      <div className="flex">
        <p className="section-title">전체 지원자 수</p>
        <div className="tooltip">
          우리 동아리에 지원한 전체 지원자 수를 보여드립니다.
        </div>
      </div>

      <div className="flex gap-[31px] mt-[10px] w-full h-auto py-[28px] pb-[29px] px-[31px] bg-white-100 border border-[#D6D7DA] rounded-[21px] overflow-auto [&::-webkit-scrollbar]:hidden whitespace-nowrap">
        {group.map((groupItem) => (
          <div key={groupItem.index} className="flex items-center gap-[15px] ">
            <p>{groupItem.name}</p>
            <div className="flex-center w-auto h-[38px] px-[20px] py-[9.5px] rounded-[6px] bg-gray-100 text-[16px] font-medium">
              175명
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
