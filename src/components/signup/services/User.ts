import { Instance } from "../../../services/AxiosInstance";

// GET: 유저 본인 정보 조회
export async function getMe() {
  try {
    const { data } = await Instance.get("/user/me");
    return data;
  } catch (error) {
    console.error("유저 본인 정보 조회:", error);
    throw error;
  }
}

// GET: 로그인
export async function getSignin() {
  try {
    const { data } = await Instance.get("/useSr/sign-in");
    return data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
}

// POST: 회원가입
export async function postSignup(passwordData: SignupFormValue) {
  try {
    const { data } = await Instance.post("/user/sign-up", passwordData);
    return data;
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
}
