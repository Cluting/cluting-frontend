import { Instance } from "../../../../../services/AxiosInstance";

// POST: 운영진 초대 링크를 생성
export async function postAdminInvite(clubId: number) {
  try {
    const { data } = await Instance.post("/admin/invite", { clubId });
    return data;
  } catch (error: any) {
    console.error(
      "운영진 초대 링크 생성 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// GET: 초대 링크를 연결하면 동아리의 정보를 반환
export async function getAdminInviteByClub(token: string) {
  try {
    const { data } = await Instance.get(`/admin/invite`, {
      params: { token }
    });
    return data;
  } catch (error) {
    console.error("초대 링크 연결 중 오류 발생:", error);
    throw error;
  }
}

// POST: 운영진 초대 링크 수락
export async function postAdminInviteAccept(
  token: string,
  email: string,
  clubId: number
) {
  try {
    const { data } = await Instance.post(`/admin/invite/accept/${clubId}`, {
      token,
      email
    });
    return data;
  } catch (error: any) {
    console.error(
      " 운영진 초대 링크 수락 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}
