export default function InterviewTimeSelector() {
  return (
    <div className="w-full mt-[58px] mb-[50px]">
      <div className="flex items-center">
        <p className="section-title">면접 시간 선택</p>
        <div className="tooltip">
          앞서 정해진 면접 일정을 바탕으로, 지원자들이 면접 시간을 선택합니다.
        </div>
      </div>
      <div className="w-full mt-[12px] px-[30px] py-[20.5px] bg-white-100 rounded-[12px]">
        <div className="flex flex-col gap-[12px] py-[28px] px-[26px] bg-[#FBFBFF] rounded-[12px] border border-gray-300 text-caption1 text-gray-1100">
          {/*이렇게 한 묶음 */}
          <div className="flex">
            <div className="flex-center mr-[13px] w-[88px] h-[28px] bg-gray-200 border border-[#E5E5EA] rounded-[6px]">
              12일 화요일
            </div>
            <div className="flex gap-[7px]">
              <div className="flex-center w-[78px] h-[28px] bg-white-100 border border-[#E5E5EA] rounded-[6px]">
                10:00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
