import { useNavigate, useParams } from "react-router-dom";
import InProgressContainer from "./container/InProgressContainer";
import AppliedContainer from "./container/AppliedContainer";
import BookmarkContainer from "./container/BookmarkContainer";
import RecentContainer from "./container/RecentContainer";

// 공고 리스트
export default function AnnouncementListContainer() {
  const { menu } = useParams();
  const navigate = useNavigate();

  const setMenu = (menu: "inProgress" | "applied" | "bookmark" | "recent") => {
    navigate(`/applicant/announcement/${menu}`);
  };

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="ml-[26.38px] mt-7 flex flex-col items-start ">
        <h1 className="text-title2 font-bold mb-4">공고 리스트</h1>

        <section>
          <div className="w-full flex items-center gap-0">
            <button
              onClick={() => setMenu("inProgress")}
              className={`flex-center w-[198px] h-[50px] rounded-t-[11px] border border-gray-200 border-b-0 text-callout ${menu === "inProgress" ? "bg-main-100 text-white-100" : "bg-gray-100 text-main-100"} `}
            >
              지원 중인 동아리
            </button>
            <button
              onClick={() => setMenu("applied")}
              className={`flex-center w-[198px] h-[50px] rounded-t-[11px] border border-gray-200 border-b-0 text-callout ${menu === "applied" ? "bg-main-100 text-white-100" : "bg-gray-100 text-main-100"}`}
            >
              지원한 동아리
            </button>
            <button
              onClick={() => setMenu("bookmark")}
              className={`flex-center w-[198px] h-[50px] rounded-t-[11px] border border-gray-200 border-b-0 text-callout ${menu === "bookmark" ? "bg-main-100 text-white-100" : "bg-gray-100 text-main-100"} `}
            >
              스크랩한 동아리
            </button>
            <button
              onClick={() => setMenu("recent")}
              className={`flex-center w-[198px] h-[50px] rounded-t-[11px] border border-gray-200 border-b-0 text-callout ${menu === "recent" ? "bg-main-100 text-white-100" : "bg-gray-100 text-main-100"} `}
            >
              최근 본 동아리
            </button>
          </div>
          <div className="w-[1015px] py-[39px] px-12 bg-white-100 border rounded rounded-tr-[12px] rounded-bl-[12px] rounded-br-[12px]">
            {menu === "inProgress" && <InProgressContainer />}
            {menu === "applied" && <AppliedContainer />}
            {menu === "bookmark" && <BookmarkContainer />}
            {menu === "recent" && <RecentContainer />}
          </div>
        </section>
      </div>
    </div>
  );
}
