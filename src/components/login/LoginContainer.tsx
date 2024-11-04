import { Link } from "react-router-dom";
import Input from "../common/Input";
import { useForm } from "react-hook-form";

export default function LoginContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<LoginFormValue>({ mode: "onChange" });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form
      onSubmit={onSubmit}
      className="custom-shadow w-[680px] h-[635px] py-12 rounded-[14px] border-[#D6D7DA] bg-white-100 flex flex-col items-center"
    >
      <div className="flex items-center gap-2">
        <img
          src="/assets/ic-logoIcon-black.svg"
          alt="로고 아이콘"
          className="w-6 h-6 "
        />
        <img
          src="/assets/ic-logoTitle-black.svg"
          alt="로고 타이틀"
          className="w-[100px] h-[44px]"
        />
      </div>
      <p className="text-title3 mt-[27px]">동아리 리크루팅의 솔루션, 클루팅</p>
      <div className=" mt-[37px]">
        <Input
          name="email"
          register={register}
          type="text"
          placeholder="이메일을 입력해 주세요"
        />
        <Input
          name="password"
          register={register}
          type="password"
          placeholder="비밀번호를 입력해 주세요"
        />
      </div>
      <button className="bg-main-100 text-white-100 w-[404px] h-[56px] rounded-[8px] text-body mt-[50px] text-white-100">
        로그인
      </button>
      <Link to="/signup">
        <button className="bg-main-200 text-main-100 w-[404px] h-[56px] rounded-[8px] text-body mt-[15px] border border-main-100 ">
          회원가입
        </button>
      </Link>
    </form>
  );
}
