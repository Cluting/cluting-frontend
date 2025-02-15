import { Instance } from "../../../../../services/AxiosInstance";

//POST: 지원서 폼 제작하기
export async function postPrepare5(
  createFormData: CreateApplicationForm,
  recruitId: number
) {
  try {
    const { data } = await Instance.post(
      `/plan/stage5/${recruitId}`,
      createFormData
    );
    return data;
  } catch (error) {
    console.log("지원서 폼 생성 실패: ", error);
    throw error;
  }
}

// GET: 지원서 폼 확인
export async function getPrepare5(recruitId: number) {
  try {
    const { data } = await Instance.get(`/plan/details-form/${recruitId}`);
    return data;
  } catch (error) {
    console.error("지원서 폼 조회 실패:", error);
    throw error;
  }
}

//PATCH: 완료하기 <-> 수정하기
export async function patchPrepare5(
  data: CreateApplicationForm,
  recruitId: number
) {
  try {
    const response = await Instance.patch(`/plan/stage5/${recruitId}`, data);
    console.log("모집하기(5) PATCH 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("모집하기(5) PATCH 실패:", error);
    throw error;
  }
}
