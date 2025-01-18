import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ClubAlignDropdown from "./ClubAlignDropdown";

export default function MainCategory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [clubAlign, setClubAlign] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedDetailCategory, setSelectedDetailCategory] = useState(0);
  const [sortLabel, setSortLabel] = useState("마감임박순");

  const clubType = ["전체", "교내", "연합"];
  const cateTypeMapping = {
    전체: null,
    교내: "INTERNAL",
    연합: "EXTERNAL"
  };

  const detailCategories = [
    { label: "전체", value: null },
    { label: "문화 / 예술 / 공연", value: "CULTURE" },
    { label: "봉사 / 사회 활동", value: "SERVICE" },
    { label: "학술 / 교양", value: "ACADEMIC" },
    { label: "창업 / 취업", value: "STARTUP" },
    { label: "어학", value: "LANGUAGE" },
    { label: "체육", value: "PHYSICAL" },
    { label: "친목", value: "SOCIAL" },
    { label: "기타", value: "ELSE" }
  ];

  // 동아리 유형 필터 처리
  const handleClubTypeChange = (index: number) => {
    setSelectedCategory(index);
    const type = clubType[index];
    const value = cateTypeMapping[type as keyof typeof cateTypeMapping];

    if (value) {
      searchParams.set("type", value);
    } else {
      searchParams.delete("type");
    }
    setSearchParams(searchParams);
  };

  // 세부 카테고리 필터 처리
  const handleDetailCategoryChange = (index: number) => {
    setSelectedDetailCategory(index);
    const category = detailCategories[index];

    if (category.value) {
      searchParams.set("field", category.value);
    } else {
      searchParams.delete("field");
    }
    setSearchParams(searchParams);
  };

  // 정렬 처리
  const handleSortChange = (
    sortType: "DEADLINE" | "NEWEST" | "OLDEST" | "INORDER"
  ) => {
    setClubAlign(false); // 드롭다운 닫기
    searchParams.set("sort", sortType);
    setSearchParams(searchParams);

    // 정렬 옵션에 따라 라벨 변경
    switch (sortType) {
      case "DEADLINE":
        setSortLabel("마감임박순");
        break;
      case "NEWEST":
        setSortLabel("최신순");
        break;
      case "OLDEST":
        setSortLabel("오래된순");
        break;
      case "INORDER":
        setSortLabel("기본순");
        break;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-end pt-[35px]">
        <div className="flex-center">
          <div className="flex text-gray-800 flex justify-left gap-[22.74px]">
            {clubType.map((type, index) => (
              <p
                key={index}
                className={`text-[22px] cursor-pointer font-bold ${
                  selectedCategory === index ? "text-gray-800" : "text-gray-200"
                }`}
                onClick={() => handleClubTypeChange(index)}
              >
                {type}
              </p>
            ))}
          </div>
          <p className="pl-[10px] text-[16px] text-gray-800 font-medium">
            (114개)
          </p>
        </div>
        <button
          className="flex items-center gap-2 relative"
          onClick={() => setClubAlign(!clubAlign)}
        >
          <p className="text-gray-800 font-medium">{sortLabel}</p>
          <img
            src="assets/ic-darkdropdown.svg"
            alt="동아리 정렬 드롭다운"
            className="w-[10px] h-[10px]"
          />
          {clubAlign && <ClubAlignDropdown onSort={handleSortChange} />}
        </button>
      </div>

      <div className="pt-[20px] pb-[48.4px]">
        <div className="flex-center whitespace-nowrap py-[11px] px-[16px] text-[15px] font-semibold bg-gray-100 rounded-[17px] gap-4">
          {detailCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleDetailCategoryChange(index)}
              className={`px-[25px] py-[6.87px] rounded-[15.74px] border transition-colors ${
                selectedDetailCategory === index
                  ? "bg-main-100 text-white-100 border-main-100"
                  : "bg-white-100 text-gray-800 border-[#D9D9D9]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
