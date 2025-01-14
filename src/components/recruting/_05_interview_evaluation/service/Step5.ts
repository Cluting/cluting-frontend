import { Instance } from "../../../../services/AxiosInstance";

// GET: 평가전/중/후 지원자 정보 불러오기
export async function getInterviewEvaluationData({
  recruitId,
  groupName,
  sortOrder
}: InterviewEvaluationParams) {
  try {
    const { data } = await Instance.get(`/eval/interview/${recruitId}`, {
      params: {
        groupName,
        sortOrder
      }
    });
    return data;
  } catch (error) {
    console.error("평가전/중/후 지원자 정보 불러오기 실패:", error);
    throw error;
  }
}

// GET: 면접 리스트
export async function getInterviewList(recruitId: number) {
  try {
    const { data } = await Instance.get(`/eval/interview/${recruitId}/list`);
    return data;
  } catch (error) {
    console.error("면접 리스트 조회 실패:", error);
    throw error;
  }
}

// GET: [필터링용] 면접 그룹명 가져오기
export async function getInterviewGroups(recruitId: number) {
  try {
    const { data } = await Instance.get(`/eval/interview/${recruitId}/groups`, {
      params: { recruitId }
    });
    return data;
  } catch (error) {
    console.error("면접 그룹명 조회 실패:", error);
    throw error;
  }
}

// GET: [면접 평가하기] 모집 그룹 공통/ 다수 여부 판단하기
export async function checkInterviewRecruitmentGroups(recruitId: number) {
  try {
    const { data } = await Instance.get(
      `/api/v1/eval/interview/${recruitId}/check`
    );
    return data;
  } catch (error) {
    console.error("모집 그룹 공통/다수 여부 확인 실패:", error);
    throw error;
  }
}

// GET: [최종 합격자 및 활동 안내] 6-1 지원자 합불 결과
type SortOrder = "DEADLINE" | "NEWEST" | "OLDEST" | "INORDER";
export async function getInterviewResults(recruitId: number, sort: SortOrder) {
  try {
    const { data } = await Instance.get(`/eval/interview/${recruitId}/result`, {
      params: { sort }
    });
    return data;
  } catch (error) {
    console.error("6-1 지원자 합불 결과 조회 실패:", error);
    throw error;
  }
}

// GET: 면접 평가 내용 가져오기
export async function getInterviewEvaluationContent(
  recruitId: number,
  interviewId: number
): Promise<InterviewEvaluationContent> {
  try {
    const { data } = await Instance.get<InterviewEvaluationContent>(
      `/eval/interview/${recruitId}/${interviewId}/evaluate`
    );
    return data;
  } catch (error: any) {
    console.error(
      "면접 평가 내용 가져오기 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}
