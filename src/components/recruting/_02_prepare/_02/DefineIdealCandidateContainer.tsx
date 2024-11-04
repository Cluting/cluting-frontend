//2-2 인재상 구축하기 (컨테이너)

import CommonIdealList from "./CommonIdealList";

export default function DefineIdealCandidateContainer() {
  return (
    <div className="ml-8 w-full mt-[25px]">
      {/*공통 인재상 */}
      <div className="common-ideal">
        <div className="flex">
          <p className="text-[17px] font-bold pr-[21px] flex items-center">
            <span className="mr-[0.25em] text-main-100">*</span> 공통 인재상
          </p>
          <div className="w-[224.73px] h-[34px] rounded-[11px] bg-white-100 border border-[#D9D9D9] text-[13px] text-[#73767F] font-medium flex-center">
            각 그룹별 인재상을 작성해 주세요..
          </div>
        </div>
        <div className="pt-[16px]">
          <CommonIdealList />
        </div>
      </div>

      {/*그룹별 인재상 */}
      <div className="mt-[34px]">
        <div className="flex">
          <p className="text-[17px] font-bold pr-[21px] flex items-center">
            <span className="mr-[0.25em] text-main-100">*</span> 그룹별 인재상
          </p>
          <div className="w-[224.73px] h-[34px] rounded-[11px] bg-white-100 border border-[#D9D9D9] text-[13px] text-[#73767F] font-medium flex-center">
            각 그룹별 인재상을 작성해 주세요..
          </div>
        </div>
        <div className="pt-[16px]">
          <div className="relative h-[154px] bg-white-100 rounded-[12px] custom-shadow"></div>
        </div>
      </div>
    </div>
  );
}
