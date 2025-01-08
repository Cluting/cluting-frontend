import "./App.css";
import Header from "./components/common/Header";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FinalSelection from "./pages/Recruting/step6/FinalSelection";
import InterviewNotification from "./pages/Recruting/step4/InterviewNotification";
import RecrutingPrepare from "./pages/Recruting/step2/RecrutingPrepare";
import RecrutingPlan from "./pages/Recruting/step1/RecrutingPlan";
import RecrutingHome from "./pages/Recruting/RecrutingHome";
import RegisterClub from "./pages/RegisterClub";
import LandingPage from "./pages/LandingPage";
import ApplicantProfile from "./pages/Applicant/ApplicantProfile";
import AnnouncementList from "./pages/Applicant/AnnouncementList";
import ApplicantHistory from "./pages/Applicant/ApplicantHistory";
import ApplicantHome from "./pages/Applicant/ApplicantHome";
import ApplicantHistoryDetail from "./pages/Applicant/ApplicantHistoryDetail";
import AnswerRecord from "./pages/Recruting/step5/AnswerRecord";
import InterviewEvaluationRecord from "./pages/Recruting/step5/InterviewEvaluationRecord";
import PublicRoute from "./components/login/PublicRoute";
import AdminInvite from "./components/recruting/home/_admin/AdminInvite";
import ApplicantDocument from "./pages/Recruting/step3/document/ApplicantDocument";
import DocumentEval from "./pages/Recruting/step3/DocumentEval";
import DocumentPrep from "./pages/Recruting/step3/DocumentPrep";
import InterviewEval from "./pages/Recruting/step5/InterviewEval";
import InterviewPrep from "./pages/Recruting/step5/InterviewPrep";

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="relative w-full h-full bg-white-100">
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
            <Route path="/admin/invite" element={<AdminInvite />} />
            <Route path="recruting">
              <Route
                path="home/:clubId/:recruitId"
                element={<RecrutingHome />}
              />
              {/* 수정된 경로 */}
              <Route path="01_plan" element={<RecrutingPlan />} />
              <Route path="02_prepare" element={<RecrutingPrepare />} />
              <Route path="03_document_evaluation">
                <Route path="docPrep" element={<DocumentPrep />} />
                <Route path="doc" element={<DocumentEval />} />
              </Route>
              <Route
                path="/recruting/evaluation/:id"
                element={<ApplicantDocument />}
              />
              <Route
                path="04_interview_notification"
                element={<InterviewNotification />}
              />
              <Route path="05_interview_evaluation">
                <Route path="interviewPrep" element={<InterviewPrep />} />
                <Route path="interview" element={<InterviewEval />} />
              </Route>
              {/* 개별 질문 작성하기 */}
              <Route
                path="individual_question"
                element={<ApplicantDocument />}
              />
              {/* <Route path="answer_record" element={<AnswerRecord />} /> */}
              {/* (면접) 답변 기록하기 */}
              <Route
                path="answer_record/:intervieweeName"
                element={<AnswerRecord />}
              />
              {/* 면접 평가하기 */}
              <Route
                path="interview_evaluation_record"
                element={<InterviewEvaluationRecord />}
              />
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
