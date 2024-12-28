import { Instance } from "../../../../../services/AxiosInstance";

// GET: 투두 리스트 불러오기
export async function getTodos() {
  try {
    const { data } = await Instance.get("/todo");
    return data;
  } catch (error) {
    console.error("TODO 조회 실패:", error);
    throw error;
  }
}

// POST: TODO 생성 함수
export async function createTodo(content: string) {
  try {
    console.log("Request Data:", { content }); // 요청 데이터 로그
    const token = localStorage.getItem("access_token");
    const { data } = await Instance.post(
      "/todo",
      { content }, // 요청 본문
      //
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "*/*"
        }
      }
    );
    return data; // 서버에서 반환한 새로운 todo 항목
  } catch (error) {
    console.error("TODO 생성 실패:", error);
    throw error;
  }
}

//DELETE: 투두 삭제
export async function deleteTodo(todoId: string) {
  try {
    const { data } = await Instance.delete(`/todo/${todoId}`);
    return data;
  } catch (error) {
    console.error("TODO 삭제 실패:", error);
    throw error;
  }
}

// //PATCH: 투두 내용 변경 (근데 이거 없음)
// export async function deleteTodo(todoData: Todo) {}

//PATCH: 투두 완료 상태 변경
export async function updateTodoStatus(todoId: string) {
  try {
    const { data } = await Instance.patch(`/todo/status/${todoId}`);
    return data;
  } catch (error) {
    console.error("TODO 완료 상태 변경 실패:", error);
    throw error;
  }
}
