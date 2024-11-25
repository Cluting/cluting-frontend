import { useState } from "react";
import FailList from "./FailList";
import PassList from "./PassList";
import AlignDropdown from "./AlignDropdown";
import FilterDropdown from "./FilterDropdown";

// 4-1 지원자 합불 결과 (컨테이너)
export default function ApplicantStatusContainer() {
  const [filter, setFilter] = useState("전체");
  const [align, setAlign] = useState("지원순");

  const [showFilter, setShowFilter] = useState(false);
  const [showAlign, setShowAlign] = useState(false);

  //TODO: 정렬은 백에서 처리한 데이터로
  return (
    <div>
      <div className="w-full flex ">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <div
              onClick={() => {
                setShowFilter(!showFilter);
              }}
              className="relative flex-center gap-[17px] bg-white-100 border border-gray-200 rounded-[6px] mr-[21px] py-[6px] px-[11px] text-[14px]"
            >
              <span className="font-semibold">필터:</span> {filter}
              <img src="/assets/ic-dropdown.svg" />
              {showFilter && (
                <FilterDropdown
                  onSelectFilter={(selectedFilter) => {
                    setFilter(selectedFilter); // 필터 업데이트
                    setShowFilter(false); // 드롭다운 닫기
                  }}
                />
              )}
            </div>
            <div
              onClick={() => {
                setShowAlign(!showAlign);
              }}
              className="relative flex-center gap-[17px] bg-white-100 border border-gray-200 rounded-[6px] py-[6px] px-[11px] text-[14px]"
            >
              <span className="font-semibold">정렬:</span> 가나다순
              <img src="/assets/ic-dropdown.svg" />
              {showAlign && <AlignDropdown align={align} />}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 w-full mt-[18px] px-[25px] py-[18px] border border-gray-200 rounded-[21px] ">
        <div className="grid grid-cols-2">
          <PassList filter={filter} />
          <FailList filter={filter} />
        </div>
      </div>
    </div>
  );
}
