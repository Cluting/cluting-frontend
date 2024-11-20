//4 - 리크루팅 : 서류 합격자 및 면접 안내 단계 (페이지)

import ApplicantStatusContainer from "../../../components/recruting/_04_interview_notification/_01/ApplicantStatusContainer";
import ScheduleAdjustmentContainer from "../../../components/recruting/_04_interview_notification/_02/ScheduleAdjustmentContainer";
import ResultMessageContainer from "../../../components/recruting/_04_interview_notification/_03/ResultMessageContainer";
import TopSection from "../../../components/recruting/_04_interview_notification/common/TopSection";
import Sidemenu from "../../../components/recruting/common/Sidemenu";
import { useStepFourStore } from "../../../store/useStore";

type StepComponent = React.FC;

const stepComponents: StepComponent[] = [
  ApplicantStatusContainer,
  ScheduleAdjustmentContainer,
  ResultMessageContainer
];

export default function InterviewNotification() {
  const { currentStep } = useStepFourStore();
  const CurrentStepComponent = stepComponents[currentStep];
  return (
    <div className="flex justify-center pt-6 bg-gray-100">
      <Sidemenu />
      <div className="w-[1016px] pl-8  mb-[143px]">
        <TopSection />
        <CurrentStepComponent />
      </div>
    </div>
  );
}
