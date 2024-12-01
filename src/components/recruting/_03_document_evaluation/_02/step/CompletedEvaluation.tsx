import React, { useEffect, useState } from "react";
import { ButtonState } from "../list/types/buttonTypes";
import FitMemberList from "../list/FitMemberList";
interface CompletedEvaluationProps {
  filter: string;
  sortType: string;
}

interface Member {
  id: string;
  state: ButtonState;
  name: string;
  phone: string;
  group: string;
  result?: "합격" | "불합격";
  isDecisionMode?: boolean;
  isDisputed?: boolean;
}

const CompletedEvaluation: React.FC<CompletedEvaluationProps> = ({
  filter,
  sortType
}) => {
  const mockData: Member[] = [
    {
      id: "1",
      state: "이의 제기중",
      name: "김은혜",
      phone: "010-1234-1234",
      group: "개발",
      result: "합격",
      isDecisionMode: false,
      isDisputed: false
    },
    {
      id: "2",
      state: "이의 제기",
      name: "윤다인",
      phone: "010-1234-1234",
      group: "개발",
      result: "합격",
      isDecisionMode: false,
      isDisputed: false
    },
    {
      id: "10",
      state: "이의 제기",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      result: "합격",
      isDecisionMode: false,
      isDisputed: false
    },
    {
      id: "4",
      state: "이의 제기",
      name: "김무무",
      phone: "010-1234-1234",
      group: "기획",
      result: "합격",
      isDecisionMode: false,
      isDisputed: false
    },
    {
      id: "5",
      state: "이의 제기중",
      name: "김은혜",
      phone: "010-1234-1234",
      group: "개발",
      result: "불합격",
      isDecisionMode: false,
      isDisputed: false
    }
  ];

  const [members, setMembers] = useState<Member[]>(mockData);
  const [filteredData1, setFilteredData1] = useState<Member[]>([]);
  const [filteredData2, setFilteredData2] = useState<Member[]>([]);

  useEffect(() => {
    const filteredAccepted = members.filter((item) => item.result === "합격");
    const filteredRejected = members.filter((item) => item.result === "불합격");

    const sortData = (data: Member[]) =>
      sortType === "가나다순"
        ? [...data].sort((a, b) => a.name.localeCompare(b.name))
        : data;

    setFilteredData1(
      filter === "전체"
        ? sortData(filteredAccepted)
        : sortData(filteredAccepted.filter((item) => item.group === filter))
    );

    setFilteredData2(
      filter === "전체"
        ? sortData(filteredRejected)
        : sortData(filteredRejected.filter((item) => item.group === filter))
    );
  }, [filter, sortType, members]);

  const handleDispute = (id: string) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id
          ? {
              ...member,
              state: "이의 제기중",
              isDecisionMode: !member.isDisputed,
              isDisputed: true
            }
          : member
      )
    );
  };

  const handleDecision = (id: string) => {
    const isAccepted = window.confirm("합격으로 결정하시겠습니까?");
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id
          ? {
              ...member,
              result: isAccepted ? "합격" : "불합격",
              isDecisionMode: false
            }
          : member
      )
    );
  };

  return (
    <div className="w-[1016px] flex items-start gap-[22px] p-[20px] self-stretch rounded-[21px] border border-[#D0D4E7] bg-white-100">
      <div className="flex flex-col gap-4 w-[476px]">
        <h2 className="text-left text-gray-1100 text-title3">
          결과를 수정하려면 이의를 제기해주세요.
        </h2>
        <FitMemberList
          items={filteredData1}
          onDispute={handleDispute}
          onDecision={handleDecision}
        />
      </div>

      <div className="flex flex-col gap-4 w-[476px]">
        <h2 className="text-left text-gray-1100 text-title3 h-[24px]"></h2>
        <FitMemberList
          items={filteredData2}
          onDispute={handleDispute}
          onDecision={handleDecision}
        />
      </div>
    </div>
  );
};

export default CompletedEvaluation;
