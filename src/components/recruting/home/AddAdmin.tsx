//리크루팅 운영진 추가

interface AddAdminProps {
  isDropdown?: boolean;
}

const dummyAdmins: AdminUser[] = [
  { id: "1", name: "홍준서", email: "12345678@gmail.com" },
  { id: "2", name: "홍준서", email: "12345678@gmail.com" },
  { id: "3", name: "홍준서", email: "12345678@gmail.com" },
  { id: "4", name: "홍준서", email: "12345678@gmail.com" },
  { id: "5", name: "홍준서", email: "12345678@gmail.com" }
];

export default function AddAdmin({ isDropdown }: AddAdminProps) {
  return (
    <ul
      className={` ${isDropdown ? "absolute right-0 top-10 bg-white-100 h-auto custom-shadow" : "bg-gray-100 h-[340.88px]"} w-[300px]  px-[17px] py-[18px]  rounded-[12px]`}
    >
      {dummyAdmins.map((admin) => (
        <li
          key={admin.id}
          className={` ${isDropdown ? "dropdown-list " : ""} flex w-full mb-4`}
        >
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
