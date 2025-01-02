import { useQuery } from "@tanstack/react-query";
import EducationInfo from "./profile/EducationInfo";
import PersonalInfo from "./profile/PersonalInfo";
import { getMe } from "../../../signup/services/User";

export default function ProfileContainer() {
  const { data: user } = useQuery(["me"], getMe, {
    onError: (error) => {
      console.error("유저 본인 정보 조회 실패:", error);
    }
  });
  console.log(user);
  return (
    <div className="w-full p-10 flex-col rounded-md bg-white-100">
      <PersonalInfo user={user} />
      <EducationInfo user={user} />
    </div>
  );
}
