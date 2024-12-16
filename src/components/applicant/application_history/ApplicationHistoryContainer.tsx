import { useLocation, useNavigate } from "react-router-dom";
import PassClubContainer from "./application_container/PassClubContainer";
import FailClubContainer from "./application_container/FailClubContainer";

// 나의 지원 기록
export default function ApplicationHistoryContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentMenu = queryParams.get("menu") || "pass";

  const setMenu = (menu: "pass" | "fail") => {
    queryParams.set("menu", menu);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  return (
    <div className="w-full h-screen flex-center bg-gray-100">
      <div className="flex flex-col items-start ">
        <h1>나의 지원 기록</h1>

        <section>
          <div className="w-full ml-1 flex items-center gap-0">
            <button
              onClick={() => setMenu("pass")}
              className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "pass" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"} `}
            >
              합격한 동아리
            </button>
            <button
              onClick={() => setMenu("fail")}
              className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "fail" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"}`}
            >
              불합격한 동아리
            </button>
          </div>
          <div className="mt-4 w-full p-4 bg-white border rounded">
            {currentMenu === "pass" && <PassClubContainer />}
            {currentMenu === "fail" && <FailClubContainer />}
          </div>
        </section>
      </div>
    </div>
  );
}
