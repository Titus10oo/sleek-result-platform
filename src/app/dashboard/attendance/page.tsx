"use client";

import { useState } from "react";
import { Check, X, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const students = [
  { id: "1", name: "Alice Johnson", status: "present" },
  { id: "2", name: "Bob Smith", status: "present" },
  { id: "3", name: "Charlie Brown", status: "absent" },
  { id: "4", name: "Diana Prince", status: "late" },
];

export default function AttendancePage() {
  const [data, setData] = useState(students);
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const toggleStatus = (id: string, status: string) => {
    setData(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mark Attendance</h1>
          <p className="text-slate-500">Class: JSS 1 Gold | Date: {today}</p>
        </div>
        <button className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow hover:bg-blue-700">
          Submit Log
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Present", count: data.filter(s => s.status === 'present').length, color: "text-green-600", bg: "bg-green-50" },
          { label: "Absent", count: data.filter(s => s.status === 'absent').length, color: "text-red-600", bg: "bg-red-50" },
          { label: "Late", count: data.filter(s => s.status === 'late').length, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Total Students", count: data.length, color: "text-slate-600", bg: "bg-slate-50" },
        ].map(stat => (
          <div key={stat.label} className={cn("rounded-xl p-4 border border-slate-200", stat.bg)}>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</p>
            <p className={cn("text-2xl font-black mt-1", stat.color)}>{stat.count}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="px-6 py-4 text-sm font-semibold text-slate-900">Student Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-900 text-center">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
                      {student.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-slate-900">{student.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
                    student.status === 'present' ? "bg-green-100 text-green-700" :
                    student.status === 'absent' ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                  )}>{student.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => toggleStatus(student.id, 'present')}
                      className={cn("p-1.5 rounded-md border", student.status === 'present' ? "bg-green-600 text-white border-green-600" : "bg-white text-slate-400 hover:text-green-600")}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleStatus(student.id, 'absent')}
                      className={cn("p-1.5 rounded-md border", student.status === 'absent' ? "bg-red-600 text-white border-red-600" : "bg-white text-slate-400 hover:text-red-600")}
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleStatus(student.id, 'late')}
                      className={cn("p-1.5 rounded-md border", student.status === 'late' ? "bg-orange-600 text-white border-orange-600" : "bg-white text-slate-400 hover:text-orange-600")}
                    >
                      <Clock className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
