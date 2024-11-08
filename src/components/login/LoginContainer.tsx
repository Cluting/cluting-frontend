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
    <>
      <form
        onSubmit={onSubmit}
        className="custom-shadow w-[680px] h-auto py-12 rounded-[14px] border-[#D6D7DA] bg-white-100 flex flex-col items-center"
      >
        <div className="flex items-center gap-2">
          <img
            src="/assets/logo/ic-logoIcon-black.svg"
            alt="로고 아이콘"
            className="w-[37px] h-[36px] "
          />
          <img
            src="/assets/logo/ic-logoTitle-black.svg"
            alt="로고 타이틀"
            className="w-[140px] h-[58px]"
          />
        </div>
        <p className="text-title3 mt-[27px]">
          동아리 리크루팅의 솔루션, 클루팅
        </p>
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
        <button
          aria-label="로그인"
          className="bg-main-100 text-white-100 w-[404px] h-[56px] rounded-[8px] text-body mt-[50px] text-white-100"
        >
          로그인
        </button>
        <Link to="/signup">
          <button
            aria-label="회원가입"
            className="bg-main-300 text-main-100 w-[404px] h-[56px] rounded-[8px] text-body mt-[15px] border border-main-100 "
          >
            회원가입
          </button>
        </Link>
        <div className="flex gap-[18px] mt-[47px]">
          <img
            src="/assets/social/ic-google.svg"
            alt="구글 소셜 로그인"
            className="w-[54px] h-[54px] "
          />
          <img
            src="/assets/social/ic-kakao.svg"
            alt="카카오 소셜 로그인"
            className="w-[54px] h-[54px] "
          />
          <img
            src="/assets/social/ic-naver.svg"
            alt="네이버 소셜 로그인"
            className="w-[54px] h-[54px] "
          />
        </div>
      </form>
    </>
  );
}
