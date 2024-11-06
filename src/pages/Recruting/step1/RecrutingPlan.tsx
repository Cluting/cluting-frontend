// 1- 리크루팅 :  계획하기 단계 (페이지)

import Sidemenu from "../../../components/recruting/common/Sidemenu";
import RecrutingCalender from "../../../components/recruting/home/_calender/RecrutingCalender";
import GroupCreate from "../../../components/recruting/home/GroupCreate";

export default function RecrutingPlan() {
  return (
    <div className="flex justify-center pt-6 bg-gray-100">
      {" "}
      <Sidemenu />
      <div className="flex flex-col w-[1100px]">
        <div className="custom-shadow w-full h-auto bg-white-100 py-6 mx-8 px-[13px] rounded-[12px]">
          <div className="flex items-center mx-8 my-4">
            <h1 className="text-callout">
              {" "}
              <span className="text-main-100 text-left">* </span> 리크루팅 일정
            </h1>
            <div className="ml-3 tooltip">각 단계의 일정을 선택해 주세요.</div>
          </div>
          <RecrutingCalender />
        </div>
        <GroupCreate />
      </div>
    </div>
  );
}
