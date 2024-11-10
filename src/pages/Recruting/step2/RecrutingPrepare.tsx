//2 - 리크루팅 : 모집 준비하기 단계 (페이지)

import SetAcceptanceCountContainer from "../../../components/recruting/_02_prepare/_01/SetAcceptanceCountContainer";
import DefineIdealCandidateContainer from "../../../components/recruting/_02_prepare/_02/DefineIdealCandidateContainer";
import AnnouncementContainer from "../../../components/recruting/_02_prepare/_03/AnnouncementContainer";
import ScheduleInterviewsContainer from "../../../components/recruting/_02_prepare/_04/ScheduleInterviewsContainer";
import CreateApplicationFormContainer from "../../../components/recruting/_02_prepare/_05/CreateApplicationFormContainer";
import TopSection from "../../../components/recruting/_02_prepare/TopSection";

import Sidemenu from "../../../components/recruting/common/Sidemenu";
import { useTopSectionStore } from "../../../store/useStore";

type StepComponent = React.FC;

const stepComponents: StepComponent[] = [
  SetAcceptanceCountContainer,
  DefineIdealCandidateContainer,
  AnnouncementContainer,
  ScheduleInterviewsContainer,
  CreateApplicationFormContainer
];
export default function RecrutingPrepare() {
  const { currentStep } = useTopSectionStore();
  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <div className="flex justify-center pt-6 bg-gray-100">
      <Sidemenu />
      <div className="w-[1016px]">
        <TopSection />
        <CurrentStepComponent />
      </div>
    </div>
  );
}
