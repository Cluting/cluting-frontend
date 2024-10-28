import { useRef, useState } from "react";
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  Path
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  setValue: (name: Path<T>, value: FileList) => void; // setValue에 FileList 타입 추가
}
export default function UploadProfile<T extends FieldValues>({
  name,
  register,
  setValue
}: InputProps<T>) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // 클릭 시 파일 선택 창 열기
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const file = fileList[0];
      setValue(name, fileList); // clubImage 필드에 파일 목록 설정
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
            {...register(name)}
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
