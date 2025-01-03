import { Instance } from "../../../../services/AxiosInstance";

// GET: 이전 과정에서 설정한 서류 합격자 수 목록 조회 API
export async function getDocPassApplicantNumber(recruitId: number) {
  try {
    const { data } = await Instance.get(`/doc/pre/${recruitId}`);
    return data;
  } catch (error) {
    console.error("이전 과정에서 설정한 서류 합격자 수 목록 조회:", error);
    throw error;
  }
}
// GET: 모집 공고에 지원한 지원자 수 조회 API
export async function getEntireApplicantNumber(recruitId: number) {
  try {
    const { data } = await Instance.get(`/recruit/apply/${recruitId}`);
    return data;
  } catch (error) {
    console.error("모집 공고에 지원한 지원자 수 조회:", error);
    throw error;
  }
}

// POST: 서류 평가 준비하기 설정 저장
export async function postDocPre(recruitId: number, DocPreData: GroupRequest) {
  try {
    const { data } = await Instance.post(
      `/recruit/doc/pre/${recruitId}`,
      DocPreData
    );
    return data;
  } catch (error: any) {
    console.error(
      "서류 평가 준비하기 설정 저장 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// POST: 서류 평가하기 <평가 전> 지원서 리스트 불러오기
export async function postDocBefore(
  recruitId: number,
  DocBeforeData: DocBeforeRequest
) {
  try {
    const { data } = await Instance.post(
      `/eval/doc/${recruitId}/before`,
      DocBeforeData
    );
    return data;
  } catch (error: any) {
    console.error(
      "서류 평가하기 <평가 전> 지원서 리스트 불러오기 요청 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// POST: 서류 평가 전송
export async function postDocEvaluation(
  recruitId: number,
  applicationId: number,
  DocEvaluationData: DocEvaluationRequest
) {
  try {
    const { data } = await Instance.post(
      `/eval/doc/${recruitId}/before`,
      DocEvaluationData
    );
    return data;
  } catch (error: any) {
    console.error(
      "서류 평가 전송 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}
