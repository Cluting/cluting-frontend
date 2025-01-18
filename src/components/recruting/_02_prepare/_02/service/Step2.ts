import { Instance } from "../../../../../services/AxiosInstance";

//POST: 인재상 구축하기
export async function postPrepare2(data: IdealForm, recruitId: number) {
  try {
    const response = await Instance.post(`/plan/stage2/${recruitId}`, data);
    console.log("모집하기(2) POST 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("모집하기(2) POST 실패:", error);
    throw error;
  }
}

//PATCH: 완료하기 <-> 수정하기
export async function patchPrepare2(data: IdealForm, recruitId: number) {
  try {
    const response = await Instance.patch(`/plan/stage2/${recruitId}`, data);
    console.log("모집하기(2) PATCH 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("모집하기(2) PATCH 실패:", error);
    throw error;
  }
}
