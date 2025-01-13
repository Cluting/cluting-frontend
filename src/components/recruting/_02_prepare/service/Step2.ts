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

// GET: 모집하기(3) - 공고 정보 가져오기
export async function getPrepare3AnnouncementInfo(recruitId: number) {
  try {
    const response = await Instance.get(`/plan/stage3/${recruitId}`);
    console.log("성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("모집하기(3) 공고 정보 가져오기 GET 실패:", error);
    throw error;
  }
}

// PATCH: 모집하기(3) - 공고 일부 수정
// PATCH: 모집하기(3) - 공고 일부 수정
export async function patchPrepare3(recruitId: number, data: AnnouncementForm) {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `https://210.107.205.122:20025/api/v1/plan/stage3/${recruitId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("성공:", responseData);
    return responseData;
  } catch (error) {
    console.error("모집하기(3) PATCH 실패:", error);
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
