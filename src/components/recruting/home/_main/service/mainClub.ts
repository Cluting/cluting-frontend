import { Instance } from "../../../../../services/AxiosInstance";

// GET: 홈화면 동아리 리스트 조회
export async function getMainClub() {
  try {
    const { data } = await Instance.get("/recruit/list");
    return data;
  } catch (error) {
    console.error("홈화면 동아리 리스트 조회:", error);
    throw error;
  }
}
