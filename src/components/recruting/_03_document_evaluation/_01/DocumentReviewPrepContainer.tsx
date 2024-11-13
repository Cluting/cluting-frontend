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

        <div className="flex gap-[15px] mt-[10px] w-full h-auto py-[28px] pb-[29px] px-[31px] bg-white-100 border border-[#D6D7DA] rounded-[21px]">
          <div className="flex items-center gap-[15px]">
            <p>전체</p>
            <div className="flex-center w-auto h-[38px] px-[20px] py-[9.5px] rounded-[6px] bg-gray-100 text-[16px] font-medium">
              175명
            </div>
          </div>
          {groupsWithAdmins.map((groupItem) => (
            <div key={groupItem.id} className="flex items-center gap-[15px]">
              <p>{groupItem.groupName}</p>
              <div className="flex-center w-auto h-[38px] px-[20px] py-[9.5px] rounded-[6px] bg-gray-100 text-[16px] font-medium">
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

        <div className="flex mt-[10px] w-full h-auto py-[28px] pb-[29px] px-[31px] bg-white-100 border border-[#D6D7DA] rounded-[21px]">
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

        {/*서류 합격자 인원수 */}
        <div className="flex mt-[34px]">
          <p className="section-title">서류 합격자 인원수</p>
          <div className="tooltip">
            앞서 설정한 서류 합격자 인원 수를 보여드립니다.
          </div>
        </div>

        <div className="flex gap-[15px] mt-[10px] w-full h-auto py-[28px] pb-[29px] px-[31px] bg-white-100 border border-[#D6D7DA] rounded-[21px]">
          <div className="flex items-center gap-[15px]">
            <p>전체</p>
            <div className="flex-center w-auto h-[38px] px-[25px] py-[9.5px] rounded-[6px] bg-gray-100 text-[16px] font-medium">
              상위 30명
            </div>
          </div>
          {groupsWithAdmins.map((groupItem) => (
            <div key={groupItem.id} className="flex items-center gap-[15px]">
              <p>{groupItem.groupName}</p>
              <div className="flex-center w-auto h-[38px] px-[25px] py-[9.5px] rounded-[6px] bg-gray-100 text-[16px] font-medium">
                상위 30명
              </div>
            </div>
          ))}
        </div>

        {/*평가 기준 설정하기*/}
        <div className="flex mt-[34px]">
          <p className="section-title">평가 기준 설정하기</p>
          <div className="tooltip">
            평가 기준을 설정해 주세요. 설정된 내용은 개별 평가 진행 시,
            반영됩니다.
          </div>
        </div>

        <div className="flex flex-col mt-[10px] w-full h-auto py-[30px] px-[36px] bg-white-100 border border-[#D6D7DA] rounded-[21px]">
          <div className="flex items-center justify-between w-full ">
            <p className="text-gray-800 text-[16px] font-bold underline underline-offset-2">
              <a href="">지원서 폼 다시 보기</a>
            </p>
            <label className="flex-center text-gray-800 text-[16px] font-bold">
              서류 만점 점수
              <input
                type="text"
                className="flex-center w-[89px] h-[38px] ml-2 px-[24px] py-[10px] rounded-[7px] bg-gray-100 text-callout text-gray-700 outline-none"
                placeholder="100점"
              />
            </label>
          </div>
          <div className="w-full h-auto mt-[18px] bg-gray-100 border border-gray-200 px-[21px] py-[23px] rounded-[12px]">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="flex-center w-[28px] h-[28px] rounded-full bg-main-400 text-main-100 text-[15.71px] font-bold">
                  1
                </div>
                <input
                  type="text"
                  placeholder="평가 기준1"
                  className="w-[110px] max-w-full h-[40px] ml-3 px-[24px] py-[10px] bg-white-100 border border-gray-200 text-subheadline rounded-[7px] outline-none"
                />
              </div>
              <div className="flex-center">
                <div className="min-w-[108px] h-[40px] mr-[10px] px-[24px] py-[10px] bg-white-100 border border-gray-200 rounded-[7px] text-subheadline text-gray-500">
                  0 / 100점
                </div>
                <button type="button">
                  <img src="/assets/ic-minusCircleGray600.svg"></img>
                </button>
              </div>
            </div>
            <p className="mt-[23px] text-subheadline text-gray-700 text-left">
              세부 평가 기준
            </p>
            <input
              type="text"
              placeholder="세부 평가 기준을 입력해 주세요."
              className="w-full h-[36px] mt-[9px] px-[13px] py-[9px] bg-white-100 border border-gray-200 text-caption1 rounded-[6px] outline-none"
            />
          </div>

          <button
            type="button"
            className="flex-center w-full h-[54px] mt-[34px] bg-main-300 border border-main-400 rounded-[8px] text-main-100 hover:bg-main-100 hover:text-white-100 group" // group 추가
          >
            <div className="relative mr-2">
              <img
                alt="질문 추가 버튼"
                src="/assets/ic-mainColorPlus.svg"
                className="group-hover:opacity-0 "
              />
              <img
                alt="질문 추가 버튼"
                src="/assets/ic-whiteColorPlus.svg"
                className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 "
              />
            </div>
            <span className="text-callout">질문 추가하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
