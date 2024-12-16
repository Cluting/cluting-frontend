import { useNavigate, useParams } from "react-router-dom";
import PassClubContainer from "./container/PassClubContainer";
import FailClubContainer from "./container/FailClubContainer";

// 나의 지원 기록
export default function ApplicationHistoryContainer() {
  const { menu } = useParams();
  const navigate = useNavigate();

  const setMenu = (menu: "pass" | "fail") => {
    navigate(`/applicant/applications/${menu}`);
  };

  return (
    <div className="w-full h-screen flex-center bg-gray-100">
      <div className="flex flex-col items-start ">
        <h1>나의 지원 기록</h1>

        <section>
          <div className="w-full ml-1 flex items-center gap-0">
            <button
              onClick={() => setMenu("pass")}
              className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${menu === "pass" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"} `}
            >
              합격한 동아리
            </button>
            <button
              onClick={() => setMenu("fail")}
              className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${menu === "fail" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"}`}
            >
              불합격한 동아리
            </button>
          </div>
          <div className="mt-4 w-full p-4 bg-white border rounded">
            {menu === "pass" && <PassClubContainer />}
            {menu === "fail" && <FailClubContainer />}
          </div>
        </section>
      </div>
    </div>
  );
}
