import { Instance } from "../../../../../services/AxiosInstance";

// GET: 투두 완료 상태 바꾸기
export async function completeTodo() {
  try {
    const { data } = await Instance.get("/api/v1/todo");
    return data;
  } catch (error) {
    console.error("TODO 완료 상태 변경 실패:", error);
    throw error;
  }
}
