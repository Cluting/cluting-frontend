import { Instance } from "./AxiosInstance";

// GET:가장 인기 있는 동아리 조회 (홈 화면)
export async function getPopularClub() {
  try {
    const { data } = await Instance.get("/club/popular");
    return data;
  } catch (error) {
    console.error("유저 본인 정보 조회:", error);
    throw error;
  }
}

// POST: 동아리 등록
export async function postClub(clubData: RegisterClubFormValue) {
  try {
    const { data } = await Instance.post("/club/create", clubData);
    return data;
  } catch (error) {
    console.error("동아리 등록 실패:", error);
    throw error;
  }
}
