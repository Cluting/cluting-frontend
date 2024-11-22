//3 - 리크루팅 : 서류 평가하기 단계 1,2(페이지)
import DocumentReviewPrepContainer from "../../../components/recruting/_03_document_evaluation/_01/DocumentReviewPrepContainer";
import TopSection from "../../../components/recruting/_03_document_evaluation/common/TopSection";
//임시로 넣어놨어요
import CreateApplicationFormContainer from "../../../components/recruting/_02_prepare/_05/CreateApplicationFormContainer";
import Sidemenu from "../../../components/recruting/common/Sidemenu";
import { useStepTwoStore } from "../../../store/useStore";

type StepComponent = React.FC;

const stepComponents: StepComponent[] = [
  DocumentReviewPrepContainer,
  CreateApplicationFormContainer //임시로 넣어놨어요
];

export default function DocumentEvaluation() {
  const { currentStep } = useStepTwoStore();
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
