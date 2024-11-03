import { Control } from "react-hook-form";
import GroupPassCard from "./GroupPassCard";

interface GroupPassCountProps {
  control: Control<any>;
}

//FIX: 나중에 연동하면 수정...
export default function GroupPassCount({ control }: GroupPassCountProps) {
  const groups = [{ name: "기획" }, { name: "개발" }, { name: "디자인" }];

  return (
    <div>
      <div className="pt-[34px]">
        <div className="flex">
          <p className="text-[17px] font-bold pr-[21px] flex items-center">
            <span className="mr-[0.25em]">*</span> 그룹별 합격 인원
          </p>
          <div className="w-[224.73px] h-[34px] rounded-[11px] bg-white-100 border border-[#D9D9D9] text-[13px] text-[#73767F] font-medium flex-center">
            우리 동아리의 인재상을 작성해 주세요..
          </div>
        </div>
        <div className="pt-[16px]">
          <div className="w-[1015px] h-[405px] rounded-[12px] shadow-01">
            <div className="flex pl-[33.38px] pt-[31px] gap-[27px]">
              {groups.map((group, index) => (
                <GroupPassCard
                  key={group.name}
                  control={control}
                  groupIndex={index}
                  groupName={group.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
