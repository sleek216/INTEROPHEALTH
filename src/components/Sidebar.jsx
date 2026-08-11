import React from 'react';
import { 
  LayoutDashboard, Search, Stethoscope, Pill, FileCheck, 
  User, Calendar, FlaskConical, Lock, Activity, 
  AlertCircle, Users, FileText, Building, Layers,
  ShoppingCart, Package, BadgeDollarSign, Clipboard,
  BookOpen, ClipboardList, HeartPulse, UserPlus,
  BedDouble, Network, TestTube, BarChart3, Bell,
  CreditCard, ScanLine, Syringe, Thermometer, ShieldCheck
} from 'lucide-react';

function NavItem({ icon: Icon, label, tabKey, activeDashboardTab, setActiveDashboardTab }) {
  const isActive = activeDashboardTab === tabKey;
  return (
    <button
      onClick={() => setActiveDashboardTab(tabKey)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-semibold font-manrope transition-all text-left ${
        isActive ? 'bg-[#009953] text-white shadow-sm font-bold' : 'hover:bg-slate-800 text-slate-300'
      }`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="truncate">{label}</span>
    </button>
  );
}

function SectionLabel({ label }) {
  return (
    <div className="text-[10px] uppercase tracking-wider text-[#009953] font-bold px-3 pt-4 pb-1 font-manrope">
      {label}
    </div>
  );
}

export default function Sidebar({ user, activeDashboardTab, setActiveDashboardTab, mobileMenuOpen, setMobileMenuOpen }) {
  const isSysAdmin = user.role === 'System Admin';
  const isHospAdmin = user.role === 'Hospital Administrator';
  const isDoctor = user.role === 'Doctor / Physician';
  const isPatient = user.role === 'Patient Self-Service';
  const isLab = user.role === 'Lab Specialist';
  const isPharmacy = user.role === 'Retail Pharmacist';

  const nav = (tabKey, icon, label) => (
    <NavItem
      key={tabKey}
      icon={icon}
      label={label}
      tabKey={tabKey}
      activeDashboardTab={activeDashboardTab}
      setActiveDashboardTab={(key) => {
        setActiveDashboardTab(key);
        if (setMobileMenuOpen) setMobileMenuOpen(false);
      }}
    />
  );

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 h-screen w-64 lg:w-60 bg-[#1d2327] text-slate-300 flex flex-col justify-between flex-shrink-0 z-50 lg:z-30 shadow-2xl lg:shadow-lg transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="overflow-y-auto flex-1 no-scrollbar custom-scrollbar">
        {/* Header / Logo */}
        <div className="h-16 bg-[#001F66] flex items-center px-4 border-b border-white/10 sticky top-0 z-10">
          <div className="w-8 h-8 rounded-lg bg-[#009953] text-white flex items-center justify-center font-bold text-sm font-manrope mr-2.5 shadow-md flex-shrink-0">HC</div>
          <div className="min-w-0">
            <span className="font-extrabold text-xs text-white uppercase tracking-wider font-manrope block truncate">HIE Control Panel</span>
            {isSysAdmin && <span className="text-[9px] text-[#009953] font-bold uppercase font-manrope block leading-none mt-0.5">Super Admin Full Access</span>}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-0.5">
          <SectionLabel label="Core Portal" />
          {nav('overview', LayoutDashboard, 'Overview Dashboard')}

          {/* 👑 System Admin / Governance */}
          {(isSysAdmin || isHospAdmin) && (
            <>
              <SectionLabel label="HIE System Governance" />
              {nav('orgs', Building, 'Healthcare Organizations')}
              {nav('deduplication', Layers, 'Duplicate UPI Resolver')}
              {nav('integrations', Network, 'HL7/FHIR Integrations')}
              {nav('audit', FileText, 'HIPAA Audit Inspector')}
            </>
          )}

          {/* 🏢 Hospital Admin / Staff Management */}
          {(isSysAdmin || isHospAdmin) && (
            <>
              <SectionLabel label="Hospital & Staff Admin" />
              {nav('clinicians', Users, 'Manage Clinical Staff')}
              {nav('departments', Building, 'Departments & Wards')}
              {nav('bed_management', BedDouble, 'Bed Management')}
            </>
          )}

          {/* 🩺 Physician Workdesk */}
          {(isSysAdmin || isHospAdmin || isDoctor) && (
            <>
              <SectionLabel label="Physician Workdesk" />
              {nav('search_patients', Search, 'Patient EHR Search')}
              {nav('encounters', Stethoscope, 'Clinical Visit Logger')}
              {nav('vitals', Thermometer, 'Vitals & Observations')}
              {nav('prescriptions', Pill, 'E-Prescription Desk')}
              {nav('icd10', FileCheck, 'ICD-10 Directory')}
              {nav('referrals', UserPlus, 'Specialist Referrals')}
            </>
          )}

          {/* 💊 Pharmacy Operations */}
          {(isSysAdmin || isHospAdmin || isPharmacy) && (
            <>
              <SectionLabel label="Pharmacy Operations" />
              {nav('pharmacy', ScanLine, 'Dispense & Verify Rx')}
              {nav('pos', ShoppingCart, 'Point of Sale (POS)')}
              {nav('inventory', Package, 'Drug Inventory')}
              {nav('allergies', AlertCircle, 'Allergy Interceptor')}
              {nav('billing', BadgeDollarSign, 'Billing & Insurance')}
              {nav('drug_catalog', Pill, 'Drug Catalog')}
            </>
          )}

          {/* 🧪 Lab Operations */}
          {(isSysAdmin || isHospAdmin || isLab) && (
            <>
              <SectionLabel label="Lab Operations" />
              {nav('pending_tests', ClipboardList, 'Pending Test Queue')}
              {nav('lab_reports', FlaskConical, 'Upload Lab Results')}
              {nav('biochemistry', Activity, 'Biochemistry Panel')}
              {nav('loinc', BookOpen, 'LOINC Code Directory')}
            </>
          )}

          {/* 👤 Patient Health Record Access */}
          {(isSysAdmin || isPatient) && (
            <>
              <SectionLabel label="Patient Record Access" />
              {nav('patient_360', User, 'My Profile (UPI)')}
              {nav('timeline', Calendar, 'Visit Timeline')}
              {nav('lab_reports', FlaskConical, 'My Laboratory Results')}
              {nav('medications', Pill, 'Active Medications')}
              {nav('consent', Lock, 'Consent & Privacy')}
              {nav('appointments', Calendar, 'My Appointments')}
            </>
          )}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-700/40 text-[10px] text-slate-500 font-medium font-manrope">
        <div className="font-semibold text-slate-400">InteropHealth HIE v2.0</div>
        <div>Access Role: <strong className="text-[#009953]">{user.role}</strong></div>
      </div>
    </aside>
  </>
  );
}
