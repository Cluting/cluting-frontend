import { useForm } from "react-hook-form";
import Input from "../../../../common/Input";

// 인적 사항

interface PersonalInfoForm {
  name: string; // 사용자 이름
  phone: string; // 전화번호
  location: string; // 지역 정보
}
export default function PersonalInfo() {
  const {
    register,
    formState: { errors }
  } = useForm<PersonalInfoForm>({ mode: "onChange" });

  return (
    <div className="text-left border-b pb-10 mb-10">
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
