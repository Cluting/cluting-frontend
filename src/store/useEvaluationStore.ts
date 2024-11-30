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
        state: "BEFORE",
        incomplete: 3,
        all: 5,
        isDisputed: false,
        isPass: false
      },
      {
        id: uuidv4(),
        name: "곽서연",
        phone: "010-0654-3210",
        group: "개발",
        state: "IN_PROGRESS",
        incomplete: 3,
        all: 5,
        isDisputed: false,
        isPass: false
      },
      {
        id: uuidv4(),
        name: "김은혜",
        phone: "010-5255-5555",
        group: "디자인",
        state: "COMPLETED",
        incomplete: 3,
        all: 5,
        isDisputed: false,
        isPass: false
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
