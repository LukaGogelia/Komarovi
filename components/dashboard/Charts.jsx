"use client";

import React from "react";
import {
  LineChart,
  Tooltip,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: (17 / 25) * 100, value2: 8 },
  { name: "Feb", value: 11, value2: 6 },
  { name: "Marc", value: 23, value2: 15 },
  { name: "April", value: 0, value2: 0 },
  { name: "May", value: 2, value2: 12 },
  { name: "Jun", value: 12, value2: 10 },
  { name: "July", value: 21, value2: 14 },
  { name: "Agust", value: 22, value2: 9 },
  { name: "Sept", value: 14, value2: 11 },
  { name: "Oct", value: 15, value2: 13 },
  { name: "Now", value: 16, value2: 10 },
  { name: "Dec", value: 7, value2: 19 },
];

const Charts = ({ arr }) => {
  const chart = (interval) => (
    <ResponsiveContainer height={250} width="100%">
      <LineChart data={arr}>
        <CartesianGrid strokeDasharray="" />
        <XAxis tick={{ fontSize: 12 }} dataKey="name" interval={interval} />
        <YAxis
          tick={{ fontSize: 12 }}
          domain={[0, 100]}
          tickCount={7}
          interval={interval}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="math"
          strokeWidth={2}
          stroke="#336CFB"
          fill="#336CFB"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="physics"
          strokeWidth={2}
          stroke="#82ca9d"
          fill="#82ca9d"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return <>{chart("preserveEnd")}</>;
};

export default Charts;
