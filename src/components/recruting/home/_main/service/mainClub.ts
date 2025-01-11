import { Instance } from "../../../../../services/AxiosInstance";

// GET: 홈화면 동아리 리스트 조회
export async function getMainClub(params?: RecruitListParams) {
  try {
    const { data } = await Instance.get("/recruit/list", {
      params: {
        pageNum: params?.pageNum || 1,
        sortType: params?.sortType,
        clubType: params?.clubType,
        fieldType: params?.fieldType
      }
    });
    return data;
  } catch (error) {
    console.error("홈화면 동아리 리스트 조회:", error);
    throw error;
  }
}
