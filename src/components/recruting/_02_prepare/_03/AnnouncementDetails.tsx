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
      // File type validation
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }
      // File size validation (e.g., 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate all fields
    // Create FormData object
    // Submit to API
    try {
      // API call
    } catch (error) {
      // Error handling
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-white-100 py-6 mx-8 mb-9 px-10 rounded-[12px] w-full text-left"
    >
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
      <input
        type="text"
        aria-label="공고 제목"
        required
        minLength={5}
        maxLength={100}
        placeholder="ex) 환경 동아리 OO 7기 동아리원 모집"
        className="input-background input-style"
      />

      <label className="mt-6">모집 기간</label>

      <div className="w-full flex gap-2">
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          aria-label="모집 시작일"
          className="w-full input-background input-style"
        />
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          aria-label="모집 종료일"
          className="w-full input-background input-style"
        />
      </div>

      <label className="mt-6">서류 합격자 발표일</label>
      <input type="date" className="input-background input-style" />

      <label className="mt-6">모집 인원</label>
      <input
        type="number"
        min="1"
        max="1000"
        aria-label="모집 인원"
        placeholder="모집 인원을 작성해 주세요."
        className="input-background input-style"
      />

      <label className="mt-6">활동 기간</label>
      <div className="w-full flex gap-2">
        <input type="date" className="w-full input-background input-style" />
        <input type="date" className="w-full input-background input-style" />
      </div>

      <label className="mt-6">활동 요일 및 시간</label>
      <div className="w-full flex gap-2">
        <input
          type="text"
          placeholder="활동 요일을 입력해 주세요."
          className="w-full input-background input-style"
        />
        <input type="time" className="w-full input-background input-style" />
      </div>

      <label className="mt-6">동아리 회비</label>
      <input
        type="text"
        placeholder="동아리 회비를 입력해 주세요."
        className="input-background input-style mb-12"
      />
    </form>
  );
}
