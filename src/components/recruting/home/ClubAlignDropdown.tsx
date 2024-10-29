export default function ClubAlignDropdown() {
  return (
    <div className="absolute top-[50px] right-[10px] bg-white-100 w-[130px] h-[120px] rounded-[12px] border border-gray-300">
      <ul className="flex flex-col items-center justify-center h-full">
        <li className="w-[114px] h-[36px] p-2 rounded-[8px] cursor-pointer hover:bg-gray-200 flex items-center justify-center">
          <p className="text-center text-gray-800">마감임박순</p>
        </li>
        <li className="w-[114px] h-[36px] p-2 rounded-[8px] cursor-pointer hover:bg-gray-200 flex items-center justify-center">
          <p className="text-center text-gray-800">최신순</p>
        </li>
        <li className="w-[114px] h-[36px] p-2 rounded-[8px] cursor-pointer hover:bg-gray-200 flex items-center justify-center">
          <p className="text-center text-gray-800">오래된 순</p>
        </li>
      </ul>
    </div>
  );
}
