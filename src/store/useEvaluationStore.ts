import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

// 지원자 평가 상태 - 평가 전, 중, 후
export const useApplicantEvaluationStore =
  create<ApplicantEvaluationStatusStore>((set) => ({
    // 지원자 목록 임시 데이터
    applicants: [
      {
        id: "h6h6",
        name: "윤다인",
        phone: "010-3456-7890",
        group: "개발",
        incomplete: 3,
        all: 5,
        isDisputed: false,
        isPass: false,
        evaluators: [
          {
            name: "은재",
            state: "평가 전",
            groupAccess: "개발",
            totalScore: 85,
            criteriaScores: [
              { id: 1, name: "기획력", score: 30 },
              { id: 2, name: "창의성", score: 25 },
              { id: 3, name: "협업 능력", score: 30 }
            ],
            comment: "기획력이 우수하나, 창의성이 약간 부족합니다."
          },
          {
            name: "은재",
            state: "평가 완료",
            groupAccess: "개발",
            totalScore: 90,
            criteriaScores: [
              { id: 1, name: "기획력", score: 35 },
              { id: 2, name: "창의성", score: 30 },
              { id: 3, name: "협업 능력", score: 25 }
            ],
            comment: "전반적으로 우수한 지원자입니다."
          }
        ]
      },
      {
        id: uuidv4(),
        name: "양성원",
        phone: "010-3456-7890",
        group: "개발",
        incomplete: 3,
        all: 5,
        isDisputed: false,
        isPass: false,
        evaluators: [
          {
            name: "은재",
            state: "평가 전",
            groupAccess: "개발",
            totalScore: 78,
            criteriaScores: [
              { id: 1, name: "기획력", score: 28 },
              { id: 2, name: "창의성", score: 20 },
              { id: 3, name: "협업 능력", score: 30 }
            ],
            comment: "협업 능력은 좋으나, 기획력이 부족합니다."
          }
        ]
      },
      {
        id: "h2h2",
        name: "곽서연",
        phone: "010-3456-7890",
        group: "개발",
        incomplete: 3,
        all: 5,
        isDisputed: false,
        isPass: false,
        evaluators: [
          {
            name: "은재",
            state: "평가 중",
            groupAccess: "개발",
            totalScore: 78,
            criteriaScores: [
              { id: 1, name: "기획력", score: 28 },
              { id: 2, name: "창의성", score: 20 },
              { id: 3, name: "협업 능력", score: 30 }
            ],
            comment: "협업 능력은 좋으나, 기획력이 부족합니다."
          }
        ]
      },
      {
        id: "h3h3",
        name: "박시현",
        phone: "010-0654-3210",
        group: "기획",
        incomplete: 3,
        all: 5,
        isDisputed: false,
        isPass: false,
        evaluators: [
          {
            name: "은재",
            state: "평가 중",
            groupAccess: "개발",
            totalScore: 78,
            criteriaScores: [
              { id: 1, name: "기획력", score: 28 },
              { id: 2, name: "창의성", score: 20 },
              { id: 3, name: "협업 능력", score: 30 }
            ],
            comment: "협업 능력은 좋으나, 기획력이 부족합니다."
          }
        ]
      },
      {
        id: "h1h1",
        name: "김은혜",
        phone: "010-5255-5555",
        group: "디자인",
        incomplete: 3,
        all: 5,
        isDisputed: false,
        isPass: false,
        evaluators: [
          {
            name: "은재",
            state: "평가 중",
            groupAccess: "개발",
            totalScore: 78,
            criteriaScores: [
              { id: 1, name: "기획력", score: 28 },
              { id: 2, name: "창의성", score: 20 },
              { id: 3, name: "협업 능력", score: 30 }
            ],
            comment: "협업 능력은 좋으나, 기획력이 부족합니다."
          }
        ]
      },
      {
        id: "h5h5",
        name: "양성원",
        phone: "010-3456-7890",
        group: "개발",
        incomplete: 3,
        all: 5,
        isDisputed: false,
        isPass: false,
        evaluators: [
          {
            name: "은재",
            state: "평가 완료",
            groupAccess: "개발",
            totalScore: 78,
            criteriaScores: [
              { id: 1, name: "기획력", score: 28 },
              { id: 2, name: "창의성", score: 20 },
              { id: 3, name: "협업 능력", score: 30 }
            ],
            comment: "협업 능력은 좋으나, 기획력이 부족합니다."
          }
        ]
      },
      {
        id: "h4h4",
        name: "김동현",
        phone: "010-5255-5555",
        group: "개발",
        incomplete: 3,
        all: 5,
        isDisputed: false,
        isPass: false,
        evaluators: [
          {
            name: "은재",
            state: "평가 완료",
            groupAccess: "개발",
            totalScore: 78,
            criteriaScores: [
              { id: 1, name: "기획력", score: 28 },
              { id: 2, name: "창의성", score: 20 },
              { id: 3, name: "협업 능력", score: 30 }
            ],
            comment: "협업 능력은 좋으나, 기획력이 부족합니다."
          }
        ]
      },
      {
        id: uuidv4(),
        name: "이은재",
        phone: "010-5255-5555",
        group: "개발",
        incomplete: 3,
        all: 5,
        isDisputed: false,
        isPass: false,
        evaluators: [
          {
            name: "은재",
            state: "평가 완료",
            groupAccess: "기획",
            totalScore: 78,
            criteriaScores: [
              { id: 1, name: "기획력", score: 28 },
              { id: 2, name: "창의성", score: 20 },
              { id: 3, name: "협업 능력", score: 30 }
            ],
            comment: "협업 능력은 좋으나, 기획력이 부족합니다."
          }
        ]
      },
      {
        id: uuidv4(),
        name: "이재현",
        phone: "010-5255-5555",
        group: "개발",
        incomplete: 5,
        all: 5,
        isDisputed: false,
        isPass: true,
        evaluators: [
          {
            name: "은재",
            state: "평가 완료",
            groupAccess: "기획",
            totalScore: 78,
            criteriaScores: [
              { id: 1, name: "기획력", score: 28 },
              { id: 2, name: "창의성", score: 20 },
              { id: 3, name: "협업 능력", score: 30 }
            ],
            comment: "협업 능력은 좋으나, 기획력이 부족합니다."
          }
        ]
      },
      {
        id: uuidv4(),
        name: "정민주",
        phone: "010-5255-5555",
        group: "개발",
        incomplete: 5,
        all: 5,
        isDisputed: false,
        isPass: true,
        evaluators: [
          {
            name: "은재",
            state: "평가 완료",
            groupAccess: "기획",
            totalScore: 78,
            criteriaScores: [
              { id: 1, name: "기획력", score: 28 },
              { id: 2, name: "창의성", score: 20 },
              { id: 3, name: "협업 능력", score: 30 }
            ],
            comment: "협업 능력은 좋으나, 기획력이 부족합니다."
          }
        ]
      },
      {
        id: uuidv4(),
        name: "정주현",
        phone: "010-5255-5555",
        group: "개발",
        incomplete: 5,
        all: 5,
        isDisputed: false,
        isPass: false,
        evaluators: [
          {
            name: "은재",
            state: "평가 완료",
            groupAccess: "개발",
            totalScore: 78,
            criteriaScores: [
              { id: 1, name: "기획력", score: 28 },
              { id: 2, name: "창의성", score: 20 },
              { id: 3, name: "협업 능력", score: 30 }
            ],
            comment: "협업 능력은 좋으나, 기획력이 부족합니다."
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
