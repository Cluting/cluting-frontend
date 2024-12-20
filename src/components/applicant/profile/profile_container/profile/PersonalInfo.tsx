import { useForm } from "react-hook-form";
import Input from "../../../../common/Input";
import { useEffect } from "react";

// 인적 사항

interface PersonalInfoForm {
  name: string; // 사용자 이름
  phone: string; // 전화번호
  location: string; // 지역 정보
}

interface PersonalInfoProps {
  user: User;
}

export default function PersonalInfo({ user }: PersonalInfoProps) {
  const {
    register,
    setValue,
    formState: { errors }
  } = useForm<PersonalInfoForm>({ mode: "onChange" });

  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("phone", user.phone || "");
      setValue("location", user.location || "");
    }
  }, [user, setValue]);

  return (
    <div className="text-left border-b pb-10 mb-10 text-gray-1100">
      <h1 className="text-title2 text-gray-800">인적 사항</h1>
      <div className="grid grid-cols-[4fr,6fr] gap-4 items-center">
        <p className="text-headline text-gray-500">프로필 사진</p>
        <img
          src="/assets/profile.png"
          alt="프로필 예시 사진"
          className="w-[150px] h-[184px]"
        />
        <p className="text-headline text-gray-500">이름</p>
        <Input register={register} name="name" type="text" />
        <p className="text-headline text-gray-500">휴대폰</p>
        <Input register={register} name="phone" type="text" />
        <p className="text-headline text-gray-500">현 거주지</p>
        <Input register={register} name="location" type="text" />
      </div>
    </div>
  );
}
