import { Link } from "react-router-dom";

export default function Sidemenu() {
  return (
    <div className="relative rounded-[28px] bg-white-100 custom-shadow w-[300px] px-5 h-[916px]  py-[26px] transition-all">
      <section className="flex items-center w-full h-[86px] bg-gray-100 boreder border-main-300 px-[18px] rounded-[14px] transition-all">
        <img
          src="/assets/ic-profile.svg"
          alt="지원자 프로필"
          className="w-[50px] h-[50px] "
        />
        <div className="text-left ml-4">
          <p className="text-body">김민지</p>
          <p className="text-gray-900 text-caption1 mt-[5px]">abcd@naver.com</p>
        </div>
      </section>

      <section className="text-gray-600 text-left text-callout mt-[19px]">
        <Link to={"/recruting/home"}>
          <button className="flex items-center h-[46px] hover:bg-gray-100 w-full rounded-[8px] pl-3">
            <img
              src="/assets/ic-sidemenu-home.svg"
              alt="프로필 홈"
              className="w-6 h-6 mr-[10px]"
            />
            프로필 홈
          </button>
        </Link>

        <button className="flex items-center mt-1 hover:bg-gray-100 w-full rounded-[8px] pl-3  h-[46px]">
          <img
            src="/assets/ic-sidemenu-setting.svg"
            alt="계정 설정"
            className="w-6 h-6 mr-[10px]"
          />
          계정 설정
        </button>
      </section>

      <section className="text-gray-600 text-subheadline border-t border-t-1 my-5">
        <Link
          to={"/applicant/profile"}
          className="h-[46px] flex items-center my-[10px] rounded-lg hover:bg-gray-100 hover:text-gray-900 group"
        >
          <img
            src="/assets/sidemenu/ic-saveProfile.svg"
            className=" w-6 h-6 mx-3 group-hover:hidden"
          />

          <img
            src="/assets/sidemenu/ic-saveProfile-main.svg"
            className=" w-6 h-6 mx-3 hidden group-hover:block"
          />
          <p>기본 프로필 저장</p>
        </Link>

        <Link
          to={"/applicant/announcement/:menu"}
          className="h-[46px] flex items-center my-[10px] rounded-lg hover:bg-gray-100 hover:text-gray-900 group"
        >
          <img
            src="/assets/sidemenu/ic-announcementList.svg"
            className=" w-6 h-6 mx-3 group-hover:hidden"
          />

          <img
            src="/assets/sidemenu/ic-announcementList-main.svg"
            className=" w-6 h-6 mx-3 hidden group-hover:block"
          />
          <p>공고 리스트</p>
        </Link>

        <Link
          to={"/applicant/applications/:menu"}
          className="h-[46px] flex items-center my-[10px] rounded-lg hover:bg-gray-100 hover:text-gray-900 group"
        >
          <img
            src="/assets/sidemenu/ic-myHistory.svg"
            className=" w-5 h-5 mx-3 group-hover:hidden"
          />
          <img
            src="/assets/sidemenu/ic-myHistory-main.svg"
            className=" w-5 h-5 mx-3 hidden group-hover:block"
          />
          <p>나의 지원 기록</p>
        </Link>
      </section>
    </div>
  );
}
