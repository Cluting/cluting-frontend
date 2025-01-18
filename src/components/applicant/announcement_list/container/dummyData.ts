const dummyRecruit: Recruit = {
  id: 1,
  title: "밴드 온더락 6기 모집",
  description: "밴드 동아리 신규 부원 모집합니다",
  image: "/assets/home/main/1.svg",
  isDone: false, // 지원 중/완료 여부에 따라 변경 필요
  caution: "악기 다룰 줄 아는 분 우대",
  deadLine: "2025-02-01", // 현재 날짜 기준으로 D-Day 계산 가능하도록
  currentStage: "서류접수",
  isInterview: true,
  applicationTitle: "밴드 온더락 6기 지원서",
  isRequiredPortfolio: true,
  interviewerCount: 3,
  intervieweeCount: 1,
  interviewDuration: 30
};

// 지원 중인 동아리 더미 데이터
export const dummyData: ClubData[] = [
  {
    id: 1,
    recruits: [{ ...dummyRecruit, isDone: false }],
    name: "밴드 On The Rock",
    description: "음악을 사랑하는 사람들의 모임",
    profile: "/assets/home/main/1Logo.svg",
    category: "CULTURE",
    type: "INTERNAL",
    keyword: ["문화예술", "밴드", "인디"],
    isRecruiting: true
  },
  {
    id: 2,
    recruits: [
      {
        ...dummyRecruit,
        isDone: false,
        title: "댄스 동아리 FLOW 신입모집",
        deadLine: "2025-01-25"
      }
    ],
    name: "FLOW",
    description: "K-pop 댄스 동아리",
    profile: "/assets/home/main/2Logo.svg",
    category: "CULTURE",
    type: "INTERNAL",
    keyword: ["문화예술", "댄스", "K-pop"],
    isRecruiting: true
  },
  {
    id: 3,
    recruits: [
      {
        ...dummyRecruit,
        isDone: true,
        title: "농구 동아리 SLAM 신입모집",
        deadLine: "2025-01-20"
      }
    ],
    name: "SLAM",
    description: "농구를 사랑하는 사람들의 모임",
    profile: "/assets/home/main/3Logo.svg",
    category: "SPORTS",
    type: "INTERNAL",
    keyword: ["스포츠", "농구", "운동"],
    isRecruiting: true
  },
  {
    id: 4,
    recruits: [
      {
        ...dummyRecruit,
        isDone: true,
        title: "코딩 동아리 DevKor 신입모집",
        deadLine: "2025-01-15"
      }
    ],
    name: "DevKor",
    description: "개발자 꿈나무들의 모임",
    profile: "/assets/home/main/4Logo.svg",
    category: "DEV",
    type: "INTERNAL",
    keyword: ["개발", "프로그래밍", "코딩"],
    isRecruiting: true
  }
];
