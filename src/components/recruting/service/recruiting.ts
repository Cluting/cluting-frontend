import { Instance } from "../../../services/AxiosInstance";

// GET: 현재 리크루팅 공고 진행 단계 조회 API
export async function getCurrentStage(recruitId: number) {
  try {
    const { data } = await Instance.get(`/global/current-stage`, {
      params: { recruitId }
    });
    return data;
  } catch (error) {
    console.error("현재 리크루팅 공고 진행 단계 조회 실패:", error);
    throw error;
  }
}
