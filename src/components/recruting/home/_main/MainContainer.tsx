import MainCategory from "./MainCategory";
import ClubCardList from "./ClubCardList";
import Paging from "./Paging";

export default function MainContainer() {
  return (
    <div>
      <div className="container max-w-[1077px] mx-auto">
        <MainCategory />
        <ClubCardList />
      </div>

      <div className="pt-[96px] pb-[155px]">
        <Paging />
      </div>
    </div>
  );
}
