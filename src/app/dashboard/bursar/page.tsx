"use client";

import { CreditCard, ArrowUpRight, ArrowDownLeft, Search, Filter, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FinanceDashboard() {
  const transactions = [
    { id: "TX-001", student: "Alice Johnson", amount: "₦150,000", type: "Credit", status: "Verified", date: "2023-12-01" },
    { id: "TX-002", student: "Bob Smith", amount: "₦75,000", type: "Credit", status: "Pending", date: "2023-12-02" },
    { id: "TX-003", student: "Charlie Brown", amount: "₦200,000", type: "Debit", status: "Invoice", date: "2023-12-03" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financial Ledger</h1>
          <p className="text-slate-500">Manage fee templates, track payments, and verify transfers.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700">
            Create Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Total Collections</p>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-2">₦12.5M</p>
          <p className="text-xs text-green-600 mt-1">+12% from last term</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Outstanding Debt</p>
            <ArrowDownLeft className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-2">₦3.2M</p>
          <p className="text-xs text-red-600 mt-1">24 students with unpaid fees</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Pending Verification</p>
            <CreditCard className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-2">15</p>
          <p className="text-xs text-blue-600 mt-1">Bank transfers awaiting approval</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Recent Transactions</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Search student..." className="pl-9 pr-4 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <button className="p-1.5 border rounded-md hover:bg-white"><Filter className="h-4 w-4 text-slate-500" /></button>
          </div>
        </div>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b bg-slate-50/50">
              <th className="px-6 py-3 font-semibold text-slate-700">Ref ID</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Student Name</th>
              <th className="px-6 py-3 font-semibold text-slate-700 text-right">Amount</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Type</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Status</th>
              <th className="px-6 py-3 font-semibold text-slate-700 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs">{tx.id}</td>
                <td className="px-6 py-4 font-medium">{tx.student}</td>
                <td className="px-6 py-4 text-right font-semibold">{tx.amount}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                    tx.type === "Credit" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  )}>{tx.type}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    tx.status === "Verified" ? "bg-green-100 text-green-700" :
                    tx.status === "Pending" ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-700"
                  )}>{tx.status}</span>
                </td>
                <td className="px-6 py-4 text-right text-slate-500">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
