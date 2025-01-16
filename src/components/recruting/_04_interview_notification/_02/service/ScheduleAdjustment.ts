import { Instance } from "../../../../../services/AxiosInstance";

//POST: 면접 일정 조정하기
export async function postSchedule(
  createFormData: ScheduleFormData,
  recruitId: number
) {
  try {
    const { data } = await Instance.post(
      `/eval/interview/${recruitId}/set`,
      createFormData
    );
    return data;
  } catch (error) {
    console.log("4-2 면접 일정 POST 실패: ", error);
    throw error;
  }
}
// GET: 면접 일정 조정하기
export async function getSchedule(recruitId: number) {
  try {
    const { data } = await Instance.get(`/eval/interview/${recruitId}/avail`);
    return data;
  } catch (error) {
    console.error("4-2 면접 일정 조회 실패:", error);
    throw error;
  }
}
