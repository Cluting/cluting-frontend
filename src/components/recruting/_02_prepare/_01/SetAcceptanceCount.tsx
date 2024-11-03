import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Sidemenu from "../../Sidemenu";
import GroupPassCount from "./GroupPassCount";
import NumberSpinner from "./NumberSpinner";
import CompleteButton from "../../CompleteButton";

interface FormData {
  documentPassTotal: number;
  finalPassTotal: number;
  groups: {
    documentPass: number;
    finalPass: number;
  }[];
}

export default function SetAcceptanceCount() {
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    defaultValues: {
      documentPassTotal: 0,
      finalPassTotal: 0,
      groups: [
        { documentPass: 0, finalPass: 0 },
        { documentPass: 0, finalPass: 0 },
        { documentPass: 0, finalPass: 0 }
      ]
    },
    mode: "onChange", // 값이 변경될 때마다 validation 실행
    reValidateMode: "onChange" // 재검증도 값이 변경될 때마다 실행
  });

  const finalPassTotal = watch("finalPassTotal");
  const groups = watch("groups");

  useEffect(() => {
    // finalPassTotal이 변경될 때마다 모든 필드의 validation을 다시 체크
    trigger(); // 모든 필드 재검증
  }, [finalPassTotal, trigger]);

  useEffect(() => {
    // 그룹의 값이 변경될 때마다 그룹 관련 validation을 다시 체크
    trigger("groups");
  }, [groups, trigger]);

  const validateForm = {
    required: "필수 입력 사항입니다",
    documentPassCheck: (value: number) => {
      if (value === 0) return "필수 입력 사항입니다";
      if (value <= finalPassTotal) {
        return "최종 합격 인원보다 적어요. 최종 합격 인원보다 많은 수로 조정해 주세요.";
      }
      return true;
    },
    groupFinalPassCheck: (value: number) => {
      if (value === 0) return "필수 입력 사항입니다.";
      if (value > finalPassTotal) {
        return "전체 최종 합격 인원을 초과했어요.";
      }
      return true;
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      console.log("제출된 데이터:", data);
    } catch (error) {
      console.error("제출 중 에러 발생:", error);
    }
  };

  return (
    <div className="flex justify-center text-[30px]">
      <Sidemenu />
      <form onSubmit={handleSubmit(onSubmit)} className="pl-[30.99px]">
        <div>
          {/*서류 합격 인원 */}
          <div className="flex">
            <p className="text-[17px] font-bold pr-[21px] flex items-center">
              <span className="mr-[0.25em]">*</span> 서류 합격 인원
            </p>
            <div className="w-[224.73px] h-[34px] rounded-[11px] bg-white-100 border border-[#D9D9D9] text-[13px] text-[#73767F] font-medium flex-center">
              우리 동아리의 인재상을 작성해 주세요..
            </div>
          </div>

          <div className="pt-[16px]">
            {/* 서류 합격 인원 input box*/}
            <div className="relative w-[1015px] h-[105px] bg-white-100 rounded-[12px] shadow-01 ">
              <div className="flex-center absolute left-[32px] top-[27px]">
                <div
                  className={`flex-center relative w-[157px] h-[41px] rounded-[7px] bg-white-100 border ${
                    errors.documentPassTotal
                      ? "border-red-100"
                      : "border-gray-400"
                  }`}
                >
                  <NumberSpinner
                    control={control}
                    name="documentPassTotal"
                    error={errors.documentPassTotal?.message}
                    rules={{
                      validate: validateForm.documentPassCheck
                    }}
                  />
                </div>
                <p className="text-[17px] font-bold pl-[11px]">명</p>
              </div>
              {/*에러처리 */}
              {errors.documentPassTotal && (
                <p className="absolute top-[70px] left-[32px] text-red-100 font-medium text-[11px]">
                  {errors.documentPassTotal.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-[34px]">
          {/*전체 최종 합격 인원 */}
          <div className="flex">
            <p className="text-[17px] font-bold pr-[21px] flex items-center">
              <span className="mr-[0.25em]">*</span> 전체 최종 합격 인원
            </p>
            <div className="w-[224.73px] h-[34px] rounded-[11px] bg-white-100 border border-[#D9D9D9] text-[13px] text-[#73767F] font-medium flex-center">
              우리 동아리의 인재상을 작성해 주세요..
            </div>
          </div>
          <div className="pt-[16px]">
            <div className="relative w-[1015px] h-[105px] bg-white-100 rounded-[12px] shadow-01">
              <div className="flex-center absolute left-[32px] top-[27px]">
                <div
                  className={`flex-center w-[157px] h-[41px] rounded-[7px] bg-white-100 border ${
                    errors.finalPassTotal ? "border-red-100" : "border-gray-400"
                  }`}
                >
                  <NumberSpinner
                    control={control}
                    name="finalPassTotal"
                    error={errors.finalPassTotal?.message}
                    rules={{
                      validate: (value: number) =>
                        value > 0 || "필수 입력 사항입니다"
                    }}
                  />
                  {/*에러처리 */}
                  {errors.finalPassTotal && (
                    <p className="absolute top-[42px] left-0 text-red-100 font-medium text-[11px]">
                      {errors.finalPassTotal.message}
                    </p>
                  )}
                </div>
                <p className="text-[17px] font-bold pl-[11px]">명</p>
              </div>
            </div>
          </div>
        </div>

        {/*그룹별 합격 인원 */}
        <GroupPassCount
          control={control}
          errors={errors}
          rules={{
            required: validateForm.required,
            validate: {
              finalPassCheck: validateForm.groupFinalPassCheck
            }
          }}
        />

        <div className="flex-center pt-[50px] pb-[40px]">
          <CompleteButton isSubmitting={isSubmitting} />
        </div>
      </form>
    </div>
  );
}
