import { Clock, MapPin } from "lucide-react";

export default function TimetablePage() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"];

  const schedule: any = {
    "Monday-08:00 AM": { subject: "Mathematics", teacher: "Mr. Adams", room: "Room 101" },
    "Monday-10:00 AM": { subject: "English", teacher: "Mrs. Clark", room: "Room 102" },
    "Tuesday-09:00 AM": { subject: "Physics", teacher: "Dr. Stone", room: "Lab A" },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Class Timetable</h1>
        <p className="text-slate-500">View your weekly academic schedule.</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="border-b border-r px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-32">Time</th>
                {days.map(day => (
                  <th key={day} className="border-b border-r px-6 py-4 text-sm font-semibold text-slate-900 text-center min-w-[200px]">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(time => (
                <tr key={time}>
                  <td className="border-b border-r px-4 py-8 text-xs font-bold text-slate-500 text-center bg-slate-50/50">{time}</td>
                  {days.map(day => {
                    const entry = schedule[`${day}-${time}`];
                    return (
                      <td key={day} className="border-b border-r p-2">
                        {entry ? (
                          <div className="h-full w-full rounded-lg bg-blue-50 p-3 border border-blue-100">
                            <p className="text-sm font-bold text-blue-900">{entry.subject}</p>
                            <div className="flex items-center gap-1 mt-2 text-[10px] text-blue-700">
                              <Clock className="h-3 w-3" />
                              <span>1 Hour</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1 text-[10px] text-blue-700">
                              <MapPin className="h-3 w-3" />
                              <span>{entry.room}</span>
                            </div>
                            <p className="text-[10px] font-medium text-blue-800 mt-2">— {entry.teacher}</p>
                          </div>
                        ) : (
                          <div className="h-20 w-full rounded-lg border-2 border-dashed border-slate-100"></div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
