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

// PATCH: 계획하기 수정
export async function patchPrep(
  recruitId: number,
  data: PrepareStepRolesFormValues
) {
  const url = `https://210.107.205.122:20025/api/v1/prep?recruitId=${recruitId}`;
  const headers = {
    accept: "*/*",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Content-Type": "application/json"
  };

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(data)
    });

    const text = await response.text();
    console.log("Response Text:", text);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = text ? JSON.parse(text) : {};
    console.log("계획하기 수정 성공:", responseData);
    return responseData;
  } catch (error) {
    console.error("계획하기 수정 실패:", error);
    throw error;
  }
}
