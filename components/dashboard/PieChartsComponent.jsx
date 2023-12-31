import React from "react";
import {
  Pie,
  Tooltip,
  Legend,
  PieChart,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#FF5733",
  "#FFBB28",
  "#00C49F",
  "#DC143C",
  "#1E90FF",
  "#D2691E",
  "#7FFF00",
  "#FF8042",
  "#8B4513",
  "#5F9EA0",
];

const numberToWord = (number) => {
  const words = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];
  return words[number];
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "10px",
          border: "1px solid #d5d5d5",
          borderRadius: "5px",
        }}
      >
        <p
          style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}
        >{`Grade: ${payload[0].name}`}</p>
        <p
          style={{ margin: 0, fontSize: "14px" }}
        >{`Count: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const PieChartComponent = ({ data, averageGrade }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart width={300} height={300}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={75}
          fill="#FF5733"
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <text
          x="50%"
          y="30%"
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: "11px",
            fontWeight: "bold",
            fill: "#6440FB",
          }}
        >
          {averageGrade ? "Average Grade" : ""}
        </text>
        <line
          x1="64%"
          y1="32.5%"
          x2="35%"
          y2="32.5%"
          stroke="#6440FB"
          style={{ strokeWidth: 1 }}
        />
        <text
          x="50%"
          y="42%"
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: "39px",
            fontWeight: "bold",
            fill: "#6440FB",
          }}
        >
          {averageGrade ? averageGrade.toFixed(1) : ""}
        </text>

        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
