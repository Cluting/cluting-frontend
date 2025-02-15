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
    const { data } = await Instance.post(
      "/todo",
      { content } // 요청 본문
    );
    return data; // 서버에서 반환한 새로운 todo 항목
  } catch (error) {
    console.error("TODO 생성 실패:", error);
    throw error;
  }
}

// PATCH: 투두 완료 상태 변경
export async function updateTodoStatus(todoId: number) {
  const url = `https://210.107.205.122:20025/api/v1/todo/status/${todoId}`;
  const headers = {
    accept: "*/*",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Content-Type": "application/json"
  };

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: headers
    });

    const text = await response.text();
    console.log("Response Text:", text);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = text ? JSON.parse(text) : {};
    console.log("Parsed JSON:", data);
    return data;
  } catch (error) {
    console.error("TODO 상태 변경 실패:", error);
    throw error;
  }
}

// DELETE: 투두 삭제
export async function deleteTodo(todoId: number) {
  const url = `https://210.107.205.122:20025/api/v1/todo/${todoId}`;
  const headers = {
    accept: "*/*",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  };

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: headers
    });

    const text = await response.text();
    console.log("Response Text:", text);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = text ? JSON.parse(text) : {};
    console.log("Parsed JSON:", data);
    return data;
  } catch (error) {
    console.error("TODO 삭제 실패:", error);
    throw error;
  }
}
