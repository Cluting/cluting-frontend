import { useState } from "react";
import Input from "../common/Input";
import SignupDropdown from "./SignupDropdown";
import { useForm } from "react-hook-form";
import UploadProfile from "./UploadProfile";

export default function RegisterClub() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<RegisterClubFormValue>({ mode: "onChange" });

  const onSubmit = handleSubmit((data) => console.log(data));
  const [clubType, setClubType] = useState(false);
  const [clubCategory, setClubCategory] = useState(false);

  const [selectedClubType, setSelectedClubType] = useState(""); // 선택한 교내/연합
  const [selectedClubCategory, setSelectedClubCategory] = useState(""); // 선택한 동아리 분야

  const handleTypeSelect = (status: string) => {
    setSelectedClubType(status);
    setClubType(false);
  };

  const handleCategorySelect = (semester: string) => {
    setSelectedClubCategory(semester);
    setClubCategory(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-[680px] py-20 mb-40 rounded-[14px] border-[#D6D7DA] bg-white-100 flex flex-col items-center"
    >
      <section className="flex flex-col items-center text-left mb-10">
        <p className="text-title3 text-gray-900">프로필 사진</p>
        <UploadProfile />
      </section>

      <hr className="w-[400px] py- border border-gray-200 my-8" />

      <section className="flex flex-col text-left my-10">
        <p className="text-title3 text-gray-900">기본 정보</p>
        <Input
          name="clubName"
          register={register}
          type="text"
          placeholder="동아리 이름"
          required
        />
        <div className="relative">
          <Input
            name="clubType"
            register={register}
            type="text"
            onClick={() => {
              setClubType(!clubType);
            }}
            placeholder={selectedClubType || "교내/연합"}
            required
            isDropdown
            isDropdownSelected={!!selectedClubType}
          />
          {clubType && <SignupDropdown onSelect={handleTypeSelect} clubType />}
        </div>
        <div className="relative">
          <Input
            name="clubCategory"
            register={register}
            type="text"
            onClick={() => {
              setClubCategory(!clubCategory);
            }}
            placeholder={selectedClubCategory || "분야"}
            required
            isDropdown
            isDropdownSelected={!!selectedClubCategory}
          />
          {clubCategory && (
            <SignupDropdown onSelect={handleCategorySelect} clubCategory />
          )}
        </div>
      </section>

      <hr className="w-[400px] py- border border-gray-200 my-8" />

      <section className="flex flex-col text-left my-10">
        <p className="text-title3 text-gray-900">키워드</p>
      </section>

      <section className="flex flex-col text-left my-10">
        <p className="text-title3 text-gray-900">동아리 소개</p>
        <Input
          name="clubDescription"
          register={register}
          type="text"
          placeholder="동아리 소개글을 작성해 주세요."
        />
      </section>

      <button className="bg-gray-400 hover:bg-gray-500 w-[404px] h-[70px] rounded-[8px] text-body mt-[15px] border border-gray-700 ">
        동아리 등록하기
      </button>
    </form>
  );
}
