import { memo } from "react";

interface ApplicantButtonProps {
  applicant: {
    id: number;
    name: string;
  };
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
  isIncomplete?: boolean;
}
export const ApplicantButton = memo(
  ({
    applicant,
    isSelected,
    isDisabled,
    onClick,
    isIncomplete
  }: ApplicantButtonProps) => (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`flex-center w-[80px] h-[35px] border rounded-[6px] text-caption3
      ${
        isSelected
          ? "bg-main-300 border-main-400 text-main-100"
          : "bg-gray-100 border-gray-200 text-gray-500"
      }
      ${
        isDisabled
          ? "opacity-30 cursor-not-allowed"
          : "hover:bg-main-300 hover:border-main-400 hover:text-main-100"
      } ${isIncomplete ? "border-red-100" : ""}`}
    >
      {applicant.name}
    </button>
  )
);

ApplicantButton.displayName = "ApplicantButton";
