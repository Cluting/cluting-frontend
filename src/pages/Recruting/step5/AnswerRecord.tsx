//5 - 답변 기록 페이지
import AnswerRecordContainer from "../../../components/recruting/_05_interview_evaluation/answer_record/AnswerRecordContainer";
import Sidemenu from "../../../components/recruting/common/Sidemenu";

export default function AnswerRecord() {
  return (
    <div className="flex justify-center pt-6 bg-gray-100 h-full">
      <Sidemenu />
      <div className="w-[1153px] h-full pl-8  mb-[143px]">
        <AnswerRecordContainer />
      </div>
    </div>
  );
}
