export default function PersonalInfoPage() {
  return (
    <div className="flex flex-col w-full gap-4">
      {/* Header */}
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
      {/* Body */}
      <div className="w-full h-[36rem] p-8 rounded-xl bg-white-100">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h5 className="text-left font-Pretendard font-semibold text-[#646775] text-base leading-5 tracking-tight">
              인적 사항
            </h5>
            <div className="flex w-full h-52 p-6 bg-gray-50 border border-[#B9BED3] rounded-xl">
              <div className="w-[8.5rem] h-full overflow-hidden rounded-lg">
                <img
                  src="/assets/profile.png"
                  className="w-full h-full"
                  alt="프로필 사진"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
