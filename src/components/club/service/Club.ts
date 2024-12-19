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
          keyword: clubData.keyword
        })
      ],
      { type: "application/json" }
    );
    formData.append("clubCreateRequestDto", clubCreateRequestDtoBlob);

    // profile은 파일이므로 Blob으로 감싸서 추가
    if (clubData.profile) {
      formData.append("profile", clubData.profile, clubData.profile.name);
    }

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    // API 호출
    const { data } = await Instance.post("/club/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json"
      }
    });
    return data;
  } catch (error) {
    console.error("동아리 등록 실패:", error);
    throw error;
  }
}
