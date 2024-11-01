export default function ClubCard() {
  return (
    <div className="relative w-[322px] h-[211px] rounded-[16.86px] bg-[#FBFBFF] border border-gray-300">
      <div className="absolute top-0 left-0 right-0 h-[126px] rounded-t-[16px] bg-gray-300 ">
        <div className="absolute left-[11px] top-[13px] w-[40px] h-[27px] rounded-[10.25px] bg-white-100 text-[#FF4E4E] text-[11px] flex items-center justify-center font-bold">
          D-3
        </div>
      </div>
      <div className="absolute left-[239px] top-[96px] w-[60px] h-[60px] rounded-full bg-[#FBFBFF] flex items-center justify-center">
        <img
          src="/assets/itTimeLogo.svg"
          alt="description"
          className="w-[44px] h-[44px] rounded-full object-cover"
        />
      </div>

      <div className="absolute bottom-0 left-0 pl-[21px] w-[322px] h-[85px]">
        <div className="pt-[9.99px]">
          <p className="text-[15px] font-bold text-left bottom-[57px] text-[#3A3A3C]">
            IT 서비스 동아리 잇타 6기 모집
          </p>
          <p className="text-[9.97px] text-left text-[#3A3A3C]">
            IT 서비스 동아리 잇타
          </p>
        </div>

        {/*태그+채팅*/}
        <div className="flex justify-between items-end pb-[13px]">
          {/*태그*/}
          <div className="flex items-center gap-[5px] text-[#3A3A3C]">
            <div className="w-[29px] h-[18px] bg-white-100 border border-gray-200 rounded-[25.52px] text-[10.03px] flex items-center justify-center">
              IT
            </div>
            <div className="w-[29px] h-[18px] bg-white-100 border border-gray-200 rounded-[25.52px] text-[10.03px] flex items-center justify-center">
              IT
            </div>
            <div className="w-[29px] h-[18px] bg-white-100 border border-gray-200 rounded-[25.52px] text-[10.03px] flex items-center justify-center">
              IT
            </div>
          </div>
          <button className="mr-[23px] w-[55px] h-[26px] bg-gray-850 text-white-100 text-[11px] font-bold rounded-[8.1px] flex items-center justify-center">
            채팅
          </button>
        </div>
      </div>
    </div>
  );
}
