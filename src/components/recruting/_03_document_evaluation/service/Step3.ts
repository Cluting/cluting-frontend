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

// POST: 서류 평가하기 <평가 중> 지원서 리스트 불러오기
export async function postDocIng(
  recruitId: number,
  DocIngData: DocBeforeRequest
) {
  try {
    const { data } = await Instance.post(
      `/eval/doc/${recruitId}/ing`,
      DocIngData
    );
    return data;
  } catch (error: any) {
    console.error(
      "서류 평가하기 <평가 중> 지원서 리스트 불러오기 요청 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// POST: 서류 평가하기 <평가 후> 지원서 리스트 불러오기
export async function postDocAfter(
  recruitId: number,
  DocAfterData: DocBeforeRequest
) {
  try {
    const { data } = await Instance.post(
      `/eval/doc/${recruitId}/after`,
      DocAfterData
    );
    return data;
  } catch (error: any) {
    console.error(
      "서류 평가하기 <평가 후> 지원서 리스트 불러오기 요청 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// POST: 서류 평가하기 <평가 완료> 지원서 리스트 불러오기
export async function postDocComplete(
  recruitId: number,
  DocCompleteData: DocBeforeRequest
) {
  try {
    const { data } = await Instance.post(
      `/eval/doc/${recruitId}/complete`,
      DocCompleteData
    );
    return data;
  } catch (error: any) {
    console.error(
      "서류 평가하기 <평가 완료> 지원서 리스트 불러오기 요청 실패:",
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
      `/eval/doc/${recruitId}/${applicationId}/doc-evalute`,
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

// PATCH: [서류 평가하기] 4-3. <서류 평가 상태 업데이트>

export async function updateDocEvaluationStatus(
  recruitId: number,
  applicationId: number,
  result: "PASS" | "FAIL"
) {
  try {
    const { data } = await Instance.patch(
      `/api/v1/eval/doc/${recruitId}/${applicationId}/evaluate?result=${result}`
    );
    return data;
  } catch (error: any) {
    console.error(
      "서류 평가 상태 업데이트 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// PATCH: [서류 평가하기] 4-2. 서류 평가 상태를 이의제기 중으로 변경
export async function updateDocEvaluateDispute(
  recruitId: number,
  applicationId: number
) {
  try {
    const { data } = await Instance.patch(
      `/api/v1/eval/doc/${recruitId}/state/objection?applicationId=${applicationId}`
    );
    return data;
  } catch (error: any) {
    console.error(
      "서류 평가 상태를 이의제기 중으로 변경 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// FIX: 수정된 평가전/중/후/완료 API

interface Evaluator {
  name: string;
  state: string;
}

interface Applicant {
  evaluationStage: string;
  applicantName: string;
  applicantPhone: string;
  groupName: string;
  applicationNumClubUser: string;
  createdAt: string;
  currentEvaluator: Evaluator;
  otherEvaluators: Evaluator[];
}

interface CompletedApplicant {
  evaluationStage: string;
  applicantName: string;
  applicantPhone: string;
  groupName: string;
  applicationNumClubUser: string;
  createdAt: string;
  currentEvaluator: {
    name: string;
    state: string;
  };
  otherEvaluators: Array<{
    name: string;
    state: string;
  }>;
  result: "PASS" | "FAIL";
}

// GET: 평가 전 지원서 리스트
export async function getAppListBefore(
  recruitId: number
): Promise<Applicant[]> {
  try {
    const { data } = await Instance.get<Applicant[]>(
      `/app-list/${recruitId}/before`
    );
    return data;
  } catch (error: any) {
    console.error(
      "서류 평가하기 <평가 전> 지원서 리스트 불러오기 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// GET: 평가 중 지원서 리스트
export async function getAppListIng(recruitId: number): Promise<Applicant[]> {
  try {
    const { data } = await Instance.get<Applicant[]>(
      `/app-list/${recruitId}/ing`
    );
    return data;
  } catch (error: any) {
    console.error(
      "서류 평가하기 <평가 중> 지원서 리스트 불러오기 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// GET: 평가 후 지원서 리스트
export async function getAppListAfter(recruitId: number): Promise<Applicant[]> {
  try {
    const { data } = await Instance.get<Applicant[]>(
      `/app-list/${recruitId}/after`
    );
    return data;
  } catch (error: any) {
    console.error(
      "서류 평가하기 <평가 후> 지원서 리스트 불러오기 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// GET: 평가 완료 지원서 리스트
export async function getAppListComplete(
  recruitId: number
): Promise<CompletedApplicant[]> {
  try {
    const { data } = await Instance.get<CompletedApplicant[]>(
      `/app-list/${recruitId}/complete`
    );
    return data;
  } catch (error: any) {
    console.error(
      "평가 완료 지원서 리스트 불러오기 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// GET: 서류 평가 내용 가져오기
export async function getDocEvaluationContent(
  recruitId: number,
  applicationId: number
): Promise<DocEvaluationContent> {
  try {
    const { data } = await Instance.get<DocEvaluationContent>(
      `/eval/doc/${recruitId}/${applicationId}/doc-evaluate`
    );
    return data;
  } catch (error: any) {
    console.error(
      "서류 평가 내용 가져오기 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}
