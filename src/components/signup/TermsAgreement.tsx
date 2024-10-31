import { useState } from "react";

interface Term {
  id: number;
  title: string;
  contents: string;
  status: string;
}

export default function TermsAgreement() {
  const data: Term[] = [
    {
      id: 0,
      title: "클루팅 이용약관",
      contents:
        "본 약관은 클루팅 서비스의 이용에 대한 규칙과 조건을 설명합니다. 이용자는 서비스를 사용함으로써 본 약관에 동의하는 것으로 간주됩니다. 서비스 이용 중 발생할 수 있는 문제에 대한 책임은 이용자에게 있습니다. 이용자는 서비스 이용 시 타인의 권리를 침해해서는 안 되며, 위반 시 법적 책임을 질 수 있습니다.",
      status: "[필수]"
    },
    {
      id: 1,
      title: "개인정보 수집 및 이용",
      contents:
        "클루팅은 이용자의 개인정보를 보호하기 위해 최선을 다하고 있습니다. 수집되는 정보에는 이름, 이메일, 전화번호 등이 포함됩니다. 이 정보는 서비스 제공 및 고객 관리, 마케팅 분석 등을 위해 사용되며, 이용자는 언제든지 자신의 개인정보 열람 및 정정을 요청할 수 있습니다. 개인정보의 보호는 법적 요구 사항을 준수하여 처리됩니다.클루팅은 이용자의 개인정보를 보호하기 위해 최선을 다하고 있습니다. 수집되는 정보에는 이름, 이메일, 전화번호 등이 포함됩니다. 이 정보는 서비스 제공 및 고객 관리, 마케팅 분석 등을 위해 사용되며, 이용자는 언제든지 자신의 개인정보 열람 및 정정을 요청할 수 있습니다. 개인정보의 보호는 법적 요구 사항을 준수하여 처리됩니다.",
      status: "[필수]"
    },
    {
      id: 2,
      title: "마케팅 이벤트 메일 수신 동의",
      contents:
        "이 항목은 클루팅의 마케팅 및 이벤트 정보 수신에 대한 동의를 요청합니다. 동의하실 경우, 새로운 이벤트, 프로모션, 특별 할인 등의 정보를 이메일로 수신하실 수 있습니다. 언제든지 수신 동의를 철회하실 수 있으며, 그 경우 관련 정보는 즉시 중단됩니다. 클루팅은 수신자의 개인정보를 안전하게 보호합니다.",
      status: "[선택]"
    }
  ];
  const [checkItems, setCheckItems] = useState<number[]>([]); // 체크된 아이템의 ID를 저장하는 배열

  // 체크박스 개별 선택하기
  const selectChecked = (checked: boolean, id: number) => {
    if (checked) {
      setCheckItems((item) => [...item, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택하기
  const allChecked = (checked: boolean) => {
    if (checked) {
      const itemList = data.map((el) => el.id);
      setCheckItems(itemList);
    } else {
      setCheckItems([]);
    }
  };

  return (
    <div className="flex flex-col w-[400px] mt-7">
      <label className="text-headline text-black-800 flex gap-[10px]">
        <input
          type="checkbox"
          onChange={(e) => allChecked(e.target.checked)}
          checked={checkItems.length === data.length}
        />
        전체 동의하기
      </label>
      {data.map((term) => (
        <label key={term.id}>
          <div className="flex my-7">
            <input
              type="checkbox"
              name="select-checked"
              onChange={(e) => selectChecked(e.target.checked, term.id)}
              checked={checkItems.includes(term.id)}
            />
            <div>
              <p className="text-headline text-black-800 ml-[10px]">
                {" "}
                <span
                  className={`${term.status === "[필수]" ? "text-main-100" : "text-gray-600"} mr-[5px]`}
                >
                  {term.status}
                </span>
                {term.title}
              </p>
            </div>
          </div>
          <div className="h-[130px] border border-gray-400 overflow-scroll overflow-x-hidden rounded-[8px] py-[13px] px-[22px] text-gray-500 text-caption3">
            {term.contents}
          </div>
        </label>
      ))}
    </div>
  );
}
