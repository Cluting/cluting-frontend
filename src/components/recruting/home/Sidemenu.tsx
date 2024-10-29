import { useState } from "react";

export default function Sidemenu() {
  const [sidemenuOpen, setSidemenuOpen] = useState(false);
  return (
    <div className="relative m-[30px] bg-white-100 w-[300px] h-[916px] rounded-[28px] px-5 py-[26px]">
      <section className="flex itmes-center w-full h-[86px] bg-gray-100 rounded-[14px] px-[18px] py-5">
        <img
          src="assets/ic-profile.svg"
          alt="동아리 프로필"
          className="w-[50px] h-[50px] border border-white-100 rounded-full"
        />
        <div className="text-left ml-4">
          <p className="text-body">동아리 이름</p>
          <p className="text-gray-900 text-caption1 mt-[5px]">
            1기 (리크루팅 준비)
          </p>
        </div>
      </section>

      <section className=" text-gray-600 text-left text-callout mt-[19px]">
        <button className="flex items-center h-[46px]">
          <div className="w-6 h-6 bg-gray-600 mr-[10px]"></div>리크루팅 홈
        </button>
        <button className="flex items-center h-[46px]">
          {" "}
          <div className="w-6 h-6 bg-gray-600 mr-[10px]"></div>동아리 설정
        </button>
      </section>

      <section className="text-gray-600 text-subheadline">
        <p className="my-[26px] text-left"> 리크루팅 단계</p>
        <div className="relative dropdown-list flex items-center h-[46px] text-subheadline hover:text-gray-900">
          <div className="flex-center w-[33px] h-[30px] bg-gray-100 border border-gray-500 hover:border-gray-900 rounded-[8px]">
            1
          </div>
          <p className="ml-3 ">최종합격자 및 활동 안내</p>
          <img
            src="assets/ic-sidemenuDropdown.svg"
            alt="메뉴 드롭다운"
            className="w-[10px] h-[10px] absolute right-3"
          />
        </div>

        <div className="relative dropdown-list flex items-center h-[46px] text-subheadline  hover:text-gray-900">
          <div className="flex-center w-[33px] h-[30px] bg-gray-100 border border-gray-500 hover:border-gray-900 rounded-[8px]">
            2
          </div>
          <p className="ml-3">모집 준비하기</p>
          <img
            src="assets/ic-sidemenuDropdown.svg"
            alt="메뉴 드롭다운"
            className="w-[10px] h-[10px] absolute right-3"
          />
        </div>

        <div className="relative dropdown-list flex items-center h-[46px] text-subheadline  hover:text-gray-900">
          <div className="flex-center w-[33px] h-[30px] bg-gray-100 border border-gray-500 hover:border-gray-900 rounded-[8px]">
            3
          </div>
          <p className="ml-3">서류 평가하기</p>
          <img
            src="assets/ic-sidemenuDropdown.svg"
            alt="메뉴 드롭다운"
            className="w-[10px] h-[10px] absolute right-3"
          />
        </div>

        <div className="relative dropdown-list flex items-center h-[46px] text-subheadline  hover:text-gray-900">
          <div className="flex-center w-[33px] h-[30px] bg-gray-100 border border-gray-500 hover:border-gray-900  rounded-[8px]">
            4
          </div>
          <p className="ml-3">서류 합격자 및 면접 안내</p>
          <img
            src="assets/ic-sidemenuDropdown.svg"
            alt="메뉴 드롭다운"
            className="w-[10px] h-[10px] absolute right-3"
          />
        </div>

        <div className="relative dropdown-list flex items-center h-[46px] text-subheadline  hover:text-gray-900">
          <div className="flex-center w-[33px] h-[30px] bg-gray-100 border border-gray-500 hover:border-gray-900  rounded-[8px]">
            5
          </div>
          <p className="ml-3">면접 평가하기 </p>
          <img
            src="assets/ic-sidemenuDropdown.svg"
            alt="메뉴 드롭다운"
            className="w-[10px] h-[10px] absolute right-3"
          />
        </div>

        <div className="relative dropdown-list flex items-center h-[46px] text-subheadline  hover:text-gray-900">
          <div className="flex-center w-[33px] h-[30px] bg-gray-100 border border-gray-500 hover:border-gray-900 rounded-[8px]">
            6
          </div>
          <p className="ml-3">최종 합격자 및 홛동 안내</p>
          <img
            src="assets/ic-sidemenuDropdown.svg"
            alt="메뉴 드롭다운"
            className="w-[10px] h-[10px] absolute right-3"
          />
        </div>
      </section>

      <section className="absolute bottom-[26px] text-gray-600 text-left text-callout mt-[19px]">
        <div className="flex items-center h-[46px]">
          <div className="w-6 h-6 bg-gray-600 mr-[10px]"></div>공지 알림 및 소통
          <div className="flex-center ml-[64px] py-[5px] px-[8px] bg-black-100 text-white-100 rounded-[8px] text-caption3 cursor-pointer">
            23
          </div>
        </div>
      </section>
    </div>
  );
}
