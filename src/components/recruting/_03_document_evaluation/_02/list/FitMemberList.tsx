import React from "react";
import Button from "./button/Button";
import { ButtonState } from "./types/buttonTypes";

interface FitMemberListProps {
  items: {
    id: string;
    state: ButtonState;
    name: string;
    phone: string;
    group: string;
    incomplete: number;
    all: number;
    result?: "합격" | "불합격";
  }[];
}

const FitMemberList: React.FC<FitMemberListProps> = ({ items }) => {
  return (
    <div className="flex flex-col w-full rounded-[7px] gap-4 max-h-[720px]">
      <ul className="flex items-center p-4 w-full h-[42px] bg-[#F1F3FF] gap-2 rounded-md">
        <li className="w-28 font-Pretendard text-[13.856px] font-semibold text-[#565965] leading-normal text-left">
          상태
        </li>
        <li className="w-28 font-Pretendard text-[13.856px] font-semibold text-[#565965] leading-normal text-left">
          이름
        </li>
        <li className="w-28 font-Pretendard text-[13.856px] font-semibold text-[#565965] leading-normal text-left">
          그룹
        </li>
        <li className="w-32 font-Pretendard text-[13.856px] font-semibold text-[#565965] leading-normal text-left">
          운영진 평가상황
        </li>
      </ul>
      <ul className="flex flex-col overflow-y-auto">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center p-4 h-16 border-b-[0.5px] border-[#D6D7DA] gap-2"
          >
            <div className="text-left w-28">
              <Button state={item.state as ButtonState} />
            </div>
            <div className="flex flex-col text-left w-28">
              <div className="text-[13.856px] font-Pretendard font-semibold text-[#3B3D46] leading-normal">
                {item.name}
              </div>

              <div className="text-xs font-Pretendard font-normal text-[#8b8fa4]">
                {item.phone}
              </div>
            </div>

            <div className="text-sm font-semibold text-left w-28 font-Pretendard text-gray-1100">
              {item.group}
            </div>

            <div
              className={`w-32 text-sm font-medium text-left font-Pretendard ${
                item.result === "합격"
                  ? "text-[#007AFF]"
                  : item.result === "불합격"
                    ? "text-red-100"
                    : "text-gray-1100"
              }`}
            >
              {item.result ? item.result : `${item.incomplete} / ${item.all}`}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FitMemberList;
