import { Instance } from "../../../../../services/AxiosInstance";

//POST: 합격 인원 설정하기
export async function postPrepare1(
  data: SetAcceptanceCountFormData,
  recruitId: number
) {
  try {
    const response = await Instance.post(`/plan/stage1/${recruitId}`, data);
    console.log("모집하기(1) POST 성공:", response.data);
  } catch (error) {
    console.error("모집하기(1) POST 실패:", error);
    throw error;
  }
}

// GET: 합격 인원 및 인재상 불러오기(1,2단계)
export async function getPassIdeal(recruitId: number) {
  try {
    const { data } = await Instance.get<PassIdealResponse>(
      `/plan/details/${recruitId}`
    );
    return data;
  } catch (error) {
    console.error("합격 인원 및 인재상 조회 실패:", error);
    throw error;
  }
}
