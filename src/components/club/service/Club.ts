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

    // clubCreateRequestDto를 Blob 객체로 변환하여 추가
    const clubCreateRequestDtoBlob = new Blob(
      [
        JSON.stringify({
          name: clubData.name,
          description: clubData.description,
          category: clubData.category,
          type: clubData.type,
          keyword: JSON.stringify(clubData.keyword) // 배열을 JSON 문자열로 변환
        })
      ],
      { type: "application/json" }
    );
    formData.append("clubCreateRequestDto", clubCreateRequestDtoBlob);

    // profile은 파일 객체로 추가
    if (clubData.profile && clubData.profile instanceof File) {
      formData.append("profile", clubData.profile, clubData.profile.name);
    } else {
      console.warn("Invalid profile file:", clubData.profile);
    }

    // FormData 출력 (디버깅 용도)
    formData.forEach((value, key) => {
      console.log(`FormData - ${key}:`, value);
    });

    // API 호출
    const { data } = await Instance.post("/club/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // FormData를 처리하도록 설정
        Accept: "application/json"
      }
    });

    // 성공 응답 반환
    return data;
  } catch (error: any) {
    // 에러 로깅
    console.error("동아리 등록 실패:", error.response?.data || error.message);
    throw error;
  }
}
