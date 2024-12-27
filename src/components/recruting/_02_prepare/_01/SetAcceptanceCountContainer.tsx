import { useForm } from "react-hook-form";
import { useEffect } from "react";
import GroupPassCount from "./GroupPassCount";
import NumberSpinner from "./NumberSpinner";
import { BUTTON_TEXT } from "../../../../constants/recruting";
import { useStepTwoStore } from "../../../../store/useStore";

export default function SetAcceptanceCountContainer() {
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, touchedFields }
  } = useForm<SetAcceptanceCountFormData>({
    defaultValues: {
      totalDocumentPassCount: 0,
      totalFinalPassCount: 0,
      groupInfos: [
        { groupName: "", documentPassCount: 0, finalPassCount: 0 },
        { groupName: "", documentPassCount: 0, finalPassCount: 0 },
        { groupName: "", documentPassCount: 0, finalPassCount: 0 }
      ]
    },
    mode: "onBlur",
    reValidateMode: "onSubmit"
  });

  const totalDocumentPassCount = watch("totalDocumentPassCount");
  const totalFinalPassCount = watch("totalFinalPassCount");
  const groupInfos = watch("groupInfos");

  useEffect(() => {
    const validateFields = async () => {
      if (Array.isArray(groupInfos)) {
        await trigger("totalDocumentPassCount");
        for (let i = 0; i < groupInfos.length; i++) {
          await trigger(`groupInfos.${i}.documentPassCount`);
        }
        await trigger("totalFinalPassCount");
        for (let i = 0; i < groupInfos.length; i++) {
          await trigger(`groupInfos.${i}.finalPassCount`);
        }
      }
    };

    validateFields();
  }, [
    totalDocumentPassCount,
    totalFinalPassCount,
    groupInfos,
    trigger,
    groupInfos.reduce((sum, group) => sum + (group.documentPassCount || 0), 0),
    groupInfos.reduce((sum, group) => sum + (group.finalPassCount || 0), 0)
  ]);

  const validateForm = {
    required: "필수 입력 사항입니다.",
    documentPassCheck: (value: number) => {
      if (!touchedFields.totalDocumentPassCount) return true;
      if (!value) return "필수 입력 사항입니다.";
      if (value < totalFinalPassCount) {
        return "최종 합격 인원보다 적어요. 최종 합격 인원보다 많은 수로 조정해 주세요.";
      }
      return true;
    },
    groupDocumentPassCheck: (value: number) => {
      if (!touchedFields.groupInfos) return true;
      if (!value) return "필수 입력 사항입니다.";

      const groupTotalDocumentPass = groupInfos.reduce(
        (sum, group) => sum + (group.documentPassCount || 0),
        0
      );
      if (groupTotalDocumentPass !== totalDocumentPassCount) {
        return "전체 서류 합격 인원 수에 맞춰 설정해주세요.";
      }
      return true;
    },
    groupFinalPassCheck: (value: number, index: number) => {
      if (!touchedFields.groupInfos) return true;
      if (!value) return "필수 입력 사항입니다.";

      const groupTotalFinalPass = groupInfos.reduce(
        (sum, group) => sum + (group.finalPassCount || 0),
        0
      );
      if (groupTotalFinalPass !== totalFinalPassCount) {
        return "전체 최종 합격 인원 수에 맞춰 설정해주세요.";
      }
      return true;
    }
  };

  const { setStepCompleted, steps } = useStepTwoStore();

  const onSubmit = async (data: SetAcceptanceCountFormData) => {
    try {
      await trigger("totalDocumentPassCount");
      await trigger("totalFinalPassCount");
      await trigger();
      // 모든 그룹 필드 validation
      for (let i = 0; i < groupInfos.length; i++) {
        await trigger(`groupInfos.${i}.documentPassCount`);
        await trigger(`groupInfos.${i}.finalPassCount`);
      }

      // validation 결과 확인
      if (Object.keys(errors).length > 0) return;

      const groupTotalDocumentPass = data.groupInfos.reduce(
        (sum, group) => sum + (group.documentPassCount || 0),
        0
      );
      const groupTotalFinalPass = data.groupInfos.reduce(
        (sum, group) => sum + (group.finalPassCount || 0),
        0
      );

      if (groupTotalDocumentPass !== data.totalDocumentPassCount) {
        return;
      }

      if (groupTotalFinalPass !== data.totalFinalPassCount) {
        return;
      }

      console.log("제출된 데이터:", data);
      setStepCompleted(0, true);
    } catch (error) {
      console.error("제출 중 에러 발생:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="ml-8 w-full mt-[25px] mb-[147px]"
    >
      <div>
        <div className="flex">
          <p className="section-title">
            <span className="mr-[0.25em] text-main-100">*</span>전체 서류 합격
            인원
          </p>
          <div className="tooltip">서류 합격 인원을 설정해 주세요.</div>
        </div>

        <div
          className={`${
            steps[0].completed ? "pointer-events-none" : ""
          } pt-[16px]`}
        >
          <div className="relative h-[105px] bg-white-100 rounded-[12px]">
            <div className="flex-center absolute left-[32px] top-[27px]">
              <div
                className={`flex-center relative w-[157px] h-[41px] rounded-[7px] bg-white-100 border ${
                  errors.totalDocumentPassCount
                    ? "border-red-100"
                    : "border-gray-400"
                }`}
              >
                <NumberSpinner
                  control={control}
                  name="totalDocumentPassCount"
                  error={errors.totalDocumentPassCount?.message}
                  rules={{
                    validate: validateForm.documentPassCheck
                  }}
                />
              </div>
              <p className="section-title pl-[11px]">명</p>
            </div>
            {errors.totalDocumentPassCount && (
              <p className="absolute top-[70px] left-[32px] text-red-100 font-medium text-[11px]">
                {errors.totalDocumentPassCount.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div
        className={`${
          steps[0].completed ? "pointer-events-none" : ""
        } mt-[34px]`}
      >
        <div className="flex">
          <p className="section-title">
            <span className="mr-[0.25em] text-main-100">*</span>
            전체 최종 합격 인원
          </p>
          <div className="tooltip">최종 합격 인원을 설정해 주세요.</div>
        </div>
        <div className="pt-[16px]">
          <div className="relative h-[105px] bg-white-100 rounded-[12px]">
            <div className="flex-center absolute left-[32px] top-[27px]">
              <div
                className={`flex-center w-[157px] h-[41px] rounded-[7px] bg-white-100 border ${
                  errors.totalFinalPassCount
                    ? "border-red-100"
                    : "border-gray-400"
                }`}
              >
                <NumberSpinner
                  control={control}
                  name="totalFinalPassCount"
                  error={errors.totalFinalPassCount?.message}
                  rules={{
                    validate: (value: number) => {
                      if (!touchedFields.totalFinalPassCount) return true;
                      if (!value || value <= 0) return "필수 입력 사항입니다";
                      return true;
                    }
                  }}
                />
                {errors.totalFinalPassCount && (
                  <p className="absolute top-[42px] left-0 text-red-100 font-medium text-[11px]">
                    {errors.totalFinalPassCount.message}
                  </p>
                )}
              </div>
              <p className="section-title pl-[11px]">명</p>
            </div>
          </div>
        </div>
      </div>

      <GroupPassCount
        control={control}
        errors={errors}
        rules={{
          documentPassCount: {
            required: "필수 입력 사항입니다",
            validate: validateForm.groupDocumentPassCheck
          },
          finalPassCount: {
            required: "필수 입력 사항입니다",
            validate: validateForm.groupFinalPassCheck
          }
        }}
      />
      <div className="flex justify-center">
        <button
          type="submit"
          aria-label={
            steps[0].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE
          }
          className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
            steps[0].completed
              ? "bg-main-400 border border-main-100 text-main-100 "
              : "bg-main-100 text-white-100 "
          }  text-body flex-center hover:bg-main-500`}
        >
          {steps[0].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
        </button>
      </div>
    </form>
  );
}
