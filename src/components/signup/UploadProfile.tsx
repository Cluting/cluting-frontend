import { useRef, useState } from "react";

export default function UploadProfile() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // 클릭 시 파일 선택 창 열기
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex-center flex-col w-[150px] h-[150px] my-8 bg-white-0 border border-gray-500 text-gray-500 rounded-full cursor-pointer"
    >
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="프로필 사진"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <div>
          {" "}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          프로필 사진 추가
        </div>
      )}
    </button>
  );
}
