import { Instance } from "../../../../services/AxiosInstance";

interface PrepareStepRolesFormValues {
  schedule: RecruitSchedule;
  prepStages: PrepStage[];
  applicantGroups: string[];
}

// POST: [계획하기] 등록하기
export async function postStepPlan(
  recruitId: number,
  planningData: PrepareStepRolesFormValues
) {
  try {
    const { applicantGroups, ...restData } = planningData;
    const dataToSend = {
      ...restData,
      groups: applicantGroups // applicantGroups를 groups로 변경
    };

    const response = await Instance.post(
      `/prep?recruitId=${recruitId}`,
      dataToSend,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return response;
  } catch (error: any) {
    console.error(
      "계획하기 페이지 등록 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// GET: [계획하기] 불러오기
export async function getPlanningData(recruitId: number) {
  try {
    const response = await Instance.get(`/prep`, {
      params: { recruitId }
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "계획하기 데이터 불러오기 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// PATCH: 계획하기 수정
export async function patchPrep(
  recruitId: number,
  planningData: PrepareStepRolesFormValues
) {
  try {
    const { applicantGroups, ...restData } = planningData;

    // 누락된 "지원서 폼 제작" 단계 추가
    const updatedPrepStages = [
      ...restData.prepStages,
      {
        stageName: "지원서 폼 제작",
        stageOrder: 6,
        admins: [
          {
            id: 1,
            name: "user15"
          },
          {
            id: 2,
            name: "user16"
          }
        ]
      }
    ];

    const dataToSend = {
      ...restData,
      prepStages: updatedPrepStages,
      groups: applicantGroups
    };

    console.log(dataToSend);

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/prep?recruitId=${recruitId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*"
        },
        body: JSON.stringify(dataToSend)
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();

    if (!responseText) {
      console.log("서버 응답이 비어있습니다.");
      return null;
    }

    try {
      const responseData = JSON.parse(responseText);
      console.log("계획하기 수정 성공:", responseData);
      return responseData;
    } catch (parseError) {
      console.error("JSON 파싱 오류:", parseError);
      console.log("원본 응답:", responseText);
      throw new Error("서버 응답을 파싱할 수 없습니다.");
    }
  } catch (error) {
    console.error("계획하기 수정 실패:", error);
    throw error;
  }
}
