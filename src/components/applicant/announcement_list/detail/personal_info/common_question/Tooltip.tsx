interface ToolTipProps {
  text: string;
}

const ToolTip: React.FC<ToolTipProps> = ({ text }) => {
  return (
    <div className="w-full py-6 px-7 rounded-xl bg-gray-150">
      <p className="text-base font-semibold leading-5 tracking-tight text-left font-Pretendard text-gray-1300">
        {text}
      </p>
    </div>
  );
};

export default ToolTip;
