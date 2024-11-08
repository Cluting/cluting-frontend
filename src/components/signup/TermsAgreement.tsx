import { useState } from "react";
import { TermsAgreementdata } from "../../constants/recruting";
import {
  UseFormRegister,
  FieldValues,
  Control,
  Controller,
  Path,
  UseFormSetValue,
  PathValue
} from "react-hook-form";

interface TermsAgreementProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
}

export default function TermsAgreement<T extends FieldValues>({
  register,
  control,
  setValue
}: TermsAgreementProps<T>) {
  const [checkItems, setCheckItems] = useState<number[]>([]);

  const selectChecked = (checked: boolean, id: number) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems((prev) => prev.filter((el) => el !== id));
    }
  };
  const allChecked = (checked: boolean) => {
    if (checked) {
      const itemList = TermsAgreementdata.map((el) => el.id);
      setCheckItems(itemList);
      TermsAgreementdata.forEach((item) => {
        setValue(item.key as Path<T>, true as unknown as PathValue<T, Path<T>>); // 모든 항목을 체크 상태로 설정
      });
    } else {
      setCheckItems([]);
      TermsAgreementdata.forEach((item) => {
        setValue(
          item.key as Path<T>,
          false as unknown as PathValue<T, Path<T>>
        ); // 모든 항목을 체크 해제 상태로 설정
      });
    }
  };

  return (
    <div className="flex flex-col w-[400px] mt-7">
      <label className="text-headline text-black-800 flex gap-[10px]">
        <input
          type="checkbox"
          onChange={(e) => {
            allChecked(e.target.checked);
          }}
          checked={checkItems.length === TermsAgreementdata.length}
        />
        전체 동의하기
      </label>

      {/* 1. 클루팅 이용약관 동의 */}
      <div className="flex my-7">
        <Controller
          name={`termsOfService` as Path<T>}
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              {...field}
              checked={field.value}
              onChange={(e) => {
                field.onChange(e.target.checked);
                selectChecked(e.target.checked, TermsAgreementdata[0].id);
              }}
            />
          )}
        />
        <div>
          <p className="text-headline text-black-800 ml-[10px]">
            <span className="text-main-100 mr-[5px]">
              {TermsAgreementdata[0].status}
            </span>
            {TermsAgreementdata[0].title}
          </p>
        </div>
      </div>
      <div className="h-[130px] border border-gray-400 overflow-scroll overflow-x-hidden rounded-[8px] py-[13px] px-[22px] text-gray-500 text-caption3">
        {TermsAgreementdata[0].contents}
      </div>

      {/* 2. 개인정보 수집 및 이용 동의 */}
      <div className="flex my-7">
        <Controller
          name={`privacyPolicy` as Path<T>}
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              {...field}
              checked={field.value}
              onChange={(e) => {
                field.onChange(e.target.checked);
                selectChecked(e.target.checked, TermsAgreementdata[1].id);
              }}
            />
          )}
        />
        <div>
          <p className="text-headline text-black-800 ml-[10px]">
            <span className="text-main-100 mr-[5px]">
              {TermsAgreementdata[1].status}
            </span>
            {TermsAgreementdata[1].title}
          </p>
        </div>
      </div>
      <div className="h-[130px] border border-gray-400 overflow-scroll overflow-x-hidden rounded-[8px] py-[13px] px-[22px] text-gray-500 text-caption3">
        {TermsAgreementdata[1].contents}
      </div>

      {/* 3. 마케팅 이벤트 메일 수신 동의 */}
      <div className="flex my-7">
        <Controller
          name={`marketingConsent` as Path<T>}
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              {...field}
              checked={field.value}
              onChange={(e) => {
                field.onChange(e.target.checked);
                selectChecked(e.target.checked, TermsAgreementdata[2].id);
              }}
            />
          )}
        />
        <div>
          <p className="text-headline text-black-800 ml-[10px]">
            <span className="text-gray-600 mr-[5px]">
              {TermsAgreementdata[2].status}
            </span>
            {TermsAgreementdata[2].title}
          </p>
        </div>
      </div>
      <div className="h-[130px] border border-gray-400 overflow-scroll overflow-x-hidden rounded-[8px] py-[13px] px-[22px] text-gray-500 text-caption3">
        {TermsAgreementdata[2].contents}
      </div>
    </div>
  );
}
