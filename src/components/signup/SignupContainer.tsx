import { useState } from "react";
import Input from "../common/Input";
import SignupDropdown from "./SignupDropdown";
import TermsAgreement from "./TermsAgreement";
import { useForm } from "react-hook-form";

export default function SignupContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<SignupFormValue>({ mode: "onChange" });

  const onSubmit = handleSubmit((data) => console.log(data));
  const [studentStatus, setStudentStatus] = useState(false); //휴학 여부 드롭다운
  const [semester, setSemester] = useState(false); //학기 선택 드롭다운

  const [selectedStatus, setSelectedStatus] = useState(""); // 선택한 휴학 상태
  const [selectedSemester, setSelectedSemester] = useState(""); // 선택한 학기

  // 드롭다운에서 선택된 값을 설정
  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    setStudentStatus(false); // 드롭다운 닫기
  };

  const handleSemesterSelect = (semester: string) => {
    setSelectedSemester(semester);
    setSemester(false); // 드롭다운 닫기
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-[680px] py-20 mb-40 rounded-[14px] border-[#D6D7DA] bg-white-100 flex flex-col items-center"
    >
      <section className="flex flex-col text-left mb-10">
        <p className="text-title3 text-gray-900">인적사항</p>
        <p className="text-caption text-gray-700 mt-[7px]">
          인적사항을 작성해 주세요
        </p>
        <Input
          name="name"
          register={register}
          type="text"
          placeholder="이름"
          required
        />
        <Input
          name="email"
          register={register}
          type="email"
          placeholder="이메일"
        />
        <Input
          name="address"
          register={register}
          type="text"
          placeholder="거주지"
        />
      </section>

      <hr className="w-[400px] py- border border-gray-200 my-8" />

      <section className="flex flex-col text-left my-10">
        <p className="text-title3 text-gray-900">학력사항</p>
        <p className="text-caption text-gray-700 mt-[7px]">
          현재 다니고 있는 학교와 전공을 입력해 주세요 이후 인증 절차가
          필요합니다.
        </p>
        <Input
          name="school"
          register={register}
          type="text"
          placeholder="학교"
          required
        />
        <div className="relative">
          <Input
            name="studentStatus"
            register={register}
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
          <Input
            name="semester"
            register={register}
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
        />
        <Input
          name="minors"
          register={register}
          type="text"
          placeholder="(선택) 다전공 (복수 전공, 부전공)"
        />
      </section>

      <hr className="w-[400px] py- border border-gray-200 my-8" />

      <section className="flex flex-col text-left my-10">
        <p className="text-title3 text-gray-900">이용약관</p>
        <TermsAgreement />
      </section>

      <button className="bg-gray-400 hover:bg-gray-500 w-[404px] h-[70px] rounded-[8px] text-body mt-[15px] border border-gray-700 ">
        회원가입
      </button>
    </form>
  );
}
