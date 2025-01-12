import ApplicationHistoryContainer from "../../components/applicant/application_history/ApplicationHistoryContainer";
import Sidemenu from "../../components/applicant/common/Sidemenu";

// 나의 지원 기록
export default function ApplicantHistory() {
  return (
    <div className="w-full h-full flex justify-center pt-6 bg-gray-100">
      <Sidemenu />

      <div className="w-[1016px] mb-[143px] h-full">
        <ApplicationHistoryContainer />
      </div>
    </div>
  );
}
