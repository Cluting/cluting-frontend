import React from "react";
import { Link } from "react-router-dom";

interface WideMemberListProps {
  items: Applicant[]; // Applicant 타입의 배열로 변경
}
const WideMemberList: React.FC<WideMemberListProps> = ({ items }) => {
  const stateStyles = {
    "평가 전": "bg-[#F1F3FF] text-[#8B8FA4]",
    "수정 가능": "bg-main-300 text-[#43454F]",
    "열람 가능": "bg-[#BAF3E4] text-[#43454F]"
  };

  const maskPhoneNumber = (phone: string) => {
    // 정규식
    return phone.replace(/(\d{3})-\d{4}-(\d{4})/, "$1-****-$2");
  };

  return (
    <div className="flex flex-col w-full rounded-[7px] gap-4 max-h-[720px]">
      <ul className="flex items-center p-4 w-full h-[42px] bg-[#F1F3FF] gap-2 rounded-md">
        <li className="w-32 font-Pretendard text-[13.856px] font-semibold text-[#565965] leading-normal text-left">
          상태
        </li>
        <li className="w-32 font-Pretendard text-[13.856px] font-semibold text-[#565965] leading-normal text-left">
          이름
        </li>
        <li className="w-32 font-Pretendard text-[13.856px] font-semibold text-[#565965] leading-normal text-left">
          그룹
        </li>
        <li className="w-48 font-Pretendard text-[13.856px] font-semibold text-[#565965] leading-normal text-left">
          운영진 평가상황
        </li>
      </ul>
      <ul className="flex flex-col overflow-y-auto">
        <Link to="/recruting/evaluation">
          {items.map((item) => {
            const evaluatorState = item.evaluators?.[0]?.state || "평가 전";
            return (
              <li
                key={item.id}
                className="flex items-center p-4 h-16 border-b-[0.5px] border-[#D6D7DA] gap-2 hover:bg-gray-100"
              >
                <div className="w-32 text-left">
                  {/*  keyof typeof 를 쓸 경우, 예외처리가 발생 시 오류남. 목업 때만 사용 후 수정 필요 */}
                  <button
                    className={`${stateStyles[evaluatorState as keyof typeof stateStyles]} px-4 py-2 rounded-[38px] text-caption3 `}
                  >
                    {evaluatorState}
                  </button>
                </div>
                <div className="flex flex-col w-32 text-left">
                  <div className="text-[13.856px] font-Pretendard font-semibold text-[#3B3D46] leading-normal">
                    {item.name}
                  </div>

                  <div className="text-xs font-Pretendard font-normal text-[#8b8fa4]">
                    {maskPhoneNumber(item.phone)}
                  </div>
                </div>

                <div className="w-32 text-sm font-semibold text-left font-Pretendard text-gray-1100">
                  {item.group}
                </div>

                <div className="w-48 text-sm font-medium text-left font-Pretendard text-gray-1100">
                  {item.incomplete} / {item.all}
                </div>
              </li>
            );
          })}
        </Link>
      </ul>
    </div>
  );
};

export default WideMemberList;
