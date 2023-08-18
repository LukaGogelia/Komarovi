"use client";

const {
  Pie,
  Tooltip,
  Legend,
  PieChart,
  Cell,
  ResponsiveContainer,
} = require("recharts");

const COLORS = [
  "#336CFB",
  "#FFBB28",
  "#00C49F",
  "#FF8042",
  "#FF5733",
  "#8B4513",
  "#1E90FF",
  "#D2691E",
  "#DC143C",
  "#7FFF00",
];

const PieChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart width={350} height={350}>
        <Pie
          dataKey="value"
          isAnimationActive={true} // Enable animation
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={75}
          fill="#336CFB"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
