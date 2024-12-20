export default function ListHeader() {
  return (
    <ul className="flex items-center p-4 w-full h-[42px] bg-[#F1F3FF] gap-2 rounded-md">
      <li className="w-28 font-Pretendard text-[13.856px] font-semibold text-[#565965] leading-normal text-left">
        상태
      </li>
      <li className="w-28 font-Pretendard text-[13.856px] font-semibold text-[#565965] leading-normal text-left">
        이름
      </li>
      <li className="w-16 font-Pretendard text-[13.856px] font-semibold text-[#565965] leading-normal text-left">
        그룹
      </li>
    </ul>
  );
}
