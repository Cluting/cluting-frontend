import { useState } from "react";
import FailList from "./FailList";
import PassList from "./PassList";

// 4-1 지원자 합불 결과 (컨테이너)
export default function ApplicantStatusContainer() {
  //FIX: 필터 지정할 수 있는 드롭다운 구현 - 우선 현재는 기획으로 필터링
  const [filter, setFilter] = useState("기획");

  //TODO: 정렬은 백에서 처리한 데이터로
  return (
    <div>
      <div className="w-full flex ">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-white-100 border border-gray-200 rounded-[6px] mr-[21px] py-[7.5px] px-[11px] text-[14px]">
              <span className="font-semibold">필터:</span> {filter}
            </div>
            <div className="bg-white-100 border border-gray-200 rounded-[6px] py-[7.5px] px-[11px] text-[14px]">
              <span className="font-semibold">정렬:</span> 가나다순
            </div>
          </div>

          <div className="tooltip">
            마지막으로 최종 합불 결과를 확인해 주세요.
          </div>
        </div>
      </div>
      <div className="bg-gray-50 w-full mt-[18px] px-[25px] py-[18px] border border-gray-200 rounded-[6.65px] ">
        <div className="grid grid-cols-2">
          <PassList filter={filter} />
          <FailList filter={filter} />
        </div>
      </div>
    </div>
  );
}
