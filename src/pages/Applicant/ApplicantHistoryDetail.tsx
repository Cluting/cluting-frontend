import ApplicationHistoryDetailContainer from "../../components/applicant/application_history/detail/ApplicationHistoryDetailContainer";
import Sidemenu from "../../components/applicant/common/Sidemenu";

// 나의 지원 기록 상세 화면
export default function ApplicantHistoryDetail() {
  return (
    <div className="w-full h-screen flex-center bg-gray-100">
      <Sidemenu />
      <ApplicationHistoryDetailContainer />
    </div>
  );
}
