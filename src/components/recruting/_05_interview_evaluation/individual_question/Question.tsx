interface QuestionProps {
  id: number;
  onRemove: () => void;
}

export default function Question({ id, onRemove }: QuestionProps) {
  return (
    <div className="w-full my-3">
      <div className="rounded-[6.35px] py-[11px] px-[15px] bg-[#F6F6F6] border border-[#D6D7DA]">
        <div className="flex justify-between items-center">
          <div className="flex-center">
            <div className="flex-center w-7 h-7 rounded-full bg-main-300 text-main-100 mr-2">
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
    </div>
  );
}
