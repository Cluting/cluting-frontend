//2-3 공고 작성

import { useRef } from "react";
import useImageUpload from "../../../../hooks/useImageUpload";
import { useFormContext } from "react-hook-form";

export default function AnnouncementDetails() {
  const { previewUrl, handleImageChange } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    watch,
    formState: { errors },
    getValues
  } = useFormContext();

  const handleClick = () => {
    fileInputRef.current?.click(); // 클릭 시 파일 선택 창 열기
  };

  //date 값
  const recruitmentStart = watch("recruitmentStartDate");
  const recruitmentEnd = watch("recruitmentEndDate");
  const documentResultDate = watch("documentResultDate");
  const finalResultDate = watch("finalResultDate");
  const activityStart = watch("activityStart");
  const activityEnd = watch("activityEnd");

  return (
    <div className=" flex flex-col bg-white-100 py-6 mx-8 mb-9 px-10 rounded-[12px] w-full text-left">
      <label className="mt-6 announcement-title">포스터 업로드</label>
      <button
        type="button"
        onClick={handleClick}
        className={`h-60 input-background input-style border-dashed ${errors.imageUrl ? "border-red-100" : ""}`}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="포스터 사진"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="flex-center">
            <div className="flex flex-col items-center text-gray-800 text-subheadline gap-3">
              <input
                {...(register("imageUrl"),
                { required: "필수 첨부 내용입니다." })}
                required
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <img
                src="/assets/ic-imageUpload.svg"
                alt="불러오기"
                className="w-[30px] h-[30px] "
              />
              사진 불러오기
            </div>
          </div>
        )}
      </button>

      <label className="mt-6 announcement-title">
        <span className="text-main-100 ">* </span> 공고 제목
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
      {errors?.title && (
        <p className="text-state-error">{errors?.title?.message?.toString()}</p>
      )}

      <label className="mt-6 announcement-title">
        <span className="text-main-100">* </span> 모집 기간
      </label>

      <div className="relative w-full flex gap-2">
        <input
          {...register("recruitmentStartDate", {
            required: "필수 선택 사항입니다."
          })}
          type="date"
          required
          min={new Date().toISOString().split("T")[0]}
          aria-label="모집 시작일"
          className={` relative h-[46px] w-full input-background rounded-[8px] px-[20px] mt-2  ${errors.recruitmentStartDate ? "border-red-100" : ""}`}
        />

        {!recruitmentStart && (
          <span className="absolute top-5 left-5 text-[#c9cace] ">
            날짜를 선택해 주세요.
          </span>
        )}
        {recruitmentStart && (
          <span className="absolute top-5 left-5 text-gray-1100 ">
            {new Date(recruitmentStart).toLocaleDateString()}
          </span>
        )}
        <input
          {...register("recruitmentEndDate", {
            required: "필수 선택 사항입니다.",
            validate: (value) => {
              return (
                !recruitmentStart ||
                new Date(value) >= new Date(recruitmentStart) ||
                "종료일은 시작일 이후여야 합니다."
              );
            }
          })}
          type="date"
          required
          min={new Date().toISOString().split("T")[0]}
          aria-label="모집 종료일"
          className={`w-full input-background input-style ${errors.recruitmentEndDate ? "border-red-100" : ""}`}
        />
        {!recruitmentEnd && (
          <span className="absolute top-5 right-[310px] text-[#c9cace] ">
            날짜를 선택해 주세요.
          </span>
        )}
        {recruitmentEnd && (
          <span className="absolute top-5 right-[355px] text-gray-1100 ">
            {new Date(recruitmentEnd).toLocaleDateString()}
          </span>
        )}
      </div>
      {errors.recruitmentEndDate && (
        <p className="text-state-error">
          {errors.recruitmentEndDate.message?.toString()}
        </p>
      )}

      <div className="mt-6 relative">
        <label className="w-full announcement-title">
          <span className="text-main-100">* </span> 서류 합격자 발표일
        </label>
        <input
          {...register("documentResultDate", {
            required: "필수 선택 사항입니다."
          })}
          type="date"
          aria-label="서류 합격자 발표일"
          required
          className={`w-full input-background input-style ${errors.documentResultDate ? "border-red-100" : ""}`}
        />
        {!documentResultDate && (
          <span className="absolute top-11  left-5 text-[#c9cace] ">
            날짜를 선택해 주세요.
          </span>
        )}
        {documentResultDate && (
          <span className="absolute top-11  left-5 text-gray-1100 ">
            {new Date(documentResultDate).toLocaleDateString()}
          </span>
        )}
        {errors.documentResultDate && (
          <p className="text-state-error">
            {errors.documentResultDate.message?.toString()}
          </p>
        )}
      </div>

      <div className="mt-6 relative">
        <label className="mt-6 w-full announcement-title">
          <span className="text-main-100">* </span> 최종 합격자 발표일
        </label>
        <input
          {...register("finalResultDate", {
            required: "필수 선택 사항입니다."
          })}
          type="date"
          aria-label="최종 합격자 발표일"
          required
          className={`w-full input-background input-style ${errors.finalResultDate ? "border-red-100" : ""}`}
        />
        {!finalResultDate && (
          <span className="absolute top-11  left-5 text-[#c9cace] ">
            날짜를 선택해 주세요.
          </span>
        )}
        {finalResultDate && (
          <span className="absolute top-11  left-5 text-gray-1100 ">
            {new Date(finalResultDate).toLocaleDateString()}
          </span>
        )}
        {errors.finalResultDate && (
          <p className="text-state-error">
            {errors.finalResultDate.message?.toString()}
          </p>
        )}
      </div>

      <div className="relative mt-6">
        <label className="w-full announcement-title">
          <span className="text-main-100">* </span>모집 인원
        </label>
        <input
          {...register("recruitmentNumber", {
            required: "필수 입력 사항입니다."
          })}
          required
          type="number"
          min="1"
          max="1000"
          aria-label="모집 인원"
          placeholder="모집 인원을 작성해 주세요. (단위: 명)"
          className={`w-full pl-14 input-background input-style ${errors.recruitmentNumber ? "border-red-100" : ""}`}
        />
        <img
          src="/assets/ic-recruitsCount.svg"
          alt="불러오기"
          className="absolute top-11 left-5 w-[24px] h-[24px] "
        />
        {errors?.recruitmentNumber && (
          <p className="text-state-error">
            {errors?.recruitmentNumber?.message?.toString()}
          </p>
        )}
      </div>

      <label className="mt-6 announcement-title">
        <span className="text-main-100">* </span>활동 기간
      </label>
      <div className="relative w-full flex gap-2">
        <input
          {...register("activityStart", {
            required: "필수 선택 사항입니다."
          })}
          required
          aria-label="활동 시작일"
          type="date"
          className={`w-full input-background input-style ${errors.activityStart ? "border-red-100" : ""}`}
        />
        {!activityStart && (
          <span className="absolute top-5   left-5 text-[#c9cace] ">
            활동 기간을 선택해 주세요.
          </span>
        )}
        {activityStart && (
          <span className="absolute top-5  left-5 text-gray-1100 ">
            {new Date(activityStart).toLocaleDateString()}
          </span>
        )}
        <input
          {...register("activityEnd", {
            required: "필수 선택 사항입니다.",
            validate: (value) => {
              const activityStart = getValues("activityStart");
              return (
                !activityStart ||
                new Date(value) >= new Date(activityStart) ||
                "종료일은 시작일 이후여야 합니다."
              );
            }
          })}
          required
          aria-label="활동 종료일"
          type="date"
          className={`w-full input-background input-style ${errors.activityEnd ? "border-red-100" : ""}`}
        />
        {!activityEnd && (
          <span className="absolute top-5 right-[275px] text-[#c9cace] ">
            활동 기간을 선택해 주세요.
          </span>
        )}
        {activityEnd && (
          <span className="absolute top-5  right-[355px]  text-gray-1100 ">
            {new Date(activityEnd).toLocaleDateString()}
          </span>
        )}
      </div>
      {errors.activityEnd && (
        <p className="text-state-error">
          {errors?.activityEnd?.message?.toString()}
        </p>
      )}

      <div className="mt-6 relative">
        <label className="w-full announcement-title">활동 요일 및 시간</label>
        <div className="w-full flex gap-2">
          <input
            {...register("activityDay")}
            type="text"
            aria-label="활동 요일"
            placeholder="고정 활동 요일을 작성해 주세요."
            className="w-full pl-14 input-background input-style"
          />
          <img
            src="/assets/ic-activityDay.svg"
            alt="활동 요일 아이콘"
            className="absolute top-11 left-5 w-[24px] h-[24px] "
          />
          <input
            {...register("activityTime")}
            aria-label="활동 시간"
            type="text"
            placeholder="하루 당 시간을 작성해 주세요. (단위: 시간)"
            className="w-full pl-14 input-background input-style"
          />
          <img
            src="/assets/ic-activityTime.svg"
            alt="활동 시간 아이콘"
            className="absolute top-11  right-[424px] w-[22px] h-[22px] "
          />
        </div>
      </div>

      <div className="mt-6 relative">
        <label className="w-full announcement-title">동아리 회비</label>
        <input
          {...register("clubFee")}
          type="number"
          pattern="[0-9,]+"
          aria-label="동아리 회비"
          placeholder="동아리 회비를 입력해 주세요. (단위: 원)"
          className="w-full  pl-14  input-background input-style mb-12"
        />
        <img
          src="/assets/ic-clubFee.svg"
          alt="동아리 회비 아이콘"
          className="absolute top-11 left-5 w-[22px] h-[22px] "
        />
      </div>
    </div>
  );
}
