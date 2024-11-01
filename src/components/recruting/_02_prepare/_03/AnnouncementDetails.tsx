//2-3 공고 작성

import { useRef, useState } from "react";

export default function AnnouncementDetails() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // 클릭 시 파일 선택 창 열기
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const file = fileList[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="flex flex-col bg-white-100 py-6 mx-8 mb-9 px-10 rounded-[12px] w-full text-left">
      <label className="mt-6">포스터 업로드</label>
      <button
        type="button"
        onClick={handleClick}
        className="h-60 input-background input-style border-dashed"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="포스터 사진"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            사진 불러오기
          </div>
        )}
      </button>

      <label className="mt-6">공고 제목</label>
      <input type="text" className="input-background input-style" />

      <label className="mt-6">모집 기간</label>
      <input type="date" className="input-background input-style" />

      <label className="mt-6">서류 합격자 발표일</label>
      <input type="date" className="input-background input-style" />

      <label className="mt-6">모집 인원</label>
      <input type="number" className="input-background input-style" />

      <label className="mt-6">활동 기간</label>
      <input type="date" className="input-background input-style" />

      <label className="mt-6">활동 요일 및 시간</label>
      <input type="date" className="input-background input-style" />

      <label className="mt-6">동아리 회비</label>
      <input type="text" className="input-background input-style mb-12" />
    </form>
  );
}
