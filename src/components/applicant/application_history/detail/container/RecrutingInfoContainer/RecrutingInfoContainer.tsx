import Chart from "./Chart";

export default function RecrutingInfoContainer() {
  return (
    <div className="relative w-full min-h-[1062px] px-7 py-[26px]">
      <div className="absolute right-7 w-[390px] px-[19px] py-[17px] bg-gray-50 border border-gray-200 rounded-lg">
        <div className="mb-[30px]">
          <p className="mb-[14px] font-bold text-gray-800 text-left">
            평균 점수
          </p>
          <div className="mb-[9px] w-full h-[83px] px-[92px] py-[15px] bg-gray-100 rounded-[7px]">
            <span className="mb-2 flex items-center justify-between">
              <p className="text-subheadline text-gray-800">합격 기준 점수</p>
              <p className="text-headline font-bold text-[#000000]">88.7점</p>
            </span>
            <span className="flex items-center justify-between">
              <p className="text-subheadline text-gray-800">총점 평균</p>
              <p className="text-headline font-bold text-[#000000]">81점</p>
            </span>
          </div>
          <div className="w-full h-[59px] px-[92px] py-[15px] bg-main-300 rounded-[7px]">
            <span className="flex items-center justify-between">
              <p className="text-subheadline text-gray-800">내 점수</p>
              <p className="text-headline font-bold text-main-100">90점</p>
            </span>
          </div>
        </div>
        <div className="mb-[30px]">
          <p className="mb-[14px] font-bold text-gray-800 text-left">경쟁률</p>
          <div className="mb-[9px] w-full h-[146px] px-[65px] py-[13px] bg-gray-100 rounded-[7px]">
            <span className="mb-4 flex items-center justify-between">
              <p className="text-headline text-gray-800">전체 평균</p>
              <p className="text-5xl font-bold">
                <span className="text-main-500">4 </span>: 1
              </p>
            </span>
            <span className="flex items-center justify-between">
              <p className="text-headline text-gray-800">기획 평균</p>
              <p className="text-5xl font-bold">
                <span className="text-main-700">3.2 </span>: 1
              </p>
            </span>
          </div>
        </div>
        <div>
          <p className="mb-[14px] font-bold text-gray-800 text-left">
            학년분포
          </p>
          <div className="relative mb-[9px] w-full h-[200px] bg-gray-100 rounded-[7px]">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
}
