import React from "react";
import WideMemberList from "../list/WideMemberList";

interface BeforeEvaluationProps {
  filteredData: {
    id: string;
    state: string;
    name: string;
    phone: string;
    group: string;
    incomplete: number;
    all: number;
  }[];
  onFilter: (filterType: string) => void;
  onSort: (sortType: string) => void;
}

const BeforeEvaluation: React.FC<BeforeEvaluationProps> = ({
  filteredData,
  onFilter,
  onSort
}) => {
  return (
    <div className="w-[1016px] flex flex-col items-start gap-2.5 p-[21px] self-stretch rounded-[21px] border border-[#D0D4E7] bg-white-100">
      <WideMemberList items={filteredData} />
    </div>
  );
};

export default BeforeEvaluation;
