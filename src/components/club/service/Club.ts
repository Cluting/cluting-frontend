import { Instance } from "../../../services/AxiosInstance";

// GET: ID로 동아리 단일 조회 API
export async function getClub(clubId: number) {
  try {
    const { data } = await Instance.get(`/club/${clubId}`);
    return data;
  } catch (error) {
    console.error(" ID로 동아리 단일 조회:", error);
    throw error;
  }
}

// GET: 로그인 된 사용자가 가입한 동아리 목록 조회 API
export async function getUserClub() {
  try {
    const { data } = await Instance.get("/club/user");
    return data;
  } catch (error) {
    console.error("로그인 된 사용자가 가입한 동아리 목록 조회:", error);
    throw error;
  }
}

// GET:가장 인기 있는 동아리 조회 (홈 화면)
export async function getPopularClub() {
  try {
    const { data } = await Instance.get("/club/popular");
    return data;
  } catch (error) {
    console.error("가장 인기 있는 동아리 조회 (홈 화면):", error);
    throw error;
  }
}

// GET: 로그인 된 사용자가 가입한 동아리 중에 리크루팅 중인 동아리 목록 조회 API
export async function getClubRecruitingList() {
  try {
    const { data } = await Instance.get(`/club/user/recruiting`);
    return data;
  } catch (error) {
    console.error(
      "로그인 된 사용자가 가입한 동아리 중에 리크루팅 중인 동아리 목록 조회 :",
      error
    );
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

// POST: 동아리 프로필 사진 등록 API
export async function postClubImage(clubId: number, profile: File) {
  try {
    const formData = new FormData();
    formData.append("profile", profile);

    const response = await Instance.put(
      `/club/register/image/${clubId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    // 성공 시 true 반환
    return response.status === 200 || response.status === 204;
  } catch (error: any) {
    // 에러 로깅
    console.error(
      "동아리 프로필 사진 등록 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// POST: 동아리 리크루팅 시작(기수+타입 저장) API
export async function startClubRecruiting(
  clubId: number,
  clubData: RecrutingStartFormValue
) {
  try {
    const formattedData = {
      generation: Number(clubData.generation),
      isInterview: clubData.isInterview === true
    };

    console.log(clubId);
    console.log(formattedData);

    const { data } = await Instance.post(
      `/club/start/${clubId}`,
      formattedData
    );
    return data;
  } catch (error) {
    console.error("동아리 리크루팅 시작 실패:", error);
    throw error;
  }
}
