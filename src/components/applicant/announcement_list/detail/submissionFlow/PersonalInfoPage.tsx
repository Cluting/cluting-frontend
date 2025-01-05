export default function PersonalInfoPage() {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-bold leading-7 tracking-wide text-left font-Pretendard text-gray-1100">
          지원자 기본 프로필
        </h2>
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
    </div>
  );
}
