interface RecruitingHomeResponse {
  recruitInfo: {
    clubName: string;
    clubProfile: string;
    isInterview: boolean;
    generation: number;
    currentStage: string;
  };
  recruitSchedule: RecruitSchedule;
  adminList: Array<{
    name: string;
    email: string;
  }>;
  userTodos: Array<{
    todoId: number;
    content: string;
    status: boolean;
  }>;
}
