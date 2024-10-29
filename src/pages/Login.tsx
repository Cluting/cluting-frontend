import LoginContainer from "../components/login/LoginContainer";

export default function Login() {
  return (
    <div className="text-[30px] w-full h-screen flex-center">
      <div className="flex flex-col items-center">
        <LoginContainer />
        <div className="flex gap-3 mt-[18px] text-[14px] text-gray-500">
          <p className="hover:text-gray-900">비밀번호 찾기</p>
          <p>|</p>
          <p className="hover:text-gray-900">아이디 찾기</p>
        </div>
      </div>
    </div>
  );
}
