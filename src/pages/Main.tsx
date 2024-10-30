import ClubCardList from "../components/recruting/home/ClubCardList";
import MainCategory from "../components/recruting/home/MainCategory";

export default function Main() {
  return (
    <div>
      <div className="relative w-full h-[378px] bg-[#E2E3E5] ">
        <p className="absolute top-[162.01px] left-[180.53px] text-[34px] font-semibold text-left ">
          지금 가장 인기 있는<br></br>동아리 리스트
        </p>
        <div></div>
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
