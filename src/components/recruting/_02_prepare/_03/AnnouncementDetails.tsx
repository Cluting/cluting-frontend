//2-3 공고 작성

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useImageUpload from "../../../../hooks/useImageUpload";

export default function AnnouncementDetails() {
  const { previewUrl, errorMessage, handleImageChange } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // 클릭 시 파일 선택 창 열기
  };

  //Form 제출
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<AnnouncementForm>({ mode: "onBlur" });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form
      onSubmit={onSubmit}
      className="custom-shadow flex flex-col bg-white-100 py-6 mx-8 mb-9 px-10 rounded-[12px] w-full text-left"
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
              {...register("posterImage")}
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

      <label className="mt-6">
        {" "}
        <span className="text-main-100">* </span> 공고 제목
      </label>
      <input
        {...register("title", { required: "필수 입력 사항입니다." })}
        type="text"
        aria-label="공고 제목"
        required
        minLength={5}
        maxLength={100}
        placeholder="ex) 환경 동아리 OO 7기 동아리원 모집"
        className={`input-background input-style ${errors.title ? "border-red-100" : ""}`}
      />
      {errors.title && (
        <p className="text-state-error">{errors.title.message}</p>
      )}

      <label className="mt-6">
        {" "}
        <span className="text-main-100">* </span> 모집 기간
      </label>

      <div className="w-full flex gap-2">
        <input
          {...register("recruitmentStart", {
            required: "필수 선택 사항입니다."
          })}
          type="date"
          required
          min={new Date().toISOString().split("T")[0]}
          aria-label="모집 시작일"
          className={`w-full input-background input-style ${errors.recruitmentStart ? "border-red-100" : ""}`}
        />
        <input
          {...register("recruitmentEnd", { required: "필수 선택 사항입니다." })}
          type="date"
          required
          min={new Date().toISOString().split("T")[0]}
          aria-label="모집 종료일"
          className={`w-full input-background input-style ${errors.recruitmentEnd ? "border-red-100" : ""}`}
        />
      </div>
      {(errors.recruitmentStart || errors.recruitmentEnd) && (
        <p className="text-state-error">필수 선택 사항입니다.</p>
      )}

      <label className="mt-6">
        {" "}
        <span className="text-main-100">* </span> 서류 합격자 발표일
      </label>
      <input
        {...register("announcementDate", { required: "필수 선택 사항입니다." })}
        type="date"
        aria-label="서류 합격자 발표일"
        required
        className={`input-background input-style ${errors.announcementDate ? "border-red-100" : ""}`}
      />
      {errors.announcementDate && (
        <p className="text-state-error">{errors.announcementDate.message}</p>
      )}

      <label className="mt-6">
        {" "}
        <span className="text-main-100">* </span> 최종 합격자 발표일
      </label>
      <input
        {...register("finalResultAnnouncementDate", {
          required: "필수 선택 사항입니다."
        })}
        type="date"
        aria-label="최종 합격자 발표일"
        required
        className={`input-background input-style ${errors.finalResultAnnouncementDate ? "border-red-100" : ""}`}
      />
      {errors.finalResultAnnouncementDate && (
        <p className="text-state-error">
          {errors.finalResultAnnouncementDate.message}
        </p>
      )}
      <label className="mt-6">모집 인원</label>
      <input
        {...register("recruitsCount")}
        type="number"
        min="1"
        max="1000"
        aria-label="모집 인원"
        placeholder="모집 인원을 작성해 주세요."
        className="input-background input-style"
      />

      <label className="mt-6">활동 기간</label>
      <div className="w-full flex gap-2">
        <input
          {...register("activityStart")}
          aria-label="활동 시작일"
          type="date"
          className="w-full input-background input-style"
        />
        <input
          {...register("activityEnd")}
          aria-label="활동 종료일"
          type="date"
          className="w-full input-background input-style"
        />
      </div>

      <label className="mt-6">활동 요일 및 시간</label>
      <div className="w-full flex gap-2">
        <input
          {...register("activityDay")}
          type="text"
          aria-label="활동 요일"
          placeholder="활동 요일을 입력해 주세요."
          className="w-full input-background input-style"
        />
        <input
          {...register("activityTime")}
          aria-label="활동 시간"
          type="time"
          className="w-full input-background input-style"
        />
      </div>

      <label className="mt-6">동아리 회비</label>
      <input
        {...register("clubFee")}
        type="text"
        pattern="[0-9,]+"
        aria-label="동아리 회비"
        placeholder="동아리 회비를 입력해 주세요."
        className="input-background input-style mb-12"
      />
      <button type="submit">제출 테스트</button>
    </form>
  );
}
