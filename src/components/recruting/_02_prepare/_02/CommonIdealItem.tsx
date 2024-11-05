export default function CommonIdealItem({
  text,
  id,
  onRemove
}: CommonIdealItemProps) {
  return (
    <div className="flex-center justify-between mb-[24px] py-[11px] px-[21px] bg-white-100 rounded-[8px] border border-gray-500 text-[15px] font-medium text-[#3A3A3C]">
      <span>{text}</span>
      <button
        onClick={() => onRemove(id)}
        className="flex-center w-4 h-4 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-500 hover:text-gray-100"
      >
        -
      </button>
    </div>
  );
}
