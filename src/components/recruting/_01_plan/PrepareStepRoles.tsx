import { useState, useEffect } from "react";
import AddAdminDropdown from "./AddAdminDropdown";
import { useForm, SubmitHandler } from "react-hook-form";
import { ALL_ADMINS, DEFAULT_STEPS } from "../../../constants/recruting";
import { useRecruitmentStepStore } from "../../../store/useStore";
import { AdminPlan } from "../../../type/type";

interface Admin {
  id?: number | string;
  name?: string;
}

interface PrepareStepRolesProps {
  onPrepStagesSubmit: (prepStages: any) => void;
  apiPrepareStepRoles?: PrepStage[];
  isStepOneCompleted: boolean;
}
export default function PrepareStepRoles({
  onPrepStagesSubmit,
  apiPrepareStepRoles,
  isStepOneCompleted
}: PrepareStepRolesProps) {
  const [dropdown, setDropdown] = useState(false);
  const [steps, setSteps] = useState(DEFAULT_STEPS);
  const [currentStepId, setCurrentStepId] = useState<number>(1);

  const getAdminNameById = (adminId: number, stepId: number): string => {
    if (stepId === 4) return "모든 운영진";
    const admin = ALL_ADMINS.find((admin) => admin.id === adminId);
    return admin ? admin.name : `Unknown (ID: ${adminId})`;
  };

  useEffect(() => {
    if (apiPrepareStepRoles && apiPrepareStepRoles.length > 0) {
      const updatedSteps = DEFAULT_STEPS.map((step) => {
        const apiStep = apiPrepareStepRoles.find(
          (apiStep) => apiStep.stageName === step.name
        );
        if (apiStep && step.name !== "운영진 면접 일정 조율하기") {
          return {
            ...step,
            admins: apiStep.admins.map((admin) => admin.name) // admin 객체에서 이름만 추출
          };
        }
        return step;
      });
      setSteps(updatedSteps);
    }
  }, [apiPrepareStepRoles]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<PrepareStepRolesFormValues>({
    defaultValues: {
      steps: DEFAULT_STEPS
    },
    mode: "onSubmit"
  });

  const validateSteps = (value: Step[]) => {
    const hasEmptyAdmins = value.some(
      (step) => !step.isFixed && step.admins.length === 0
    );
    return !hasEmptyAdmins || "필수 입력 사항입니다";
  };

  useEffect(() => {
    setValue("steps", steps, {});
  }, [steps, setValue]);

  useEffect(() => {
    register("steps", {
      validate: validateSteps
    });
  }, [register]);

  const onSubmit: SubmitHandler<PrepareStepRolesFormValues> = (data, event) => {
    event?.preventDefault();
    const prepStages = data.steps.map((step, index) => {
      let admins: Admin[];
      if (step.id === 4) {
        admins = ALL_ADMINS;
      } else {
        admins = (step.admins ?? []).map((admin): Admin => {
          if (typeof admin === "object" && "id" in admin && "name" in admin) {
            return admin as Admin;
          }
          if (apiPrepareStepRoles) {
            const apiAdmin = apiPrepareStepRoles
              .flatMap((s) => s.admins)
              .find((a) => a.id === admin);
            if (apiAdmin) {
              return apiAdmin;
            }
          }
          return { id: admin, name: `Unknown (ID: ${admin})` };
        });
      }

      return {
        stageName: step.name,
        stageOrder: index + 1,
        admins: admins
      };
    });

    onPrepStagesSubmit(prepStages);
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  const handleAdminSelect = (admin: AdminPlan) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => {
        if (step.id === currentStepId && !step.admins.includes(admin.id)) {
          return {
            ...step,
            admins: [...step.admins, admin.id]
          };
        }
        return step;
      })
    );
    setDropdown(false);
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

  //1단계 완료 여부
  const { completedSteps } = useRecruitmentStepStore();

  return (
    <form
      className={`${
        completedSteps[0] ? "pointer-events-none" : ""
      } w-full h-auto mt-[34px] ml-8 pt-[22px] pb-[38px] bg-white-100 rounded-[12px]`}
    >
      <div className="ml-[22px] mr-[39px] flex justify-between">
        <div className="flex">
          <p className="section-title">
            <span className="mr-[0.25em] text-main-100">*</span>모집 준비하기
            역할 분담
          </p>
          <div className="tooltip">
            모집 준비하기의 세부 단계에 따른 역할을 분담해 주세요.
          </div>
        </div>
      </div>
      <div className="pl-[47px] pr-[48px]">
        <div
          className={`mt-8 w-full h-auto rounded-[10px] bg-gray-100 border ${errors.steps ? "border-red-100" : "border-gray-300"}`}
        >
          <div className="flex">
            <div className="bg-main-300 border-r border-gray-400 rounded-l-[10px] flex flex-col">
              <div className="flex-center w-[63.89px] h-[103.8px] border-b border-gray-400 text-gray-1100 text-caption1">
                <p>
                  준비
                  <br />
                  단계
                </p>
              </div>
              <div className="flex-1 min-h-[329px] flex-center text-gray-1100 text-caption1">
                권한자
              </div>
            </div>

            {/* 오른쪽 컨텐츠 영역 */}
            <div>
              <div className="flex ml-[27.35px] mt-[21px] ">
                {steps?.map((step, index) => (
                  <div key={step.id} className="w-full min-h-[329px]">
                    <div className="flex-center">
                      <div className="w-[139px] h-[66px] px-[21px] bg-gray-200 rounded-[12px] flex-center text-caption1">
                        {step.name}
                      </div>
                      {index < steps.length - 1 && ( // 마지막 단계가 아닐 때만 화살표 표시
                        <img
                          src="/assets/ic-next.svg"
                          alt="화살표"
                          className="w-[7px] h-[14px] mx-[10px]"
                        />
                      )}
                    </div>
                    <div className="mt-[29px]">
                      {/* 운영진 목록 */}
                      <div>
                        {step?.admins.map((admin) => {
                          const adminName =
                            typeof admin === "number"
                              ? getAdminNameById(admin, step.id)
                              : admin;
                          return (
                            <div
                              key={admin}
                              className="relative flex-center w-[139px] h-[43px] mb-[10px] rounded-[10px] border border-gray-300 bg-white-100 text-subheadline"
                            >
                              <span className="text-gray-800">{adminName}</span>
                              {!step.isFixed && !isStepOneCompleted && (
                                <img
                                  src="/assets/ic-minusCircle.svg"
                                  alt="운영진 삭제 버튼"
                                  onClick={() => removeAdmin(step.id, admin)}
                                  className="absolute right-[19px] cursor-pointer"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      {/* 운영진 추가 버튼 */}
                      {!step.isFixed && !isStepOneCompleted && (
                        <button
                          type="button"
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
              </div>
            </div>
          </div>
        </div>
        {errors.steps && (
          <p className="text-state-error ">{errors.steps.message}</p>
        )}
      </div>
      {!isStepOneCompleted && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault(); // 기본 동작 방지
            handleFormSubmit(e); // React Hook Form 처리
          }}
          className={`mt-5 py-[7px] px-[24px] rounded-[12px] text-white-100 button-main-bg cursor-pointer`}
        >
          적용하기
        </button>
      )}
    </form>
  );
}
