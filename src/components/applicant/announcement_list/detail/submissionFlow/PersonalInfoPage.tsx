import PersonalProfile from "./personalInfo/PersonalProfile";
import SelectGroup from "./personalInfo/SelectGroup";

export default function PersonalInfoPage() {
  return (
    <div className="flex flex-col w-full gap-10">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-bold leading-7 tracking-wide text-left font-Pretendard text-gray-1100">
            지원자 기본 프로필
          </h2>
          {/* 추후 연결 필요 */}
          <button
            type="button"
            className="px-4 py-3 flex flex-center rounded-lg border border-[#5E2BE8] bg-main-300"
          >
            <span className="text-base font-semibold leading-5 tracking-tight font-Pretendard text-main-500">
              수정하러 가기
            </span>
            <img src="/assets/ic-externalLinkArrow.svg" alt="화살표" />
          </button>
        </div>

        {/* 인적사항 및 학력 */}
        <PersonalProfile />
      </div>

      {/* 그룹이 있는 경우, 지원 그룹 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold leading-6 tracking-wide font-Pretendard text-gray-1100">
            지원 그룹
          </h3>
          <div className="flex flex-center px-3 py-2 rounded-xl border border-[#D0D4E7] bg-white-100">
            <span className="font-Pretendard font-medium text-sm leading-4 tracking-tighter text-[#4C4E59]">
              다중 지원이 가능합니다.
            </span>
          </div>
        </div>
        <SelectGroup />
      </div>
    </div>
  );
}
