import { useForm, FormProvider } from "react-hook-form";
import { BUTTON_TEXT } from "../../../../constants/recruting";
import { useStepTwoStore } from "../../../../store/useStore";
import CommonIdeal from "./CommonIdeal";
import GroupIdeal from "./GroupIdeal";
import { useGroupStore } from "../../../../store/useStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postPrepare2, patchPrepare2 } from "./service/Step2";
import { getPassIdeal } from "../_01/service/Step1";
import { useEffect, useState } from "react";

export default function DefineIdealCandidateContainer() {
  const { setStepCompleted, steps } = useStepTwoStore();
  const { group: groups } = useGroupStore();
  const [isEditMode, setIsEditMode] = useState(false);

  //GET
  const recruitId = 1; //todo: 임시로
  const { data: ideal } = useQuery<PassIdealResponse, Error, IdealForm>(
    ["ideal", recruitId],
    () => getPassIdeal(recruitId),
    {
      select: (data) => {
        console.log("2-2 조회 성공!");
        return {
          partIdeals: [
            {
              partName: "공통",
              content: data.groupResponses[0]?.idealContent
                ? Object.values(data.groupResponses[0].idealContent)
                : []
            },
            ...groups.map((group) => {
              const groupResponse = data.groupResponses.find(
                (g) => g.groupId === group.index
              );
              return {
                partName: group.name,
                content: groupResponse?.idealContent
                  ? Object.values(groupResponse.idealContent)
                  : []
              };
            })
          ]
        };
      }
    }
  );

  const queryClient = useQueryClient();

  //POST
  const mutation = useMutation(
    (data: { formData: IdealForm; recruitId: number }) =>
      postPrepare2(data.formData, data.recruitId),
    {
      onSuccess: (data) => {
        console.log("모집하기2 POST 성공", data);
        setStepCompleted(1, true);
        setIsEditMode(false);
        queryClient.invalidateQueries(["ideal", recruitId]);
      }
    }
  );

  //PATCH
  const patchMutation = useMutation(
    (data: { formData: IdealForm; recruitId: number }) =>
      patchPrepare2(data.formData, data.recruitId),
    {
      onSuccess: (data) => {
        console.log("모집하기2 PATCH 성공", data);
        setStepCompleted(1, true);
        setIsEditMode(false);
        queryClient.invalidateQueries(["ideal", recruitId]);
      }
    }
  );

  const methods = useForm<IdealForm>({
    mode: "onTouched",
    values: ideal, // 서버에서 가져온 데이터로 초기값 설정

    defaultValues: {
      partIdeals: [
        { partName: "공통", content: [] },
        ...groups.map((group) => ({ partName: group.name, content: [] }))
      ]
    }
  });

  const onSubmit = methods.handleSubmit((data) => {
    if (data.partIdeals.every((part) => part.content.length > 0)) {
      const newData = {
        partIdeals: data.partIdeals.map((part) => ({
          partName: part.partName,
          content: part.content.slice(-1)
        }))
      };

      console.log("제출되는 데이터:", newData);

      // 임시로 API 호출 없이 상태만 변경
      setStepCompleted(1, true);
      setIsEditMode(false);

      // API가 준비되면 아래 코드를 다시 활성화
      /*
    if (isEditMode) {
      patchMutation.mutate({
        formData: newData,
        recruitId: recruitId
      });
    } else {
      mutation.mutate({
        formData: newData,
        recruitId: recruitId
      });
    }
    */
    }
  });

  const handleButtonClick = () => {
    if (steps[1].completed && !isEditMode) {
      setIsEditMode(true);
    } else {
      const data = methods.getValues();
      if (data.partIdeals.every((part) => part.content.length > 0)) {
        onSubmit();
      } else {
        setStepCompleted(1, true);
        setIsEditMode(false);
      }
    }
  };

  useEffect(() => {
    if (ideal && ideal.partIdeals.some((part) => part.content.length > 0)) {
      setStepCompleted(1, true);
    }
  }, [ideal, setStepCompleted]);

  return (
    <FormProvider {...methods}>
      <form className="mb-[147px]">
        <div
          className={`${steps[1].completed && !isEditMode ? "pointer-events-none" : ""}`}
        >
          <div className="ml-8 w-full mt-[25px]">
            <CommonIdeal />
          </div>
          <div className="ml-8 w-full mt-[25px]">
            <GroupIdeal />
          </div>
        </div>

        {/* 버튼을 pointer-events-none div 밖으로 이동 */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleButtonClick}
            aria-label={
              steps[1].completed && !isEditMode
                ? BUTTON_TEXT.EDIT
                : BUTTON_TEXT.COMPLETE
            }
            className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
              steps[1].completed && !isEditMode
                ? "bg-main-400 border border-main-100 text-main-100"
                : "bg-main-100 text-white-100"
            } text-body flex-center hover:bg-main-500`}
          >
            {steps[1].completed && !isEditMode
              ? BUTTON_TEXT.EDIT
              : BUTTON_TEXT.COMPLETE}
          </button>
        </div>

        {steps[1].completed && (
          <div className="fixed animate-dropdown bottom-[16px]">
            <div className="custom-shadow ml-8 w-[1016px] h-[79px] bg-gray-100 border border-main-400 rounded-[11px] pl-[31px] flex items-center text-callout text-gray-800 overflow-hidden">
              확정된 내용만을 서류 평가 시에 참고할 수 있습니다.
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
