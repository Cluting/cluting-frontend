import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import MainCategory from "./MainCategory";
import ClubCardList from "./ClubCardList";
import Paging from "./Paging";
import { getMainClub } from "./service/mainClub";
import { dummyClubData } from "./dummyData";

export default function MainContainer() {
  const [searchParams] = useSearchParams();

  const queryParams: RecruitListParams = {
    pageNum: Number(searchParams.get("page")) || 1,
    sortType:
      (searchParams.get("sort") as RecruitListParams["sortType"]) || "NEWEST",
    clubType:
      (searchParams.get("type") as RecruitListParams["clubType"]) || undefined,
    fieldType:
      (searchParams.get("field") as RecruitListParams["fieldType"]) || undefined
  };

  const { data: mainClubsData, isLoading } = useQuery(
    ["mainClubs", queryParams],
    async () => {
      const response = await getMainClub(queryParams);
      console.log("메인 홈 GET:", response);
      console.log("더미데이터:", dummyClubData);
      return {
        ...response,
        recruits: [...response.recruits, ...dummyClubData.recruits],
        count: response.count + dummyClubData.recruits.length
      };
    },
    {
      keepPreviousData: true
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (!mainClubsData) return null;

  return (
    <div>
      <div className="container max-w-[1077px] mx-auto">
        <MainCategory />
        <ClubCardList clubs={mainClubsData.recruits} />
      </div>
      <Paging
        currentPage={Number(queryParams.pageNum)}
        totalPages={Math.ceil(mainClubsData.count / 12)}
      />
    </div>
  );
}
