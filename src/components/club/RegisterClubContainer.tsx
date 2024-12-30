import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import SignupDropdown from "../signup/SignupDropdown";
import ClubKeyword from "../signup/ClubKeyword";
import { useMutation } from "@tanstack/react-query";
import { postClub, postClubImage } from "./service/Club";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import { useNavigate } from "react-router-dom";
import UploadClubProfile from "../signup/UploadClubProfile";

export default function RegisterClubContainer() {
  const navigate = useNavigate();
  const [clubId, setClubId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기 URL 상태

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterClubFormValue>({ mode: "onChange" });

  // 동아리 등록
  const clubMutation = useMutation(postClub, {
    onSuccess: (data) => {
      console.log("동아리가 성공적으로 등록되었습니다!");
      setClubId(data.id); // 서버에서 반환한 clubId 저장
      if (selectedFile && data.id) {
        imageMutation.mutate({ clubId: data.id, file: selectedFile });
      }
    },
    onError: (error) => {
      console.error("동아리 등록 중 오류 발생:", error);
    }
  });

  // 이미지 업로드
  const imageMutation = useMutation(
    ({ clubId, file }: { clubId: number; file: File }) =>
      postClubImage(clubId, file),
    {
      onSuccess: () => {
        console.log("프로필 이미지가 성공적으로 업로드되었습니다.");
        navigate("/main");
      },
      onError: (error) => {
        console.error("프로필 이미지 업로드 중 오류 발생:", error);
      }
    }
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }

    if (fileList && fileList.length > 0) {
      const file = fileList[0]; // 선택된 파일 가져오기

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string); // 미리보기 URL 설정
      };
      reader.readAsDataURL(file); // 파일 읽기
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click(); // 클릭 시 파일 선택 창 열기
  };

  const onSubmit = (data: RegisterClubFormValue) => {
    console.log("제출 데이터", data);
    clubMutation.mutate(data);
  };

  //드롭다운
  const [clubType, setClubType] = useState(false);
  const [clubCategory, setClubCategory] = useState(false);
  const [selectedClubType, setSelectedClubType] = useState(""); // 선택한 교내/연합
  const [selectedClubCategory, setSelectedClubCategory] = useState(""); // 선택한 동아리 분야

  const handleTypeSelect = (type: string) => {
    const typeValue =
      type === "교내" ? "INTERNAL" : type === "연합" ? "EXTERNAL" : "";

    setSelectedClubType(type); // 선택된 타입(표시용)
    setValue("type", typeValue); // 변환된 값으로 폼 상태 업데이트
    setClubType(!clubType); // 드롭다운 닫기
  };

  const handleCategorySelect = (category: string, value?: string) => {
    setSelectedClubCategory(category); // 선택된 카테고리(표시용)
    setValue("category", value ?? ""); // 변환된 값으로 폼 상태 업데이트
    setClubCategory(!clubCategory); // 드롭다운 닫기
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[680px] py-20 mb-40 rounded-[14px] border-[#D6D7DA] bg-white-100 flex flex-col items-center"
    >
      <section className="flex flex-col items-center text-left mb-10">
        <p className="text-title3 text-gray-900">프로필 사진</p>
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
      </section>

      <hr className="w-[400px] py- border border-gray-200 mt-4 mb-8" />

      <section className="flex flex-col text-left my-10">
        <p className="text-title3 text-gray-900">기본 정보</p>
        <Input
          name="name"
          register={register}
          type="text"
          placeholder="동아리 이름"
          required
        />
        <div className="relative">
          <Input
            name="type"
            register={register}
            value={selectedClubType}
            type="text"
            onClick={() => {
              setClubType(!clubType);
            }}
            placeholder={selectedClubType || "교내/연합"}
            required
            isDropdown
            isDropdownSelected={!!selectedClubType}
          />
          {clubType && <SignupDropdown onSelect={handleTypeSelect} clubType />}
        </div>
        <div className="relative">
          <Input
            name="category"
            register={register}
            value={selectedClubCategory}
            type="text"
            onClick={() => {
              setClubCategory(!clubCategory);
              console.log(selectedClubCategory);
            }}
            placeholder={selectedClubCategory || "분야"}
            required
            isDropdown
            isDropdownSelected={!!selectedClubCategory}
          />
          {clubCategory && (
            <SignupDropdown onSelect={handleCategorySelect} clubCategory />
          )}
        </div>
      </section>

      <hr className="w-[400px] py- border border-gray-200 my-8" />

      <section className="flex flex-col text-left my-10">
        <ClubKeyword register={register} watch={watch} setValue={setValue} />
      </section>

      <hr className="w-[400px] py- border border-gray-200 my-8" />

      <section className="flex flex-col text-left my-10">
        <p className="text-title3 text-gray-900">동아리 소개</p>
        <Textarea
          name="description"
          register={register}
          maxLength={3000}
          placeholder="동아리 소개글을 작성해 주세요."
        />
      </section>

      <button
        type="submit"
        aria-label="동아리 등록하기"
        className="bg-main-100 hover:bg-main-500 text-white-100 w-[404px] h-[70px] rounded-[8px] text-body mt-[15px] border border-gray-700 "
      >
        동아리 등록하기
      </button>
    </form>
  );
}
