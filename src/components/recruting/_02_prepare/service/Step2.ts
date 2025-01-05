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
