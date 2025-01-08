import { Instance } from "../../../../services/AxiosInstance";

// GET: [면접 합격자 및 면접 안내] 6-1. 지원자 합불 경과 (면접 합격자, 불합격자 리스트 반환)
export async function getFinalInterviewResults(
  recruitId: number,
  sort: "NEWEST" | "OLDEST" | "INORDER"
) {
  try {
    const { data } = await Instance.get(`/eval/interview/${recruitId}/result`, {
      params: { sort }
    });
    return data;
  } catch (error) {
    console.error("최종 면접 결과 조회 실패:", error);
    throw error;
  }
}
