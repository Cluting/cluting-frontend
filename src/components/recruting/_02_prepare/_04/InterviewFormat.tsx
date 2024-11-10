import { useForm } from "react-hook-form";

// 1 - 면접 형식 설정하기
export default function InterviewFormat() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormValue>({ mode: "onBlur" });

  return (
    <div className="section-background ">
      <div className="flex items-center">
        <div className="flex flex-col">
          <p className="text-gray-850 text-callout">면접관</p>
          <div className="flex items-center">
            <input
              type="number"
              min={0}
              defaultValue={0}
              className="w-20 input-style input-background mr-[11px]"
            />
            <p className="text-headline">명</p>
          </div>
        </div>
        <p className="mx-5 text-headline text-gray-800 mt-5">:</p>
        <div className="flex flex-col">
          <p className="text-gray-850 text-callout">면접자</p>
          <div className="flex items-center">
            <input
              type="number"
              min={0}
              defaultValue={0}
              className="w-20 input-style input-background mr-[11px]"
            />
            <p className="text-headline">명</p>
          </div>
        </div>
      </div>
    </div>
  );
}
