import { Instance } from "../../../../../services/AxiosInstance";

//POST: 지원서 폼 제작하기
export async function postCreateForm(
  createFormData: CreateApplicationForm,
  recruitId: number
) {
  try {
    const { data } = await Instance.post(
      `/plan/stage5/${recruitId}`,
      createFormData
    );
    return data;
  } catch (error) {
    console.log("지원서 폼 생성 실패: ", error);
    throw error;
  }
}
