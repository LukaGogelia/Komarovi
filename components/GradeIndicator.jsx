"use client";
import React, { useState, useMemo } from "react";
import PieChartComponent from "./dashboard/PieCharts";
import SubjectDropdown from "./SubjectDropdown";

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
      // Filter the gradeEntries by the selected subject
      const filteredGradeEntries = gradeEntries.filter(
        (entry) => entry.subject === selectedSubject
      );

      // Initialize grade counts for the filtered entries
      const gradeCounts = new Array(10).fill(0);

      // Count the occurrences of each grade in the filtered entries
      filteredGradeEntries.forEach((entry) => {
        const grade = entry.grade;
        if (grade >= 1 && grade <= 10) {
          gradeCounts[10 - grade]++;
        }
      });

      // Convert the counts into the desired object format
      return gradeCounts.map((count, index) => ({
        name: (10 - index).toString(),
        value: count,
      }));
    }

    return gradeList; // default to gradeList if no subject is selected
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
        <PieChartComponent data={filteredGrades} />
      </div>
    </div>
  );
}
