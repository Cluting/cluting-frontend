import React from "react";

interface CheckboxIconProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxIcon: React.FC<CheckboxIconProps> = ({ checked, onChange }) => {
  return (
    <div onClick={() => onChange(!checked)} className="w-6 h-6">
      {checked ? (
        <img src="/assets/ic-todoCheck.svg" alt="checked Icon" />
      ) : (
        <img src="/assets/ic-emptyCheck.svg" alt="empty checked Icon" />
      )}
    </div>
  );
};

export default CheckboxIcon;
