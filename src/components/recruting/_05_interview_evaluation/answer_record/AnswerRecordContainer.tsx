import { Link, useParams } from "react-router-dom";
import CommonQuestions from "./CommonQuestions";
import IndividualQuestion from "./IndividualQuestions";
import PartQuestions from "./PartQuestions";
import Profile from "./Profile";
import { INTERVIEWEES } from "./interviewees";
import { BUTTON_TEXT } from "../../../../constants/recruting";
import { useState } from "react";

export default function AnswerRecordContainer() {
  const { intervieweeName } = useParams();
  console.log(intervieweeName);

  const [complete, setComplete] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleEditPage = () => {
    if (complete) {
      setDisabled(false); // 수정 가능 상태로 변경
    } else {
      setDisabled(true); // 수정 불가능 상태로 변경
    }
    setComplete(!complete);
  };

  return (
    <div className="w-full h-full flex-col ">
      <div className="flex items-center mb-10">
        <Link to="/recruting/05_interview_evaluation/interview/after">
          <img src="/assets/ic-back.svg" alt="뒤로가기" />
        </Link>
        <div className="flex-col justify-start text-left ml-[21px]">
          <p className="text-caption2 text-gray-1100 font-semibold ">
            1월 13일 월요일 / 11:00 AM 면접
          </p>
          <p className="text-title1 text-gray-1300 mt-1">{intervieweeName}</p>
        </div>
      </div>

      <div
        className={`bg-white-100 p-[22px] rounded-[23px]  ${disabled ? "pointer-events-none opacity-90" : ""}`}
      >
        <p className="font-semibold text-[18px] text-[#7E7E7E] text-left mb-5">
          면접자 정보
        </p>
        <div className="flex gap-6 items-center mb-11">
          {INTERVIEWEES.map((interviewee, index) => (
            <Profile
              key={index}
              color={interviewee.color}
              name={interviewee.name}
              role={interviewee.role}
              university={interviewee.university}
              major={interviewee.major}
              semester={interviewee.semester}
            />
          ))}
        </div>
        <CommonQuestions />
        <PartQuestions />
        <IndividualQuestion />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          onClick={handleEditPage}
          aria-label={complete ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
          className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
            complete
              ? "bg-main-400 border border-main-100 text-main-100 " //수정하기
              : "bg-main-100 text-white-100 " //완료하기
          }  text-body flex-center hover:bg-main-500`}
        >
          {complete ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
        </button>
      </div>
    </div>
  );
}
