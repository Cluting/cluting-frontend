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

// GET: 리크루팅 홈 데이터 조회 API
export async function getRecruitingHome(recruitId: number, clubId: number) {
  try {
    const { data } = await Instance.get(`/recruiting/home`, {
      params: { recruitId, clubId }
    });
    return data;
  } catch (error) {
    console.error("리크루팅 홈 데이터 조회 실패:", error);
    throw error;
  }
}
