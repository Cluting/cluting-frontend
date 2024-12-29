import { RADIAN } from "../../../../../../../constants/recruting";

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

export default function RenderCustomizedLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
  value
}: CustomizedLabelProps) {
  // 값이 10% 미만인 경우 라벨을 표시하지 않음
  if (value < 10) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

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
        fontSize="11"
        fontWeight="400"
      >
        {name}
      </text>
      <text
        x={x + xOffset}
        y={percentY}
        fill="white"
        textAnchor="middle"
        fontSize="11"
        fontWeight="400"
      >
        {`${value}%`}
      </text>
    </>
  );
}
