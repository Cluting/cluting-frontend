//리크루팅 - 03 모집 준비하기 단계 페이지

import Sidemenu from "../../components/recruting/Sidemenu";
import GroupPassCount from "../../components/recruting/_02_prepare/_01/GroupPassCount";
import NumberSpinner from "../../components/recruting/_02_prepare/_01/NumberSpinner";

export default function RecrutingPrepare() {
  return (
    <div className="flex-center text-[30px] ">
      {" "}
      <Sidemenu />
      <div className="w-[1015px] pl-[30.99px]">
        {" "}
        {/*서류 합격 인원 */}
        <div>
          <div className="flex">
            <p className="text-[17px] font-bold pr-[21px] flex items-center">
              * 서류 합격 인원
            </p>
            <div className="w-[224.73px] h-[34px] rounded-[11px] bg-white-100 border border-[#D9D9D9] text-[13px] text-[#73767F] font-medium flex-center">
              우리 동아리의 인재상을 작성해 주세요..
            </div>
          </div>
          <div className="pt-[16px]">
            <div className="relative w-[1015px] h-[105px] bg-white-100 rounded-[12px] shadow-01 ">
              <div className="flex-center absolute left-[32px] top-[27px]">
                <div className="flex-center w-[157px] h-[41px] rounded-[7px] bg-white-100 border border-gray-400">
                  <NumberSpinner />
                </div>
                <p className="text-[17px] font-bold pl-[11px]">명</p>
              </div>
            </div>
          </div>
        </div>
        {/*전체 최종 합격 인원 */}
        <div className="pt-[34px]">
          <div className="flex">
            <p className="text-[17px] font-bold pr-[21px] flex items-center">
              * 전체 최종 합격 인원
            </p>
            <div className="w-[224.73px] h-[34px] rounded-[11px] bg-white-100 border border-[#D9D9D9] text-[13px] text-[#73767F] font-medium flex-center">
              우리 동아리의 인재상을 작성해 주세요..
            </div>
          </div>
          <div className="pt-[16px]">
            <div className="relative w-[1015px] h-[105px] bg-white-100 rounded-[12px] shadow-01 ">
              <div className="flex-center absolute left-[32px] top-[27px]">
                <div className="flex-center w-[157px] h-[41px] rounded-[7px] bg-white-100 border border-gray-400">
                  <NumberSpinner />
                </div>
                <p className="text-[17px] font-bold pl-[11px]">명</p>
              </div>
            </div>
          </div>
        </div>
        {/*그룹별 합격 인원 */}
        <div>
          <GroupPassCount />
        </div>
      </div>
    </div>
  );
}
