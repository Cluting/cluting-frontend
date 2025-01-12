import React, { useState } from "react";
import Button from "./button/Button";
import { Link } from "react-router-dom";

interface FitMemberListProps {
  items: Applicant[]; // Applicant 타입의 배열로 변경
  state: string;
  isEvaluationDone?: boolean;
  onDispute?: (id: string) => void; // 이의제기
  onDecision?: (id: string) => void;
}

const FitMemberList: React.FC<FitMemberListProps> = ({
  items,
  state,
  isEvaluationDone,
  onDispute,
  onDecision
}) => {
  const [decisionModeItemId, setDecisionModeItemId] = useState<string | null>(
    null
  );
  const handleDecisionModeClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setDecisionModeItemId(id);
  };

  const handleDecision = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onDecision?.(id);
    setDecisionModeItemId(null);
  };

  const evaluationItem = location.pathname.startsWith(
    "/recruting/05_interview_evaluation/interview"
  )
    ? "interview"
    : "doc";

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
          const groupAccess = item.evaluators?.[0]?.groupAccess === item.group;
          return (
            <>
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
                  <div className="text-left w-28">
                    {state === "평가 중" && (
                      <Button
                        state={state}
                        onClick={() => onDispute?.(item.id)}
                      />
                    )}
                    {!isEvaluationDone &&
                    item.evaluators?.[0]?.state === "평가 완료" ? (
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

                    {isEvaluationDone &&
                      item.evaluators?.[0]?.state === "평가 완료" && (
                        <button className="text-caption2 text-main-100 bg-main-300 px-3 py-[6px] rounded-[7px] border border-main-400">
                          이의 제기
                        </button>
                      )}
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
                    {decisionModeItemId ? (
                      <button
                        className="px-3 py-2 rounded-md bg-[#5E2BE8] text-white-100"
                        onClick={(e) => handleDecision(e, item.id)}
                      >
                        합불 결정하기
                      </button>
                    ) : isEvaluationDone ? (
                      <button
                        onClick={(e) => handleDecisionModeClick(e, item.id)}
                        className={
                          item.isPass === true
                            ? "text-[#007AFF]"
                            : "text-red-100"
                        }
                      >
                        {item.isPass === true ? "합격" : "불합격"}
                      </button>
                    ) : (
                      `${item.incomplete} / ${item.all}`
                    )}
                  </div>
                </li>
              </Link>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default FitMemberList;
