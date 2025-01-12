import { useState } from "react";
import FailList from "./FailList";
import PassList from "./PassList";
import FilterDropdown from "../../_04_interview_notification/_01/FilterDropdown";
import AlignDropdown from "../../_04_interview_notification/_01/AlignDropdown";
import { getFinalInterviewResults } from "../service/Step6";
import { useQuery } from "@tanstack/react-query";

// 6-1 지원자 합불 결과(컨테이너)
export default function ApplicantStatusContainer() {
  const [filter, setFilter] = useState("전체");
  const [align, setAlign] = useState("최신순");

  const [showFilter, setShowFilter] = useState(false);
  const [showAlign, setShowAlign] = useState(false);

  const getSortParameter = (align: string) => {
    switch (align) {
      case "가나다순":
        return "INORDER";
      case "최신순":
        return "NEWEST";
      case "오래된순":
        return "OLDEST";
      default:
        return "NEWEST";
    }
  };

  const { data } = useQuery(
    ["interviewEvaluation", align],
    () => getFinalInterviewResults(1, getSortParameter(align)),
    {
      refetchOnWindowFocus: false
    }
  );

  return (
    <div>
      <div className="w-full flex ">
        <div className="w-full flex justify-between items-center">
          <div className="w-full flex items-center justify-between">
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
                <span className="font-semibold">정렬:</span> {align}
                <img src="/assets/ic-dropdown.svg" />
                {showAlign && (
                  <AlignDropdown
                    onSelectAlign={(selectedAlign) => {
                      setAlign(selectedAlign); // 필터 업데이트
                      setShowAlign(false); // 드롭다운 닫기
                    }}
                  />
                )}
              </div>
            </div>
            <div className="tooltip">
              마지막으로 최중 합불 결과를 확인해 주세요.
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 w-full mt-[18px] px-[25px] py-[18px] border border-gray-200 rounded-[21px] ">
        <div className="grid grid-cols-2">
          <PassList
            filter={filter}
            passData={data?.passed}
            byGroup={data?.byGroup}
          />
          <FailList
            filter={filter}
            data={data?.failed}
            byGroup={data?.byGroup}
          />
        </div>
      </div>
    </div>
  );
}
