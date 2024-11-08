// 1- 리크루팅 :  계획하기 단계 (페이지)

import Sidemenu from "../../../components/recruting/common/Sidemenu";
import RecrutingCalenderPicker from "../../../components/recruting/_02_prepare/_01/RecruitingCalenderPicker";
import GroupCreate from "../../../components/recruting/home/GroupCreate";
import PrepareStepRoles from "../../../components/recruting/_01_plan/PrepareStepRoles";

export default function RecrutingPlan() {
  return (
    <div className="flex justify-center pt-6 bg-gray-100">
      <Sidemenu />
      <div className="flex flex-col w-[1016px]">
        {" "}
        {/*1100px에서 변경*/}
        <div className="flex items-center ml-8 mb-[18px]">
          <div className="flex-center mr-3 w-[33px] h-[30px] bg-white-100 border border-gray-500 rounded-[8px]">
            1
          </div>
          <h1 className="text-title1 mr-3">계획하기</h1>
        </div>

        <section className="custom-shadow w-full h-auto bg-white-100 py-6 mx-8 px-[13px] rounded-[12px]">
          <div className="flex items-center mx-8 my-4">
            <h1 className="text-callout">
              <span className="text-main-100 text-left">* </span> 리크루팅 일정
            </h1>
            <img
              src="/assets/ic-noticeCircle.svg"
              alt="리크루팅 일정 알림 아이콘"
              className="w-[21px] h-[21px] mx-[6px] "
            />
            <div className="ml-3 tooltip">
              주어진 일정을 클릭 후 달력에 드래그해주세요. 정해진 일정은
              리크루팅 진행 단계에 적용됩니다
            </div>
          </div>
          <RecrutingCalender />
        </div>
        <PrepareStepRoles />
          <RecrutingCalenderPicker />
        </section>
        <GroupCreate />
      </div>
    </div>
  );
}
