import { useState } from "react";
import { useGroupStore } from "../../../../store/useStore";
import AddAdminDropdown from "./AddAdminDropdown";

type GroupWithAdmin = {
  id: number;
  groupName: string;
  admins: string[];
};

export default function DocumentReviewPrepContainer() {
  const { group } = useGroupStore();
  const [dropdown, setDropdown] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState<number>(1);

  // group+admin 배열
  const [groupsWithAdmins, setGroupsWithAdmins] = useState<GroupWithAdmin[]>(
    group.map((groupName, index) => ({
      id: index + 1,
      groupName,
      admins: []
    }))
  );

  const handleAdminSelect = (admin: string) => {
    setGroupsWithAdmins((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id === currentGroupId && !group.admins.includes(admin)) {
          return {
            ...group,
            admins: [...group.admins, admin]
          };
        }
        return group;
      })
    );
    setDropdown(false);
  };

  const removeAdmin = (groupId: number, adminToRemove: string) => {
    setGroupsWithAdmins((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            admins: group.admins.filter((admin) => admin !== adminToRemove)
          };
        }
        return group;
      })
    );
  };

  return (
    <div className="w-[1016px]">
      <div className="ml-8 w-full mt-[34px]">
        <div className="flex">
          <p className="section-title">전체 지원자 수</p>
          <div className="tooltip">
            우리 동아리에 지원한 전체 지원자 수를 보여드립니다.
          </div>
        </div>

        <div className="flex gap-[15px] mt-[10px] h-auto py-[28px] pb-[29px] px-[31px] bg-white-100 border border-[#D6D7DA] rounded-[21px]">
          <div className="flex items-center gap-[15px]">
            <p>전체</p>
            <div className="flex-center w-[80px] h-[38px] rounded-[6px] bg-gray-100 text-[16px] font-medium">
              175명
            </div>
          </div>
          {groupsWithAdmins.map((groupItem) => (
            <div key={groupItem.id} className="flex items-center gap-[15px]">
              <p>{groupItem.groupName}</p>
              <div className="flex-center w-[80px] h-[38px] rounded-[6px] bg-gray-100 text-[16px] font-medium">
                175명
              </div>
            </div>
          ))}
        </div>

        <div className="flex mt-[34px]">
          <p className="section-title">서류 평가 역할 설정</p>
          <div className="tooltip">
            각 그룹별 서류를 평가할 운영진을 분담해 주세요.
          </div>
        </div>

        <div className="flex mt-[10px] h-auto py-[28px] pb-[29px] px-[31px] bg-white-100 border border-[#D6D7DA] rounded-[21px]">
          {groupsWithAdmins.map((groupItem) => (
            <div key={groupItem.id} className="mr-4">
              <div className="flex-center w-[286px] h-[46px] mr-[17px] bg-gray-100 border border-gray-300 rounded-[7px] text-callout text-main-100">
                {groupItem.groupName}
              </div>
              <div className="mt-4">
                {groupItem.admins.map((admin) => (
                  <div
                    key={admin}
                    className="relative flex-center w-[286px] h-[43px] mb-[10px] rounded-[10px] border border-gray-300 bg-white-100 text-subheadline"
                  >
                    <span className="text-gray-800">{admin}</span>
                    <img
                      src="/assets/ic-minusCircle.svg"
                      alt="운영진 삭제 버튼"
                      onClick={() => removeAdmin(groupItem.id, admin)}
                      className="absolute right-[19px] cursor-pointer"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="relative flex-center w-[286px] h-[46px] mt-[15px] mr-[17px] bg-gray-100 border border-gray-300 rounded-[7px] text-subheadline text-gray-500"
                onClick={() => {
                  setCurrentGroupId(groupItem.id);
                  setDropdown(!dropdown);
                }}
              >
                <img src="/assets/ic-plus.svg" className="mr-2" />
                <p>운영진 추가</p>
                {dropdown && currentGroupId === groupItem.id && (
                  <AddAdminDropdown
                    onSelect={handleAdminSelect}
                    currentAdmins={groupItem.admins}
                  />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
