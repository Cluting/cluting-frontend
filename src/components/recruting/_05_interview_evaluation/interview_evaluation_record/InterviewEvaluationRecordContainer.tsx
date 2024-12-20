import { Link } from "react-router-dom";
import UserProfile from "../../document/UserProfile";
import QuestionAnswer from "./QuestionAnswer";

export default function InterviewEvaluationRecordContainer() {
  return (
    <div className="w-full h-full flex-col items-center ">
      <div className="flex items-center gap-2 mb-10">
        <Link to="/recruting/05_interview_evaluation">
          <img src="/assets/ic-back.svg" alt="뒤로가기" />
        </Link>
        <p className="text-title1 text-gray-1300 mt-1  text-left ml-[21px]">
          {"곽서연"}
        </p>
        <p className="text-title3 text-gray-800 mt-1">{"기획"}</p>
      </div>
      <section className="relative w-[829px] ">
        <UserProfile />
        <div className="mt-5">
          <QuestionAnswer type="common" />
          <QuestionAnswer type="part" />
          <QuestionAnswer type="individual" />
        </div>
      </section>
    </div>
  );
}
