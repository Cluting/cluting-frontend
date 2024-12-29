import ApplicationHistoryContainer from "../../components/applicant/application_history/ApplicationHistoryContainer";
import Sidemenu from "../../components/applicant/common/Sidemenu";

// 나의 지원 기록
export default function ApplicantHistory() {
  return (
    <div className="w-full h-screen flex-center bg-gray-100">
      <Sidemenu />
      <ApplicationHistoryContainer />
    </div>
  );
}
