import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  CreditCard,
  AlertTriangle
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { name: "Total Students", value: "1,240", icon: GraduationCap, color: "bg-blue-500" },
    { name: "Total Teachers", value: "48", icon: Users, color: "bg-purple-500" },
    { name: "Active Classes", value: "24", icon: BookOpen, color: "bg-green-500" },
    { name: "Revenue (Term)", value: "₦4.2M", icon: CreditCard, color: "bg-orange-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Overview</h1>
        <p className="text-slate-500">Welcome back. Here is what is happening in your school.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="flex items-center rounded-xl bg-white p-6 shadow-sm border border-slate-200">
            <div className={`mr-4 rounded-lg ${stat.color} p-3 text-white`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Recent Activities</h3>
            <TrendingUp className="h-5 w-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">JD</div>
                <div>
                  <p className="text-sm font-medium text-slate-900">New student registered</p>
                  <p className="text-xs text-slate-500">Jane Doe was added to JSS 1 Gold • 2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Attention Required</h3>
            <AlertTriangle className="h-5 w-5 text-orange-400" />
          </div>
          <div className="space-y-4">
            <div className="rounded-lg bg-orange-50 p-4 border border-orange-100">
              <p className="text-sm font-medium text-orange-800">Unpublished Results</p>
              <p className="text-xs text-orange-700 mt-1">3 subjects in SSS 2 are pending approval for First Term.</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
              <p className="text-sm font-medium text-blue-800">Fee Reminders</p>
              <p className="text-xs text-blue-700 mt-1">Automatic reminders for outstanding fees are scheduled for tomorrow.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
