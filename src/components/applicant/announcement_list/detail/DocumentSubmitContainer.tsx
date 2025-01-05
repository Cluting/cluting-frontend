import { useSearchParams, useParams } from "react-router-dom";
import CommonQuestionsPage from "./submissionFlow/CommonQuestionsPage";
import PersonalInfoPage from "./submissionFlow/PersonalInfoPage";
import PartQuestionsPage from "./submissionFlow/PartQuestionsPage";
import PortfolioPage from "./submissionFlow/PortfolioPage";
import FlowEndPage from "./submissionFlow/FlowEndPage";
import NavigationButton from "./button/NavigationButton";

const DocumentSubmitContainer = () => {
  const { menu } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const steps = [
    "personalInfo",
    "commonQuestions",
    "partQuestions",
    "portfolio",
    "flowEnd"
  ];
  const currentStep = steps.indexOf(searchParams.get("step") || "personalInfo");

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setSearchParams({ menu: "documentSubmit", step: steps[currentStep + 1] });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setSearchParams({ menu: "documentSubmit", step: steps[currentStep - 1] });
    }
  };

  const handleComplete = () => {
    alert("완료!");
  };

  const renderPage = () => {
    switch (steps[currentStep]) {
      case "personalInfo":
        return <PersonalInfoPage />;
      case "commonQuestions":
        return <CommonQuestionsPage />;
      case "partQuestions":
        return <PartQuestionsPage />;
      case "portfolio":
        return <PortfolioPage />;
      case "flowEnd":
        return <FlowEndPage />;
      default:
        return <div>잘못된 단계입니다.</div>;
    }
  };

  return (
    <div className="w-[1213px] flex flex-col items-center gap-12 mt-10">
      {renderPage()}
      <NavigationButton
        currentPage={currentStep}
        totalPage={steps.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default DocumentSubmitContainer;
