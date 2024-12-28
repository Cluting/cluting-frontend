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

// POST: 운영진 초대 링크 수락
export async function postAdminInviteAccept(token: string, email: string) {
  try {
    const { data } = await Instance.post("/admin/invite/accept");
    return data;
  } catch (error: any) {
    console.error(
      " 운영진 초대 링크 수락 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}
