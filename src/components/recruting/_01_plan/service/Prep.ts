// POST: [계획하기] 등록하기

import { Instance } from "../../../../services/AxiosInstance";
import { PrepareStepRolesFormValues } from "../type/Prep";

export async function postStepPlan(
  recruitId: number,
  planningData: PrepareStepRolesFormValues
) {
  try {
    const response = await Instance.post(
      `/prep?recruitId=${recruitId}`,
      planningData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return response;
  } catch (error: any) {
    console.error(
      "계획하기 페이지 등록 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}
