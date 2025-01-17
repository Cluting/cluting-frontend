export const formatDate = (date: Date) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getMonth() + 1}.${date.getDate()}.${days[date.getDay()]}`;
};

export const getDateKey = (date: Date) => {
  return date.toISOString().split("T")[0];
};
