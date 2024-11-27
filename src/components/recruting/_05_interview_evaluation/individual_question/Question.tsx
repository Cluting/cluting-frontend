interface QuestionProps {
  id: number;
  checked: boolean;
  onRemove: () => void;
  onToggle: (id: number) => void;
}

export default function Question({
  id,
  checked,
  onRemove,
  onToggle
}: QuestionProps) {
  const handleCheckboxChange = () => {
    onToggle(id); // 클릭 시 부모로 ID 전달
  };
  //FIX: 체크박스, 질문 추가 아이콘 색상 변경

  return (
    <div className="w-full my-3 flex items-center justify-between">
      <div className="w-full rounded-[6.35px] py-[11px] px-[15px] bg-[#F6F6F6] border border-[#D6D7DA]">
        <div className="flex justify-between items-center">
          <div
            className="
          )flex-center"
          >
            <div className="flex-center w-7 h-7 rounded-full bg-main-300 font-bold text-main-100 mr-2">
              {id}
            </div>
            <p className="font-semibold text-[15px]">개인 질문</p>
          </div>
          <img
            src="/assets/ic-minusCircle.svg"
            className="cursor-pointer"
            onClick={onRemove}
            alt="삭제"
          />
        </div>

        <textarea
          placeholder="질문을 입력해 주세요"
          className="input-style input-background w-full h-[100px] mt-4 text-[12.7px]"
        />
      </div>
      <button
        className="relative ml-[22px] mr-[7px] cursor-pointer"
        onClick={handleCheckboxChange} // 이미지 클릭 시 체크 상태 변경
      >
        <img
          src="/assets/ic-uncheckbox.svg"
          alt="체크박스"
          className="w-6 h-6"
        />
        {checked && (
          <>
            <img
              src="/assets/ic-checkbox.svg"
              alt="체크박스 배경"
              className="absolute top-0 left-0 w-6 h-6"
            />
            <img
              src="/assets/ic-check.svg"
              alt="체크 표시"
              className="absolute top-[6px] left-[4px] w-3 h-3"
            />
          </>
        )}
      </button>
    </div>
  );
}
