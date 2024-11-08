import { useState } from "react";

export default function AdminsSchedule() {
  const [selectDate, setSelectDate] = useState(false);
  const [selectAdmin, setSelectAdmin] = useState(false);

  return (
    <div>
      <div className="ml-8 w-full mt-[34px]">
        <div>
          <div className="flex">
            <p className="section-title">
              <span className="mr-[0.25em] text-main-100">*</span>면접관 일정
              확정하기
            </p>
            <div className="tooltip">
              면접에 들어갈 면접관 수에 맞게 클릭해 확정해 주세요.
            </div>
          </div>
          <div className=" ">
            <div className="mt-[16px] h-auto pt-[29px] px-[30px] pb-[40px] bg-white-100 rounded-[12px]">
              <p className="text-main-100 text-caption3 text-left">
                면접에 들어갈 2명을 선택해 주세요. 2명이 가능한 시간을 이후에
                지원자들이 선택할 수 있습니다.
              </p>
              <div className="mt-3 border border-gray-300 rounded-[12px] bg-[#FBFBFF]">
                <div className="flex-center bg-gray-200 border-b-[#C7C7CC rounded-t-[12px] pt-[15px] pb-[14px] text-headline">
                  <img
                    src="/assets/ic-prevDate.svg"
                    alt="이전 날짜"
                    className="mr-[6px]"
                  />
                  <p>10월 13일 월요일</p> {/*날짜*/}
                  <img
                    src="/assets/ic-nextDate.svg"
                    alt="다음 날짜"
                    className="ml-[6px]"
                  />
                </div>
                <div className="pt-2 pb-[10px] pl-[11px]">
                  {/*이게 한 묶음 */}
                  <div className="flex items-center">
                    {/*시간*/}
                    <div
                      onClick={() => setSelectDate(!selectDate)}
                      className={`flex-center w-[77.85px] mr-[10.15px] h-7 bg-[#FBFBFF] rounded-[6px] cursor-pointer border ${selectDate ? "border-gray-800 bg-gray-800 text-[#F2F2F7]" : "border-[#E5E5EA] text-[#3B3D46]"} text-caption2 hover:bg-gray-800 hover:border-gray-800 hover:text-[#F2F2F7]`}
                    >
                      9:00AM
                    </div>
                    {/*운영진들 */}
                    <div
                      onClick={() => setSelectAdmin(!selectAdmin)}
                      className={`flex-center w-[77.85px] h-7 mr-[7px] bg-[#FBFBFF] rounded-[6px] cursor-pointer border ${selectAdmin ? "border-gray-800 bg-gray-800 text-[#F2F2F7]" : "border-[#E5E5EA] text-[#3B3D46]"} text-caption2 hover:bg-gray-800 hover:border-gray-800 hover:text-[#F2F2F7]`}
                    >
                      박시현
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
