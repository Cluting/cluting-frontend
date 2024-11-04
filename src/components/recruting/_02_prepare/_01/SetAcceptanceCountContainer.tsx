import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Sidemenu from "../../common/Sidemenu";
import GroupPassCount from "./GroupPassCount";
import NumberSpinner from "./NumberSpinner";
import CompleteButton from "../../CompleteButton";

//TODO: 폼 유효성 검사-> 그룹별 최종 합격 인원 총합과 전체 최종 합격 인원 일치하는지도..

interface FormData {
  documentPassTotal: number;
  finalPassTotal: number;
  groups: {
    documentPass: number;
    finalPass: number;
  }[];
}

//2-1 합격 인원 설정 (컨테이너)
export default function SetAcceptanceCountContainer() {
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting, touchedFields }
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
    mode: "onBlur",
    reValidateMode: "onChange" // 재검증도 값이 변경될 때마다 실행
  });

  const finalPassTotal = watch("finalPassTotal");
  const groups = watch("groups");

  useEffect(() => {
    if (touchedFields.groups && Array.isArray(groups)) {
      const touchedGroupFields = touchedFields.groups as {
        documentPass?: boolean;
        finalPass?: boolean;
      }[];

      groups.forEach((_, index) => {
        if (touchedGroupFields[index]?.documentPass) {
          trigger(`groups.${index}.documentPass`);
        }
        if (touchedGroupFields[index]?.finalPass) {
          trigger(`groups.${index}.finalPass`);
        }
      });
    }
  }, [finalPassTotal, touchedFields.groups, groups, trigger]);

  const validateForm = {
    required: "필수 입력 사항입니다.",
    //서류
    documentPassCheck: (value: number) => {
      if (!touchedFields.documentPassTotal) return true; // 터치되지 않았으면 검증 스킵
      if (!value) return "필수 입력 사항입니다.";
      if (value < finalPassTotal) {
        return "최종 합격 인원보다 적어요. 최종 합격 인원보다 많은 수로 조정해 주세요.";
      }
      return true;
    },
    //그룹
    groupFinalPassCheck: (value: number) => {
      if (!touchedFields.groups) return true; // 터치되지 않았으면 검증 스킵
      if (!value) return "필수 입력 사항입니다.";
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
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="ml-[30.99px] w-full ">
        <div>
          {/*서류 합격 인원 */}
          <div className="flex">
            <p className="text-[17px] font-bold pr-[21px] flex items-center">
              <span className="mr-[0.25em] text-main-100">*</span> 서류 합격
              인원
            </p>
            <div className="w-[224.73px] h-[34px] rounded-[11px] bg-white-100 border border-[#D9D9D9] text-[13px] text-[#73767F] font-medium flex-center">
              우리 동아리의 인재상을 작성해 주세요..
            </div>
          </div>

          <div className="pt-[16px]">
            {/* 서류 합격 인원 input box*/}
            <div className="relative h-[105px] bg-white-100 rounded-[12px] shadow-01 ">
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
              <span className="mr-[0.25em] text-main-100">*</span> 전체 최종
              합격 인원
            </p>
            <div className="w-[224.73px] h-[34px] rounded-[11px] bg-white-100 border border-[#D9D9D9] text-[13px] text-[#73767F] font-medium flex-center">
              우리 동아리의 인재상을 작성해 주세요..
            </div>
          </div>
          <div className="pt-[16px]">
            <div className="relative h-[105px] bg-white-100 rounded-[12px] shadow-01">
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
                      validate: (value: number) => {
                        if (!touchedFields.finalPassTotal) return true; // 터치되지 않았으면 검증 스킵
                        if (!value || value <= 0) return "필수 입력 사항입니다";
                        return true;
                      }
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
            validate: validateForm.groupFinalPassCheck
          }}
        />

        <div className="flex-center pt-[50px] pb-[40px]">
          <CompleteButton isSubmitting={isSubmitting} />
        </div>
      </form>
    </div>
  );
}
