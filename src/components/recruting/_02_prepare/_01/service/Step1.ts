import { Instance } from "../../../../../services/AxiosInstance";

//POST: 합격 인원 설정하기
export async function postPrepare1(
  data: SetAcceptanceCountFormData,
  recruitId: number
) {
  try {
    const response = await Instance.post(`/plan/stage1/${recruitId}`, data);
    console.log("성공:", response.data);
  } catch (error) {
    console.error("모집하기(1) POST 실패:", error);
    throw error;
  }
}
