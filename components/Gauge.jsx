import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";

const Gauge = ({ value = 50 }) => {
  const [arrowValue, setArrowValue] = useState(0);
  const [isFirstRun, setIsFirstRun] = useState(true);

  const data = [{ value: 60 }, { value: 40 }];
  let COLORS;
  let extraTextColor;

  if (value < 60) {
    COLORS = ["#DC143C", "lightblue"];
    extraTextColor = "#DC143C";
  } else if (value < 70) {
    COLORS = ["#CC9304", "lightblue"];
    extraTextColor = "#CC9304";
  } else {
    COLORS = ["#336CFB", "lightblue"];
    extraTextColor = "transparent";
  }

  const lerp = (start, end, t) => {
    return start * (1 - t) + end * t;
  };

  useEffect(() => {
    const targetValue = value;
    let animationFrame;

    const animateArrow = () => {
      setArrowValue((prev) => {
        const newValue = lerp(prev, targetValue, 0.05); // Increase or decrease this number to control the animation speed
        if (Math.abs(newValue - targetValue) < 1) {
          if (isFirstRun) setIsFirstRun(false);
          return targetValue; // Animation complete
        }
        return newValue;
      });
      animationFrame = requestAnimationFrame(animateArrow);
    };

    if (isFirstRun || arrowValue !== value) {
      animationFrame = requestAnimationFrame(animateArrow);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [value, isFirstRun, arrowValue]);

  const r = 60;
  const pct = arrowValue / 100;
  const arrowAngle = pct * 180;
  const cx = 200;
  const cy = 100;
  const x = cx - r * Math.cos((arrowAngle * Math.PI) / 180);
  const y = cy - r * Math.sin((arrowAngle * Math.PI) / 180);

  return (
    <>
      <PieChart width={400} height={200}>
        <Pie
          data={data}
          cx={cx}
          cy={cy}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <line x1={cx} y1={cy} x2={x} y2={y} stroke="black" strokeWidth="4" />
        <circle cx={cx} cy={cy} r={5} fill="black" />
        <text x={cx} y={cy + 80} textAnchor="middle" fontSize="14px">
          {`Attendance Rate: ${value}%`}
        </text>
        <text
          x={cx}
          y={cy + 95}
          textAnchor="middle"
          fontSize="10px"
          fill={extraTextColor}
        >
          {"*60% ის ქვემოთ არის ექსტერნი"}
        </text>
      </PieChart>
    </>
  );
};

export default Gauge;
