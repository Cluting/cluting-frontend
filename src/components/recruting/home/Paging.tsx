export default function Paging() {
  return (
    //UI만 구현
    <div className="flex-center">
      <div className="w-[199px] h-[23px] flex flex-center gap-[3px] cursor-pointer text-[16px]">
        <p className="w-[24px] h-[23px] text-gray-500">‹</p>
        <p className="w-[24px] h-[23px] text-gray-500">1</p>
        <p className="w-[24px] h-[23px] text-gray-500">2</p>
        <p className="w-[24px] h-[23px] bg-gray-850 rounded-full text-white-100 flex-center">
          3
        </p>
        <p className="w-[24px] h-[23px] text-gray-500">4</p>
        <p className="w-[24px] h-[23px] text-gray-500">5</p>
        <p className="w-[24px] h-[23px] text-gray-500">6</p>
        <p className="w-[24px] h-[23px] text-gray-500">›</p>
      </div>
    </div>
  );
}
