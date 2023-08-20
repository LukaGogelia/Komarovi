"use client";
import React, { useState, useMemo } from "react";
import PieChartComponent from "./dashboard/PieCharts";
import SubjectDropdown from "./SubjectDropdown";

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

export default function GradeIndicator({
  subjectList,
  gradeList,
  gradeEntries,
}) {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
  };

  const filteredGrades = useMemo(() => {
    if (selectedSubject) {
      const filteredGradeEntries = gradeEntries.filter(
        (entry) => entry.subject === selectedSubject
      );
      const gradeCounts = new Array(10).fill(0);
      filteredGradeEntries.forEach((entry) => {
        const grade = entry.grade;
        if (grade >= 1 && grade <= 10) {
          gradeCounts[10 - grade]++;
        }
      });

      return gradeCounts
        .map((count, index) => ({
          name: numberToWord(10 - index),
          value: count,
        }))
        .filter((grade) => grade.value > 0);
    }

    return gradeList;
  }, [selectedSubject, gradeEntries]);

  const averageGrade = useMemo(() => {
    const filteredGradeEntries = selectedSubject
      ? gradeEntries.filter((entry) => entry.subject === selectedSubject)
      : gradeEntries;

    const totalGrades = filteredGradeEntries.reduce(
      (sum, entry) => sum + entry.grade,
      0
    );
    const numberOfGrades = filteredGradeEntries.length;

    if (numberOfGrades > 0) {
      return totalGrades / numberOfGrades;
    }

    return null;
  }, [selectedSubject, gradeEntries]);

  return (
    <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
      <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
        <div style={{ textAlign: "center", margin: "auto" }}>
          <h3
            className="text-16 lh-1 fw-500 text-dark-1 mb-10"
            style={{ textAlign: "center" }}
          >
            Grades
          </h3>
        </div>
        <SubjectDropdown
          options={subjectList}
          onSubjectChange={handleSubjectChange}
        />
      </div>
      <div className="py-40 px-30">
        <PieChartComponent
          key={selectedSubject}
          data={filteredGrades}
          averageGrade={averageGrade}
        />
      </div>
    </div>
  );
}
