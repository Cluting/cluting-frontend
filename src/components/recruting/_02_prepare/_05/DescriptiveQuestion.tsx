export default function DescriptiveQuestion() {
  return (
    <div>
      <textarea
        placeholder="지원자의 답변 작성란 입니다."
        className="w-full min-h-[91px] mt-[18px] py-[15px] pl-[20px] rounded-[8px] border border-gray-400 outline-none hover:border-main-100"
      />
      <div className="flex-center justify-end mt-[10px]">
        <input
          type="checkbox"
          className="w-[18px] h-[18px] mr-2 cursor-pointer 
                appearance-none
                checked:bg-main-100 
                border border-gray-300 rounded"
        />
        <p>글자 수 제한</p>

        <input
          type="text"
          placeholder="500"
          className="flex-center w-[66px] h-[26px] ml-[7px] px-[9px] py-[5px] rounded-[6px] border border-gray-400 outline-none text-caption2 hover:border-main-100"
        />
      </div>
    </div>
  );
}
