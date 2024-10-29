import ClubCard from "../components/recruting/home/ClubCard";

export default function Main() {
  return (
    <div className="container max-w-[1072px] mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[53px]">
        <ClubCard />
        <ClubCard />
        <ClubCard />
        <ClubCard />
        <ClubCard />
        <ClubCard />
        <ClubCard />
        <ClubCard />
        <ClubCard />
        <ClubCard />
        <ClubCard />
        <ClubCard />
      </div>
    </div>
  );
  // return <div className="text-[30px]">메인 페이지 입니다</div>;
}
