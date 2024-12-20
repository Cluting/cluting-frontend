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
import ApplicantDocument from "./pages/Recruting/document/ApplicantDocument";
import ApplicantProfile from "./pages/Applicant/ApplicantProfile";
import AnnouncementList from "./pages/Applicant/AnnouncementList";
import ApplicantHistory from "./pages/Applicant/ApplicantHistory";
import ApplicantHome from "./pages/Applicant/ApplicantHome";
import ApplicantHistoryDetail from "./pages/Applicant/ApplicantHistoryDetail";
import PublicRoute from "./components/common/PublicRoute";
import AnswerRecord from "./pages/Recruting/step5/AnswerRecord";

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="relative bg-white-100 h-full w-full">
        <div className="relative bg-white-100 h-full w-full pt-[55px]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/main" element={<Main />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route path="/register_club" element={<RegisterClub />} />
            <Route path="recruting">
              <Route path="home" element={<RecrutingHome />} />
              {/* 수정된 경로 */}
              <Route path="01_plan" element={<RecrutingPlan />} />
              <Route path="02_prepare" element={<RecrutingPrepare />} />
              <Route
                path="03_document_evaluation"
                element={<DocumentEvaluation />}
              />
              <Route path="evaluation" element={<ApplicantDocument />} />
              <Route
                path="04_interview_notification"
                element={<InterviewNotification />}
              />
              <Route
                path="05_interview_evaluation"
                element={<InterviewEvaluation />}
              />
              <Route
                path="individual_question"
                element={<ApplicantDocument />}
              />
              <Route path="answer_record" element={<AnswerRecord />} />
              <Route path="06_final_selection" element={<FinalSelection />} />
            </Route>

            <Route path="applicant">
              {/* 지원자 홈 */}
              <Route path="home" element={<ApplicantHome />} />
              {/* 기본 프로필 */}
              <Route path="profile" element={<ApplicantProfile />} />
              {/* 공고 리스트 */}
              <Route path="announcement/:menu" element={<AnnouncementList />} />
              <Route
                path="announcement/:menu/detail"
                element={<ApplicantHistoryDetail />}
              />
              {/* 나의 지원 기록 */}
              <Route path="applications/:menu" element={<ApplicantHistory />} />
              <Route
                path="applications/:menu/detail"
                element={<ApplicantHistoryDetail />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
