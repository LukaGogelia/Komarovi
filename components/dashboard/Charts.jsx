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

const Charts = ({ year }) => {
  // Declaring the data arrays
  const data19 = [
    { name: 'ნოემბერი', მათემატიკა: 83 },  // November
    { name: 'დეკემბერი', მათემატიკა: 96 }, // December
    { name: 'თებერვალი', მათემატიკა: 60 }, // February
    { name: 'მაისი', მათემატიკა: 93 }      // May
  ]
    ;
  const data20 = [
    { name: 'ნოემბერი', მათემატიკა: 93, ფიზიკა: 77 },  // November
    { name: 'დეკემბერი', მათემატიკა: 99, ფიზიკა: 93 }, // December
    { name: 'თებერვალი', მათემატიკა: 89, ფიზიკა: 74 }, // February
    { name: 'მაისი', მათემატიკა: 80, ფიზიკა: 84 }       // May
  ]
    ;
  const data21 = [
    { name: 'ნოემბერი', მათემატიკა: 64, ფიზიკა: 57 },  // November
    { name: 'დეკემბერი', მათემატიკა: 83, ფიზიკა: 69 }, // December
    { name: 'თებერვალი', მათემატიკა: 56, ფიზიკა: 54 }, // February
    { name: 'მაისი', მათემატიკა: 95, ფიზიკა: 62 }       // May
  ]
    ;
  const data22 = [
    { name: 'ნოემბერი', მათემატიკა: 92, ფიზიკა: 97 },  // November
    { name: 'დეკემბერი', მათემატიკა: 95, ფიზიკა: 56 }, // December
    { name: 'მარტი', მათემატიკა: 78, ფიზიკა: 64 },     // March
    { name: 'მაისი', მათემატიკა: 81, ფიზიკა: 75 }      // May
  ]
    ;
  const data23 = [
    { name: 'ნოემბერი', მათემატიკა: 85, ფიზიკა: 88 },  // November
    { name: 'დეკემბერი', მათემატიკა: 99, ფიზიკა: 50 }, // December
    { name: 'თებერვალი', მათემატიკა: 72, ფიზიკა: 64 }, // February
    { name: 'მაისი', მათემატიკა: 93, ფიზიკა: 74 }       // May
  ]
    ;
  const data24 = [
    { name: 'ნოემბერი', მათემატიკა: 56 },  // November
    { name: 'დეკემბერი', მათემატიკა: 80 } // December
  ]
    ;

  let data; // variable to hold the corresponding data

  // Conditional structure to assign the correct dataset to 'data'
  switch (year) {
    case '2018-2019':
      data = data19;
      break;
    case '2019-2020':
      data = data20;
      break;
    case '2020-2021':
      data = data21;
      break;
    case '2021-2022':
      data = data22;
      break;
    case '2022-2023':
      data = data23;
      break;
    case '2023-2024':
      data = data24;
      break;

    // Add more cases as needed
    default:
      data = data24; // Default to an empty array or any default value you prefer
  }

  // Now 'data' will hold the dataset corresponding to the 'year' value

  const chart = (interval) => (
    <div
      style={{
        marginLeft: "-1.5rem",
        marginRight: "2rem",
        marginTop: "3rem",
      }}
    >
      <ResponsiveContainer height={250} width="100%">
        <LineChart data={data}>
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
            dataKey="მათემატიკა"
            strokeWidth={2}
            stroke="#336CFB"
            fill="#336CFB"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="ფიზიკა"
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
