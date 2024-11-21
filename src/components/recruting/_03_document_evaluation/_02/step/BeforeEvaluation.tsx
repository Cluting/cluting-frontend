import React from "react";
import ItemList from "../common/ItemList";

interface BeforeEvaluationProps {
  filteredData: { id: number; type: string; name: string }[];
  onFilter: (filterType: string) => void;
  onSort: (sortType: string) => void;
}

const BeforeEvaluation: React.FC<BeforeEvaluationProps> = ({
  filteredData,
  onFilter,
  onSort
}) => {
  return (
    <div>
      <h2>평가 전 단계</h2>
      <ItemList items={filteredData} />
    </div>
  );
};

export default BeforeEvaluation;
