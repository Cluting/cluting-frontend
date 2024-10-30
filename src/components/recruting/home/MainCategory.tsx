import { useState } from "react";
import ClubAlignDropdown from "./ClubAlignDropdown";

export default function MainCategory() {
  const [clubAlign, setClubAlgin] = useState(true); //동아리 정렬 드롭다운
  const [selectedCategory, setSelectedCategory] = useState(0); //전체 카테고리
  const [selectedDetailCategory, setSelectedDetailCategory] = useState(0); //세부 카테고리
  const categories = ["전체", "연합", "교내"];
  const detailCategories = [
    "전체",
    "문화 / 예술 / 공연",
    "봉사 / 사회 활동",
    "학술 / 교양",
    "창업 / 취업",
    "어학",
    "체육",
    "친목",
    "기타"
  ];
  return (
    <div>
      <p className="text-[28px] font-semibold text-left pt-[45px]">
        예은님을 기다리는 동아리들 🙌🏻
      </p>

      {/*전체/연합/교내 + 드롭다운 */}
      <div className="flex justify-between items-end pt-[35px]">
        <div className="flex-center">
          <div className="flex text-gray-800 flex justify-left gap-[22.74px]">
            {categories.map((category, index) => (
              <p
                onClick={() => setSelectedCategory(index)}
                className={`text-[22px] cursor-pointer font-bold ${
                  selectedCategory === index ? "text-gray-800" : "text-gray-200"
                }`}
              >
                {category}
              </p>
            ))}
          </div>
          <p className="pl-[9px] text-[16px] text-gray-800 font-medium">
            (114개)
          </p>
        </div>
        <button
          className="flex items-center gap-2 relative"
          onClick={() => {
            setClubAlgin(!clubAlign);
          }}
        >
          <p className="text-gray-800 font-medium">마감임박순</p>
          <img
            src="assets/ic-darkdropdown.svg"
            alt="동아리 정렬 드롭다운"
            className="w-[10px] h-[10px]"
          />
          {clubAlign && <ClubAlignDropdown />}
        </button>
      </div>

      {/*세부 카테고리 바 */}
      <div className="pt-[20px] pb-[48.4px]">
        <div className="flex-center py-[11px] text-[15px] font-semibold bg-gray-500 rounded-[17px] gap-4">
          {detailCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedDetailCategory(index)}
              className={`px-[26px] py-[7.87px] rounded-[15.74px] border border-[#D9D9D9] transition-colors ${
                //요기 패딩 재설정 필요
                selectedDetailCategory === index
                  ? "bg-gray-800 text-white-100"
                  : "bg-white-100 text-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
