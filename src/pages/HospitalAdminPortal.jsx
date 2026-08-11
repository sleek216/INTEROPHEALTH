import React, { useState } from 'react';
import { Users, Plus, Building, BedDouble, FileText, Check } from 'lucide-react';

const TAG = ({ children, color = 'bg-slate-100 text-slate-600' }) => (
  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${color}`}>{children}</span>
);

const FIELD = ({ label, children }) => (
  <div>
    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 font-manrope">{label}</label>
    {children}
  </div>
);

const INPUT = (props) => (
  <input {...props} className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-xs font-medium outline-none focus:border-[#009953] font-manrope" />
);

const SELECT = ({ children, ...props }) => (
  <select {...props} className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-xs font-medium outline-none focus:border-[#009953] font-manrope">
    {children}
  </select>
);

// ──────────────────────────────────────────────
// MANAGE CLINICAL STAFF
// ──────────────────────────────────────────────
function ManageCliniciansList({ cliniciansList, setCliniciansList, newClinician, setNewClinician }) {
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newClinician.name.trim()) return;
    setCliniciansList([...cliniciansList, { id: Date.now(), ...newClinician, status: 'Active' }]);
    setNewClinician({ name: '', role: 'Physician', dept: '' });
    alert('Clinician added successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Staff', value: cliniciansList.length + 12, sub: 'Registered clinicians' },
          { label: 'Active', value: cliniciansList.filter(c => c.status === 'Active').length + 9, sub: 'On duty today' },
          { label: 'Doctors', value: 8, sub: 'Registered physicians' },
          { label: 'Departments', value: 6, sub: 'Active departments' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <div className="text-[10px] uppercase text-slate-500 font-bold font-manrope">{s.label}</div>
            <div className="text-3xl font-extrabold text-[#001F66] font-manrope">{s.value}</div>
            <div className="text-[10px] text-slate-400 font-medium">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4 font-manrope">
        <h3 className="text-sm font-bold text-[#001F66]">Register New Clinical Staff Member</h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <FIELD label="Full Name"><INPUT type="text" required placeholder="Dr. Full Name" value={newClinician.name} onChange={e => setNewClinician({ ...newClinician, name: e.target.value })} /></FIELD>
            <FIELD label="Role">
              <SELECT value={newClinician.role} onChange={e => setNewClinician({ ...newClinician, role: e.target.value })}>
                <option>Physician</option>
                <option>Surgeon</option>
                <option>Nurse</option>
                <option>Lab Specialist</option>
                <option>Radiologist</option>
                <option>Pharmacist</option>
                <option>Administrator</option>
              </SELECT>
            </FIELD>
            <FIELD label="Department"><INPUT type="text" placeholder="e.g. Cardiology" value={newClinician.dept} onChange={e => setNewClinician({ ...newClinician, dept: e.target.value })} /></FIELD>
          </div>
          <button type="submit" className="bg-[#001F66] text-white hover:bg-[#009953] px-6 py-2.5 rounded-full text-xs font-bold transition-all font-manrope flex items-center gap-2">
            <Plus className="w-3 h-3" /> Add Staff Member
          </button>
        </form>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-[#001F66] font-manrope text-sm">Clinical Staff Directory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-manrope">
            <thead>
              <tr className="bg-slate-50 font-bold text-slate-600 border-b border-slate-100">
                <th className="p-3">Staff Member</th>
                <th className="p-3">Role</th>
                <th className="p-3">Department</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cliniciansList.map(c => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold">{c.name}</td>
                  <td className="p-3">{c.role}</td>
                  <td className="p-3">{c.dept}</td>
                  <td className="p-3"><TAG color="bg-emerald-50 text-emerald-700">{c.status}</TAG></td>
                  <td className="p-3">
                    <button onClick={() => { setCliniciansList(cliniciansList.filter(x => x.id !== c.id)); }} className="text-red-400 hover:text-red-600 text-[10px] font-bold">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// DEPARTMENTS
// ──────────────────────────────────────────────
function DepartmentsManagement() {
  const depts = [
    { name: 'Cardiology', head: 'Dr. Bilal Qureshi', staff: 12, beds: 24, status: 'Active' },
    { name: 'Pulmonology', head: 'Dr. Tariq Mahmood', staff: 8, beds: 16, status: 'Active' },
    { name: 'Endocrinology', head: 'Dr. Sara Hassan', staff: 6, beds: 12, status: 'Active' },
    { name: 'Emergency & Trauma', head: 'Dr. Umar Fareed', staff: 20, beds: 30, status: 'Active' },
    { name: 'Pathology & Lab', head: 'Sara Ahmed', staff: 10, beds: 0, status: 'Active' },
    { name: 'Radiology', head: 'Dr. Amina Zafar', staff: 5, beds: 4, status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {depts.map((d, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm font-manrope hover:border-[#009953] transition-colors">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-[#001F66] text-sm">{d.name}</h3>
              <TAG color="bg-emerald-50 text-emerald-700">{d.status}</TAG>
            </div>
            <div className="mt-3 space-y-1.5 text-xs">
              <div className="text-slate-500">Head: <span className="font-semibold text-slate-700">{d.head}</span></div>
              <div className="text-slate-500">Staff: <span className="font-semibold text-slate-700">{d.staff} members</span></div>
              {d.beds > 0 && <div className="text-slate-500">Beds: <span className="font-semibold text-slate-700">{d.beds} units</span></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// BED MANAGEMENT
// ──────────────────────────────────────────────
function BedManagement() {
  const wards = [
    { name: 'Cardiology Ward A', total: 12, occupied: 9, available: 3 },
    { name: 'Pulmonology Ward B', total: 8, occupied: 5, available: 3 },
    { name: 'Emergency & ICU', total: 10, occupied: 10, available: 0 },
    { name: 'General Surgery', total: 16, occupied: 11, available: 5 },
    { name: 'Maternity Ward', total: 12, occupied: 7, available: 5 },
    { name: 'Pediatrics', total: 10, occupied: 6, available: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Hospital Beds', value: wards.reduce((s, w) => s + w.total, 0), sub: 'All wards combined' },
          { label: 'Occupied Beds', value: wards.reduce((s, w) => s + w.occupied, 0), color: 'text-amber-600', sub: 'Currently occupied' },
          { label: 'Available Beds', value: wards.reduce((s, w) => s + w.available, 0), color: 'text-[#009953]', sub: 'Ready for admission' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <div className="text-[10px] uppercase text-slate-500 font-bold font-manrope">{s.label}</div>
            <div className={`text-3xl font-extrabold font-manrope ${s.color || 'text-[#001F66]'}`}>{s.value}</div>
            <div className="text-[10px] text-slate-400 font-medium">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wards.map((ward, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm font-manrope">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-[#001F66] text-sm">{ward.name}</h4>
              <TAG color={ward.available === 0 ? 'bg-red-50 text-red-700' : ward.available <= 3 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}>
                {ward.available === 0 ? 'Full' : `${ward.available} Available`}
              </TAG>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full rounded-full transition-all ${ward.available === 0 ? 'bg-red-500' : 'bg-[#009953]'}`}
                style={{ width: `${(ward.occupied / ward.total) * 100}%` }}
              />
            </div>
            <div className="text-xs text-slate-500 flex justify-between">
              <span>Occupied: <strong className="text-slate-700">{ward.occupied}</strong></span>
              <span>Capacity: <strong className="text-slate-700">{ward.total}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// ACCESS LOGS
