import { Instance } from "../../../../../services/AxiosInstance";

// GET: 지원 중인 공고 리스트
export async function getApplying() {
  try {
    const { data } = await Instance.get(`/applicant/recruitList/applying`);
    return data;
  } catch (error) {
    console.error("지원 중인 동아리:", error);
    throw error;
  }
}
