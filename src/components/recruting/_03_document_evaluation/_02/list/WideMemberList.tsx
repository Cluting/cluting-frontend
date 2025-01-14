import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { getMe } from "../../../../signup/services/User";

interface WideMemberListProps {
  items: Applicant[]; // Applicant 타입의 배열로 변경
}
const WideMemberList: React.FC<WideMemberListProps> = ({ items }) => {
  const { data: user } = useQuery(["me"], getMe);

  const stateStyles = {
    BEFORE: "bg-[#F1F3FF] text-[#8B8FA4]",
    EDITABLE: "bg-main-300 text-[#43454F]",
    "열람 가능": "bg-[#BAF3E4] text-[#43454F]"
  };

  const maskPhoneNumber = (phone: string) => {
    // 정규식
    return phone.replace(/(\d{3})-\d{4}-(\d{4})/, "$1-****-$2");
  };

  const evaluationItem = location.pathname.startsWith(
    "/recruting/05_interview_evaluation/interview"
  )
    ? "interview"
    : "doc";

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
        {items.map((item) => {
          const groupAccess =
            user &&
            item.evaluators?.some(
              (evaluator) => evaluator?.name === user?.name
            );
          return (
            <Link
              to={
                evaluationItem === "doc"
                  ? `/recruting/evaluation/${item.id}`
                  : `/recruting/interview_evaluation_record/${item.id}`
              }
              key={item.id}
            >
              <li
                key={item.id}
                className="flex items-center p-4 h-16 border-b-[0.5px] border-[#D6D7DA] gap-2 hover:bg-gray-100"
              >
                <div className="w-32 text-left">
                  {/*  keyof typeof 를 쓸 경우, 예외처리가 발생 시 오류남. 목업 때만 사용 후 수정 필요 */}

                  {item.evaluationStage === "BEFORE" && (
                    <button
                      className={`${stateStyles[item.evaluationStage as keyof typeof stateStyles]} px-4 py-2 rounded-[38px] text-caption3 `}
                    >
                      {"평가전"}
                    </button>
                  )}

                  {item.evaluationStage === "EDITABLE" ? (
                    groupAccess ? (
                      <button className="text-caption3 text-gray-1000  bg-main-300 px-3 py-2  rounded-[38px]">
                        수정 가능
                      </button>
                    ) : (
                      <button className="text-caption3 text-gray-1000 bg-[#BAF3E4] px-3 py-2  rounded-[38px]">
                        열람 가능
                      </button>
                    )
                  ) : null}
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
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default WideMemberList;
