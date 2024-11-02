import NumberSpinner from "./NumberSpinner";

export default function GroupPassCard() {
  return (
    <div className="w-[259px] h-[333px] rounded-[12px] bg-[#F2F2F7] shadow-01">
      <div className="pt-[13px] flex-center">
        <div className="flex-center w-[229px] h-[50px] bg-gray-200 rounded-[11px] border border-gray-400 text-[16px] text-gray-850 font-semibold">
          기획
        </div>
      </div>
      <div className="flex flex-col py-[26px]">
        <p className="text-[16px] font-semibold text-gray-850 text-left pl-[15px]">
          서류 합격 인원
        </p>
        <div className="flex-center pt-[15px] pb[26px]">
          <div className="relative flex items-center w-[199px] h-[41px] rounded-[7px] bg-white-100 border border-gray-400 ">
            <div className="absolute right-[6.44px]">
              <NumberSpinner />
            </div>
          </div>
          <p className="text-[17px] font-bold pl-[11px]">명</p>
        </div>
      </div>

      {/**이게 가운데 정렬이 안된다.. 수정 해야함 */}
      <div className="pl-[19.38px] w-[221px] border border-gray-200"></div>

      <div className="flex flex-col pt-[21px] pb-[45px]">
        <p className="text-[16px] font-semibold text-gray-850 text-left pl-[15px]">
          최종 합격 인원
        </p>
        <div className="flex-center pt-[15px] pb[26px]">
          <div className="relative flex items-center w-[199px] h-[41px] rounded-[7px] bg-white-100 border border-gray-400 ">
            <div className="absolute right-[6.44px]">
              <NumberSpinner />
            </div>
          </div>
          <p className="text-[17px] font-bold pl-[11px]">명</p>
        </div>
      </div>
    </div>
  );
}
