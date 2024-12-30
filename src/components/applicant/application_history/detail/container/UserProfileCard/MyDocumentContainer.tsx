import ApplicationQuestions from "./ApplicationQuestions";
import UserProfileCard from "./UserProfileCard";

export default function MyDocumentContainer() {
  return (
    <div className="py-[27px] px-[38px] w-full h-auto">
      <UserProfileCard />
      <div className="mt-[24px]">
        <ApplicationQuestions />
      </div>
    </div>
  );
}
