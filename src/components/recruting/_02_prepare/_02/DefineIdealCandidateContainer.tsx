import { useForm, FormProvider } from "react-hook-form";
import { BUTTON_TEXT } from "../../../../constants/recruting";
import { useStepTwoStore } from "../../../../store/useStore";
import CommonIdeal from "./CommonIdeal";
import GroupIdeal from "./GroupIdeal";
import { useGroupStore } from "../../../../store/useStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postPrepare2 } from "./service/Step2";
import { getPassIdeal } from "../_01/service/Step1";

export default function DefineIdealCandidateContainer() {
  const { setStepCompleted, steps } = useStepTwoStore();
  const { group: groups } = useGroupStore();

  //GET
  const recruitId = 1; //todo: 임시로
  const { data: passIdeal } = useQuery<PassIdealResponse, Error, IdealForm>(
    ["passIdeal", recruitId],
    () => getPassIdeal(recruitId),
    {
      select: (data) => {
        console.log("GET 응답:", data);
        return {
          partIdeals: [
            {
              partName: "PM",
              content: Object.values(data.groupResponses[0]?.idealContent || {})
            },
            ...groups.map((group) => ({
              partName: group.name,
              content: Object.values(
                data.groupResponses.find((g) => g.groupId === group.index)
                  ?.idealContent || {}
              )
            }))
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
      onSuccess: (responseData) => {
        console.log("모집하기2 POST 성공", responseData);
        // POST 성공 후 GET 쿼리 무효화 -> 새로운 데이터 자동 불러오기
        queryClient.invalidateQueries(["passIdeal", recruitId]);
      },
      onError: (error) => {
        console.error("모집하기2 POST 실패:", error);
      }
    }
  );

  const methods = useForm<IdealForm>({
    mode: "onTouched",
    values: passIdeal,
    defaultValues: {
      partIdeals: [
        { partName: "PM", content: [] },
        ...groups.map((group) => ({ partName: group.name, content: [] }))
      ]
    }
  });

  const handleSubmit = methods.handleSubmit((data) => {
    if (data.partIdeals.every((part) => part.content.length > 0)) {
      // console.log(data);
      setStepCompleted(1, true);

      mutation.mutate({
        formData: data,
        recruitId: recruitId
      });
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className="mb-[147px]">
        <div className={`${steps[1].completed ? "pointer-events-none" : ""}`}>
          <div className="ml-8 w-full mt-[25px]">
            <CommonIdeal />
          </div>
          <div className="ml-8 w-full mt-[25px]">
            <GroupIdeal />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              aria-label={
                steps[1].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE
              }
              className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
                steps[1].completed
                  ? "bg-main-400 border border-main-100 text-main-100"
                  : "bg-main-100 text-white-100"
              } text-body flex-center hover:bg-main-500`}
            >
              {steps[1].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
            </button>
          </div>
          {steps[1].completed && (
            <div className="fixed animate-dropdown bottom-[16px]">
              <div className="custom-shadow ml-8 w-[1016px] h-[79px] bg-gray-100 border border-main-400 rounded-[11px] pl-[31px] flex items-center text-callout text-gray-800 overflow-hidden">
                확정된 내용만을 서류 평가 시에 참고할 수 있습니다.
              </div>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
