const decodeToken = (token: string): Record<string, any> | null => {
  try {
    const base64Payload = token.split(".")[1];
    return JSON.parse(atob(base64Payload));
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

// 로컬 스토리지에 저장된 액세스 토큰을 읽어와 유효성을 검사
export const checkTokenValidity = (): boolean => {
  const token = localStorage.getItem("access_token");
  if (token) {
    const parsedToken = decodeToken(token);
    if (parsedToken) {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return parsedToken.exp > currentTime;
    }
  }
  return false;
};
