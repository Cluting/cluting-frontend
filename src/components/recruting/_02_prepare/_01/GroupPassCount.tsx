import GroupPassCard from "./GroupPassCard";
import { useStepTwoStore } from "../../../../store/useStore";
import { useGroupStore } from "../../../../store/useGroupStore";
import { GroupPassCountProps } from "../../../../type/type";

export default function GroupPassCount({
  control,
  errors,
  rules
}: GroupPassCountProps) {
  const { group } = useGroupStore();

  //2-1 완료 여부
  const { steps } = useStepTwoStore();
  //그룹 없을 시 렌더링 되지 않도록 처리
  if (group.length === 0) return null;

  return (
    <div className={`${steps[0].completed ? "pointer-events-none" : ""}`}>
      <div className="pt-[34px]">
        <div className="flex">
          <p className="section-title">
            <span className="mr-[0.25em] text-main-100">*</span> 그룹별 합격
            인원
          </p>
          <div className="tooltip">
            그룹별로 서류와 최종 합격 인원을 설정해 주세요.
          </div>
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
