import { useState } from "react";
import PersonalProfile from "../personal_info/page/PersonalProfile";
import PersonalInfoPage from "../personal_info/page/ProfileInfoPage";
import CommonQuestionsPage from "../personal_info/page/CommonQuestionPage";
import PartQuestionsPage from "../personal_info/page/PartQuestionPage";
import PortfolioPage from "../personal_info/page/PortfolioPage";
import SubmissionModal from "../personal_info/SubmissionModal";
import SubmissionCompletePage from "../personal_info/page/SubmissionCompletePage";

export default function DocumentSubmitContainer() {
  const [currentPage, setCurrentPage] = useState("profile");
  const [showModal, setShowModal] = useState(false);

  const handleNextClick = () => {
    if (currentPage === "profile") {
      setCurrentPage("personalInfo");
    } else if (currentPage === "personalInfo") {
      setCurrentPage("commonQuestion");
    } else if (currentPage === "commonQuestion") {
      setCurrentPage("partQuestion");
    } else if (currentPage === "partQuestion") {
      setCurrentPage("portfolio");
    }
  };

  const handlePreviousClick = () => {
    if (currentPage === "commonQuestion") {
      setCurrentPage("personalInfo");
    } else if (currentPage === "partQuestion") {
      setCurrentPage("commonQuestion");
    } else if (currentPage === "portfolio") {
      setCurrentPage("partQuestion");
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "profile":
        return <PersonalProfile />;
      case "personalInfo":
        return <PersonalInfoPage />;
      case "commonQuestion":
        return <CommonQuestionsPage />;
      case "partQuestion":
        return <PartQuestionsPage />;
      case "portfolio":
        return <PortfolioPage />;
      case "submissionComplete":
        return <SubmissionCompletePage />;
      default:
        return <PersonalProfile />;
    }
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmSubmit = () => {
    console.log("지원서가 제출되었습니다.");
    setShowModal(false);
    setCurrentPage("submissionComplete");
  };

  const renderButtons = () => {
    if (currentPage === "profile" || currentPage === "personalInfo") {
      return (
        <button
          type="button"
          className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] bg-main-100 text-white-100
         text-body flex-center hover:bg-main-500`}
          onClick={handleNextClick}
        >
          다음
        </button>
      );
    } else if (
      currentPage === "commonQuestion" ||
      currentPage === "partQuestion"
    ) {
      return (
        <div className="flex gap-4">
          <button
            type="button"
            className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] button-main-light text-main-100
           text-body flex-center hover:bg-main-500 hover:text-white-100`}
            onClick={handlePreviousClick}
          >
            뒤로
          </button>
          <button
            type="button"
            className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] bg-main-100 text-white-100
         text-body flex-center hover:bg-main-500`}
            onClick={handleNextClick}
          >
            다음
          </button>
        </div>
      );
    } else if (currentPage === "portfolio") {
      return (
        <div className="flex gap-4">
          <button
            type="button"
            className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] button-main-light text-main-100
           text-body flex-center hover:bg-main-500 hover:text-white-100`}
            onClick={handlePreviousClick}
          >
            뒤로
          </button>
          <button
            type="button"
            className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] bg-main-100 text-white-100
         text-body flex-center hover:bg-main-500`}
            onClick={handleSubmit}
          >
            제출하기
          </button>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-fit justify-center bg-white-100">
      {renderCurrentPage()}
      <div className="flex flex-col items-center">{renderButtons()}</div>
      {showModal && (
        <SubmissionModal
          onClose={handleCloseModal}
          onSubmit={handleConfirmSubmit}
        />
      )}
    </div>
  );
}
