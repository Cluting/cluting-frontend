import { useEffect } from "react";
import ClubCardList from "../components/recruting/home/_main/ClubCardList";
import MainBanner from "../components/recruting/home/_main/MainBanner";
import Paging from "../components/recruting/home/_main/Paging";
import MainCategory from "../components/recruting/home/_main/MainCategory";

export default function Main() {
  // 페이지 로드 시 가장 위로 스크롤 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="relative top-[-2px] w-full  ">
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

      <div className="pt-[96px] pb-[155px]">
        <Paging />
      </div>
    </div>
  );
}
