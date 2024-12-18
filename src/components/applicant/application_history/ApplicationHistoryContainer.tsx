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
    <div className="w-full h-screen  bg-gray-100">
      <div className="ml-[34.38px] mt-7 flex flex-col items-start ">
        <h1 className="text-title2 font-bold mb-4">나의 지원 기록</h1>

        <section>
          <div className="w-full flex items-center gap-0">
            <button
              onClick={() => setMenu("pass")}
              className={`flex-center  w-[198px] h-[50px] rounded-t-[11px] border border-gray-200 border-b-0 text-callout ${menu === "pass" ? "bg-main-100 text-white-100" : "bg-gray-100 text-main-100"} `}
            >
              합격한 동아리
            </button>
            <button
              onClick={() => setMenu("fail")}
              className={`flex-center  w-[198px] h-[50px] rounded-t-[11px] border border-gray-200 border-b-0 text-callout ${menu === "fail" ? "bg-main-100 text-white-100" : "bg-gray-100 text-main-100"}`}
            >
              불합격한 동아리
            </button>
          </div>
          <div className="w-[1015px] p-4 bg-white-100 border rounded rounded-tr-[12px] rounded-bl-[12px] rounded-br-[12px]">
            {menu === "pass" && <PassClubContainer />}
            {menu === "fail" && <FailClubContainer />}
          </div>
        </section>
      </div>
    </div>
  );
}
