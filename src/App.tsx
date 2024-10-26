import "./App.css";
import Header from "./components/common/Header";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
import FloatingButton from "./components/FloatingButton";

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="bg-bg-100 h-full w-full pt-[55px]">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <FloatingButton />
        <Footer />
      </div>
    </div>
  );
}
