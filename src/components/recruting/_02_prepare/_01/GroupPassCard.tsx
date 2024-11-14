import { Control, RegisterOptions } from "react-hook-form";
import NumberSpinner from "./NumberSpinner";

interface GroupPassCardProps {
  control: Control<any>;
  groupIndex: number;
  groupName: string;
  errors?: any;
  rules?: RegisterOptions;
}

export default function GroupPassCard({
  control,
  groupIndex,
  groupName,
  errors,
  rules
}: GroupPassCardProps) {
  return (
    <div className="w-[259px] h-[333px] rounded-[12px] bg-[#F2F2F7]">
      <div className="pt-[13px] flex-center">
        <div className="flex-center w-[229px] h-[50px] bg-gray-200 rounded-[11px] border border-gray-400 text-[16px] text-gray-850 font-semibold">
          {groupName}
        </div>
      </div>
      <div className="flex flex-col py-[26px]">
        <p className="text-[16px] font-semibold text-gray-850 text-left pl-[15px]">
          서류 합격 인원
        </p>
        <div className="flex-center pt-[15px] pb[26px] relative">
          <div
            className={`relative flex items-center w-[199px] h-[41px] rounded-[7px] bg-white-100 border ${
              errors?.groups?.[groupIndex]?.documentPass
                ? "border-red-100"
                : "border-gray-400"
            }`}
          >
            <div className="absolute right-[6.44px]">
              <NumberSpinner
                control={control}
                name={`groups.${groupIndex}.documentPass`}
                error={errors?.groups?.[groupIndex]?.documentPass?.message}
                rules={rules}
              />
            </div>
            {/*에러처리 */}
            {errors?.groups?.[groupIndex]?.documentPass && (
              <p className="absolute left-0 top-[42px] text-red-100 font-medium text-[11px]">
                {errors.groups[groupIndex].documentPass.message}
              </p>
            )}
          </div>
          <p className="text-[17px] font-bold pl-[11px]">명</p>
        </div>
      </div>

      <div className="pl-[19.38px] w-[221px] border border-gray-200"></div>

      <div className="flex flex-col pt-[21px] pb-[45px]">
        <p className="text-[16px] font-semibold text-gray-850 text-left pl-[15px]">
          최종 합격 인원
        </p>
        <div className="flex-center pt-[15px] pb-[26px]">
          <div
            className={`relative flex items-center w-[199px] h-[41px] rounded-[7px] bg-white-100 border ${
              errors?.groups?.[groupIndex]?.finalPass
                ? "border-red-100"
                : "border-gray-400"
            }`}
          >
            <div className="absolute right-[6.44px]">
              <NumberSpinner
                control={control}
                name={`groups.${groupIndex}.finalPass`}
                error={errors?.groups?.[groupIndex]?.finalPass?.message}
                rules={rules}
              />
            </div>
            {/*에러처리 */}
            {errors?.groups?.[groupIndex]?.finalPass && (
              <p className="absolute left-0 top-[42px] text-red-100 font-medium text-[11px]">
                {errors.groups[groupIndex].finalPass.message}
              </p>
            )}
          </div>
          <p className="text-[17px] font-bold pl-[11px]">명</p>
        </div>
      </div>
    </div>
  );
}
