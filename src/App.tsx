import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Sidemenu from "./components/recruting/home/Sidemenu";

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="relative bg-gray-100 h-screen w-full pt-[55px]">
        <Sidemenu />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
}
