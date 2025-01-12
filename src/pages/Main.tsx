import { useEffect } from "react";
import MainBanner from "../components/recruting/home/_main/MainBanner";
import { getMe } from "../components/signup/services/User";
import { useQuery } from "@tanstack/react-query";
import MainContainer from "../components/recruting/home/_main/MainContainer";

export default function Main() {
  //이름 불러오기
  const { data: user } = useQuery(["me"], getMe, {
    onError: (error) => {
      console.error("유저 본인 정보 조회 실패:", error);
    }
  });
  console.log(user);

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
          {user ? user.name : "-"}님을 기다리는 동아리들 🙌🏻
        </p>
      </div>

      <MainContainer />
    </div>
  );
}
