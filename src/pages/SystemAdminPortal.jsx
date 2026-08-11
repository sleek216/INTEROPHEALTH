import React, { useState } from 'react';
import { Building, Layers, Network, FileText, Plus, CheckCircle2, AlertTriangle, Check } from 'lucide-react';

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
// HEALTHCARE ORGANIZATIONS
// ──────────────────────────────────────────────
function HealthcareOrgs({ orgsList, setOrgsList, newOrg, setNewOrg }) {
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newOrg.name.trim()) return;
    setOrgsList([...orgsList, { id: Date.now(), ...newOrg, status: 'Active' }]);
    setNewOrg({ name: '', type: 'Hospital', location: '', code: '' });
    alert('Healthcare organization registered successfully!');
  };

  const typeColor = {
    Hospital: 'bg-[#001F66]/10 text-[#001F66]',
    Laboratory: 'bg-purple-100 text-purple-700',
    Pharmacy: 'bg-teal-100 text-teal-700',
    Clinic: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Organizations', value: orgsList.length + 5, sub: 'Registered in HIE' },
          { label: 'Hospitals', value: 4, sub: 'Connected hospitals' },
          { label: 'Laboratories', value: 3, sub: 'Pathology networks' },
          { label: 'Pharmacies', value: 5, sub: 'Retail pharmacy chains' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <div className="text-[10px] uppercase text-slate-500 font-bold font-manrope">{s.label}</div>
            <div className="text-3xl font-extrabold text-[#001F66] font-manrope">{s.value}</div>
            <div className="text-[10px] text-slate-400 font-medium">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4 font-manrope">
        <h3 className="text-sm font-bold text-[#001F66]">Register New Healthcare Organization</h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <FIELD label="Organization Name"><INPUT type="text" required placeholder="e.g. National Heart Hospital" value={newOrg.name} onChange={e => setNewOrg({ ...newOrg, name: e.target.value })} /></FIELD>
            <FIELD label="Organization Type">
              <SELECT value={newOrg.type} onChange={e => setNewOrg({ ...newOrg, type: e.target.value })}>
                <option>Hospital</option>
                <option>Laboratory</option>
                <option>Pharmacy</option>
                <option>Clinic</option>
                <option>Diagnostic Center</option>
                <option>Rehabilitation Center</option>
              </SELECT>
            </FIELD>
            <FIELD label="City / Location"><INPUT type="text" placeholder="e.g. Lahore" value={newOrg.location} onChange={e => setNewOrg({ ...newOrg, location: e.target.value })} /></FIELD>
            <FIELD label="HIE Integration Code"><INPUT type="text" placeholder="e.g. NHH-04" value={newOrg.code} onChange={e => setNewOrg({ ...newOrg, code: e.target.value })} /></FIELD>
          </div>
          <button type="submit" className="bg-[#001F66] text-white hover:bg-[#009953] px-6 py-2.5 rounded-full text-xs font-bold transition-all font-manrope flex items-center gap-2">
            <Plus className="w-3 h-3" /> Register Organization
          </button>
        </form>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-[#001F66] font-manrope text-sm">Registered HIE Organizations</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-manrope">
            <thead>
              <tr className="bg-slate-50 font-bold text-slate-600 border-b border-slate-100">
                <th className="p-3">Organization</th>
                <th className="p-3">Type</th>
                <th className="p-3">Location</th>
                <th className="p-3">HIE Code</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orgsList.map(org => (
                <tr key={org.id} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold">{org.name}</td>
                  <td className="p-3"><TAG color={typeColor[org.type] || 'bg-slate-100 text-slate-600'}>{org.type}</TAG></td>
                  <td className="p-3">{org.location}</td>
                  <td className="p-3 font-mono text-[#001F66] font-bold">{org.code}</td>
                  <td className="p-3"><TAG color="bg-emerald-50 text-emerald-700">{org.status}</TAG></td>
                  <td className="p-3">
                    <button onClick={() => { setOrgsList(orgsList.filter(x => x.id !== org.id)); }} className="text-red-400 hover:text-red-600 text-[10px] font-bold">
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
// DUPLICATE RESOLVER
// ──────────────────────────────────────────────
function DuplicateResolver({ duplicatesList, setDuplicatesList }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Detected Duplicates', value: duplicatesList.length, sub: 'Pending review' },
          { label: 'Resolved This Month', value: 14, sub: 'UPIs merged' },
          { label: 'Avg. Confidence', value: '91%', sub: 'Fuzzy-match score' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <div className="text-[10px] uppercase text-slate-500 font-bold font-manrope">{s.label}</div>
            <div className="text-3xl font-extrabold text-[#001F66] font-manrope">{s.value}</div>
            <div className="text-[10px] text-slate-400 font-medium">{s.sub}</div>
          </div>
        ))}
      </div>

      {duplicatesList.length > 0 ? (
        <div className="space-y-4">
          {duplicatesList.map(dup => (
            <div key={dup.id} className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm space-y-4 font-manrope">
              <div className="flex items-center gap-2 text-amber-700">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-bold">Duplicate Record Detected — Confidence: <strong>{dup.confidence}</strong></span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-4 border border-slate-200 rounded-xl bg-[#F8FAFC] space-y-2">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Record A</div>
                  <div className="font-bold text-[#001F66] text-sm">{dup.name1}</div>
                  <div className="font-mono text-slate-500 text-[10px]">{dup.upi1}</div>
                </div>
                <div className="p-4 border border-slate-200 rounded-xl bg-[#F8FAFC] space-y-2">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Record B</div>
                  <div className="font-bold text-[#001F66] text-sm">{dup.name2}</div>
                  <div className="font-mono text-slate-500 text-[10px]">{dup.upi2}</div>
                </div>
              </div>

              <div className="text-xs text-slate-500">
                <strong>Match Reason:</strong> {dup.reason}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setDuplicatesList(duplicatesList.filter(d => d.id !== dup.id)); alert('Records merged! A master UPI has been created.'); }}
                  className="bg-[#001F66] text-white hover:bg-[#009953] px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Check className="w-3 h-3" /> Confirm & Merge
                </button>
                <button
                  onClick={() => { setDuplicatesList(duplicatesList.filter(d => d.id !== dup.id)); alert('Record marked as not duplicate.'); }}
                  className="border border-slate-200 hover:border-red-300 text-slate-600 hover:text-red-500 px-5 py-2 rounded-full text-xs font-bold transition-all"
                >
                  Not a Duplicate
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-3 shadow-sm font-manrope">
          <CheckCircle2 className="w-10 h-10 text-[#009953] mx-auto" />
          <div className="font-bold text-[#001F66]">No Duplicate Records Detected</div>
          <div className="text-xs text-slate-400">All patient UPIs are unique. The deduplication engine runs continuously.</div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// HL7/FHIR INTEGRATIONS
// ──────────────────────────────────────────────
function IntegrationsStatus() {
  const integrations = [
    { name: 'HL7 v2.5 Message Broker', org: 'City General Hospital', type: 'HL7', status: 'Connected', latency: '12ms', last: '2 min ago' },
    { name: 'FHIR R4 REST API', org: 'Apex Diagnostics Lab', type: 'FHIR', status: 'Connected', latency: '8ms', last: '5 min ago' },
    { name: 'LOINC Terminology Server', org: 'NLM / Regenstrief', type: 'Terminology', status: 'Connected', latency: '45ms', last: '10 min ago' },
    { name: 'ICD-10-CM Code Server', org: 'WHO / CDC', type: 'Terminology', status: 'Connected', latency: '32ms', last: '10 min ago' },
    { name: 'E-Prescription Network', org: 'CareRx Pharmacy Network', type: 'Prescription', status: 'Connected', latency: '18ms', last: '1 min ago' },
    { name: 'Insurance Claims Gateway', org: 'State Life Insurance', type: 'Insurance', status: 'Degraded', latency: '420ms', last: '30 min ago' },
    { name: 'Patient Portal API', org: 'InteropHealth Self-Service', type: 'Web API', status: 'Connected', latency: '5ms', last: 'Real-time' },
    { name: 'SMS Notification Gateway', org: 'Telenor Health', type: 'Notification', status: 'Connected', latency: '100ms', last: '20 min ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Integrations', value: integrations.length, sub: 'System connections' },
          { label: 'Active & Online', value: integrations.filter(i => i.status === 'Connected').length, color: 'text-[#009953]', sub: 'Currently live' },
          { label: 'Degraded / Issues', value: integrations.filter(i => i.status === 'Degraded').length, color: 'text-amber-600', sub: 'Needs attention' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <div className="text-[10px] uppercase text-slate-500 font-bold font-manrope">{s.label}</div>
            <div className={`text-3xl font-extrabold font-manrope ${s.color || 'text-[#001F66]'}`}>{s.value}</div>
            <div className="text-[10px] text-slate-400 font-medium">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-[#001F66] font-manrope text-sm">Integration Health Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-manrope">
            <thead>
              <tr className="bg-slate-50 font-bold text-slate-600 border-b border-slate-100">
                <th className="p-3">Integration</th>
                <th className="p-3">Organization</th>
                <th className="p-3">Protocol</th>
                <th className="p-3">Status</th>
                <th className="p-3">Latency</th>
                <th className="p-3">Last Sync</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {integrations.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-800">{row.name}</td>
                  <td className="p-3 text-slate-500">{row.org}</td>
                  <td className="p-3"><TAG color="bg-[#001F66]/10 text-[#001F66]">{row.type}</TAG></td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'Connected' ? 'bg-[#009953]' : 'bg-amber-500'}`} />
                      <span className={`font-semibold ${row.status === 'Connected' ? 'text-[#009953]' : 'text-amber-600'}`}>{row.status}</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-slate-500">{row.latency}</td>
                  <td className="p-3 text-slate-400">{row.last}</td>
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
// HIPAA AUDIT INSPECTOR
// ──────────────────────────────────────────────
function HIPAAAuditInspector({ auditLogsList }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Audit Events', value: auditLogsList.length + 1240, sub: 'All time' },
          { label: 'Authorized Access', value: auditLogsList.length + 1235, color: 'text-[#009953]', sub: 'Compliant events' },
          { label: 'Denied Attempts', value: 5, color: 'text-red-600', sub: 'Blocked by RBAC' },
          { label: 'HIPAA Compliance', value: '100%', color: 'text-[#009953]', sub: 'AES-256 / TLS 1.3' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <div className="text-[10px] uppercase text-slate-500 font-bold font-manrope">{s.label}</div>
            <div className={`text-2xl font-extrabold font-manrope ${s.color || 'text-[#001F66]'}`}>{s.value}</div>
            <div className="text-[10px] text-slate-400 font-medium">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-[#001F66] font-manrope text-sm">HIPAA Immutable Audit Trail</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-manrope">
            <thead>
              <tr className="bg-slate-50 font-bold text-slate-600 border-b border-slate-100">
                <th className="p-3">Event #</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User</th>
                <th className="p-3">Action Performed</th>
                <th className="p-3">Patient UPI</th>
                <th className="p-3">Facility / IP</th>
                <th className="p-3">Authorization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogsList.map(log => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-slate-400 text-[10px]">#{log.id}</td>
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
    </div>
  );
}

// ──────────────────────────────────────────────
// MAIN SYSTEM ADMIN PORTAL
// ──────────────────────────────────────────────
export default function SystemAdminPortal({
  activeDashboardTab,
  orgsList,
  setOrgsList,
  newOrg,
  setNewOrg,
  duplicatesList,
  setDuplicatesList,
  auditLogsList
}) {
  return (
    <div className="space-y-6 font-manrope">
      {activeDashboardTab === 'orgs' && (
        <HealthcareOrgs
          orgsList={orgsList}
          setOrgsList={setOrgsList}
          newOrg={newOrg}
          setNewOrg={setNewOrg}
        />
      )}
      {activeDashboardTab === 'deduplication' && (
        <DuplicateResolver
          duplicatesList={duplicatesList}
          setDuplicatesList={setDuplicatesList}
        />
      )}
      {activeDashboardTab === 'integrations' && <IntegrationsStatus />}
      {activeDashboardTab === 'audit' && <HIPAAAuditInspector auditLogsList={auditLogsList} />}
    </div>
  );
}
