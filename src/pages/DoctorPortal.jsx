import React, { useState } from 'react';
import { AlertTriangle, Plus, Thermometer, HeartPulse, UserPlus, ClipboardList } from 'lucide-react';

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

const CARD = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
    <h3 className="text-sm font-bold text-[#001F66] font-manrope">{title}</h3>
    {children}
  </div>
);

const BTN = ({ children, onClick, type = 'button', variant = 'primary' }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all font-manrope ${
      variant === 'primary'
        ? 'bg-[#001F66] text-white hover:bg-[#009953]'
        : 'border border-slate-200 text-slate-600 hover:border-[#001F66] hover:text-[#001F66]'
    }`}
  >
    {children}
  </button>
);

// ──────────────────────────────────────────────
// SEARCH PATIENTS
// ──────────────────────────────────────────────
function SearchPatients({ searchUpi, setSearchUpi, encountersList }) {
  return (
    <div className="space-y-6">
      <CARD title="Find Patient EHR Profile">
        <p className="text-xs text-slate-500 font-manrope">Search profiles using Universal Patient Identifier (UPI) checksum keys.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <INPUT
            type="text"
            value={searchUpi}
            onChange={e => setSearchUpi(e.target.value)}
            placeholder="Enter UPI (e.g. UPI-20260811-A89F11)"
          />
          <BTN>Retrieve Records</BTN>
        </div>
      </CARD>

      <div className="bg-white p-8 rounded-xl border border-slate-200 space-y-6 shadow-sm">
        <div className="flex justify-between items-center pb-5 border-b border-slate-200 font-manrope">
          <div>
            <h2 className="text-xl font-bold text-[#001F66]">Patient 360° Unified EHR Profile</h2>
            <p className="text-xs text-slate-500 font-medium">Aggregated data from connected hospitals and pathology laboratories</p>
          </div>
          <span className="font-mono text-xs bg-[#F8FAFC] border border-slate-200 text-[#001F66] px-4 py-1.5 rounded-full font-bold">UPI: {searchUpi}</span>
        </div>

        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div><strong>CRITICAL DRUG ALLERGY WARNING:</strong> Penicillin V Potassium — Anaphylactic reaction registered. Non-beta-lactam alternatives mandatory.</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-manrope">
          {[
            { title: 'Patient Demographics', main: 'Zainab Malik (Female, 38 yrs)', sub: 'CNIC: 35202-9182341-2 • Blood: O+' },
            { title: 'Active Diagnoses', main: 'Asthma & Type 2 Diabetes', sub: 'ICD-10: J45.909, E11.9' },
            { title: 'Latest Pathology', main: 'HbA1c: 6.8% (Borderline High)', sub: 'Apex Diagnostics • 2026-08-10' },
          ].map((c, i) => (
            <div key={i} className="p-5 border border-slate-200 rounded-xl bg-[#F8FAFC] space-y-1.5">
              <div className="text-[10px] text-slate-500 font-bold uppercase">{c.title}</div>
              <div className="font-bold text-[#001F66] text-sm">{c.main}</div>
              <div className="text-xs text-slate-500 font-medium">{c.sub}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-bold text-[#001F66] font-manrope">Chronological Clinical Encounters ({encountersList.length})</h3>
          {encountersList.map(enc => (
            <div key={enc.id} className="p-4 border border-slate-200 rounded-xl bg-[#F8FAFC] flex justify-between items-start text-xs font-manrope">
              <div className="space-y-1">
                <div className="font-bold text-[#001F66] text-sm">{enc.facility} — {enc.type}</div>
                <div className="text-[#009953] font-semibold">{enc.icd10} • Attending: {enc.provider}</div>
                <div className="text-slate-500">{enc.notes}</div>
              </div>
              <span className="font-mono text-slate-400 flex-shrink-0">{enc.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// CLINICAL VISIT LOGGER
// ──────────────────────────────────────────────
function ClinicalVisitLogger({ newEncounter, setNewEncounter, handleAddEncounter }) {
  return (
    <CARD title="Record New Clinical Encounter">
      <p className="text-xs text-slate-500 font-manrope">Document a patient visit with attending provider details and ICD-10 diagnostic coding.</p>
      <form onSubmit={handleAddEncounter} className="space-y-4 font-manrope">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <FIELD label="Visit Type">
            <SELECT value={newEncounter.visitType} onChange={e => setNewEncounter({ ...newEncounter, visitType: e.target.value })}>
              <option>Outpatient Clinic Visit</option>
              <option>Emergency Admission</option>
              <option>Inpatient Progress Note</option>
              <option>Telehealth Consultation</option>
              <option>Specialist Referral Visit</option>
            </SELECT>
          </FIELD>
          <FIELD label="ICD-10 Diagnosis Code">
            <INPUT type="text" value={newEncounter.icd10} onChange={e => setNewEncounter({ ...newEncounter, icd10: e.target.value })} />
          </FIELD>
        </div>
        <FIELD label="Clinical Visit Notes">
          <textarea
            rows="4"
            value={newEncounter.notes}
            onChange={e => setNewEncounter({ ...newEncounter, notes: e.target.value })}
            required
            placeholder="Enter clinical observations, vitals, symptoms, examination findings..."
            className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-xs font-medium outline-none focus:border-[#009953] font-manrope"
          />
        </FIELD>
        <BTN type="submit">Save Encounter Record</BTN>
      </form>
    </CARD>
  );
}

// ──────────────────────────────────────────────
// VITALS & OBSERVATIONS
// ──────────────────────────────────────────────
function VitalsLogger() {
  const [vitals, setVitals] = useState({ bp_sys: '120', bp_dia: '80', pulse: '72', temp: '37.0', spo2: '98', weight: '65', height: '165', rr: '16', glucose: '110' });

  const vitalHistory = [
    { date: '2026-08-11', bp: '120/80', pulse: 72, temp: '37.0', spo2: '98%', weight: '65 kg', glucose: '110' },
    { date: '2026-07-24', bp: '125/82', pulse: 76, temp: '37.2', spo2: '97%', weight: '66 kg', glucose: '115' },
    { date: '2026-06-15', bp: '135/85', pulse: 80, temp: '37.1', spo2: '97%', weight: '67 kg', glucose: '120' },
  ];

  return (
    <div className="space-y-6">
      <CARD title="Record Vitals & Clinical Observations">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-manrope">
          <FIELD label="Blood Pressure (Systolic mmHg)">
            <INPUT type="number" value={vitals.bp_sys} onChange={e => setVitals({ ...vitals, bp_sys: e.target.value })} />
          </FIELD>
          <FIELD label="Blood Pressure (Diastolic mmHg)">
            <INPUT type="number" value={vitals.bp_dia} onChange={e => setVitals({ ...vitals, bp_dia: e.target.value })} />
          </FIELD>
          <FIELD label="Pulse Rate (bpm)">
            <INPUT type="number" value={vitals.pulse} onChange={e => setVitals({ ...vitals, pulse: e.target.value })} />
          </FIELD>
          <FIELD label="Temperature (°C)">
            <INPUT type="number" step="0.1" value={vitals.temp} onChange={e => setVitals({ ...vitals, temp: e.target.value })} />
          </FIELD>
          <FIELD label="SpO2 Oxygen Saturation (%)">
            <INPUT type="number" value={vitals.spo2} onChange={e => setVitals({ ...vitals, spo2: e.target.value })} />
          </FIELD>
          <FIELD label="Respiratory Rate (/min)">
            <INPUT type="number" value={vitals.rr} onChange={e => setVitals({ ...vitals, rr: e.target.value })} />
          </FIELD>
          <FIELD label="Weight (kg)">
            <INPUT type="number" value={vitals.weight} onChange={e => setVitals({ ...vitals, weight: e.target.value })} />
          </FIELD>
          <FIELD label="Height (cm)">
            <INPUT type="number" value={vitals.height} onChange={e => setVitals({ ...vitals, height: e.target.value })} />
          </FIELD>
          <FIELD label="Blood Glucose (mg/dL)">
            <INPUT type="number" value={vitals.glucose} onChange={e => setVitals({ ...vitals, glucose: e.target.value })} />
          </FIELD>
        </div>
        <div className="pt-2">
          <BTN onClick={() => alert('Vitals saved to patient EHR record!')}>Save Vitals Record</BTN>
        </div>
      </CARD>

      {/* Calculated indices */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'BMI', value: (parseFloat(vitals.weight) / Math.pow(parseFloat(vitals.height) / 100, 2)).toFixed(1), sub: 'Body Mass Index', color: 'text-[#001F66]' },
          { label: 'Blood Pressure', value: `${vitals.bp_sys}/${vitals.bp_dia}`, sub: 'mmHg', color: vitals.bp_sys > 130 ? 'text-red-600' : 'text-[#009953]' },
          { label: 'SpO2', value: `${vitals.spo2}%`, sub: 'Oxygen Saturation', color: vitals.spo2 < 95 ? 'text-red-600' : 'text-[#009953]' },
          { label: 'Glucose', value: `${vitals.glucose} mg/dL`, sub: 'Blood Glucose', color: vitals.glucose > 126 ? 'text-amber-600' : 'text-[#009953]' },
        ].map((v, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-1">
            <div className="text-[10px] uppercase text-slate-500 font-bold font-manrope">{v.label}</div>
            <div className={`text-2xl font-extrabold font-manrope ${v.color}`}>{v.value}</div>
            <div className="text-[10px] text-slate-400 font-medium">{v.sub}</div>
          </div>
        ))}
      </div>

      {/* Vitals history */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-[#001F66] font-manrope text-sm">Vitals History Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-manrope">
            <thead>
              <tr className="bg-slate-50 font-bold text-slate-600 border-b border-slate-100">
                <th className="p-3">Date</th><th className="p-3">BP</th><th className="p-3">Pulse</th>
                <th className="p-3">Temp</th><th className="p-3">SpO2</th><th className="p-3">Weight</th><th className="p-3">Glucose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vitalHistory.map((v, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-slate-500">{v.date}</td>
                  <td className="p-3 font-bold text-[#001F66]">{v.bp}</td>
                  <td className="p-3">{v.pulse} bpm</td>
                  <td className="p-3">{v.temp}°C</td>
                  <td className="p-3 text-[#009953] font-semibold">{v.spo2}</td>
                  <td className="p-3">{v.weight}</td>
                  <td className="p-3">{v.glucose} mg/dL</td>
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
// E-PRESCRIPTION DESK
// ──────────────────────────────────────────────
function EPrescriptionDesk({ prescriptionStatus, setPrescriptionStatus }) {
  return (
    <CARD title="E-Prescription Desk — Issue Digital Prescription">
      <p className="text-xs text-slate-500 font-manrope">Securely transmit digital prescriptions to the retail pharmacy safety network.</p>
      <form onSubmit={e => { e.preventDefault(); setPrescriptionStatus('Pending Dispense'); alert('E-prescription transmitted to CareRx Network!'); }} className="space-y-4 font-manrope">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <FIELD label="Patient UPI"><INPUT type="text" defaultValue="UPI-20260811-A89F11" /></FIELD>
          <FIELD label="Medication Name"><INPUT type="text" required placeholder="e.g. Salbutamol Inhaler 100mcg" /></FIELD>
          <FIELD label="Dosage & Frequency"><INPUT type="text" required placeholder="e.g. 2 puffs every 4–6 hours PRN" /></FIELD>
          <FIELD label="Duration of Treatment"><INPUT type="text" placeholder="e.g. 30 days" /></FIELD>
          <FIELD label="Route of Administration">
            <SELECT><option>Oral</option><option>Inhalation</option><option>Intravenous</option><option>Topical</option><option>Subcutaneous</option></SELECT>
          </FIELD>
          <FIELD label="Refills Allowed">
            <SELECT><option>0</option><option>1</option><option>2</option><option>3</option></SELECT>
          </FIELD>
        </div>
        <FIELD label="Clinical Notes / Patient Instructions">
          <textarea rows="3" placeholder="Special instructions for the patient and pharmacist..." className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-xs font-medium outline-none focus:border-[#009953] font-manrope" />
        </FIELD>
        <BTN type="submit">Issue & Transmit Prescription</BTN>
      </form>
    </CARD>
  );
}

// ──────────────────────────────────────────────
// ICD-10 DIRECTORY
// ──────────────────────────────────────────────
function ICD10Directory() {
  const codes = [
    { code: 'J45.909', disease: 'Unspecified asthma, uncomplicated', cat: 'Pulmonary' },
    { code: 'E11.9', disease: 'Type 2 diabetes mellitus without complications', cat: 'Endocrine' },
    { code: 'I10', disease: 'Essential (primary) hypertension', cat: 'Cardiovascular' },
    { code: 'J06.9', disease: 'Acute upper respiratory infection, unspecified', cat: 'Infectious' },
    { code: 'K21.0', disease: 'Gastroesophageal reflux disease with esophagitis', cat: 'Gastroenterology' },
    { code: 'N18.3', disease: 'Chronic kidney disease, stage 3', cat: 'Nephrology' },
    { code: 'M79.3', disease: 'Panniculitis, unspecified', cat: 'Musculoskeletal' },
    { code: 'Z87.891', disease: 'Personal history of other specified conditions', cat: 'Z-Codes' },
  ];

  return (
    <CARD title="WHO ICD-10 Coding Directory">
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-manrope">
          <thead>
            <tr className="bg-slate-50 font-bold text-slate-600 border-b border-slate-100">
              <th className="p-3">ICD-10 Code</th><th className="p-3">Disease / Classification</th><th className="p-3">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {codes.map((c, i) => (
              <tr key={i} className="hover:bg-slate-50 cursor-pointer" onClick={() => alert(`Code ${c.code} copied to clipboard!`)}>
                <td className="p-3 font-bold text-[#001F66]">{c.code}</td>
                <td className="p-3 text-slate-700">{c.disease}</td>
                <td className="p-3 text-[#009953] font-semibold">{c.cat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CARD>
  );
}

// ──────────────────────────────────────────────
// SPECIALIST REFERRALS
// ──────────────────────────────────────────────
function SpecialistReferrals() {
  const referrals = [
    { id: 'REF-2026-01', patient: 'Zainab Malik', specialty: 'Pulmonology', hospital: 'National Chest Hospital', urgency: 'Routine', date: '2026-08-11', status: 'Pending' },
    { id: 'REF-2026-02', patient: 'Ahmad Raza', specialty: 'Endocrinology', hospital: 'City General Hospital', urgency: 'Urgent', date: '2026-08-10', status: 'Confirmed' },
    { id: 'REF-2026-03', patient: 'Fatima Noor', specialty: 'Cardiology', hospital: 'Punjab Institute of Cardiology', urgency: 'Emergency', date: '2026-08-09', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <CARD title="Issue New Specialist Referral">
        <form onSubmit={e => { e.preventDefault(); alert('Referral issued and transmitted!'); }} className="space-y-4 font-manrope">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <FIELD label="Patient UPI"><INPUT type="text" placeholder="Enter UPI..." /></FIELD>
            <FIELD label="Referring to Specialty">
              <SELECT>
                <option>Cardiology</option><option>Pulmonology</option><option>Endocrinology</option>
                <option>Nephrology</option><option>Neurology</option><option>Orthopedics</option>
              </SELECT>
            </FIELD>
            <FIELD label="Hospital / Facility"><INPUT type="text" placeholder="Receiving hospital name..." /></FIELD>
            <FIELD label="Urgency Level">
              <SELECT><option>Routine</option><option>Urgent</option><option>Emergency</option></SELECT>
            </FIELD>
          </div>
          <FIELD label="Clinical Reason for Referral">
            <textarea rows="2" placeholder="Clinical justification and relevant history..." className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-xs font-medium outline-none focus:border-[#009953] font-manrope" />
          </FIELD>
          <BTN type="submit">Issue Referral Letter</BTN>
        </form>
      </CARD>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-[#001F66] font-manrope text-sm">My Issued Referrals</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-manrope">
            <thead>
              <tr className="bg-slate-50 font-bold text-slate-600 border-b border-slate-100">
                <th className="p-3">Ref #</th><th className="p-3">Patient</th><th className="p-3">Specialty</th>
                <th className="p-3">Hospital</th><th className="p-3">Urgency</th><th className="p-3">Date</th><th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {referrals.map(r => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-[#001F66]">{r.id}</td>
                  <td className="p-3 font-semibold">{r.patient}</td>
                  <td className="p-3">{r.specialty}</td>
                  <td className="p-3 text-slate-500">{r.hospital}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.urgency === 'Emergency' ? 'bg-red-100 text-red-700' : r.urgency === 'Urgent' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>{r.urgency}</span>
                  </td>
                  <td className="p-3 font-mono text-slate-400">{r.date}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : r.status === 'Confirmed' ? 'bg-[#001F66]/10 text-[#001F66]' : 'bg-amber-50 text-amber-700'}`}>{r.status}</span>
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
// PATIENT HISTORY
// ──────────────────────────────────────────────
function PatientHistory({ encountersList }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="font-bold text-[#001F66] font-manrope text-sm">Full Patient Clinical History (All Records)</h3>
      </div>
      <div className="p-6 space-y-3">
        {encountersList.map(enc => (
          <div key={enc.id} className="p-4 border border-slate-200 rounded-xl hover:border-[#009953] transition-colors font-manrope text-xs">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-[#001F66] text-sm">{enc.facility} — {enc.type}</div>
                <div className="text-[#009953] font-semibold mt-0.5">{enc.icd10} • {enc.provider}</div>
                <div className="text-slate-500 mt-1 leading-relaxed">{enc.notes}</div>
              </div>
              <span className="font-mono text-slate-400 flex-shrink-0 ml-4">{enc.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// MAIN DOCTOR PORTAL
// ──────────────────────────────────────────────
export default function DoctorPortal({
  activeDashboardTab, searchUpi, setSearchUpi,
  encountersList, newEncounter, setNewEncounter, handleAddEncounter,
  prescriptionStatus, setPrescriptionStatus
}) {
  return (
    <div className="space-y-6">
      {activeDashboardTab === 'search_patients' && (
        <SearchPatients searchUpi={searchUpi} setSearchUpi={setSearchUpi} encountersList={encountersList} />
      )}
      {activeDashboardTab === 'encounters' && (
        <ClinicalVisitLogger newEncounter={newEncounter} setNewEncounter={setNewEncounter} handleAddEncounter={handleAddEncounter} />
      )}
      {activeDashboardTab === 'vitals' && <VitalsLogger />}
      {activeDashboardTab === 'prescriptions' && (
        <EPrescriptionDesk prescriptionStatus={prescriptionStatus} setPrescriptionStatus={setPrescriptionStatus} />
      )}
      {activeDashboardTab === 'icd10' && <ICD10Directory />}
      {activeDashboardTab === 'referrals' && <SpecialistReferrals />}
      {activeDashboardTab === 'patient_history' && <PatientHistory encountersList={encountersList} />}
    </div>
  );
}
