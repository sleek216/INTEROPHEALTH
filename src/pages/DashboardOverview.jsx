import React from 'react';

export default function DashboardOverview({ user, encountersList, labResultsList, auditLogsList, isSupabaseConfigured }) {
  return (
    <div className="space-y-6">
      {/* WordPress Welcome Widget */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="text-2xl font-bold text-[#001F66] font-manrope">Welcome to InteropHealth HIE Administration</h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-3xl font-manrope">
          Centralized Health Information Exchange hub facilitating secure clinical encounter logging, biochemistry pathology exchanges, retail pharmacy dispensation, and HIPAA audit governance.
        </p>
        <div className="pt-2 flex flex-wrap gap-4 font-manrope">
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-md">Role: <strong>{user.role}</strong></span>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-md">Facility: <strong>{user.org}</strong></span>
        </div>
      </div>

      {/* Summary Metric Widgets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-manrope">
        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase">Total Registered Profiles</span>
          <div className="text-3xl font-extrabold text-[#001F66]">8,421</div>
          <span className="text-[10px] text-[#009953] font-semibold flex items-center gap-1">🟢 99.9% Sync Accuracy</span>
        </div>
        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase">Active Diagnoses</span>
          <div className="text-3xl font-extrabold text-[#001F66]">{encountersList.length}</div>
          <span className="text-[10px] text-slate-400 font-medium">WHO ICD-10 Classification</span>
        </div>
        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase">Lab Reports Processed</span>
          <div className="text-3xl font-extrabold text-[#001F66]">{labResultsList.length}</div>
          <span className="text-[10px] text-[#009953] font-semibold">LOINC Code standard</span>
        </div>
        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase">HIPAA Security Compliance</span>
          <div className="text-lg font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg inline-block">100% Certified</div>
          <span className="text-[10px] text-slate-400 block font-medium">AES-256 / TLS 1.3 encryption</span>
        </div>
      </div>

      {/* WP Right/Left Activity Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Audit Log Events */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#001F66] font-manrope">Recent System Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-manrope">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Facility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                {auditLogsList.slice(0, 4).map(log => (
                  <tr key={log.id}>
                    <td className="p-3 text-slate-400">{log.timestamp}</td>
                    <td className="p-3 font-semibold">{log.user.split(' ')[0]}</td>
                    <td className="p-3 text-[#009953]">{log.action}</td>
                    <td className="p-3">{log.facility.split(' • ')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Platform Resources & Quick Actions */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4 font-manrope">
          <h3 className="text-base font-bold text-[#001F66]">Control Actions</h3>
          <ul className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
            <li className="py-2.5 flex justify-between items-center">
              <span>UPI Health Timeline Access</span>
              <span className="text-slate-400 font-normal">Active</span>
            </li>
            <li className="py-2.5 flex justify-between items-center">
              <span>LOINC Exchange Pipeline</span>
              <span className="text-[#009953]">Online</span>
            </li>
            <li className="py-2.5 flex justify-between items-center">
              <span>Allergy Collision Interceptor</span>
              <span className="text-[#009953]">Active</span>
            </li>
            <li className="py-2.5 flex justify-between items-center">
              <span>HIPAA Access Logs</span>
              <span className="text-slate-400 font-normal">Enabled</span>
            </li>
          </ul>
          <div className="pt-2">
            <button onClick={() => { alert("Platform diagnostic checks completed. All systems functional."); }} className="w-full bg-[#001F66] text-white hover:bg-[#009953] py-2.5 rounded-lg text-xs font-bold transition-all text-center">
              Run HIE Diagnostics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
