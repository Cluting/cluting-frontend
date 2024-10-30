export default function ClubAlignDropdown() {
  return (
    <div className="absolute top-[28px] right-[-17px] z-10 bg-white-100 w-[130px] h-[120px] rounded-[12px] border border-gray-300">
      <ul className="flex flex-col items-center justify-center h-full">
        <li className="small-dropdown-list">
          <p className="text-center text-gray-800 font-medium">마감임박순</p>
        </li>
        <li className="small-dropdown-list">
          <p className="text-center text-gray-800 font-medium">최신순</p>
        </li>
        <li className="small-dropdown-list">
          <p className="text-center text-gray-800 font-medium">오래된 순</p>
        </li>
      </ul>
    </div>
  );
}
