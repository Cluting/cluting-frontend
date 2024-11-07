import { useState } from "react";
import AddAdminDropdown from "./AddAdminDropdown";

interface Step {
  id: number;
  name: string;
  admins: string[];
  isFixed?: boolean;
}

export default function PrepareStepRoles() {
  const DEFAULT_STEPS: Step[] = [
    { id: 1, name: "합격 인원 설정하기", admins: [] },
    { id: 2, name: "인재상 구축하기", admins: [] },
    { id: 3, name: "공고 작성하기", admins: [] },
    {
      id: 4,
      name: "운영진 면접 일정 조율하기",
      admins: ["모든 운영진"],
      isFixed: true
    },
    { id: 5, name: "지원서 폼 제작", admins: [] }
  ];

  const [dropdown, setDropdown] = useState(false); //드롭다운
  const [steps, setSteps] = useState(DEFAULT_STEPS); //단계들
  const [currentStepId, setCurrentStepId] = useState<number>(1);
  const [newStepName, setNewStepName] = useState(""); // 추가할 새 단계 이름(단계 추가하기)

  const handleAdminSelect = (admin: string) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => {
        if (step.id === currentStepId && !step.admins.includes(admin)) {
          return {
            ...step,
            admins: [...step.admins, admin]
          };
        }
        return step;
      })
    );
  };

  const removeAdmin = (stepId: number, adminToRemove: string) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            admins: step.admins.filter((admin) => admin !== adminToRemove)
          };
        }
        return step;
      })
    );
  };

  const handleAddStep = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newStepName.trim()) {
      setSteps([
        ...steps,
        {
          id: steps.length + 1,
          name: newStepName.trim(),
          admins: []
        }
      ]);
      setNewStepName("");
    }
  };

  return (
    <div className="w-full h-auto mt-[34px] ml-8 pt-[22px] pb-[38px] bg-white-100 custom-shadow rounded-[12px]">
      <div className="ml-[22px] mr-[39px] flex justify-between">
        <div className="flex">
          <p className="section-title">
            <span className="mr-[0.25em] text-main-100">*</span>모집 준비 단계
            역할 분담
          </p>
          <div className="tooltip">우리 동아리의 인재상을 작성해 주세요..</div>
        </div>

        <button
          className="w-[118px] h-[38px] flex-center bg-main-300 border border-main-400 rounded-[7px] text-caption3 text-main-100 hover:bg-main-100 hover:text-white-100 hover:border-main-100"
          onClick={() => setNewStepName(" ")}
        >
          + 단계 추가
        </button>
      </div>

      <div className="pl-[47px] pr-[48px]">
        <div className="mt-8 w-full h-auto rounded-[10px] bg-gray-100 border border-gray-300">
          <div className="flex">
            {/* 왼쪽 열 */}
            <div className="bg-gray-200 border-r border-gray-400 rounded-l-[10px] flex flex-col">
              <div className="flex-center w-[63.89px] h-[103.8px] border-b border-gray-400 text-[#3B3D46] text-caption1">
                <p>
                  준비
                  <br />
                  단계
                </p>
              </div>
              <div className="flex-1 min-h-[329px] flex-center text-[#3B3D46] text-caption1">
                권한자
              </div>
            </div>

            {/* 오른쪽 컨텐츠 영역 */}
            <div>
              <div className="flex ml-[27.35px] mt-[21px]">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="w-[139px] min-h-[329px] mr-[25px]"
                  >
                    <div className="w-[139px] h-[66px] px-[21px] bg-gray-200 rounded-[12px] flex-center text-caption1">
                      {step.name}
                    </div>
                    <div className="mt-[29px]">
                      {/* 운영진 목록 */}
                      <div>
                        {step.admins.map((admin) => (
                          <div
                            key={admin}
                            className="flex-center w-[139px] h-[43px] mb-[10px] rounded-[10px] border border-gray-300 bg-white-100 text-subheadline"
                          >
                            <span className="text-gray-800">{admin}</span>
                            {!step.isFixed && (
                              <button
                                onClick={() => removeAdmin(step.id, admin)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      {/* 운영진 추가 버튼 */}
                      {!step.isFixed && (
                        <button
                          className="relative flex-center w-[139px] h-[43px] mb-[10px] border border-gray-200 bg-gray-100 rounded-[10px] text-[15px] font-semibold text-gray-500 hover:bg-gray-300 hover:border-gray-500 hover:text-gray-700"
                          onClick={() => {
                            setCurrentStepId(step.id);
                            setDropdown(!dropdown);
                          }}
                        >
                          <p>+ 운영진 추가</p>
                          {dropdown && currentStepId === step.id && (
                            <AddAdminDropdown
                              onSelect={handleAdminSelect}
                              currentAdmins={step.admins}
                            />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* 새로운 단계 추가 UI */}
                {newStepName !== "" && (
                  <div className="w-[139px] min-h-[329px] mr-[25px]">
                    <input
                      type="text"
                      value={newStepName}
                      onChange={(e) => setNewStepName(e.target.value)}
                      onKeyDown={handleAddStep}
                      placeholder="단계 이름 입력 후 Enter"
                      className="w-[139px] h-[66px] px-[21px] bg-gray-200 rounded-[12px] text-caption1 border-2 border-main-100 outline-none"
                      autoFocus
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
