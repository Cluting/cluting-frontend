import { Link, useNavigate } from "react-router-dom";
import Input from "../common/Input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { getSignin } from "../signup/services/User";
import { useAuthStore } from "../../store/useAuthStore";

export default function LoginContainer() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginFormValue>({
    mode: "onChange"
  });

  // Mutation 설정
  const { setLogin } = useAuthStore();
  const mutation = useMutation(getSignin, {
    onSuccess: (data) => {
      setLogin(true); // 로그인 전역 상태 업데이트
      navigate("/");
      console.log("로그인 성공", data); // 성공 데이터 처리
      localStorage.setItem("access_token", data.accessToken); // 로컬 스토리지 액세스 토큰 등록
      localStorage.setItem("refresh_token", data.refreshToken);
    },
    onError: (error: any) => {
      alert(`로그인에 실패하였습니다`);
    }
  });

  // Form 제출 핸들러
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data); // postSignup 호출
  });

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="custom-shadow w-[680px] h-auto py-12 rounded-[14px] border-[#D6D7DA] bg-white-100 flex flex-col items-center"
      >
        <div className="flex items-center gap-2">
          <img
            src="/assets/logo/ic-logo-black.svg"
            alt="로고 아이콘"
            className="w-[200px] h-[40px] "
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
          className="bg-main-100 hover:bg-main-500 text-white-100 w-[404px] h-[56px] rounded-[8px] text-body mt-[50px] text-white-100"
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
