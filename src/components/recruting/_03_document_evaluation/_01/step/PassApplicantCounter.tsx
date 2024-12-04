// 서류 합격자 인원수
import { useGroupStore } from "../../../../../store/useGroupStore";

export default function PassApplicantCounter() {
  const { group } = useGroupStore();
  return (
    <>
      <div className="flex mt-[34px]">
        <p className="section-title">서류 합격자 인원수</p>
        <div className="tooltip">
          앞서 설정한 서류 합격자 인원 수를 보여드립니다.
        </div>
      </div>
      <div className="flex gap-[15px] mt-[10px] w-full h-auto py-[28px] pb-[29px] px-[31px] bg-white-100 border border-[#D6D7DA] rounded-[21px] overflow-auto [&::-webkit-scrollbar]:hidden whitespace-nowrap">
        {group.map((groupItem) => (
          <div key={groupItem.id} className="flex items-center gap-[15px] ">
            <p className="text-body">{groupItem.name}</p>
            <div className="flex-center w-auto h-[38px] px-[25px] py-[9.5px] rounded-[6px] bg-gray-100 text-[16px] font-medium">
              상위 30명
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
