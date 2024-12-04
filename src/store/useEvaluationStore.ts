import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

// 지원자 평가 상태 - 평가 전, 중, 후
export const useApplicantEvaluationStore =
  create<ApplicantEvaluationStatusStore>((set) => ({
    // 지원자 목록 임시 데이터
    applicants: [
      {
        id: uuidv4(),
        name: "윤다인",
        phone: "010-3456-7890",
        group: "기획",
        incomplete: 3,
        all: 5,
        isDisputed: false,
        isPass: false,
        evaluators: [
          {
            name: "홍길동",
            groupAccess: "개발",
            evaluation: [
              {
                id: uuidv4(),
                state: "평가 전",
                criteriaScores: [
                  { id: 1, name: "기획력", score: 30 },
                  { id: 2, name: "창의성", score: 25 },
                  { id: 3, name: "협업 능력", score: 30 }
                ],
                comment: "기획력이 우수하나, 창의성이 약간 부족합니다.",
                totalScore: 85
              }
            ]
          },
          {
            name: "평가자B",
            groupAccess: "개발",
            evaluation: [
              {
                id: uuidv4(),
                state: "평가 완료",
                criteriaScores: [
                  { id: 1, name: "기획력", score: 35 },
                  { id: 2, name: "창의성", score: 30 },
                  { id: 3, name: "협업 능력", score: 25 }
                ],
                comment: "전반적으로 우수한 지원자입니다.",
                totalScore: 90
              }
            ]
          }
        ]
      }
    ],

    // 지원자 상태 업데이트
    updateApplicantState: (name, newState) =>
      set((state) => ({
        applicants: state.applicants.map((applicant) =>
          applicant.name === name
            ? { ...applicant, state: newState }
            : applicant
        )
      }))
  }));

export const useEvaluatorStore = create<EvaluatorStore>((set) => ({
  //현재 평가자
  evaluator: {
    id: uuidv4(), // 평가자 id
    name: "홍길동",
    groupAccess: "개발",
    evaluation: [
      {
        id: uuidv4(), // 지원자 id
        state: "평가 전",
        criteriaScores: [
          { id: 1, name: "기획력", score: 28 },
          { id: 2, name: "창의성", score: 20 },
          { id: 3, name: "협업 능력", score: 30 }
        ],
        comment: "협업 능력은 좋으나, 기획력이 부족합니다.",
        totalScore: 78
      }
    ]
  },

  updateEvaluationState: (id: string, newState: string) =>
    set((state) => ({
      evaluator: {
        ...state.evaluator,
        evaluation: state.evaluator.evaluation.map((evalItem) =>
          evalItem.id === id ? { ...evalItem, state: newState } : evalItem
        )
      }
    }))
}));
