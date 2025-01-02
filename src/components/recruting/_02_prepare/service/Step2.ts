import { Instance } from "../../../../services/AxiosInstance";

// POST: 모집하기 (3)
export async function postPrepare3(recruitId: number, data: AnnouncementForm) {
  try {
    const response = await Instance.post(`/plan/stage3/${recruitId}`, data);
    console.log("성공:", response.data);
  } catch (error) {
    console.error("모집하기(3) POST 실패:", error);
    throw error;
  }
}

// POST: 모집하기(4) - 운영진 면접 일정 조정하기-면접세팅
export async function postPrepare4InterviewSetup(
  recruitId: number,
  data: InterviewSetup
) {
  try {
    console.log(data);
    const response = await Instance.post(
      `/plan/stage4/${recruitId}/interview-setup`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*"
        }
      }
    );
    console.log("성공:", response.data);
  } catch (error) {
    console.error("모집하기(4) 운영진 면접 일정 조정 POST 실패:", error);
    throw error;
  }
}
