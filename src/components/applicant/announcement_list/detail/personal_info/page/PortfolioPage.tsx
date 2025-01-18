const portfolios = [
  {
    id: 1,
    portfolio: "비핸스",
    link: "https://www.figma.com/design/gk0WAmsaKt8gFqEfbF1Hpe/%EC%9E%87%ED%83%80_%EA%B0%81%EC%96%91%EA%B0%81%EC%84%B1_%ED%81%B4%EB%A3%A8%ED%8C%85?node-id=733-8392&t=xVKyOiYS2HCzIuX1-1"
  },
  {
    id: 2,
    portfolio: "노션",
    link: "https://www.figma.com/design/gk0WAmsaKt8gFqEfbF1Hpe/%EC%9E%87%ED%83%80_%EA%B0%81%EC%96%91%EA%B0%81%EC%84%B1_%ED%81%B4%EB%A3%A8%ED%8C%85?node-id=733-8392&t=xVKyOiYS2HCzIuX1-1"
  }
];
export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <h2 className="text-xl font-bold leading-7 tracking-wide text-left font-Pretendard text-gray-1100">
        포트폴리오
      </h2>
      <div className="w-full border border-gray-200 rounded-lg divide-y divide-gray-200">
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="flex flex-col p-5 w-full">
            <p className="font-medium text-left text-gray-900">
              {portfolio.portfolio}
            </p>
            <a
              href={portfolio.link}
              target="_blank"
              rel="noopener noreferrer"
              className=" text-gray-500 hover:text-gray-700 truncate max-w-md"
            >
              {portfolio.link}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
