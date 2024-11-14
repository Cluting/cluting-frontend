import { Link } from "react-router-dom";

export default function AdminProfileDropdown() {
  //FIX: 동아리 리크루팅 홈 연결되는 주소 수정
  return (
    <div className=" absolute animate-dropdown top-[50px] right-[10px] bg-white-100 z-50 w-[320px] h-auto p-2 rounded-[12px]">
      <ul>
        <Link to="/recruting/home">
          <li className="dropdown-list">
            <img
              src="/assets/ic-profile.svg"
              alt="프로필"
              className="w-[35px] h-[35px] mx-3"
            />
            <div className="flex flex-col text-left mx-3">
              <p className="text-body text-gray-900">잇타</p>
              <p className="text-caption text-gray-900">
                IT 서비스 동아리 / 연합
              </p>
            </div>
          </li>
        </Link>
        <Link to="/recruting/home">
          <li className="dropdown-list">
            <img
              src="/assets/ic-profile.svg"
              alt="프로필"
              className="w-[35px] h-[35px] mx-3"
            />
            <div className="flex flex-col text-left mx-3">
              <p className="text-body text-gray-900">잇타</p>
              <p className="text-caption text-gray-900">
                IT 서비스 동아리 / 연합
              </p>
            </div>
          </li>
        </Link>
        <Link to="/recruting/home">
          <li className="dropdown-list">
            <img
              src="/assets/ic-profile.svg"
              alt="프로필"
              className="w-[35px] h-[35px] mx-3"
            />
            <div className="flex flex-col text-left mx-3">
              <p className="text-body text-gray-900">잇타</p>
              <p className="text-caption text-gray-900">
                IT 서비스 동아리 / 연합
              </p>
            </div>
          </li>
        </Link>
        <Link to="/recruting/home">
          <li className="dropdown-list">
            <img
              src="/assets/ic-profile.svg"
              alt="프로필"
              className="w-[35px] h-[35px] mx-3"
            />
            <div className="flex flex-col text-left mx-3">
              <p className="text-body text-gray-900">잇타</p>
              <p className="text-caption text-gray-900">
                IT 서비스 동아리 / 연합
              </p>
            </div>
          </li>
        </Link>
        <Link to="/register_club" className="dropdown-list">
          <img
            src="/assets/ic-add.svg"
            alt="운영자 계정 프로필"
            className="w-[35px] h-[35px] mx-3"
          />
          <p className="mx-3 text-gray-600">동아리 추가</p>
        </Link>
      </ul>
    </div>
  );
}
