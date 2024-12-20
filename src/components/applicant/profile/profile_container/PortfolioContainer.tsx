import { useRef, useState } from "react";
import Input from "../../../common/Input";
import { useForm } from "react-hook-form";

interface PortfolioForm {
  portfolioUrl?: string;
  portfolioFile?: FileList;
}

export default function PortfolioContainer() {
  const { register, setValue } = useForm<PortfolioForm>({ mode: "onChange" });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      setValue("portfolioFile", files);
    }
  };

  const [portfolioFormat, setPortfolioFormat] = useState<
    "url" | "file" | "none"
  >("none");

  return (
    <div className="w-full h-[630px] bg-white-100 rounded-md p-12">
      <h1 className="text-title2 text-gray-800 text-left">
        포트폴리오 형식 선택
      </h1>
      <div className="flex items-center gap-3 mt-5">
        <button
          onClick={() => {
            setPortfolioFormat("url");
          }}
          className="button-main-light rounded-md px-9 py-4 text-main-100 text-body hover:button-main-bg"
        >
          주소 입력
        </button>
        <button
          onClick={() => {
            setPortfolioFormat("file");
          }}
          className="button-main-light rounded-md px-9 py-4 text-main-100 text-body hover:button-main-bg"
        >
          파일 업로드
        </button>
      </div>

      {portfolioFormat === "url" && (
        <div className="grid grid-cols-[2fr,8fr] gap-4 items-center border-t mt-6 pt-6">
          <p className="text-headline text-gray-800">포트폴리오 주소</p>
          <Input
            type="text"
            name="portfolioUrl"
            placeholder="주소를 입력해 주세요."
            register={register}
          />
        </div>
      )}

      {portfolioFormat === "file" && (
        <div className="grid grid-cols-[3fr,6fr] gap-4 items-center border-t mt-6 pt-6">
          <p className="text-headline text-gray-800">포트폴리오 파일 업로드</p>
          <div>
            <button
              onClick={handleClick}
              className="pt-5 flex flex-col gap-2 items-center bg-gray-100 border border-gray-200 rounded-lg w-[400px] h-[120px] text-caption3 text-gray-500 "
            >
              <img src="/assets/ic-fileUpload.svg" />
              {fileName ? fileName : "파일 업로드"}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
          </div>
        </div>
      )}
    </div>
  );
}
