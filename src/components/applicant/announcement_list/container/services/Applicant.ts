import { Instance } from "../../../../../services/AxiosInstance";

// GET: 지원 중인 동아리
export async function getApplying() {
  try {
    const { data } = await Instance.get(`/applicant/recruitList/applying`);
    return data;
  } catch (error) {
    console.error("지원 중인 동아리:", error);
    throw error;
  }
}

// GET: 지원한 동아리
export async function getApplied() {
  try {
    const { data } = await Instance.get(`/applicant/recruitList/applied`);
    return data;
  } catch (error) {
    console.error("지원한 동아리:", error);
    throw error;
  }
}

// GET: 스크랩한 동아리
export async function getScrapped() {
  try {
    const { data } = await Instance.get(`/applicant/recruitList/scrapped`);
    return data;
  } catch (error) {
    console.error("스크랩한 동아리:", error);
    throw error;
  }
}

// GET: 최근 본 동아리
export async function getRecent() {
  try {
    const { data } = await Instance.get(`/applicant/recruitList/recent`);
    return data;
  } catch (error) {
    console.error("최근 본 동아리:", error);
    throw error;
  }
}
