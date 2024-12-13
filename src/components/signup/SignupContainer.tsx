import { useEffect, useState } from "react";
import Input from "../common/Input";
import SignupDropdown from "./SignupDropdown";
import TermsAgreement from "./TermsAgreement";
import { useForm, useWatch } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { ERROR_MESSAGES } from "../../constants/recruting";
import { useMutation } from "@tanstack/react-query";
import { postSignup } from "./services/User";

interface SignupProps {
  isSocialSignup: boolean; // 소셜 회원가입 여부
}
export default function SignupContainer({ isSocialSignup }: SignupProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control // DevTool에서 필요
  } = useForm<SignupFormValue>({ mode: "onBlur" });

  // Mutation 설정
  const mutation = useMutation(postSignup, {
    onSuccess: (data) => {
      alert("회원가입 성공!");
      console.log(data); // 성공 데이터 처리
    },
    onError: (error: any) => {
      alert(`회원가입 실패: ${error.message}`);
    }
  });

  // Form 제출 핸들러
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutation.mutate(data); // postSignup 호출
  });

  const [studentStatus, setStudentStatus] = useState(false); //휴학 여부 드롭다운
  const [semester, setSemester] = useState(false); //학기 선택 드롭다운

  const [selectedStatus, setSelectedStatus] = useState(""); // 선택한 휴학 상태
  const [selectedSemester, setSelectedSemester] = useState(""); // 선택한 학기

  // 드롭다운에서 선택된 값을 설정
  const handleStatusSelect = (status: string) => {
    let statusValue = "";
    if (status === "재학") {
      statusValue = "ENROLLED"; // 재학 시 ENROLLED 값 저장
    } else if (status === "휴학") {
      statusValue = "LEAVE"; // 휴학 시 LEAVE 값 저장
    }
    setSelectedStatus(status);
    setValue("studentStatus", statusValue); // 폼에 값 저장
    setStudentStatus(false); // 드롭다운 닫기
  };

  const handleSemesterSelect = (description: string, value?: string) => {
    setSelectedSemester(description);
    setValue("semester", value ?? "");
    setSemesterExplain("");
    setSemester(false);
  };

  //재학 여부에 따른 안내
  const [semesterExplain, setSemesterExplain] = useState("");

  const studentStatusText = useWatch({
    control,
    name: "studentStatus"
  });

  useEffect(() => {
    if (studentStatusText === "재학") {
      setSemesterExplain("이제 곧 시작할 학기를 선택해 주세요");
    } else {
      setSemesterExplain("휴학 이전에 수료한 마지막 학기를 선택해 주세요");
    }
  }, [studentStatusText]);

  //비밀번호 확인
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const password = watch("password");

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }
  };
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="custom-shadow w-[680px] py-20 mb-40 rounded-[14px] border-[#D6D7DA] bg-white-100 flex flex-col items-center"
      >
        {!isSocialSignup && (
          <section className="flex flex-col text-left mb-10">
            <Input
              name="email"
              register={register}
              type="email"
              placeholder="이메일"
              required
              error={errors.email}
            />
            {errors.email && (
              <p className="text-state-error">{ERROR_MESSAGES.required}</p>
            )}

            <Input
              name="password"
              register={register}
              type="password"
              placeholder="비밀번호"
              required
              error={errors.password}
            />
            {errors.password && (
              <p className="text-state-error">{ERROR_MESSAGES.required}</p>
            )}

            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="비밀번호 확인"
              className="bg-white-100 w-[404px] h-[56px] mt-4 rounded-[8px] border border-gray-200 text-body pl-[14px] focus:outline-none focus:border-main-100"
            />
            {passwordError && (
              <p className="text-state-error">{passwordError}</p>
            )}
          </section>
        )}
        <section className="flex flex-col text-left mb-10">
          <p className="text-title3 text-gray-900">인적사항</p>
          <p className="text-caption1 text-gray-700 mt-[7px]">
            인적사항을 작성해 주세요
          </p>
          <Input
            name="name"
            register={register}
            type="text"
            placeholder="이름"
            required
            error={errors.name}
          />
          {errors.name && (
            <p className="text-state-error"> {ERROR_MESSAGES.required}</p>
          )}

          <Input
            name="phone"
            register={register}
            type="tel"
            placeholder="휴대폰 번호"
            required
            error={errors.phone}
          />
          {errors.phone && (
            <p className="text-state-error"> {ERROR_MESSAGES.required}</p>
          )}

          <Input
            name="location"
            register={register}
            type="text"
            placeholder="거주지"
            required
            error={errors.location}
          />
          {errors.location && (
            <p className="text-state-error">{ERROR_MESSAGES.required}</p>
          )}
        </section>

        <hr className="w-[400px] py- border border-gray-200 my-8" />

        <section className="flex flex-col text-left my-10">
          <p className="text-title3 text-gray-900">학력사항</p>
          <p className="text-caption1 text-gray-700 mt-[7px]">
            현재 다니고 있는 학교와 전공을 입력해 주세요 이후 인증 절차가
            필요합니다.
          </p>
          <Input
            name="school"
            register={register}
            type="text"
            placeholder="학교"
            required
            error={errors.school}
          />
          {errors.school && (
            <p className="text-state-error">{ERROR_MESSAGES.required}</p>
          )}
          <div className="relative">
            <Input
              name="studentStatus"
              register={register}
              value={selectedStatus}
              type="text"
              onClick={() => {
                setStudentStatus(!studentStatus);
              }}
              placeholder={selectedStatus || "휴학 여부"}
              required
              isDropdown
              isDropdownSelected={!!selectedStatus}
            />
            {studentStatus && (
              <SignupDropdown onSelect={handleStatusSelect} studentStatus />
            )}
          </div>
          <div className="relative">
            {selectedStatus && semesterExplain && (
              <p className="text-caption1 text-main-100 mt-4">
                {semesterExplain}
              </p>
            )}
            <Input
              name="semester"
              register={register}
              value={selectedSemester}
              type="text"
              onClick={() => {
                setSemester(!semester);
              }}
              placeholder={selectedSemester || "학기 선택"}
              required
              isDropdown
              isDropdownSelected={!!selectedSemester}
            />
            {semester && (
              <SignupDropdown onSelect={handleSemesterSelect} semester />
            )}
          </div>
          <Input
            name="major"
            register={register}
            type="text"
            placeholder="전공"
            required
            error={errors.major}
          />
          {errors.major && (
            <p className="text-state-error">{ERROR_MESSAGES.required}</p>
          )}
          <Input
            name="doubleMajor"
            register={register}
            type="text"
            placeholder="(선택) 다전공 (복수 전공, 부전공)"
          />
        </section>

        <hr className="w-[400px] py- border border-gray-200 my-8" />

        <section className="flex flex-col text-left my-10">
          <p className="text-title3 text-gray-900">이용약관</p>
          <TermsAgreement
            register={register}
            control={control}
            setValue={setValue}
          />
        </section>

        <button
          type="submit"
          className="bg-main-100 hover:bg-main-500 text-white-100 w-[404px] h-[70px] rounded-[8px] text-body mt-[15px] border border-gray-700 "
        >
          {mutation.isLoading ? "처리 중..." : "회원가입"}
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
}
