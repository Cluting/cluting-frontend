/* eslint-disable indent */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidemenu() {
  const [sidemenuClose, setSidemenuClose] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  const handleDropdownClick = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // 단계에 따른 경로 설정
  const navigate = useNavigate(); // useNavigate 초기화
  const navigateToPage = (index: number) => {
    const paths = [
      "/recruting/01_plan",
      "/recruting/02_prepare",
      "/recruting/03_document_evaluation",
      "/recruting/04_interview_notification",
      "/recruting/05_interview_evaluation",
      "/recruting/06_final_selection"
    ];
    navigate(paths[index]); // 경로로 이동
  };

  const getDropdownContent = (index: number) => {
    switch (index) {
      case 0:
        return [];
      case 1:
        return [
          "합격 인원 설정하기",
          "인재상 구축하기",
          "공고 작성하기",
          "운영진 면접 조율하기",
          "지원서 폼 제작하기"
        ];
      case 2:
        return ["서류 평가 준비하기", "서류 평가하기"];
      case 3:
        return [
          "지원자 합/불 결과",
          "서류 합격자 면접 일정 조율하기",
          "합/불 및 면접 일정 안내 문자 작성하기"
        ];

      case 4:
        return ["면접 평가 준비하기", "면접 평가하기"];
      default:
        return ["지원자 합/불 결과", "합/불 및 활동 안내 문자 작성"];
    }
  };

  return (
    <div
      className={`relative bg-white-100 custom-shadow ${
        sidemenuClose ? "w-[80px] px-2" : "w-[300px] px-5"
      } h-[916px] rounded-[28px]  py-[26px] transition-all`}
    >
      <section
        className={`flex items-center w-full h-[86px] ${
          sidemenuClose ? "justify-center" : "bg-gray-100 px-[18px]"
        } rounded-[14px] transition-all`}
      >
        <img
          src="/assets/ic-profile.svg"
          alt="동아리 프로필"
          onClick={() => setSidemenuClose(!sidemenuClose)}
          className="w-[50px] h-[50px] border border-white-100 rounded-full"
        />
        {!sidemenuClose && (
          <div className="text-left ml-4">
            <p className="text-body">동아리 이름</p>
            <p className="text-gray-900 text-caption1 mt-[5px]">
              1기 (리크루팅 준비)
            </p>
          </div>
        )}
      </section>

      <section className="text-gray-600 text-left text-callout mt-[19px]">
        <button className="flex items-center h-[46px]">
          <img
            src="/assets/ic-sidemenu-home.svg"
            alt="리크루팅 홈"
            className={`w-6 h-6  ${sidemenuClose ? "ml-[20px]" : "mr-[10px]"}`}
          />
          {!sidemenuClose && "리크루팅 홈"}
        </button>

        <button className="flex items-center h-[46px]">
          <img
            src="/assets/ic-sidemenu-setting.svg"
            alt="리크루팅 홈"
            className={`w-6 h-6  ${sidemenuClose ? "ml-[20px]" : "mr-[10px]"}`}
          />
          {!sidemenuClose && "동아리 설정"}
        </button>
      </section>

      <section
        className={`text-gray-600 text-subheadline ${!sidemenuClose && "mt-[26px]"}`}
      >
        <p className={`my-[26px] text-left ${sidemenuClose && "hidden"}`}>
          리크루팅 단계
        </p>
        {[...Array(6)].map((_, index) => (
          <div key={index} onClick={() => handleDropdownClick(index)}>
            <div
              className={`relative dropdown-list flex items-center h-[46px] text-subheadline hover:text-gray-900 ${
                sidemenuClose ? "justify-center" : ""
              }`}
              onClick={() => navigateToPage(index)} // 페이지로 이동
            >
              <div className="flex-center w-[33px] h-[30px] bg-gray-100 border border-gray-500 hover:border-gray-900 rounded-[8px]">
                {index + 1}
              </div>
              {!sidemenuClose && (
                <p className="ml-3">
                  {
                    [
                      "계획하기",
                      "모집 준비하기",
                      "서류 평가하기",
                      "서류 합격자 및 면접 안내",
                      "면접 평가하기",
                      "최종 합격자 및 활동 안내"
                    ][index]
                  }
                </p>
              )}
              <img
                src="/assets/ic-sidemenuDropdown.svg"
                alt="메뉴 드롭다운"
                className={`w-[10px] h-[10px] absolute right-3 ${sidemenuClose && "hidden"}`}
              />
            </div>

            {/* Dropdown content */}
            {openDropdownIndex === index && (
              <div className="ml-10 mt-2 text-sm text-gray-600">
                {getDropdownContent(index).map((item, idx) => (
                  <p
                    key={idx}
                    className="text-left h-[42px] dropdown-list hover:text-gray-900"
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="absolute bottom-[26px] text-gray-600 text-left text-callout mt-[19px]">
        <div className="flex-center h-[46px] ">
          <img
            src="/assets/ic-sidemenu-notice.svg"
            alt="리크루팅 홈"
            className={`w-6 h-6  ${sidemenuClose ? "ml-[20px]" : "mr-[10px]"}`}
          />
          {!sidemenuClose && (
            <>
              <span>공지 알림 및 소통</span>
              <div className="flex-center ml-[64px] py-[5px] px-[8px] bg-black-100 text-white-100 rounded-[8px] text-caption3 cursor-pointer">
                23
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
