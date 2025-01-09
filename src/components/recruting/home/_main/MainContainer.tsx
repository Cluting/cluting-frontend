import MainCategory from "./MainCategory";
import ClubCardList from "./ClubCardList";
import Paging from "./Paging";
import { useQuery } from "@tanstack/react-query";
import { getMainClub } from "./service/mainClub";

export default function MainContainer() {
  const { data: mainClubsData } = useQuery<MainClubData>(
    ["mainClubs"],
    getMainClub
  );

  return (
    <div>
      <div className="container max-w-[1077px] mx-auto">
        <MainCategory />
        <ClubCardList />
      </div>

      <Paging />
    </div>
  );
}
