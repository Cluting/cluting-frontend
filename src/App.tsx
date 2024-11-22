import "./App.css";
import Header from "./components/common/Header";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FinalSelection from "./pages/Recruting/step6/FinalSelection";
import DocumentEvaluation from "./pages/Recruting/step3/DocumentEvaluation";
import InterviewNotification from "./pages/Recruting/step4/InterviewNotification";
import InterviewEvaluation from "./pages/Recruting/step5/InterviewEvaluation";
import RecrutingPrepare from "./pages/Recruting/step2/RecrutingPrepare";
import RecrutingPlan from "./pages/Recruting/step1/RecrutingPlan";
import RecrutingHome from "./pages/Recruting/RecrutingHome";
import RegisterClub from "./pages/RegisterClub";
import LandingPage from "./pages/LandingPage";
import Evaluation from "./pages/Recruting/step3/Evalutation";

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="relative bg-white-100 h-full w-full">
        <div className="relative bg-white-100 h-full w-full pt-[55px]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/main" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/register_club" element={<RegisterClub />} />
            <Route path="recruting">
              <Route path="home" element={<RecrutingHome />} />{" "}
              {/* 수정된 경로 */}
              <Route path="01_plan" element={<RecrutingPlan />} />
              <Route path="02_prepare" element={<RecrutingPrepare />} />
              <Route
                path="03_document_evaluation"
                element={<DocumentEvaluation />}
              />
              <Route path="evaluation" element={<Evaluation />} />
              <Route
                path="04_interview_notification"
                element={<InterviewNotification />}
              />
              <Route
                path="05_interview_evaluation"
                element={<InterviewEvaluation />}
              />
              <Route path="06_final_selection" element={<FinalSelection />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
