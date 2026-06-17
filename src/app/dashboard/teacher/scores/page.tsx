"use client";

import { useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScoreRow {
  id: string;
  name: string;
  ca1: number;
  ca2: number;
  exam: number;
}

const mockStudents: ScoreRow[] = [
  { id: "1", name: "Alice Johnson", ca1: 8, ca2: 15, exam: 55 },
  { id: "2", name: "Bob Smith", ca1: 7, ca2: 12, exam: 48 },
  { id: "3", name: "Charlie Brown", ca1: 9, ca2: 18, exam: 62 },
];

export default function ScoreEntryGrid() {
  const [data, setData] = useState(mockStudents);
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdate = (id: string, field: keyof ScoreRow, value: string) => {
    const numValue = parseFloat(value) || 0;
    setData(prev => prev.map(row =>
      row.id === id ? { ...row, [field]: numValue } : row
    ));
  };

  const calculateTotal = (row: ScoreRow) => row.ca1 + row.ca2 + row.exam;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Score Entry</h1>
          <p className="text-slate-500">Subject: Mathematics | Class: JSS 1 Gold | Term: First Term</p>
        </div>
        <button
          onClick={() => setIsSaving(true)}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
        >
          {isSaving ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {isSaving ? "Saved" : "Save Changes"}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-sm font-semibold text-slate-900 sticky left-0 bg-slate-50">Student Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-900 text-center">CA 1 (10)</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-900 text-center">CA 2 (20)</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-900 text-center">Exam (70)</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-900 text-center bg-blue-50">Total (100)</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-900 text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.map((row) => {
                const total = calculateTotal(row);
                let grade = "F";
                if (total >= 70) grade = "A";
                else if (total >= 60) grade = "B";
                else if (total >= 50) grade = "C";
                else if (total >= 45) grade = "D";

                return (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 sticky left-0 bg-white">{row.name}</td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        value={row.ca1}
                        onChange={(e) => handleUpdate(row.id, "ca1", e.target.value)}
                        className="w-16 rounded border border-slate-200 px-2 py-1 text-center text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        value={row.ca2}
                        onChange={(e) => handleUpdate(row.id, "ca2", e.target.value)}
                        className="w-16 rounded border border-slate-200 px-2 py-1 text-center text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        value={row.exam}
                        onChange={(e) => handleUpdate(row.id, "exam", e.target.value)}
                        className="w-16 rounded border border-slate-200 px-2 py-1 text-center text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-blue-600 bg-blue-50/50">{total}</td>
                    <td className="px-6 py-4 text-center font-medium">
                      <span className={cn(
                        "rounded px-2 py-1 text-xs",
                        grade === "A" ? "bg-green-100 text-green-700" :
                        grade === "F" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"
                      )}>
                        {grade}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
