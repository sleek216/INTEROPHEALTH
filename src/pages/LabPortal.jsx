import React, { useState } from 'react';
import { FlaskConical, Activity, ClipboardList, BookOpen, Plus, Search, AlertTriangle } from 'lucide-react';

const FIELD = ({ label, children }) => (
  <div>
    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 font-manrope">{label}</label>
    {children}
  </div>
);

const INPUT = (props) => (
  <input {...props} className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-xs font-medium outline-none focus:border-[#009953] font-manrope" />
);

const BTN = ({ children, onClick, type = 'button' }) => (
  <button type={type} onClick={onClick} className="bg-[#001F66] text-white hover:bg-[#009953] px-6 py-2.5 rounded-full text-xs font-bold transition-all font-manrope">
    {children}
  </button>
);

const TAG = ({ children, color = 'bg-slate-100 text-slate-600' }) => (
  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${color}`}>{children}</span>
);

// ──────────────────────────────────────────────
// PENDING TEST QUEUE
// ──────────────────────────────────────────────
function PendingTestQueue() {
  const tests = [
    { id: 'REQ-001', patient: 'Zainab Malik', upi: 'UPI-20260811-A89F11', test: 'HbA1c Glycated Hemoglobin', priority: 'Urgent', ordered: '2026-08-11', orderedBy: 'Dr. Tariq Mahmood', status: 'In Progress' },
    { id: 'REQ-002', patient: 'Ahmad Raza', upi: 'UPI-20260811-C11D33', test: 'Fasting Lipid Profile', priority: 'Routine', ordered: '2026-08-11', orderedBy: 'Dr. Sara Hassan', status: 'Sample Received' },
    { id: 'REQ-003', patient: 'Fatima Noor', upi: 'UPI-20260811-F45K12', test: 'Complete Blood Count (CBC)', priority: 'Routine', ordered: '2026-08-10', orderedBy: 'Dr. Bilal Qureshi', status: 'Pending Sample' },
    { id: 'REQ-004', patient: 'Omar Sheikh', upi: 'UPI-20260811-G78L99', test: 'Urine Culture & Sensitivity', priority: 'Urgent', ordered: '2026-08-10', orderedBy: 'Dr. Tariq Mahmood', status: 'In Progress' },
  ];

  const statusColor = {
    'In Progress': 'bg-[#001F66]/10 text-[#001F66]',
    'Sample Received': 'bg-emerald-50 text-emerald-700',
    'Pending Sample': 'bg-amber-50 text-amber-700',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Pending', value: tests.length, sub: 'In queue' },
          { label: 'Urgent Priority', value: tests.filter(t => t.priority === 'Urgent').length, color: 'text-red-600', sub: 'Process first' },
          { label: 'In Progress', value: tests.filter(t => t.status === 'In Progress').length, sub: 'Being processed' },
          { label: 'Awaiting Sample', value: tests.filter(t => t.status === 'Pending Sample').length, color: 'text-amber-600', sub: 'Collection pending' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <div className="text-[10px] uppercase text-slate-500 font-bold font-manrope">{s.label}</div>
            <div className={`text-3xl font-extrabold font-manrope ${s.color || 'text-[#001F66]'}`}>{s.value}</div>
            <div className="text-[10px] text-slate-400 font-medium">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-[#001F66] font-manrope text-sm">Pending Test Queue</h3>
          <button onClick={() => alert('Lab test requisition form opened!')} className="bg-[#001F66] text-white hover:bg-[#009953] px-4 py-2 rounded-lg text-xs font-bold transition-all font-manrope flex items-center gap-1.5">
            <Plus className="w-3 h-3" /> Receive New Sample
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-manrope">
            <thead>
              <tr className="bg-slate-50 font-bold text-slate-600 border-b border-slate-100">
                <th className="p-3">Req #</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Test Ordered</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Ordered By</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tests.map(t => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-[#001F66]">{t.id}</td>
                  <td className="p-3">
                    <div className="font-semibold">{t.patient}</div>
                    <div className="text-[10px] font-mono text-slate-400">{t.upi}</div>
                  </td>
                  <td className="p-3 font-semibold">{t.test}</td>
                  <td className="p-3">
                    <TAG color={t.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}>{t.priority}</TAG>
                  </td>
                  <td className="p-3">{t.orderedBy}</td>
                  <td className="p-3 font-mono text-slate-400">{t.ordered}</td>
                  <td className="p-3"><TAG color={statusColor[t.status]}>{t.status}</TAG></td>
                  <td className="p-3">
                    <button onClick={() => alert(`Processing ${t.id}...`)} className="bg-[#009953] text-white hover:bg-[#007a40] px-3 py-1 rounded-full text-[10px] font-bold transition-all">
                      Process
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
// UPLOAD LAB RESULTS
// ──────────────────────────────────────────────
function UploadLabResults({ newLabEntry, setNewLabEntry, handleAddLabResult, labResultsList, searchUpi }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#001F66] font-manrope">Upload New Lab Result to HIE</h3>
        <form onSubmit={handleAddLabResult} className="space-y-4 font-manrope">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <FIELD label="Patient UPI"><INPUT type="text" defaultValue={searchUpi} /></FIELD>
            <FIELD label="Test Name (LOINC)">
              <INPUT type="text" value={newLabEntry.testName} onChange={e => setNewLabEntry({ ...newLabEntry, testName: e.target.value })} required placeholder="e.g. HbA1c Glycated Hemoglobin" />
            </FIELD>
            <FIELD label="Result Value">
              <INPUT type="text" value={newLabEntry.result} onChange={e => setNewLabEntry({ ...newLabEntry, result: e.target.value })} required placeholder="e.g. 6.8 %" />
            </FIELD>
            <FIELD label="Normal Reference Range">
              <INPUT type="text" value={newLabEntry.range} onChange={e => setNewLabEntry({ ...newLabEntry, range: e.target.value })} placeholder="e.g. 4.0 - 5.6 %" />
            </FIELD>
          </div>

          {parseFloat(newLabEntry.result) > 6.5 && newLabEntry.testName.toLowerCase().includes('hba1c') && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-800 font-manrope">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span><strong>Abnormal Range Detected:</strong> HbA1c above 6.5% indicates possible diabetes. Clinical review recommended.</span>
            </div>
          )}

          <BTN type="submit">Upload & Publish to HIE</BTN>
        </form>
      </div>

      {/* Published results */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-[#001F66] font-manrope text-sm">Recently Published Results</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-manrope">
            <thead>
              <tr className="bg-slate-50 font-bold text-slate-600 border-b border-slate-100">
                <th className="p-3">Test Name</th>
                <th className="p-3">UPI</th>
                <th className="p-3">Result</th>
                <th className="p-3">Normal Range</th>
                <th className="p-3">Lab</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {labResultsList.map(lab => (
                <tr key={lab.id} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold">{lab.testName}</td>
                  <td className="p-3 font-mono text-slate-400 text-[10px]">{lab.upi}</td>
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
    </div>
  );
}

// ──────────────────────────────────────────────
// BIOCHEMISTRY PANEL
// ──────────────────────────────────────────────
function BiochemistryPanel() {
  const panels = [
    { name: 'Liver Function Tests (LFT)', tests: ['ALT', 'AST', 'ALP', 'Total Bilirubin', 'Direct Bilirubin', 'Albumin'], values: ['28 U/L', '25 U/L', '82 U/L', '0.8 mg/dL', '0.2 mg/dL', '4.1 g/dL'], ranges: ['7-56', '10-40', '44-147', '0.3-1.2', '0.1-0.3', '3.5-5.0'], statuses: ['Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal'] },
    { name: 'Kidney Function Tests (KFT)', tests: ['Serum Creatinine', 'Blood Urea Nitrogen', 'Uric Acid', 'eGFR'], values: ['1.1 mg/dL', '18 mg/dL', '5.2 mg/dL', '78 mL/min'], ranges: ['0.7-1.3', '7-20', '2.4-6.0', '>60'], statuses: ['Normal', 'Normal', 'Normal', 'Normal'] },
    { name: 'Thyroid Function Tests (TFT)', tests: ['TSH', 'Free T4', 'Free T3'], values: ['3.2 mIU/L', '1.2 ng/dL', '3.1 pg/mL'], ranges: ['0.4-4.0', '0.8-1.8', '2.3-4.2'], statuses: ['Normal', 'Normal', 'Normal'] },
  ];

  return (
    <div className="space-y-6">
      {panels.map((panel, pi) => (
        <div key={pi} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-[#001F66]/5">
            <h3 className="font-bold text-[#001F66] font-manrope text-sm">{panel.name}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-manrope">
              <thead>
                <tr className="bg-slate-50 font-bold text-slate-600 border-b border-slate-100">
                  <th className="p-3">Analyte</th>
                  <th className="p-3">Result</th>
                  <th className="p-3">Normal Range</th>
                  <th className="p-3">Interpretation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {panel.tests.map((test, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold">{test}</td>
                    <td className="p-3 font-bold text-[#001F66]">{panel.values[i]}</td>
                    <td className="p-3 text-slate-400">{panel.ranges[i]}</td>
                    <td className="p-3"><TAG color="bg-emerald-50 text-emerald-700">{panel.statuses[i]}</TAG></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────
// LOINC DIRECTORY
// ──────────────────────────────────────────────
function LOINCDirectory() {
  const codes = [
    { loinc: '4548-4', name: 'HbA1c / Hemoglobin.A1c', category: 'Chemistry', specimen: 'Blood', unit: '%' },
    { loinc: '58410-2', name: 'CBC Panel (CBCD)', category: 'Hematology', specimen: 'Blood', unit: 'Multiple' },
    { loinc: '2093-3', name: 'Total Cholesterol', category: 'Lipids', specimen: 'Serum', unit: 'mg/dL' },
    { loinc: '14749-6', name: 'Glucose (Fasting)', category: 'Chemistry', specimen: 'Serum', unit: 'mg/dL' },
    { loinc: '2160-0', name: 'Creatinine [Mass/volume] in Serum or Plasma', category: 'Renal', specimen: 'Serum', unit: 'mg/dL' },
    { loinc: '11006-6', name: 'EKG Tracing', category: 'Cardiology', specimen: 'Functional', unit: 'N/A' },
    { loinc: '3094-0', name: 'Urea nitrogen [Mass/volume] in Serum', category: 'Renal', specimen: 'Serum', unit: 'mg/dL' },
    { loinc: '2951-2', name: 'Sodium [Moles/volume] in Serum', category: 'Electrolytes', specimen: 'Serum', unit: 'mEq/L' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="font-bold text-[#001F66] font-manrope text-sm">LOINC Code Reference Directory</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-manrope">
          <thead>
            <tr className="bg-slate-50 font-bold text-slate-600 border-b border-slate-100">
              <th className="p-3">LOINC Code</th>
              <th className="p-3">Analyte / Test Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Specimen</th>
              <th className="p-3">Unit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {codes.map((c, i) => (
              <tr key={i} className="hover:bg-slate-50 cursor-pointer" onClick={() => alert(`LOINC ${c.loinc} copied!`)}>
                <td className="p-3 font-bold text-[#001F66] font-mono">{c.loinc}</td>
                <td className="p-3 font-semibold">{c.name}</td>
                <td className="p-3"><TAG color="bg-[#001F66]/10 text-[#001F66]">{c.category}</TAG></td>
                <td className="p-3 text-slate-500">{c.specimen}</td>
                <td className="p-3 text-slate-500">{c.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// MAIN LAB PORTAL
// ──────────────────────────────────────────────
export default function LabPortal({
  activeDashboardTab,
  newLabEntry,
  setNewLabEntry,
  handleAddLabResult,
  labResultsList,
  searchUpi
}) {
  return (
    <div className="space-y-6 font-manrope">
      {activeDashboardTab === 'pending_tests' && <PendingTestQueue />}
      {activeDashboardTab === 'lab_reports' && (
        <UploadLabResults
          newLabEntry={newLabEntry}
          setNewLabEntry={setNewLabEntry}
          handleAddLabResult={handleAddLabResult}
          labResultsList={labResultsList}
          searchUpi={searchUpi}
        />
      )}
      {activeDashboardTab === 'biochemistry' && <BiochemistryPanel />}
      {activeDashboardTab === 'loinc' && <LOINCDirectory />}
    </div>
  );
}
