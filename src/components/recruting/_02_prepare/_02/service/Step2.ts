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
