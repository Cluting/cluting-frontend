import { useRef, useState } from "react";
import { FieldValues, UseFormRegister, Path } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  setValue: (name: Path<T>, value: File) => void; // setValue에 FileList 타입 추가
}
export default function UploadProfile<T extends FieldValues>({
  name,
  register,
  setValue
}: InputProps<T>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기 URL 상태

  const handleClick = () => {
    fileInputRef.current?.click(); // 클릭 시 파일 선택 창 열기
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0]; // 선택된 파일 가져오기

      setValue(name, file); // 선택된 파일 객체를 폼 필드에 등록

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string); // 미리보기 URL 설정
      };
      reader.readAsDataURL(file); // 파일 읽기
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
        {...register(name)} // React Hook Form 등록
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }} // 숨겨진 파일 입력
      />
    </button>
  );
}
