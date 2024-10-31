export default function AdminProfileDropdown() {
  return (
    <div className="absolute top-[50px] right-[10px] bg-white-100 z-50 w-[320px] h-auto p-2 rounded-[12px]">
      <ul>
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
        <li className="dropdown-list">
          <img
            src="/assets/ic-add.svg"
            alt="운영자 계정 프로필"
            className="w-[35px] h-[35px] mx-3"
          />
          <p className="mx-3 text-gray-600">동아리 추가</p>
        </li>
      </ul>
    </div>
  );
}
