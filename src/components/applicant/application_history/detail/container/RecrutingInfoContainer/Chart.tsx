import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { CHARTS_COLORS } from "../../../../../../constants/recruting";
import RenderCustomizedLabel from "./RenderCustomizedLabel";
import CustomLegend from "./CustomLegend";

const originalData = [
  { name: "3학년", value: 59 },
  { name: "4학년", value: 24 },
  { name: "2학년", value: 9 },
  { name: "기타", value: 8 }
];

export default function Chart() {
  const total = originalData.reduce((sum, item) => sum + item.value, 0);
  const gradeData = originalData.map((item) => ({
    name: item.name,
    value: Math.round((item.value / total) * 100)
  }));

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
              label={RenderCustomizedLabel}
              outerRadius={85}
              innerRadius={30}
              fill="#8884d8"
              dataKey="value"
            >
              {gradeData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHARTS_COLORS[index % CHARTS_COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <CustomLegend data={gradeData} />
      </div>
    </div>
  );
}
