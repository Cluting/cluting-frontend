import { useState } from "react";
import PersonalProfile from "../personal_info/page/PersonalProfile";
import PersonalInfoPage from "../personal_info/page/ProfileInfoPage";
import CommonQuestionsPage from "../personal_info/page/CommonQuestionPage";
import PartQuestionsPage from "../personal_info/page/PartQuestionPage";

export default function DocumentSubmitContainer() {
  const [currentPage, setCurrentPage] = useState("profile");

  const handleNextClick = () => {
    if (currentPage === "profile") {
      setCurrentPage("personalInfo");
    } else if (currentPage === "personalInfo") {
      setCurrentPage("commonQuestion");
    } else if (currentPage === "commonQuestion") {
      setCurrentPage("partQuestion");
    }
  };

  const handlePreviousClick = () => {
    if (currentPage === "commonQuestion") {
      setCurrentPage("personalInfo");
    } else if (currentPage === "partQuestion") {
      setCurrentPage("commonQuestion");
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
      default:
        return <PersonalProfile />;
    }
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
    }
  };

  return (
    <div className="w-full h-fit justify-center bg-white-100">
      {renderCurrentPage()}
      <div className="flex flex-col items-center">{renderButtons()}</div>
    </div>
  );
}
