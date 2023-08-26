"use client";
import React, { useState, useMemo } from "react";
import SubjectDropdown from "./SubjectDropdown";
import PieChartsComponent from "./dashboard/PieChartsComponent";
// import PieChartsComponent from "./dashboard/PieChartsComponent";

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
  subjectList: S,
  gradeList: G,
  gradeEntries: GR,
}) {
  const subjectList = JSON.parse(S);
  const gradeList = JSON.parse(G);
  const gradeEntries = JSON.parse(GR);

  const [selectedSubject, setSelectedSubject] = useState(null);

  const filteredGradeEntries = useMemo(() => {
    return selectedSubject
      ? gradeEntries.filter((entry) => entry.subject === selectedSubject)
      : gradeEntries;
  }, [selectedSubject, gradeEntries]);

  const computedGradeList = useMemo(() => {
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
  }, [filteredGradeEntries]);

  const averageGrade = useMemo(() => {
    const totalGrades = filteredGradeEntries.reduce(
      (sum, entry) => sum + entry.grade,
      0
    );
    const numberOfGrades = filteredGradeEntries.length;

    return numberOfGrades > 0 ? totalGrades / numberOfGrades : null;
  }, [filteredGradeEntries]);

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
          onSubjectChange={setSelectedSubject}
        />
      </div>
      <div className="py-40 px-30">
        <PieChartsComponent
          key={selectedSubject || "default"}
          data={computedGradeList}
          averageGrade={averageGrade}
        />
      </div>
    </div>
  );
}
