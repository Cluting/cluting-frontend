import Sidemenu from "../../components/applicant/common/Sidemenu";
import ApplicantHomeContainer from "../../components/applicant/home/ApplicantHomeContainer";

// 지원자 홈
export default function ApplicantHome() {
  return (
    <div className="w-full h-full flex justify-center pt-6 bg-gray-100">
      <Sidemenu />
      <div className="w-[1016px] mb-[143px] h-full">
        <ApplicantHomeContainer />
      </div>
    </div>
  );
}
