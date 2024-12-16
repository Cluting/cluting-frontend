import { Instance } from "../../../services/AxiosInstance";

// GET: ID로 동아리 단일 조회 API
export async function getClub(clubId: number) {
  try {
    const { data } = await Instance.get(`/club/${clubId}`);
    return data;
  } catch (error) {
    console.error("유저 본인 정보 조회:", error);
    throw error;
  }
}

// GET: 로그인 된 사용자가 가입한 동아리 목록 조회 API
export async function getUserClub() {
  try {
    const { data } = await Instance.get("/club/user");
    return data;
  } catch (error) {
    console.error("유저 본인 정보 조회:", error);
    throw error;
  }
}

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
    // FormData 객체 생성
    const formData = new FormData();

    // FormData에 데이터 추가
    formData.append("name", clubData.name);
    formData.append("description", clubData.description);
    formData.append("category", clubData.category);
    formData.append("type", clubData.type);

    // keywords는 배열이므로 각각 추가
    clubData.keyword.forEach((item) => {
      formData.append("keyword", item);
    });

    const { data } = await Instance.post("/club/register", formData);
    return data;
  } catch (error) {
    console.error("동아리 등록 실패:", error);
    throw error;
  }
}
