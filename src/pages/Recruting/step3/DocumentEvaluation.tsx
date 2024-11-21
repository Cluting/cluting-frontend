//3 - 리크루팅 : 서류 평가하기 단계 (페이지)
import DocumentReviewPrepContainer from "../../../components/recruting/_03_document_evaluation/_01/DocumentReviewPrepContainer";
import TopSection from "../../../components/recruting/_03_document_evaluation/common/TopSection";
import Sidemenu from "../../../components/recruting/common/Sidemenu";
import { useStepTwoStore } from "../../../store/useStore";
import DocumentReviewContainer from "../../../components/recruting/_03_document_evaluation/_02/DocumentReviewContainer";

type StepComponent = React.FC;

const stepComponents: StepComponent[] = [
  DocumentReviewPrepContainer,
  DocumentReviewContainer
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
