import { Instance } from "../../../services/AxiosInstance";

// GET: 동아리 ID로 모든 운영진 목록 조회 API
export async function getClubUser(clubId: number) {
  try {
    const { data } = await Instance.get(`/clubuser/${clubId}`);
    return data;
  } catch (error) {
    console.error("동아리 ID로 모든 운영진 목록 조회:", error);
    throw error;
  }
}
