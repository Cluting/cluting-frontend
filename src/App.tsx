import "./App.css";
import Header from "./components/common/Header";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RecrutingHome from "./pages/Recruting/RecrutingHome";
import RecrutingPlan from "./pages/Recruting/RecrutingPlan";
import RecrutingPrepare from "./pages/Recruting/RecrutingPrepare";
import DocumentEvaluation from "./pages/Recruting/DocumentEvaluation";
import InterviewNotification from "./pages/Recruting/InterviewNotification";
import FinalSelection from "./pages/Recruting/FinalSelection";

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="relative bg-bg-100 h-full w-full pt-[55px]">
        <div className="relative bg-gray-100 h-full w-full pt-[55px]">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="recruting">
              <Route path="home" element={<RecrutingHome />} />{" "}
              {/* 수정된 경로 */}
              <Route path="01_plan" element={<RecrutingPlan />} />
              <Route path="02_prepare" element={<RecrutingPrepare />} />
              <Route
                path="03_document_evaluation"
                element={<DocumentEvaluation />}
              />
              <Route
                path="04_interview_notification"
                element={<InterviewNotification />}
              />
              <Route
                path="05_interview_evaluation"
                element={<InterviewNotification />}
              />
              <Route path="06_final_selection" element={<FinalSelection />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
