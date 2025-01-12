// 6- 리크루팅 : 최종 합격자 및 활동 안내 단계 (페이지)

import ApplicantStatusContainer from "../../../components/recruting/_06_final_selection/_01/ApplicantStatusContainer";
import ResultMessageContainer from "../../../components/recruting/_06_final_selection/_02/ResultMessageContainer";
import TopSection from "../../../components/recruting/_06_final_selection/common/TopSection";
import Sidemenu from "../../../components/recruting/common/Sidemenu";
import { useStepSixStore } from "../../../store/useStore";

type StepComponent = React.FC;

const stepComponents: StepComponent[] = [
  ApplicantStatusContainer,
  ResultMessageContainer
];

export default function FinalSelection() {
  const { currentStep } = useStepSixStore();
  const CurrentStepComponent = stepComponents[currentStep];
  return (
    <div className="flex justify-center pt-6 bg-gray-100">
      <Sidemenu />
      <div className="w-[1016px] pl-8 h-screen mb-[500px]">
        <TopSection />
        <CurrentStepComponent />
      </div>
    </div>
  );
}
