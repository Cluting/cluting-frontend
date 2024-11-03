import GroupPassCard from "./GroupPassCard";

export default function GroupPassCount() {
  return (
    <div>
      <div className="pt-[34px]">
        <div className="flex">
          {" "}
          <p className="text-[17px] font-bold pr-[21px] flex items-center">
            <span className="mr-[0.25em]">*</span> 그룹별 합격 인원
          </p>
          <div className="w-[224.73px] h-[34px] rounded-[11px] bg-white-100 border border-[#D9D9D9] text-[13px] text-[#73767F] font-medium flex-center">
            우리 동아리의 인재상을 작성해 주세요..
          </div>
        </div>
        <div className="pt-[16px]">
          {/**큰 박스 */}
          <div className="w-[1015px] h-[405px] rounded-[12px] shadow-01">
            <div className="flex pl-[33.38px] pt-[31px] gap-[27px]">
              <div>
                <GroupPassCard />
              </div>
              <div>
                <GroupPassCard />
              </div>
              <div>
                <GroupPassCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
