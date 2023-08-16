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

const Charts = ({ arr }) => {
  const chart = (interval) => (
    <div
      style={{
        marginLeft: "-1.5rem",
        marginRight: "2rem",
        marginTop: "3rem",
      }}
    >
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
    </div>
  );

  return <>{chart("preserveEnd")}</>;
};

export default Charts;
