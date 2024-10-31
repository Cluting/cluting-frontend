//리크루팅 운영진 추가
export default function AddAdmin() {
  return (
    <ul className="w-[300px] h-[340.88px] px-[17px] py-[18px] bg-gray-100 rounded-[12px]">
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index} className="flex w-full mb-4">
          <img
            src="/assets/ic-profile.svg"
            alt="프로필"
            className="w-[40px] h-[40px] mr-[3px]"
          />
          <div className="flex flex-col text-left mx-3">
            <p className="text-caption1 text-gray-900">홍준서</p>
            <p className="text-caption3 text-gray-600">12345678@gmail.com</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
