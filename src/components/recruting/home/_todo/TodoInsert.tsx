import { ChangeEvent, FormEvent, useCallback, useState } from "react";

export default function TodoInsert({ onInsert }: TodoInsertProps) {
  const [value, setValue] = useState<string>("");

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      onInsert(value);
      setValue("");
      e.preventDefault();
    },
    [onInsert, value]
  );

  return (
    <form
      className="pt-[10px] pr-[7px] pb-[12px] pl-[10px] flex bg-[#E5E5EA] w-[270px] h-[30px] items-center"
      onSubmit={onSubmit}
    >
      <img src="/assets/ic-uncheckbox.svg" alt="체크박스" className="w-6 h-6" />
      <input
        className="w-full bg-transparent outline-none border-none ml-2 text-[13px] text-black placeholder-[#8E8E93]"
        placeholder="할 일을 입력해주세요"
        value={value}
        onChange={onChange}
        required
      />
    </form>
  );
}
