import React from "react";

interface TabBarProps {
  tabs: string[]; // 탭 이름 배열
  currentTab: string; // 현재 선택된 탭
  onTabClick: (tab: string) => void; // 탭 클릭 핸들러
}

const TabBar: React.FC<TabBarProps> = ({ tabs, currentTab, onTabClick }) => {
  return (
    <div className="flex">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabClick(tab)}
          className={`w-40 px-9 py-2 rounded-t-xl font-Pretendard font-semibold ${
            currentTab === tab
              ? "bg-[#5E2BE8] text-white-100"
              : "bg-[#F1F3FF] border border-[#D0D4E7] text-[#5E2BE8]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
