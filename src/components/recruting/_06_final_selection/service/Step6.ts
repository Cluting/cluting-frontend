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

// POST: [최종합격자 및 활동 안내] 6-2. 합불 안내 메시지 전송하기
export async function sendInterviewResultNotifications(
  recruitId: number,
  state: string,
  message: string
) {
  try {
    const response = await Instance.post(
      `/eval/interview/${recruitId}/send?state=${state}`,
      { message },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("최종 합격 안내 메시지 전송 실패:", error);
    throw error;
  }
}
