import { Instance } from "../../../../services/AxiosInstance";

// POST: [계획하기] 등록하기
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

// GET: [계획하기] 불러오기
export async function getPlanningData(recruitId: number) {
  try {
    const response = await Instance.get(`/prep`, {
      params: { recruitId }
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "계획하기 데이터 불러오기 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}
