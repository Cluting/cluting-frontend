import ClubCardList from "../components/recruting/home/ClubCardList";
import MainBanner from "../components/recruting/home/MainBanner";
import MainCategory from "../components/recruting/home/MainCategory";

export default function Main() {
  return (
    <div>
      <div className="relative w-full h-[378px] bg-[#E2E3E5] ">
        <MainBanner />
      </div>

      <div className="container max-w-[1077px] mx-auto">
        <p className="text-[28px] font-semibold text-left pt-[45px]">
          예은님을 기다리는 동아리들 🙌🏻
        </p>
        <MainCategory />
      </div>

      <div className="container max-w-[1072px] mx-auto">
        <ClubCardList />
      </div>
    </div>
  );
}
