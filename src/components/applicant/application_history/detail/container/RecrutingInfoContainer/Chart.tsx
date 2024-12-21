import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface GradeData {
  name: string;
  value: number;
}

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
  value: number;
}

const originalData = [
  { name: "3학년", value: 59 },
  { name: "4학년", value: 24 },
  { name: "2학년", value: 9 },
  { name: "기타", value: 8 }
];

// 데이터를 백분율로 변환
const total = originalData.reduce((sum, item) => sum + item.value, 0);
const gradeData = originalData.map((item) => ({
  name: item.name,
  value: Math.round((item.value / total) * 100)
}));

const COLORS = ["#3E0CC4", "#5E2BE8", "#9572F5", "#CAC8FF"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
  value
}: CustomizedLabelProps) => {
  // 값이 10% 미만인 경우 라벨을 표시하지 않음
  if (value < 10) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // midAngle을 0-360도 범위로 정규화
  const normalizedAngle = ((-midAngle % 360) + 360) % 360;

  let nameY = y;
  let percentY = y + 15;
  let xOffset = 0;

  if (normalizedAngle > 180) {
    nameY = y - 5;
    percentY = y + 10;
    xOffset = -5;
  } else {
    nameY = y - 5;
    percentY = y + 10;
    xOffset = 5;
  }

  return (
    <>
      <text
        x={x + xOffset}
        y={nameY}
        fill="white"
        textAnchor="middle"
        fontSize="10.61"
        fontWeight="400"
      >
        {name}
      </text>
      <text
        x={x + xOffset}
        y={percentY}
        fill="white"
        textAnchor="middle"
        fontSize="10.61"
        fontWeight="400"
      >
        {`${value}%`}
      </text>
    </>
  );
};

const CustomLegend = () => {
  return (
    <div className="absolute right-4 top-[60%] -translate-y-1/2 flex flex-col gap-2">
      {gradeData.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: COLORS[index] }}
          />
          <span className="font-medium text-[#000000]">
            {entry.name} {entry.value}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default function Chart() {
  return (
    <div>
      <div className="absolute inset-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart className="[&_.recharts-sector:focus]:outline-none">
            <Pie
              data={gradeData}
              cx="30%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={85}
              innerRadius={30}
              fill="#8884d8"
              dataKey="value"
            >
              {gradeData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <CustomLegend />
      </div>
    </div>
  );
}
