import { Control, RegisterOptions } from "react-hook-form";
import GroupPassCard from "./GroupPassCard";
import { useGroupStore } from "../../../../store/useStore";

interface GroupPassCountProps {
  control: Control<any>;
  errors?: any;
  rules?: RegisterOptions;
}

export default function GroupPassCount({
  control,
  errors,
  rules
}: GroupPassCountProps) {
  const { group } = useGroupStore();

  return (
    <div>
      <div className="pt-[34px]">
        <div className="flex">
          <p className="section-title">
            <span className="mr-[0.25em] text-main-100">*</span> 그룹별 합격
            인원
          </p>
          <div className="tooltip">우리 동아리의 인재상을 작성해 주세요..</div>
        </div>
        <div className="pt-[16px]">
          <div className="h-[405px] rounded-[12px] bg-white-100 ">
            <div className="flex pl-[33.38px] pt-[31px] gap-[27px]">
              {group.map((group, index) => (
                <GroupPassCard
                  key={group.name}
                  control={control}
                  groupIndex={index}
                  groupName={group.name}
                  errors={errors}
                  rules={rules}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
