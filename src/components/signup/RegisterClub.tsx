import { useState } from "react";
import Input from "../common/Input";
import SignupDropdown from "./SignupDropdown";
import { useForm } from "react-hook-form";
import UploadProfile from "./UploadProfile";
import Textarea from "../common/Textarea";

export default function RegisterClub() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<RegisterClubFormValue>({ mode: "onChange" });

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit((data) => console.log(data))(e);
  };

  //드롭다운
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

  //키워드 추가
  const [keywordItem, setKeywordItem] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordItem(e.target.value);
    e.target.value && watch("keywords")
      ? setIsActive(false)
      : setIsActive(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keywordItem.trim() !== "") {
      e.preventDefault();
      // 키워드 수가 5개 미만일 경우만 추가
      if (keywords.length < 5) {
        setKeywords((prevKeywords) => [...prevKeywords, keywordItem]);
        setKeywordItem(""); // 입력 후 입력 필드를 비움
      }
    }
  };

  return (
    <form className="w-[680px] py-20 mb-40 rounded-[14px] border-[#D6D7DA] bg-white-100 flex flex-col items-center">
      <section className="flex flex-col items-center text-left mb-10">
        <p className="text-title3 text-gray-900">프로필 사진</p>
        <UploadProfile name="clubImage" register={register} />
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
        <p className="text-title3 text-gray-900">키워드</p>
        {isActive && (
          <p className="text-main-100 text-caption3 mt-[26px] mb-[6px]">
            동아리 키워드는 최대 5개까지 추가할 수 있습니다.
          </p>
        )}

        <input
          {...register("keywords")}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="키워드를 작성해 주세요 ex) 디자인,영상,IT"
          maxLength={20}
          value={keywordItem}
          disabled={keywords.length >= 5} // 키워드가 5개 이상일 경우 비활성화
          className={`${keywordItem ? "text-black-200" : "text-gray-500"}

           w-[404px] h-[56px] my-4 rounded-[8px] bg-white-100 border border-gray-200 text-body pl-[14px] focus:outline-none focus:border-gray-900 focus:bg-gray-100 disabled:bg-gray-100`}
        />
        {keywords.length >= 1 && (
          <ul className="flex flex-wrap overflow-auto gap-2.5 mt-4 bg-gray-100 w-[404px] h-[98px] p-3 rounded-[8px] focus:outline-none ">
            {keywords.map((keyword) => (
              <li className="flex-center w-auto h-min bg-white-100 rounded-[10px] px-[15px] py-[8px] rounded-[15px] mb-1 gap-2.5">
                {keyword}
                {/* <button onClick={() => handleDeleteKeyword(keyword)}>
                  <img
                    src="assets/ic-keywordDelete.svg"
                    alt="키워드 삭제"
                    className="w-[14px] h-[14px] z-10"
                  />
                </button> */}
              </li>
            ))}
          </ul>
        )}
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
        onSubmit={(e) => onSubmit(e)}
        className="bg-gray-400 hover:bg-gray-500 w-[404px] h-[70px] rounded-[8px] text-body mt-[15px] border border-gray-700 "
      >
        동아리 등록하기
      </button>
    </form>
  );
}
