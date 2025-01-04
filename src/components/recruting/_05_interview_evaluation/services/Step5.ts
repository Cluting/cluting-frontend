import { Instance } from "../../../../services/AxiosInstance";

const Recruit_Id = 1; // 임시 RecruitId

// 서류 합격자 수 가져오기
export const fetchRecruitMemberNum = () =>
  Instance.get(`/eval/interview/${Recruit_Id}/num`);

// 요청 URL 확인용
// const url = `/eval/interview/${Recruit_Id}/num`;
// console.log(`Request URL: ${Instance.defaults.baseURL}${url}`);
// return Instance.get(url);