// ──────────────────────────────────────────────
function FacilityAccessLogs({ auditLogsList }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden font-manrope">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="font-bold text-[#001F66] text-sm">Facility EHR Access Audit Logs</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-manrope">
          <thead>
            <tr className="bg-slate-50 font-bold text-slate-600 border-b border-slate-100">
              <th className="p-3">Timestamp</th>
              <th className="p-3">User</th>
              <th className="p-3">Action</th>
              <th className="p-3">Patient UPI</th>
              <th className="p-3">Facility / IP</th>
              <th className="p-3">Auth Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {auditLogsList.map(log => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono text-slate-400">{log.timestamp}</td>
                <td className="p-3 font-semibold">{log.user}</td>
                <td className="p-3 text-[#009953] font-semibold">{log.action}</td>
                <td className="p-3 font-mono text-[10px] text-slate-500">{log.upi}</td>
                <td className="p-3 text-slate-500">{log.facility}</td>
                <td className="p-3"><TAG color="bg-emerald-50 text-emerald-700">{log.status}</TAG></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// MAIN HOSPITAL ADMIN PORTAL
// ──────────────────────────────────────────────
export default function HospitalAdminPortal({
  activeDashboardTab,
  cliniciansList,
  setCliniciansList,
  newClinician,
  setNewClinician,
  auditLogsList
}) {
  return (
    <div className="space-y-6 font-manrope">
      {activeDashboardTab === 'clinicians' && (
        <ManageCliniciansList
          cliniciansList={cliniciansList}
          setCliniciansList={setCliniciansList}
          newClinician={newClinician}
          setNewClinician={setNewClinician}
        />
      )}
      {activeDashboardTab === 'departments' && <DepartmentsManagement />}
      {activeDashboardTab === 'bed_management' && <BedManagement />}
      {activeDashboardTab === 'audit' && <FacilityAccessLogs auditLogsList={auditLogsList} />}
    </div>
  );
}
