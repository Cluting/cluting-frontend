import { useCallback, useState } from "react";
import "./TodoInsert.scss";

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue("");
      e.preventDefault(); //submit시 새로고침 방지
    },
    [onInsert, value]
  );
  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력해주세요"
        value={value}
        onChange={onChange}
      />
    </form>
  );
};

export default TodoInsert;
