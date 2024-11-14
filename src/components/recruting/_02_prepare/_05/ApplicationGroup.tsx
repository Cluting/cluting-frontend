//2-5, 지원 그룹
import { useGroupStore } from "../../../../store/useStore";

export default function ApplicantGroup() {
  const { group } = useGroupStore();

  //todo:여길 폼처리 받아야 하는건가..

  //그룹 없을 시 렌더링 되지 않도록 처리
  if (group.length === 0) return null;

  return (
    <div className="ml-8 w-full mt-[34px]">
      <div className="flex">
        <p className="section-title">지원 그룹</p>
        <div className="tooltip">
          미리 설정한 그룹에 따라 지원자들이 지원할 그룹을 선택합니다.
        </div>
      </div>
      <div className="mt-[12px] h-auto px-[31px] pt-[25px] pb-[29px] bg-white-100 rounded-[12px]">
        <div className="flex items-left gap-[11px]">
          {group.map((groupName) => (
            <button
              key={groupName.name}
              type="button"
              className="w-[225px] h-[50px] bg-white-100 border border-gray-300 rounded-[11px] flex-center text-callout text-[#43454F] hover:bg-main-100 hover:text-white-100"
            >
              {groupName.name}
            </button>
          ))}
        </div>

        <label className="flex items-center items-left mt-[14px] text-subheadline text-gray-900">
          <input
            type="checkbox"
            className="w-[18px] h-[18px] mr-2 cursor-pointer 
            appearance-none
            checked:bg-main-100 
            border border-gray-300 rounded"
          />
          다중 지원 가능
          <span className="ml-[11px] text-main-100 text-caption3">
            동아리 지원자는 2개 이상의 그룹으로 지원할 수 있습니다.
          </span>
        </label>
      </div>
    </div>
  );
}
