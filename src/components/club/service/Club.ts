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

// GET: 로그인 된 사용자가 가입한 동아리 중에 리크루팅 중인 동아리 목록 조회 API
export async function getClubRecruitingList() {
  try {
    const { data } = await Instance.get(`/club/user/recruiting`);
    return data;
  } catch (error) {
    console.error("리크루팅 중인 동아리 목록 조회 실패:", error);
    throw error;
  }
}

// POST: 동아리 등록
export async function postClub(clubData: RegisterClubFormValue) {
  try {
    // API 호출
    const { data } = await Instance.post("/club/register", clubData);

    // 성공 응답 반환
    return data;
  } catch (error: any) {
    // 에러 로깅
    console.error("동아리 등록 실패:", error.response?.data || error.message);
    throw error;
  }
}

// PUT: 동아리 리크루팅 시작 API
export async function startClubRecruiting(clubId: number) {
  try {
    const { data } = await Instance.put(`/club/start/${clubId}`);
    return data;
  } catch (error) {
    console.error("동아리 리크루팅 시작 실패:", error);
    throw error;
  }
}
