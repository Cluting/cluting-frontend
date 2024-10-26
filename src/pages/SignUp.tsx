import SignupContainer from "../components/signup/SignupContainer";

export default function SignUp() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <p className="text-title1 text-gray-900 mt-[50px] mb-[30px]">회원가입</p>
      <SignupContainer />
    </div>
  );
}
