"use client";

import { Download, Printer, FileText } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ReportCardPage() {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text("Demo International School", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text("Official Academic Report Card", 105, 22, { align: "center" });
    doc.line(20, 25, 190, 25);

    // Student Info
    doc.setFontSize(10);
    doc.text("Student Name: Alice Johnson", 20, 35);
    doc.text("Class: JSS 1 Gold", 20, 40);
    doc.text("Term: First Term", 140, 35);
    doc.text("Session: 2023/2024", 140, 40);

    // Results Table
    autoTable(doc, {
      startY: 50,
      head: [["Subject", "CA1 (10)", "CA2 (20)", "Exam (70)", "Total", "Grade"]],
      body: [
        ["Mathematics", "8", "15", "55", "78", "A"],
        ["English Language", "7", "14", "48", "69", "B"],
        ["Basic Science", "9", "18", "62", "89", "A"],
      ],
    });

    // Summary
    const finalY = (doc as any).lastAutoTable.finalY || 100;
    doc.text("Average Score: 78.6%", 20, finalY + 15);
    doc.text("Class Position: 2nd of 25", 20, finalY + 22);
    doc.text("Principal's Comment: Excellent performance. Keep it up!", 20, finalY + 35);

    doc.save("ReportCard_AliceJohnson.pdf");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Academic Report Card</h1>
          <p className="text-slate-500">View and download your performance for the current term.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Printer className="h-4 w-4" />
            Print
          </button>
          <button
            onClick={generatePDF}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm max-w-4xl mx-auto">
        <div className="text-center mb-8 border-b pb-8">
          <h2 className="text-2xl font-bold text-slate-900 uppercase">Demo International School</h2>
          <p className="text-slate-500 text-sm mt-1">123 School Road, Victoria Island, Lagos</p>
          <h3 className="text-lg font-semibold text-blue-600 mt-4 uppercase">Academic Report Card</h3>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
          <div className="space-y-2">
            <p><span className="font-semibold text-slate-500">STUDENT NAME:</span> Alice Johnson</p>
            <p><span className="font-semibold text-slate-500">ADMISSION NO:</span> DIS/2023/001</p>
            <p><span className="font-semibold text-slate-500">CLASS:</span> JSS 1 Gold</p>
          </div>
          <div className="space-y-2">
            <p><span className="font-semibold text-slate-500">SESSION:</span> 2023/2024</p>
            <p><span className="font-semibold text-slate-500">TERM:</span> First Term</p>
            <p><span className="font-semibold text-slate-500">DATE:</span> Dec 15, 2023</p>
          </div>
        </div>

        <table className="w-full text-sm border-collapse border border-slate-200 mb-8">
          <thead>
            <tr className="bg-slate-50">
              <th className="border border-slate-200 px-4 py-2 text-left">SUBJECT</th>
              <th className="border border-slate-200 px-4 py-2 text-center">CA1 (10)</th>
              <th className="border border-slate-200 px-4 py-2 text-center">CA2 (20)</th>
              <th className="border border-slate-200 px-4 py-2 text-center">EXAM (70)</th>
              <th className="border border-slate-200 px-4 py-2 text-center">TOTAL</th>
              <th className="border border-slate-200 px-4 py-2 text-center">GRADE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-200 px-4 py-2 font-medium">Mathematics</td>
              <td className="border border-slate-200 px-4 py-2 text-center">8</td>
              <td className="border border-slate-200 px-4 py-2 text-center">15</td>
              <td className="border border-slate-200 px-4 py-2 text-center">55</td>
              <td className="border border-slate-200 px-4 py-2 text-center font-bold">78</td>
              <td className="border border-slate-200 px-4 py-2 text-center">A</td>
            </tr>
            <tr>
              <td className="border border-slate-200 px-4 py-2 font-medium">English Language</td>
              <td className="border border-slate-200 px-4 py-2 text-center">7</td>
              <td className="border border-slate-200 px-4 py-2 text-center">14</td>
              <td className="border border-slate-200 px-4 py-2 text-center">48</td>
              <td className="border border-slate-200 px-4 py-2 text-center font-bold">69</td>
              <td className="border border-slate-200 px-4 py-2 text-center">B</td>
            </tr>
          </tbody>
        </table>

        <div className="grid grid-cols-2 gap-8 pt-8 border-t">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Teacher's Remark</p>
              <p className="text-sm italic mt-1 text-slate-700">A very focused and hardworking student. Maintain the momentum.</p>
            </div>
            <div className="pt-8">
              <div className="border-t border-slate-400 w-48 pt-2">
                <p className="text-xs text-slate-500">Class Teacher's Signature</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Principal's Remark</p>
              <p className="text-sm italic mt-1 text-slate-700">Excellent performance. Keep it up!</p>
            </div>
            <div className="pt-8">
              <div className="border-t border-slate-400 w-48 pt-2">
                <p className="text-xs text-slate-500">Principal's Signature & Stamp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
