import CommonQuestions from "./CommonQuestions";
import IndividualQuestion from "./IndividualQuestions";
import PartQuestions from "./PartQuestions";
import Profile from "./Profile";

export default function AnswerRecordContainer() {
  return (
    <div className="w-[1016px] h-full pl-8  mb-[143px]">
      <div className="flex mb-[30px]">
        <img src="/assets/ic-back.svg" alt="뒤로가기" />
        <div className="flex-col justify-start text-left ml-[21px]">
          <p className="text-[13px] font-semibold ">
            10월 13일 월요일 / 11:00 AM 면접
          </p>
          <p className="text-title1 mt-1">
            {"김민지"}/{"이태준"}
          </p>
        </div>
      </div>

      <div className="bg-white-100 p-[22px] rounded-[23px]">
        <p className="font-semibold text-[18px] text-[#7E7E7E] text-left mb-5">
          면접자 정보
        </p>
        <div className="flex gap-6 items-center mb-11">
          <Profile />
          <Profile />
        </div>
        <CommonQuestions />
        <PartQuestions />
        {/* <IndividualQuestion /> */}
      </div>
    </div>
  );
}
