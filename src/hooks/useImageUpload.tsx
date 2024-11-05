import { useState } from "react";

export default function useImageUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const file = fileList[0];
      try {
        if (!file.type.startsWith("image/")) {
          throw new Error("이미지 파일만 업로드 가능합니다.");
        }
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("파일 크기는 5MB 이하여야 합니다.");
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
          setErrorMessage(null); // 에러 메시지 초기화
        };
        reader.onerror = () => {
          throw new Error("파일 읽기에 실패했습니다.");
        };
        reader.readAsDataURL(file);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
          console.error(error.message);
        }
        event.target.value = ""; // 파일 입력 초기화
      }
    }
  };

  return { previewUrl, errorMessage, handleImageChange };
}
