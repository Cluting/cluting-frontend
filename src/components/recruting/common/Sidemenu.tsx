/* eslint-disable indent */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  PATH,
  STEP2_ITEMS,
  STEP3_ITEMS,
  STEP4_ITEMS,
  STEP5_ITEMS,
  STEP6_ITEMS
} from "../../../constants/recruting";

export default function Sidemenu() {
  // 현재 경로 가져오기
  const location = useLocation();

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
    navigate(PATH[index]); // 경로로 이동
  };

  const getDropdownContent = (index: number) => {
    switch (index) {
      case 0:
        return [];
      case 1:
        return STEP2_ITEMS;
      case 2:
        return STEP3_ITEMS;
      case 3:
        return STEP4_ITEMS;

      case 4:
        return STEP5_ITEMS;
      default:
        return STEP6_ITEMS;
    }
  };

  // 윈도우 사이즈 변경에 따른 사이드메뉴 상태 설정
  const handleResize = () => {
    if (window.innerWidth <= 1200) {
      setSidemenuClose(true);
    } else {
      setSidemenuClose(false);
    }
  };

  useEffect(() => {
    // 초기 설정
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 리스너 해제
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`relative bg-white-100 custom-shadow ${
        sidemenuClose ? "w-[80px] px-2" : "w-[300px] px-5"
      } h-[916px] rounded-[28px]  py-[26px] transition-all`}
    >
      <section
        className={`flex items-center w-full h-[86px] ${
          sidemenuClose
            ? "justify-center"
            : "bg-gray-100 boreder border-main-300 px-[18px]"
        } rounded-[14px] transition-all`}
      >
        <img
          src="/assets/ic-profile.svg"
          alt="동아리 프로필"
          onClick={() => setSidemenuClose(!sidemenuClose)}
          className="w-[50px] h-[50px] "
        />
        {!sidemenuClose && (
          <div className="text-left ml-4">
            <p className="text-body">잇타</p>
            <p className="text-gray-900 text-caption1 mt-[5px]">
              1기 (리크루팅 준비)
            </p>
          </div>
        )}
      </section>

      <section className="text-gray-600 text-left text-callout mt-[19px]">
        <Link to={"/recruting/home"}>
          <button
            className={`flex items-center h-[46px] hover:bg-gray-100 w-full rounded-[8px] ${
              sidemenuClose ? "pl-0" : "pl-3"
            } ${location.pathname === "/recruting/home" ? "bg-gray-100 w-full rounded-[8px]" : ""}`}
          >
            <img
              src="/assets/ic-sidemenu-home.svg"
              alt="리크루팅 홈"
              className={`w-6 h-6  ${sidemenuClose ? "ml-[20px]" : "mr-[10px]"} `}
            />
            {!sidemenuClose && "리크루팅 홈"}
          </button>
        </Link>

        <button
          className={`flex items-center mt-1 hover:bg-gray-100 w-full rounded-[8px] ${
            sidemenuClose ? "pl-0" : "pl-3"
          }  h-[46px]`}
        >
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
              className={`relative dropdown-list flex items-center h-[46px] text-subheadline group-hover:text-gray-900 ${
                sidemenuClose ? "justify-center" : ""
              } group`}
              onClick={() => navigateToPage(index)} // 페이지로 이동
            >
              <div className="flex-center w-[33px] h-[30px] bg-gray-100 border border-gray-500 group-hover:border-gray-900 group-hover:bg-main-100 group-hover:text-white-100 group-hover:border-0 rounded-[8px]">
                {index + 1}
              </div>
              {!sidemenuClose && (
                <p className="ml-3 group-hover:text-gray-1100">
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
                className={`w-[10px] h-[10px] absolute right-3  ${
                  openDropdownIndex === index ? "rotate-90" : ""
                }  ${sidemenuClose && "hidden"}`}
              />
            </div>

            {/* 드롭다운으로 열리는 경우 */}
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
              <div className="flex-center ml-[75px] py-[2px] px-[8px] bg-red-100 text-white-100 rounded-[6.52px] text-[8.96px] cursor-pointer">
                23
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
