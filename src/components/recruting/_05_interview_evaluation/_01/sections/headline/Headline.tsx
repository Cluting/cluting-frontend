import React from "react";

interface HeadlineProps {
  essential?: boolean;
  title: string;
  hint: string;
  children?: React.ReactNode;
}

const Headline: React.FC<HeadlineProps> = ({
  essential,
  title,
  hint,
  children
}) => {
  return (
    <div className="flex items-center gap-4">
      <h3 className="text-xl font-bold leading-5 tracking-wide font-Pretendard text-gray-1100">
        {essential && (
          <span className="mr-1 text-xl font-bold leading-5 tracking-wide text-main-500 font-Pretendard">
            *
          </span>
        )}
        {title}
      </h3>
      <div className="tooltip">{hint}</div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default Headline;
