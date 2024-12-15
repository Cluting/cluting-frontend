import ApplicantProfileContainer from "../../components/applicant/profile/ApplicantProfileContainer";

// 기본 프로필 설정
export default function ApplicantProfile() {
  return (
    <div className="w-full h-screen flex-center bg-gray-100">
      <div className="w-[1016px] pl-8 mb-[143px]">
        <ApplicantProfileContainer />
      </div>
    </div>
  );
}
