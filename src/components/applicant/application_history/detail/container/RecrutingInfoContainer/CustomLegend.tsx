import { CHARTS_COLORS } from "../../../../../../constants/recruting";

interface GradeData {
  name: string;
  value: number;
}

interface CustomLegendProps {
  data: GradeData[];
}

export default function CustomLegend({ data }: CustomLegendProps) {
  return (
    <div className="absolute right-4 top-[60%] -translate-y-1/2 flex flex-col gap-2">
      {data.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: CHARTS_COLORS[index] }}
          />
          <span className="font-medium text-[#000000]">
            {entry.name} {entry.value}%
          </span>
        </div>
      ))}
    </div>
  );
}
