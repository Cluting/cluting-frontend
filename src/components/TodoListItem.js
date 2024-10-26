import React from "react";
import cn from "classnames";

// import 구문 제거
// import uncheckbox from "/assets/ic-uncheckbox.svg";
// import checkbox from "/assets/ic-checkbox.svg";
// import check from "/assets/ic-check.svg";

const TodoListItem = ({ todo, onToggle }) => {
  const { id, text, checked } = todo;

  return (
    <div className="pt-[0] pr-[7px] pb-[18px] pl-[10px] flex items-center">
      <div
        className="cursor-pointer flex-1 flex items-center"
        onClick={() => onToggle(id)}
      >
        <div className="relative w-6 h-6">
          <img
            src="/assets/ic-uncheckbox.svg"
            alt="체크박스"
            className="w-6 h-6"
          />
          {checked && (
            <>
              <img
                src="/assets/ic-checkbox.svg"
                alt="체크박스 배경"
                className="absolute top-0 left-0 w-6 h-6"
              />
              <img
                src="/assets/ic-check.svg"
                alt="체크 표시"
                className="absolute top-[6px] left-[6px] w-3 h-3"
              />
            </>
          )}
        </div>
        <div className={cn("ml-2 flex-1", { "line-through": checked })}>
          {text}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);
