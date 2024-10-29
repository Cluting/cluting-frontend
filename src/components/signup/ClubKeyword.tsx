import { useState } from "react";
import {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue
} from "react-hook-form";

type ClubKeywordProps = {
  register: UseFormRegister<RegisterClubFormValue>;
  watch: UseFormWatch<RegisterClubFormValue>;
  setValue: UseFormSetValue<RegisterClubFormValue>;
};

export default function ClubKeyword({
  register,
  watch,
  setValue
}: ClubKeywordProps) {
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
        const newKeywords = [...keywords, keywordItem];
        setValue("keywords", newKeywords); // register된 필드 업데이트
        setKeywords(newKeywords);
        setKeywordItem(""); // 입력 후 입력 필드를 비웁니다
      }
    }
  };

  const handleDeleteKeyword = (keywordToDelete: string) => {
    setKeywords((prevKeywords) =>
      prevKeywords.filter((keyword) => keyword !== keywordToDelete)
    );
    setValue("keywords", keywords);
  };

  return (
    <div>
      <p className="text-title3 text-gray-900">키워드</p>
      {isActive && (
        <p className="text-main-100 text-caption3 mt-[26px] mb-[6px]">
          동아리 키워드는 최대 5개까지 추가할 수 있습니다.
        </p>
      )}

      <input
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
            <li
              key={keyword}
              {...register("keywords")}
              className="flex-center w-auto h-min bg-white-100 rounded-[10px] px-[15px] py-[8px] rounded-[15px] mb-1 gap-2.5"
            >
              {keyword}
              <button onClick={() => handleDeleteKeyword(keyword)}>
                <img
                  src="assets/ic-keywordDelete.svg"
                  alt="키워드 삭제"
                  className="w-[14px] h-[14px] z-10"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
