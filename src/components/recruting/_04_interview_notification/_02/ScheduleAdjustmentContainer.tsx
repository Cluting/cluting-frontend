// 4-2 면접 일정 조절 (컨테이너)
export default function ScheduleAdjustmentContainer() {
  return (
    <div className="mt-3">
      <div className="flex justify-between">
        <div className="flex-center gap-4">
          {/*요고 날짜 수정 부탁드립니다! */}
          <div className="flex-center w-[334px] h-[35px] bg-gray-50 border border-[#E9E9E9] text-gray-700">
            10.16.화
          </div>
          <div className="tooltip text-main-100">
            구성은 면접관 2:지원자 2 입니다. 지원자 2명을 확정해 주세요.
          </div>
        </div>
        <button className="flex-center w-auto h-[36px] px-[11px] bg-main-300 border border-main-400 rounded-[6px] text-main-100">
          <img
            src="/assets/ic-reset.svg"
            alt="기존 배치로 돌아가기"
            className="mr-2 "
          />
          기존 배치로 돌아가기
        </button>
      </div>
    </div>
  );
}
