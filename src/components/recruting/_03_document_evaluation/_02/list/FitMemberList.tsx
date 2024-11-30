import React from "react";
import Button from "./button/Button";

interface FitMemberListProps {
  items: Applicant[]; // Applicant 타입의 배열로 변경
  onDispute?: (id: string) => void; // 이의제기
  onDecision?: (id: string) => void;
}

const FitMemberList: React.FC<FitMemberListProps> = ({
  items,
  onDispute,
  onDecision
}) => {
  return (
    <div className="flex flex-col w-full rounded-[7px] gap-4 max-h-[720px]">
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
        <li className="w-32 font-Pretendard text-[13.856px] font-semibold text-[#565965] leading-normal text-left">
          운영진 평가상황
        </li>
      </ul>
      <ul className="flex flex-col overflow-y-auto">
        {items.map((item) => {
          const evaluatorState = item.evaluators?.[0]?.state || "평가 중";
          return (
            <li
              key={item.id}
              className="flex items-center p-4 h-16 border-b-[0.5px] border-[#D6D7DA] gap-2 hover:bg-gray-100"
            >
              <div className="text-left w-28">
                <Button
                  state={evaluatorState}
                  onClick={() => onDispute?.(item.id)}
                />
              </div>
              <div className="flex flex-col text-left w-28">
                <div className="text-[13.856px] font-Pretendard font-semibold text-[#3B3D46] leading-normal">
                  {item.name}
                </div>
                <div className="text-xs font-Pretendard font-normal text-[#8b8fa4]">
                  {item.phone}
                </div>
              </div>

              <div className="w-16 text-sm font-semibold text-left font-Pretendard text-gray-1100">
                {item.group}
              </div>

              <div className="w-32 text-sm font-medium text-left font-Pretendard">
                {item.isDecisionMode ? (
                  <button
                    className="px-3 py-2 rounded-md bg-[#5E2BE8] text-white"
                    onClick={() => onDecision?.(item.id)}
                  >
                    합불 결정하기
                  </button>
                ) : item.isPass ? (
                  <span
                    className={
                      item.isPass === true ? "text-[#007AFF]" : "text-red-100"
                    }
                  >
                    {item.isPass === true ? "합격" : "불합격"}
                  </span>
                ) : (
                  `${item.incomplete} / ${item.all}`
                )}
                {/* {item.isDisputed && (
                <span className="ml-2 text-xs text-[#5E2BE8]">이의 반영</span>
              )} */}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FitMemberList;
