import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { postClubImage } from "../club/service/Club";

interface UploadClubProfileProps {
  clubId: number;
}

export default function UploadClubProfile({ clubId }: UploadClubProfileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기 URL 상태

  const mutation = useMutation((file: File) => postClubImage(clubId, file), {
    onSuccess: () => {
      console.log("프로필 이미지가 성공적으로 업로드되었습니다.");
    },
    onError: (error) => {
      console.error("프로필 이미지 업로드 중 오류 발생:", error);
    }
  });

  const handleClick = () => {
    fileInputRef.current?.click(); // 클릭 시 파일 선택 창 열기
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0]; // 선택된 파일 가져오기

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string); // 미리보기 URL 설정
      };
      reader.readAsDataURL(file); // 파일 읽기
      mutation.mutate(file);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative flex-center flex-col w-[150px] h-[150px] my-8 bg-white-0 text-gray-500 rounded-full cursor-pointer"
    >
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="프로필 사진"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <img
          src="/assets/ic-profile.svg"
          alt="프로필 사진"
          className="w-full h-full object-cover rounded-full"
        />
      )}
      <img
        src="/assets/ic-profile-edit.svg"
        alt="프로필 사진 수정"
        className="absolute w-[34px] h-[34px] bottom-0 right-0"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }} // 숨겨진 파일 입력
      />
    </button>
  );
}
