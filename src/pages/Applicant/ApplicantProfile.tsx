import Sidemenu from "../../components/applicant/common/Sidemenu";
import ApplicantProfileContainer from "../../components/applicant/profile/ApplicantProfileContainer";

// 기본 프로필 설정
export default function ApplicantProfile() {
  return (
    <div className="w-full h-full flex justify-center pt-6 bg-gray-100">
      <Sidemenu />
      <div className="w-[1016px]  mb-[143px] h-full">
        <ApplicantProfileContainer />
      </div>
    </div>
  );
}
