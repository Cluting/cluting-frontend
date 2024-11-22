export default function EvaluationCard() {
  return (
    <div className="bg-gray-100 border border-gray-200 rounded-[6.35px] my-[10px] py-[11px] px-[10px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="flex-center mr-2 py-[6px] px-[14px] text-main-100 rounded-full bg-main-400 font-bold text-[15.71px]">
            1
          </div>
          <p className="text-subheadline text-gray-1400">{"파트 적합성"}</p>
        </div>
        <div className="flex-center gap-[3px] bg-white-100 border border-gray-200 rounded-[5px] px-[10px] py-[5px]">
          <p className="text-caption3 text-gray-1100 ">{"95"}</p>
          <p className="text-caption2 text-gray-600">/100점</p>
        </div>
      </div>

      <div className="bg-white-100 rounded-1 mb-2 py-[7px] px-[9px] text-[16px] text-left text-[#595959]">
        {"본인이 가지고 있는 기술능력을 잘 설명했는가?"}
      </div>

      <div className="bg-white-100 rounded-1 mb-2 py-[7px] px-[9px] text-[16px] text-left text-[#595959]">
        {
          "본인이 가지고 있는 기술능력을 잘 설명했는가?본인이 가지고 있는 기술능력을 잘 설명했는가?"
        }
      </div>

      <div className="bg-white-100 rounded-1 mb-2 py-[7px] px-[9px] text-[16px] text-left text-[#595959]">
        {"본인이 가지고 있는 기술능력을 잘 설명했는가?"}
      </div>
    </div>
  );
}
