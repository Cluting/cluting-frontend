import { useLocation, useNavigate } from "react-router-dom";
import InProgressContainer from "./club_container/InProgressContainer";
import AppliedContainer from "./club_container/AppliedContainer";
import BookmarkContainer from "./club_container/BookmarkContainer";
import RecentContainer from "./club_container/RecentContainer";

// 공고 리스트
export default function AnnouncementListContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentMenu = queryParams.get("menu") || "inProgress";

  const setMenu = (menu: "inProgress" | "applied" | "bookmark" | "recent") => {
    queryParams.set("menu", menu);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  return (
    <div className="w-full h-screen flex-center bg-gray-100">
      <div className="flex flex-col items-start ">
        <h1>공고 리스트</h1>

        <section>
          <div className="w-full ml-1 flex items-center gap-0">
            <button
              onClick={() => setMenu("inProgress")}
              className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "inProgress" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"} `}
            >
              지원 중인 동아리
            </button>
            <button
              onClick={() => setMenu("applied")}
              className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "applied" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"}`}
            >
              지원한 동아리
            </button>
            <button
              onClick={() => setMenu("bookmark")}
              className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "bookmark" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"} `}
            >
              스크랩한 동아리
            </button>
            <button
              onClick={() => setMenu("recent")}
              className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "recent" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"} `}
            >
              최근 본 동아리
            </button>
          </div>
          <div className="mt-4 w-full p-4 bg-white border rounded">
            {currentMenu === "inProgress" && <InProgressContainer />}
            {currentMenu === "applied" && <AppliedContainer />}
            {currentMenu === "bookmark" && <BookmarkContainer />}
            {currentMenu === "recent" && <RecentContainer />}
          </div>
        </section>
      </div>
    </div>
  );
}
