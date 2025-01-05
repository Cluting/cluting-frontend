interface NavigationButtonProps {
  currentPage: number;
  totalPage: number;
  onNext: () => void;
  onPrevious: () => void;
  onComplete?: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  currentPage,
  totalPage,
  onNext,
  onPrevious,
  onComplete
}) => {
  return (
    <div className="flex gap-7">
      {currentPage > 0 && (
        <button
          onClick={onPrevious}
          type="button"
          className="flex flex-center w-44 h-14 rounded-xl bg-main-300 text-[#5E2BE8] font-Pretendard text-xl font-semibold leading-6 tracking-wide"
        >
          이전
        </button>
      )}
      {/* 다음 버튼 및 완료 버튼 */}
      {currentPage < totalPage - 1 ? (
        <button
          onClick={onNext}
          type="button"
          className="flex flex-center w-44 h-14 rounded-xl bg-[#5E2BE8] text-white-100 font-Pretendard text-xl font-semibold leading-6 tracking-wide"
        >
          다음
        </button>
      ) : (
        <button
          onClick={onComplete}
          type="button"
          className="flex flex-center w-44 h-14 rounded-xl bg-[#5E2BE8] text-white-100 font-Pretendard text-xl font-semibold leading-6 tracking-wide"
        >
          완료
        </button>
      )}
    </div>
  );
};

export default NavigationButton;
