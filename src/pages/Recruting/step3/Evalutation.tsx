import ApplicationQuestion from "../../../components/recruting/_03_document_evaluation/evaluation/ApplicationQuestion";
import UserProfile from "../../../components/recruting/_03_document_evaluation/evaluation/UserProfile";

//3 - 리크루팅 : 서류 평가하기 단계
export default function Evaluation() {
  return (
    <div className="flex flex-col items-center h-full pt-6 bg-gray-100">
      <div className="w-[829px]">
        <UserProfile />
        <ApplicationQuestion />
      </div>
    </div>
  );
}
