// 3 - 면접 진행 시간대 선택
export default function TimeSlot() {
  return (
    <div className="section-background ">
      <div className="flex gap-[150px]">
        <div className="flex items-center  gap-[14px]">
          <div className="bg-gray-100 rounded-[8px] px-3 py-[7px] text-subheadline text-gray-800">
            면접 시간
          </div>
          <div className=" text-subheadline">10.13(월)~10.17(금)</div>
        </div>

        <div className="flex items-center gap-[14px]">
          <div className="bg-gray-100 rounded-[8px] px-3 py-[7px] text-subheadline text-gray-800">
            면접 시간
          </div>
          <input
            type="text"
            placeholder="오전 11시"
            className="w-[132px] input-style input-background"
          />
          <p className=" text-subheadline text-gray-600">~</p>
          <input
            type="text"
            placeholder="오후 8시"
            className="w-[132px] input-style input-background"
          />
        </div>
      </div>
    </div>
  );
}
