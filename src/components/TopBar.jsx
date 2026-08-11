import React from 'react';
import { Bell, LogOut, Wifi, WifiOff, Menu, X } from 'lucide-react';

export default function TopBar({ user, activeDashboardTab, isSupabaseConfigured, handleLogout, mobileMenuOpen, setMobileMenuOpen }) {
  const tabLabels = {
    overview: 'Overview Dashboard',
    search_patients: 'Patient EHR Search',
    encounters: 'Clinical Visit Logger',
    vitals: 'Vitals & Observations',
    prescriptions: 'E-Prescription Desk',
    icd10: 'ICD-10 Coding Directory',
    referrals: 'Specialist Referrals',
    patient_history: 'Patient History',
    patient_360: 'My Profile (UPI)',
    timeline: 'Visit Timeline',
    lab_reports: 'Laboratory Results',
    medications: 'Active Medications',
    consent: 'Consent & Privacy',
    appointments: 'My Appointments',
    pending_tests: 'Pending Test Queue',
    biochemistry: 'Biochemistry Panel',
    loinc: 'LOINC Code Directory',
    pharmacy: 'Dispense & Verify Rx',
    pos: 'Point of Sale (POS)',
    inventory: 'Drug Inventory',
    allergies: 'Allergy Interceptor',
    billing: 'Billing & Insurance',
    drug_catalog: 'Drug Catalog',
    clinicians: 'Manage Clinical Staff',
    departments: 'Departments & Wards',
    bed_management: 'Bed Management',
    audit: 'Access Logs & Audit Trail',
    orgs: 'Healthcare Organizations',
    deduplication: 'Duplicate UPI Resolver',
    integrations: 'HL7/FHIR Integrations',
  };

  const pageTitle = tabLabels[activeDashboardTab] || 'InteropHealth HIE';
  const isLive = isSupabaseConfigured();

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 shadow-sm z-20">
      {/* Left: Mobile Toggle + Page title */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 text-slate-600 hover:text-[#001F66] rounded-md hover:bg-slate-100 transition-colors"
          title="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <h1 className="text-xs sm:text-sm font-bold text-[#001F66] font-manrope tracking-tight truncate">
          {pageTitle}
        </h1>

        <span
          className={`hidden xs:flex items-center gap-1 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border font-manrope flex-shrink-0 ${
            isLive
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}
        >
          {isLive ? <Wifi className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <WifiOff className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
          <span className="hidden md:inline">{isLive ? 'HIE Network Online' : 'HIE Local Mode'}</span>
        </span>
      </div>

      {/* Right: User info + actions */}
      <div className="flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
        {/* Notification bell */}
        <button className="relative text-slate-400 hover:text-[#001F66] transition-colors p-1">
          <Bell className="w-4 h-4" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* User badge */}
        <div className="flex items-center gap-2 font-manrope">
          <div className="w-7 h-7 rounded-full bg-[#001F66] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
            {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
          <div className="hidden md:block text-right">
            <div className="text-xs font-bold text-slate-800 leading-none">{user.name}</div>
            <div className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">{user.role}</div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors border-l border-slate-200 pl-2.5 sm:pl-4 font-manrope"
          title="Log Out"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Log Out</span>
        </button>
      </div>
    </header>
  );
}
