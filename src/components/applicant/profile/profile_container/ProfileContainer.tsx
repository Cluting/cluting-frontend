import EducationInfo from "./profile/EducationInfo";
import PersonalInfo from "./profile/PersonalInfo";

export default function ProfileContainer() {
  return (
    <div className="w-full  p-10 flex-col rounded-md bg-white-100">
      <PersonalInfo />
      <EducationInfo />
    </div>
  );
}
