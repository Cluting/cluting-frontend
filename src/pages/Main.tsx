import { useEffect } from "react";
import ClubCardList from "../components/recruting/home/ClubCardList";
import MainBanner from "../components/recruting/home/MainBanner";
import MainCategory from "../components/recruting/home/MainCategory";
import Paging from "../components/recruting/home/Paging";

export default function Main() {
  // 페이지 로드 시 가장 위로 스크롤 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="relative top-[-2px] w-full h-[378px] bg-[#E2E3E5] ">
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
