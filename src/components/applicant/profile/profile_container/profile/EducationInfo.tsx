import { useForm } from "react-hook-form";
import Input from "../../../../common/Input";
import { useEffect } from "react";

// 학력 사항
interface EducationInfoForm {
  school: string; // 학교 이름
  major: string; // 주 전공
  doubleMajor?: string; // 복수 전공 (선택 사항)
  studentStatus: string; // 휴학 여부
  semester: string; // 학기
}

interface EducationInfoProps {
  user: User;
}

export default function EducationInfo({ user }: EducationInfoProps) {
  const {
    register,
    setValue,
    formState: { errors }
  } = useForm<EducationInfoForm>({ mode: "onChange" });

  useEffect(() => {
    if (user) {
      setValue("school", user.school || "");
      setValue("major", user.major || "");
      setValue("doubleMajor", user.doubleMajor || "");
      setValue("studentStatus", user.studentStatus || "");
      setValue("semester", user.semester || "");
    }
  }, [user, setValue]);

  return (
    <div className="text-left text-gray-1100">
      <h1 className="text-title2 text-gray-800">학력 사항</h1>
      <div className="grid grid-cols-[4fr,6fr] gap-4 items-center">
        <p className="text-headline text-gray-500">학교</p>
        <Input register={register} name="school" type="text" />
        <p className="text-headline text-gray-500">학과</p>
        <Input register={register} name="major" type="text" />
        <p className="text-headline text-gray-500">다전공</p>
        <Input register={register} name="doubleMajor" type="text" />
        <p className="text-headline text-gray-500">휴학 여부</p>
        <Input register={register} name="studentStatus" type="text" />
        <p className="text-headline text-gray-500">학기 선택</p>
        <Input register={register} name="semester" type="text" />
      </div>
    </div>
  );
}
