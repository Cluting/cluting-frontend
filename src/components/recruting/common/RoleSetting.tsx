import { ReactComponent as IdealIcon } from "../../../../src/assets/ic-plus.svg";
import AddAdminDropdown from "./AddAdminDropdown";
import { UseFormSetValue } from "react-hook-form";

export default function RoleSettings({
  groups,
  dropdown,
  currentId,
  type,
  setValue,
  setDropdown,
  setCurrentId,
  addGroupForm,
  handleAdminSelect,
  removeAdmin,
  handleGroupNameChange
}: {
  groups: DocumentReviewForm["groups"];
  dropdown: boolean;
  currentId: number | null;
  setValue: UseFormSetValue<DocumentReviewForm>;
  setDropdown: (value: boolean) => void;
  setCurrentId: (value: number | null) => void;
  addGroupForm: () => void;
  handleAdminSelect: (admin: string, groupId: number) => void;
  removeAdmin: (groupId: number, adminToRemove: string) => void;
  handleGroupNameChange: (groupId: number, newName: string) => void;
  type?: string;
}) {
  return (
    <section className="my-[34px]">
      <div className="flex justify-between">
        <div className="flex items-center">
          <p className="section-title">{type} 평가 역할 설정</p>
          {groups.length === 1 ? (
            // 공통 그룹만 있는 경우
            <div className="tooltip">
              {type} 평가 시, 그룹을 형성하여 지원자를 나누고, 각 그룹별
              평가자를 분담해 주세요.
            </div>
          ) : (
            <div className="tooltip">
              {type === "면접"
                ? "설정된 그룹에 따라 면접 평가를 진행할 운영진의 역할을 분담해주세요."
                : "각 그룹별 평가할 운영진을 분담해 주세요."}
            </div>
          )}
        </div>
        {groups.length >= 1 ? (
          <div>
            <button
              type="button"
              className="flex-center w-[150.93] h-[48.6px] pl-[24.54px] pr-[17.93px] py-[18.23px] bg-main-300 border border-main-400 rounded-[8.95px] text-main-100 font-semibold hover:bg-main-100 hover:text-white-100 group"
              onClick={addGroupForm}
            >
              <IdealIcon className="mr-[4.81px]" />
              그룹 추가하기
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="w-full min-h-[318px] mt-[10px] pt-[18px] pb-[29px] px-[36px] bg-white-100 border border-[#D6D7DA] rounded-[21px]">
        {groups.length === 1 ? (
          // 공통 그룹만 있는 경우
          <p className="flex- mt-[100px] text-gray-400 text-body">
            그룹을 추가해 주세요.<br></br>
            그룹을 추가하지 않으면, 운영진 모두가 모든 지원자를 평가하게 됩니다.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {groups.map(
              (groupItem) =>
                groupItem.id !== 1 && (
                  <div key={groupItem.id} className="max-w-[286px]">
                    <div className="flex items-center text-[12.25px] font-semibold gap-[8.33px] text-[#5C6067]">
                      <p>지원자 수</p>
                      <div className="flex-center bg-gray-100 h-[22px] px-[6.74px] py-[3.52px] rounded-[7.35px]">
                        {groupItem.groupName == "기획" ? (
                          <p>2명</p>
                        ) : groupItem.groupName == "디자인" ? (
                          <p>4명</p>
                        ) : groupItem.groupName == "개발" ? (
                          <p>8명</p>
                        ) : (
                          "0명"
                        )}
                      </div>
                      <p>운영자 수</p>
                      <div className="flex-center bg-gray-100 h-[22px] px-[6.74px] py-[3.52px] rounded-[7.35px]">
                        {groupItem.admins?.length || 0}명
                      </div>
                    </div>
                    <input
                      type="text"
                      value={groupItem.groupName}
                      onChange={(e) =>
                        handleGroupNameChange(groupItem.id, e.target.value)
                      }
                      placeholder="그룹명"
                      className="flex-center w-full h-[46px] mt-[7px] py-[12.5px] text-center text-main-100 rounded-[7px] bg-gray-50 border border-gray-200 text-callout outline-none focus:border-main-100"
                    />
                    <div className="mt-4">
                      {groupItem.admins.map((admin) => (
                        <div
                          key={admin}
                          className="relative flex-center w-full h-[43px] mb-[10px] rounded-[10px] border border-gray-300 bg-white-100 text-subheadline"
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
                      className="relative flex-center w-full h-[46px] mt-[15px] bg-gray-100 border border-gray-300 rounded-[7px] text-subheadline text-gray-500"
                      onClick={() => {
                        setCurrentId(groupItem.id);
                        setDropdown(!dropdown);
                      }}
                    >
                      <img src="/assets/ic-plus.svg" className="mr-2" />
                      <p>운영진 추가</p>
                      {dropdown && currentId === groupItem.id && (
                        <AddAdminDropdown
                          onSelect={(admin) =>
                            handleAdminSelect(admin.name, groupItem.id)
                          }
                          currentAdmins={groupItem.admins}
                        />
                      )}
                    </button>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
