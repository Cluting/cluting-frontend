import { useState } from "react";
import { useForm } from "react-hook-form";
import UploadProfile from "../signup/UploadProfile";
import Input from "./Input";
import SignupDropdown from "../signup/SignupDropdown";
import ClubKeyword from "../signup/ClubKeyword";
import Textarea from "./Textarea";

export default function RegisterClubContainer() {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterClubFormValue>({ mode: "onChange" });

  const methods = useForm<RegisterClubFormValue>({ mode: "onChange" });

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit((data) => console.log(data))(e);
  };

  //드롭다운
  const [clubType, setClubType] = useState(false);
  const [clubCategory, setClubCategory] = useState(false);
  const [selectedClubType, setSelectedClubType] = useState(""); // 선택한 교내/연합
  const [selectedClubCategory, setSelectedClubCategory] = useState(""); // 선택한 동아리 분야

  const handleTypeSelect = (type: string) => {
    setSelectedClubType(type);
    setValue("clubType", type); // 폼 상태 업데이트
    setClubType(!clubType); // 드롭다운을 닫음
  };

  const handleCategorySelect = (category: string) => {
    setSelectedClubCategory(category);
    setValue("clubCategory", category); // 폼 상태 업데이트
    setClubCategory(!clubCategory); // 드롭다운을 닫음
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-[680px] py-20 mb-40 rounded-[14px] border-[#D6D7DA] bg-white-100 flex flex-col items-center"
    >
      <section className="flex flex-col items-center text-left mb-10">
        <p className="text-title3 text-gray-900">프로필 사진</p>
        <UploadProfile
          name="clubImage"
          register={register}
          setValue={setValue}
        />
      </section>

      <hr className="w-[400px] py- border border-gray-200 mt-4 mb-8" />

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
            value={selectedClubType}
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
            value={selectedClubCategory}
            type="text"
            onClick={() => {
              setClubCategory(!clubCategory);
              console.log(selectedClubCategory);
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
        <ClubKeyword register={register} watch={watch} setValue={setValue} />
      </section>

      <hr className="w-[400px] py- border border-gray-200 my-8" />

      <section className="flex flex-col text-left my-10">
        <p className="text-title3 text-gray-900">동아리 소개</p>
        <Textarea
          name="clubDescription"
          register={register}
          maxLength={3000}
          placeholder="동아리 소개글을 작성해 주세요."
        />
      </section>

      <button
        type="submit"
        className="bg-main-100 text-white-100 w-[404px] h-[70px] rounded-[8px] text-body mt-[15px] border border-gray-700 "
      >
        동아리 등록하기
      </button>
    </form>
  );
}
