import React from 'react';
import { Lock, CheckCircle2, Calendar, Pill, FlaskConical, User, AlertTriangle } from 'lucide-react';

const TAG = ({ children, color = 'bg-slate-100 text-slate-600' }) => (
  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${color}`}>{children}</span>
);

// ──────────────────────────────────────────────
// MY PROFILE
// ──────────────────────────────────────────────
function MyProfile({ searchUpi }) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm font-manrope">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-[#001F66] text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">ZM</div>
          <div className="flex-1">
            <div className="text-xl font-bold text-[#001F66]">Zainab Malik</div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">{searchUpi}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <TAG color="bg-[#001F66]/10 text-[#001F66]">Female</TAG>
              <TAG color="bg-[#009953]/10 text-[#009953]">Blood Group: O+</TAG>
              <TAG color="bg-slate-100 text-slate-600">DOB: 1988-08-11</TAG>
              <TAG color="bg-red-50 text-red-700">⚠ Penicillin Allergy</TAG>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3 font-manrope">
          <h3 className="text-sm font-bold text-[#001F66]">Personal Information</h3>
          {[
            ['Full Legal Name', 'Zainab Malik'],
            ['CNIC Number', '35202-9182341-2'],
            ['Date of Birth', '11 August 1988 (Age: 38)'],
            ['Gender', 'Female'],
            ['Blood Group', 'O Positive (O+)'],
            ['Address', 'House #12, Block B, Gulberg III, Lahore'],
            ['Emergency Contact', 'Ali Malik (Spouse) — 0321-4567890'],
          ].map(([label, value], i) => (
            <div key={i} className="flex justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
              <span className="text-slate-400 font-medium">{label}</span>
              <span className="font-semibold text-slate-800">{value}</span>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3 font-manrope">
          <h3 className="text-sm font-bold text-[#001F66]">Clinical Summary</h3>
          {[
            ['Primary Diagnosis', 'Asthma (J45.909)'],
            ['Secondary Diagnosis', 'Type 2 Diabetes (E11.9)'],
            ['Known Allergies', 'Penicillin V Potassium (Anaphylaxis)'],
            ['Last Visit', '2026-08-11 — City General Hospital'],
            ['Primary Physician', 'Dr. Tariq Mahmood'],
            ['Insurance Provider', 'State Life Insurance Co.'],
            ['Insurance Policy #', 'SL-2024-PKR-009812'],
          ].map(([label, value], i) => (
            <div key={i} className="flex justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
              <span className="text-slate-400 font-medium">{label}</span>
              <span className="font-semibold text-slate-800 text-right ml-4">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// VISIT TIMELINE
// ──────────────────────────────────────────────
function VisitTimeline({ encountersList }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6 font-manrope">
      <h3 className="text-sm font-bold text-[#001F66]">Chronological Visit Timeline</h3>
      <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {encountersList.map((enc, i) => (
          <div key={enc.id} className="relative">
            <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#001F66] border-2 border-white shadow-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <div className="p-4 border border-slate-200 rounded-xl bg-[#F8FAFC] space-y-2">
              <div className="flex justify-between items-start">
                <div className="font-bold text-[#001F66] text-sm">{enc.facility}</div>
                <span className="font-mono text-[10px] text-slate-400">{enc.date}</span>
              </div>
              <div className="text-xs text-slate-500">{enc.type} — <span className="text-[#009953] font-semibold">{enc.icd10}</span></div>
              <div className="text-xs text-slate-400">Attending: {enc.provider}</div>
              <div className="text-xs text-slate-600 bg-white border border-slate-100 rounded-lg px-3 py-2">{enc.notes}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// MY LAB RESULTS
// ──────────────────────────────────────────────
function MyLabResults({ labResultsList }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden font-manrope">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="font-bold text-[#001F66] text-sm">My Laboratory Results</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-manrope">
          <thead>
            <tr className="bg-slate-50 font-bold text-slate-600 border-b border-slate-100">
              <th className="p-3">Test Name</th>
              <th className="p-3">My Result</th>
              <th className="p-3">Normal Range</th>
              <th className="p-3">Lab Facility</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {labResultsList.map(lab => (
              <tr key={lab.id} className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-800">{lab.testName}</td>
                <td className="p-3 font-bold text-[#001F66]">{lab.result}</td>
                <td className="p-3 text-slate-400">{lab.range}</td>
                <td className="p-3">{lab.lab}</td>
                <td className="p-3 font-mono text-slate-400">{lab.date}</td>
                <td className="p-3"><TAG color="bg-emerald-50 text-emerald-700">{lab.status}</TAG></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// ACTIVE MEDICATIONS
// ──────────────────────────────────────────────
function ActiveMedications() {
  const meds = [
    { name: 'Salbutamol Inhaler 100mcg', dosage: '2 puffs PRN q4-6h', prescriber: 'Dr. Tariq Mahmood', started: '2026-08-11', refills: 2, status: 'Active' },
    { name: 'Metformin 500mg Tablets', dosage: '1 tablet BD after meals', prescriber: 'Dr. Sara Hassan', started: '2026-07-24', refills: 3, status: 'Active' },
    { name: 'Vitamin D3 1000IU', dosage: '1 capsule OD', prescriber: 'Dr. Tariq Mahmood', started: '2026-06-15', refills: 1, status: 'Active' },
  ];

  return (
    <div className="space-y-6 font-manrope">
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-xs text-amber-800">
        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
        <span><strong>Drug Allergy on File:</strong> You have a documented severe allergy to Penicillin V Potassium. Always inform healthcare providers.</span>
      </div>

      <div className="space-y-3">
        {meds.map((med, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm font-manrope">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-[#001F66] text-sm">{med.name}</div>
                <div className="text-xs text-[#009953] font-semibold mt-0.5">{med.dosage}</div>
              </div>
              <TAG color="bg-emerald-50 text-emerald-700">{med.status}</TAG>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
              <div><div className="text-slate-400">Prescriber</div><div className="font-semibold">{med.prescriber}</div></div>
              <div><div className="text-slate-400">Started</div><div className="font-semibold font-mono">{med.started}</div></div>
              <div><div className="text-slate-400">Refills Left</div><div className="font-semibold">{med.refills}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// CONSENT POLICY
// ──────────────────────────────────────────────
function ConsentPolicy({ patientConsents, toggleConsent }) {
  const facilities = [
    { key: 'cityHospital', name: 'City General Hospital', type: 'Hospital', code: 'CGH-01', location: 'Lahore' },
    { key: 'apexLab', name: 'Apex Diagnostics Lab', type: 'Laboratory', code: 'ADL-02', location: 'Karachi' },
    { key: 'carePharmacy', name: 'CareRx Pharmacy Network', type: 'Pharmacy', code: 'CRX-03', location: 'Islamabad' },
  ];

  return (
    <div className="space-y-6 font-manrope">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
        <h3 className="text-sm font-bold text-[#001F66]">My Consent & Data Sharing Preferences</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Control which healthcare facilities can access your electronic health records. You can Grant or Revoke access for each registered facility at any time.
        </p>
      </div>

      <div className="space-y-3">
        {facilities.map(fac => (
          <div key={fac.key} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <div className="font-bold text-[#001F66] text-sm font-manrope">{fac.name}</div>
              <div className="text-xs text-slate-400 font-manrope mt-0.5">
                {fac.type} • {fac.code} • {fac.location}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold font-manrope ${patientConsents[fac.key] ? 'text-[#009953]' : 'text-red-500'}`}>
                {patientConsents[fac.key] ? 'Access Granted' : 'Access Revoked'}
              </span>
              <button
                onClick={() => toggleConsent(fac.key)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${patientConsents[fac.key] ? 'bg-[#009953]' : 'bg-slate-300'}`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${patientConsents[fac.key] ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// APPOINTMENTS
// ──────────────────────────────────────────────
function MyAppointments() {
  const appointments = [
    { id: 'APT-001', doctor: 'Dr. Tariq Mahmood', specialty: 'Pulmonology', hospital: 'City General Hospital', date: '2026-08-18', time: '10:00 AM', status: 'Confirmed' },
    { id: 'APT-002', doctor: 'Dr. Sara Hassan', specialty: 'Endocrinology', hospital: 'Apex Medical Center', date: '2026-08-25', time: '02:30 PM', status: 'Pending' },
  ];

  return (
    <div className="space-y-4 font-manrope">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#001F66]">Upcoming Appointments</h3>
        {appointments.map(apt => (
          <div key={apt.id} className="p-4 border border-slate-200 rounded-xl bg-[#F8FAFC] flex items-center justify-between">
            <div>
              <div className="font-bold text-[#001F66] text-sm">{apt.doctor}</div>
              <div className="text-xs text-slate-400 mt-0.5">{apt.specialty} — {apt.hospital}</div>
              <div className="text-xs text-[#009953] font-semibold mt-1">{apt.date} at {apt.time}</div>
            </div>
            <div className="text-right space-y-2">
              <TAG color={apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}>{apt.status}</TAG>
              <div>
                <button onClick={() => alert(`Appointment ${apt.id} cancelled.`)} className="text-[10px] text-red-500 hover:underline block">Cancel</button>
              </div>
            </div>
          </div>
        ))}
        {appointments.length === 0 && <div className="text-xs text-slate-400">No upcoming appointments.</div>}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// MAIN PATIENT PORTAL
// ──────────────────────────────────────────────
export default function PatientPortal({
  activeDashboardTab, searchUpi, encountersList, labResultsList, patientConsents, toggleConsent
}) {
  return (
    <div className="space-y-6 font-manrope">
      {activeDashboardTab === 'patient_360' && <MyProfile searchUpi={searchUpi} />}
      {activeDashboardTab === 'timeline' && <VisitTimeline encountersList={encountersList} />}
      {activeDashboardTab === 'lab_reports' && <MyLabResults labResultsList={labResultsList} />}
      {activeDashboardTab === 'medications' && <ActiveMedications />}
      {activeDashboardTab === 'consent' && <ConsentPolicy patientConsents={patientConsents} toggleConsent={toggleConsent} />}
      {activeDashboardTab === 'appointments' && <MyAppointments />}
    </div>
  );
}
