// 1- 리크루팅 :  계획하기 단계 (페이지)

import Sidemenu from "../../../components/recruting/common/Sidemenu";
import { useEffect } from "react";
import RecruitingPlanContainer from "../../../components/recruting/_01_plan/RecruitingPlanContainer";

export default function RecrutingPlan() {
  // 페이지 로드 시 가장 위로 스크롤 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center pt-6 bg-gray-100 ">
      <Sidemenu />
      <div className="flex flex-col  w-[1016px] mb-[147px]">
        <RecruitingPlanContainer />
      </div>
    </div>
  );
}
