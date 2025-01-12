import { Instance } from "../../../../services/AxiosInstance";

// GET: [서류 합격자 및 면접 안내] 4-1. 지원자 합불 경과 (서류 합격자, 불합격자 리스트 반환)
export async function getDocumentEvaluationResults(
  recruitId: number,
  sort: "DEADLINE" | "NEWEST" | "OLDEST" | "INORDER"
) {
  try {
    const { data } = await Instance.get(`/eval/doc/${recruitId}/result`, {
      params: { sort }
    });
    return data;
  } catch (error) {
    console.error("지원자 합불 경과 조회 실패:", error);
    throw error;
  }
}

// GET: [서류 평가 내용 가져오기]
export async function getDocumentEvaluationContent(
  recruitId: number,
  applicationId: number
) {
  try {
    const { data } = await Instance.get(
      `/eval/doc/${recruitId}/${applicationId}/doc-evaluate`
    );
    return data;
  } catch (error) {
    console.error("서류 평가 내용 조회 실패:", error);
    throw error;
  }
}

// GET: [서류 평가하기 - 필터링용] 그룹명 가져오기
export async function getDocumentEvaluationGroups(recruitId: number) {
  try {
    const { data } = await Instance.get(`/eval/doc/${recruitId}/groups`, {
      params: { recruitId }
    });
    return data;
  } catch (error) {
    console.error("서류 평가 그룹명 조회 실패:", error);
    throw error;
  }
}

// POST: [서류 합격자 및 면접 안내] 4-3. 서류 결과 전송하기
export async function sendDocumentEvaluationResults(
  recruitId: number,
  state: string,
  message: string
) {
  try {
    const response = await Instance.post(
      `/eval/doc/${recruitId}/send?state=${state}`,
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
    console.error("서류 결과 문자 전송 실패:", error);
    throw error;
  }
}
