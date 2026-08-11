import React from 'react';
import { 
  ArrowRight, Users, TrendingUp, AlertTriangle, X, CheckCircle2, 
  Check, Search, FileText, Database, Lock, ShieldCheck, 
  Activity, Building2, FlaskConical, Pill, Calendar, 
  MapPin, Mail, Phone, Clock 
} from 'lucide-react';

export default function LandingPage({
  activeTab,
  setActiveTab,
  setShowLoginModal,
  setShowDemoModal,
  handleRoleChange,
  moduleCategory,
  setModuleCategory,
  moduleQuery,
  setModuleQuery,
  filteredModules,
  activeQuarter,
  setActiveQuarter,
  contactForm,
  setContactForm,
  handleContactSubmit
}) {
  return (
    <>
      {/* ═══════════════ PAGE 1: HOME LANDING PAGE ═══════════════ */}
      {activeTab === 'home' && (
        <main className="w-full">
          {/* Hero Section */}
          <header className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-5 bg-gradient-to-bl from-[#001F66] to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
              <div className="max-w-2xl fade-up">
                <h1 className="text-5xl lg:text-6xl tracking-tighter text-[#001F66] leading-[1.1] mb-6 font-manrope font-medium">
                  Unified Healthcare Patient Data &{' '}
                  <span className="text-[#009953] font-manrope font-medium">
                    Interoperability
                  </span>{' '}
                  Platform
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg font-manrope">
                  Connecting hospital networks, outpatient clinics, diagnostic laboratories, and retail pharmacies through automated UPI identity resolution and cloud-native architecture.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => setShowLoginModal(true)} className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-all bg-[#001F66] hover:bg-[#009953] rounded-lg shadow-md group font-manrope">
                    <span>Live System Demo</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => setShowDemoModal(true)} className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-[#001F66] transition-all bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-[#001F66] shadow-sm font-manrope">
                    <span>Request Customization</span>
                  </button>
                </div>
              </div>

              {/* Hero Visuals Grid */}
              <div className="relative grid grid-cols-2 gap-4 fade-up delay-200">
                <div className="space-y-4 translate-y-8">
                  <div className="bg-slate-100 rounded-xl overflow-hidden aspect-[4/5] shadow-lg">
                    <img src="/hero_doctor.png" alt="Clinician with Tablet" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow border border-slate-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-[#009953]/10 p-2 rounded-full text-[#009953]">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-semibold text-[#001F66] font-manrope">
                        Patient Identity
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-manrope">
                      Connecting 8,000+ UPI profiles
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-[#001F66] text-white rounded-xl shadow-lg border border-[#001F66]/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-white/20 p-2 rounded-full text-white">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-semibold font-manrope">
                        Real-Time Sync
                      </span>
                    </div>
                    <p className="text-xs text-white/80 font-manrope">
                      99.9% data sync accuracy
                    </p>
                  </div>
                  <div className="bg-slate-100 rounded-xl overflow-hidden aspect-[4/5] shadow-lg">
                    <img src="/hero_medical.png" alt="Medical Lab Team" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Grid Overview Sections */}
          <section className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#009953] font-bold font-manrope">Connected HIE Network</span>
                <h2 className="text-3xl md:text-4xl text-[#001F66] tracking-tight font-manrope font-medium">
                  Unified Clinical Exchange Ecosystem
                </h2>
                <p className="text-slate-500 font-manrope text-sm leading-relaxed">
                  Consolidating clinical registries, laboratory informatics, pharmacy networks, and patient self-service portals under a single, secure interoperability layout.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <article className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 group hover:shadow-md transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-[#001F66]/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600" alt="Hospital Network" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-semibold text-[#001F66] shadow-sm font-manrope">
                      HOSPITALS
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-[#001F66] text-xl font-semibold mb-2 font-manrope tracking-tight">
                      Enterprise Hospital Networks
                    </h3>
                    <p className="text-sm text-slate-500 mb-6 flex-1 font-manrope">
                      Inpatient admissions, emergency encounters, clinical observations, discharge summaries, and ICD-10 diagnoses.
                    </p>
                    <button onClick={() => { handleRoleChange('doctor'); setShowLoginModal(true); }} className="inline-flex items-center text-sm font-medium text-[#009953] hover:underline font-manrope self-start">
                      Doctor View &rarr;
                    </button>
                  </div>
                </article>

                <article className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 group hover:shadow-md transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-[#001F66]/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600" alt="Diagnostic Lab" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-semibold text-[#001F66] shadow-sm font-manrope">
                      LABS
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-[#001F66] mb-2 font-manrope tracking-tight">
                      Diagnostic Laboratories
                    </h3>
                    <p className="text-sm text-slate-500 mb-6 flex-1 font-manrope">
                      Pathology and biochemistry test results with standard reference ranges and critical value alerts.
                    </p>
                    <button onClick={() => { handleRoleChange('lab_staff'); setShowLoginModal(true); }} className="inline-flex items-center text-sm font-medium text-[#009953] hover:underline font-manrope self-start">
                      Lab View &rarr;
                    </button>
                  </div>
                </article>

                <article className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 group hover:shadow-md transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-[#001F66]/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600" alt="Retail Pharmacy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-semibold text-[#001F66] shadow-sm font-manrope">
                      PHARMACIES
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-[#001F66] mb-2 font-manrope tracking-tight">
                      Retail Pharmacy Networks
                    </h3>
                    <p className="text-sm text-slate-500 mb-6 flex-1 font-manrope">
                      Active drug verification, digital prescription retrieval, and real-time interaction collision warnings.
                    </p>
                    <button onClick={() => { handleRoleChange('pharmacist'); setShowLoginModal(true); }} className="inline-flex items-center text-sm font-medium text-[#009953] hover:underline font-manrope self-start">
                      Pharmacist View &rarr;
                    </button>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* Timeline and Roadmap Section */}
          <section className="py-24 bg-white border-t border-slate-200">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#009953] font-bold font-manrope">System Pathway</span>
                <h2 className="text-3xl md:text-4xl text-[#001F66] tracking-tight font-manrope font-medium">
                  Implementation & Integration Timeline
                </h2>
                <p className="text-slate-500 font-manrope text-sm leading-relaxed">
                  Project milestones mapped across quarterly phases for 2026.
                </p>
              </div>

              {/* Vertical timeline */}
              <div className="relative border-l-2 border-slate-100 ml-6 pl-8 space-y-12">
                {/* Item 1 */}
                <div className="relative group">
                  <div className="absolute -left-[41px] top-1.5 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white bg-slate-300 ring-1 ring-slate-100 group-hover:bg-[#009953] transition-colors"></div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[11px] font-extrabold text-[#009953] bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      Q1 2026
                    </span>
                    <h4 className="text-xl font-bold text-[#001F66] pt-1">
                      Patient Profile Registration & UPI
                    </h4>
                    <p className="text-sm text-[#009953] font-semibold">
                      Patient Identity Resolution
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-3xl font-manrope">
                      Deploying National ID identity resolution algorithms across connected hospital networks.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="relative group">
                  <div className="absolute -left-[41px] top-1.5 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white bg-slate-300 ring-1 ring-slate-100 group-hover:bg-[#009953] transition-colors"></div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[11px] font-extrabold text-[#009953] bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      Q2 2026
                    </span>
                    <h4 className="text-xl font-bold text-[#001F66] pt-1">
                      Diagnostic Lab Data Exchange
                    </h4>
                    <p className="text-sm text-[#009953] font-semibold">
                      LOINC & HL7 Integration
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-3xl font-manrope">
                      Integrating LOINC & HL7 FHIR laboratory result pipelines for 50 pathology labs.
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="relative group">
                  <div className="absolute -left-[41px] top-1.5 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white bg-slate-300 ring-1 ring-slate-100 group-hover:bg-[#009953] transition-colors"></div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[11px] font-extrabold text-[#009953] bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      Q3 2026
                    </span>
                    <h4 className="text-xl font-bold text-[#001F66] pt-1">
                      Drug Allergy Safety & E-Prescriptions
                    </h4>
                    <p className="text-sm text-[#009953] font-semibold">
                      Pharmacy Safety Network
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-3xl font-manrope">
                      Real-time e-prescription safety banners introduced across retail pharmacies.
                    </p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="relative group">
                  <div className="absolute -left-[41px] top-1.5 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white bg-slate-300 ring-1 ring-slate-100 group-hover:bg-[#009953] transition-colors"></div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[11px] font-extrabold text-[#009953] bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      Q4 2026
                    </span>
                    <h4 className="text-xl font-bold text-[#001F66] pt-1">
                      HIPAA Security Audit Inspector
                    </h4>
                    <p className="text-sm text-[#009953] font-semibold">
                      Audit Governance Portal
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-3xl font-manrope">
                      Centralized governance portal release for regional health authorities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Impact Section */}
          <section className="py-24 bg-[#001F66] text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl tracking-tight mb-6 font-manrope font-medium">
                  Driving Measurable Healthcare Change
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed mb-8 font-manrope">
                  InteropHealth plays a catalytic role in building resilient healthcare data ecosystems. By connecting hospital networks, structuring clinical histories, and enabling real-time lab and prescription exchange, we help accelerate care quality and patient safety.
                </p>
                <div className="w-full h-px bg-white/10 mb-8"></div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#009953] mt-2"></div>
                  <p className="text-sm text-blue-200 font-manrope">
                    Accelerating clinical data visibility, diagnostic speed, and patient safety.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                  <p className="text-4xl tracking-tighter text-white mb-1 font-manrope font-medium">
                    +4
                  </p>
                  <p className="text-sm font-medium text-blue-200 font-manrope">
                    Hospital Networks
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                  <p className="text-4xl tracking-tighter text-[#009953] mb-1 font-manrope font-medium">
                    8,000+
                  </p>
                  <p className="text-sm font-medium text-blue-200 font-manrope">
                    UPI Profiles Hosted
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                  <p className="text-4xl tracking-tighter text-white mb-1 font-manrope font-medium">
                    120+
                  </p>
                  <p className="text-sm font-medium text-blue-200 font-manrope">
                    Clinical Encounters
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                  <p className="text-4xl tracking-tighter text-[#009953] mb-1 font-manrope font-medium">
                    40+
                  </p>
                  <p className="text-sm font-medium text-blue-200 font-manrope">
                    Integrated Facilities
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-slate-50 pt-24 pb-24" id="contact">
            <div className="max-w-6xl mx-auto px-6">
              <div className="bg-[#001F66] rounded-2xl p-8 md:p-16 text-center md:text-left relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#009953]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl text-white tracking-tight mb-4 font-manrope font-medium">
                      Connect Your Healthcare Organization
                    </h2>
                    <p className="text-blue-100 text-lg mb-8 leading-relaxed font-manrope">
                      Join our unified health information exchange network to share clinical records, lab results, and prescriptions securely.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button onClick={() => setShowDemoModal(true)} className="px-6 py-3 bg-white text-[#001F66] font-semibold rounded-md hover:bg-slate-100 transition shadow-sm font-manrope">
                        Connect with InteropHealth
                      </button>
                      <button onClick={() => setShowDemoModal(true)} className="px-6 py-3 bg-[#009953] text-white font-semibold rounded-md hover:bg-[#009953]/90 transition shadow-sm font-manrope">
                        Request System Demo
                      </button>
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 text-white">
                    <h4 className="font-semibold mb-6 border-b border-white/10 pb-4 font-manrope">
                      Contact Information
                    </h4>
                    <ul className="space-y-4 text-sm font-manrope">
                      <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-[#009953]" /> contact@interophealth.co</li>
                      <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-[#009953]" /> +92 (42) 3576-8900</li>
                      <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-[#009953]" /> Lahore, Pakistan</li>
                      <li className="flex items-center gap-3"><Clock className="w-5 h-5 text-[#009953]" /> Mon–Fri, 9AM – 6PM PKT</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ═══════════════ PAGE 2: STRATEGY & ARCHITECTURE PAGE ═══════════════ */}
      {activeTab === 'about' && (
        <div className="w-full max-w-7xl mx-auto px-6 py-24 space-y-16">
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-10 md:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#009953] bg-[#009953]/10 rounded-full border border-[#009953]/20">
              Enterprise HIE Strategy
            </div>
            <h1 className="text-4xl md:text-6xl font-medium text-[#001F66] font-manrope leading-tight">
              Enterprise Health Information Exchange Architecture
            </h1>
            <p className="text-slate-600 text-lg md:text-xl font-light max-w-4xl leading-relaxed font-manrope">
              Addressing medical data fragmentation across hospitals, outpatient clinics, pathology laboratories, retail pharmacies, and insurance providers through cloud-native interoperability.
            </p>
          </div>

          {/* Section 1: Problem & Strategic Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-8 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
              <AlertTriangle className="w-10 h-10 text-amber-500" />
              <h2 className="text-2xl font-bold text-[#001F66]">The Healthcare Fragmentation Problem</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Healthcare organizations commonly maintain isolated silos for clinical visits, lab reports, e-prescriptions, and insurance billing. When a patient moves between facilities, critical medical histories, past diagnoses, and anaphylactic drug allergy records remain locked in legacy databases.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500" /> Repeated expensive diagnostic blood tests</li>
                <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500" /> Dangerous drug-allergy collisions at pharmacies</li>
                <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-500" /> Delayed emergency department triage decisions</li>
              </ul>
            </div>

            <div className="p-8 bg-[#001F66] text-white rounded-2xl space-y-4 shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-[#009953]" />
              <h2 className="text-2xl font-bold text-white">The InteropHealth Solution</h2>
              <p className="text-blue-100 text-sm leading-relaxed font-manrope">
                InteropHealth acts as a central neural network for clinical data exchange. By generating a Universal Patient Identifier (UPI) and enforcing FHIR R4 standard pipelines, patient records are synchronized in real-time while preserving HIPAA compliance.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-blue-200">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#009953]" /> Real-time Patient 360 EHR Aggregation</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#009953]" /> Automated Duplicate Record Resolution (FR-24)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#009953]" /> Real-time Drug Allergy Warning Banners</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Technical Architecture Standards Table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#001F66]">Interoperability Technical Standards Stack</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] text-[#001F66] font-bold uppercase border-b border-slate-200">
                    <th className="p-4">Standard</th>
                    <th className="p-4">Domain Focus</th>
                    <th className="p-4">Implementation Scope</th>
                    <th className="p-4">Compliance Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600 font-medium">
                  <tr>
                    <td className="p-4 font-bold text-[#001F66]">HL7 FHIR Release 4</td>
                    <td className="p-4">EHR & Clinical Resources</td>
                    <td className="p-4">Patient, Encounter, Condition, Observation APIs</td>
                    <td className="p-4"><span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">100% Certified</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#001F66]">LOINC (Logical Observation Identifiers)</td>
                    <td className="p-4">Diagnostic Pathology Labs</td>
                    <td className="p-4">Blood biochemistry, CBC, HbA1c reference range mapping</td>
                    <td className="p-4"><span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">100% Certified</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#001F66]">WHO ICD-10 Coding</td>
                    <td className="p-4">Clinical Visit Diagnoses</td>
                    <td className="p-4">Disease classification and chronic diagnostic logging</td>
                    <td className="p-4"><span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">100% Certified</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#001F66]">OAuth 2.0 + OpenID Connect</td>
                    <td className="p-4">Provider Identity & RBAC</td>
                    <td className="p-4">Multi-factor authentication & session security tokens</td>
                    <td className="p-4"><span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">100% Certified</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ PAGE 3: FULL CAPABILITIES ═══════════════ */}
      {activeTab === 'modules' && (
        <div className="w-full max-w-7xl mx-auto px-6 py-24 space-y-12">
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-10 md:p-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#009953]">Detailed Scope Specification</span>
            <h1 className="text-4xl md:text-5xl font-medium text-[#001F66] font-manrope">System Functional Capabilities</h1>
            <p className="text-slate-600 text-lg font-light max-w-3xl leading-relaxed">
              Unified registry of clinical modules and exchange engines.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Filter categories */}
            <div className="w-full md:w-64 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 space-y-4 flex-shrink-0">
              <h3 className="text-xs font-bold uppercase text-[#001F66] tracking-wider font-manrope">Categories</h3>
              <div className="flex flex-col gap-2 font-manrope text-xs font-semibold text-slate-500">
                {['all', 'identity', 'clinical', 'lab', 'pharmacy', 'consent', 'security'].map(cat => (
                  <button key={cat} onClick={() => setModuleCategory(cat)} className={`text-left px-3 py-2 rounded-lg transition-all capitalize ${moduleCategory === cat ? 'bg-[#001F66] text-white' : 'hover:bg-slate-100'}`}>
                    {cat === 'all' ? 'All Modules' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter results list */}
            <div className="flex-1 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <input type="text" placeholder="Search capabilities..." value={moduleQuery} onChange={(e) => setModuleQuery(e.target.value)} className="w-full p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#009953] transition-colors" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredModules.map(item => (
                  <div key={item.code} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#009953] bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">{item.code}</span>
                    <h3 className="text-base font-bold text-[#001F66]">{item.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-manrope">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ PAGE 4: SECURITY & PATHWAY ROADMAP ═══════════════ */}
      {activeTab === 'pathway' && (
        <div className="w-full max-w-7xl mx-auto px-6 py-24 space-y-16">
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-10 md:p-16 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#009953]">Compliance & Integration Pathway</span>
            <h1 className="text-4xl md:text-5xl font-medium text-[#001F66] font-manrope">System Compliance & Platform Roadmap</h1>
            <p className="text-slate-600 text-lg font-light max-w-3xl leading-relaxed">
              Our development roadmap is mapped across quarterly phases for 2026, building a cloud-native, secure network.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-bold text-[#001F66]">Interoperability Roadmap (2026)</h2>
              <div className="relative border-l-2 border-slate-100 ml-6 pl-8 space-y-12">
                <div className="relative group text-xs">
                  <div className="absolute -left-[41px] top-1.5 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white bg-slate-300 ring-1 ring-slate-100 group-hover:bg-[#009953] transition-colors"></div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-[#009953] bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Q1 2026</span>
                    <h4 className="text-sm font-bold text-[#001F66] pt-1">Patient Profile Registration & UPI</h4>
                    <p className="text-slate-500">Deploying national identity mapping registers across hospital clinics.</p>
                  </div>
                </div>

                <div className="relative group text-xs">
                  <div className="absolute -left-[41px] top-1.5 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white bg-slate-300 ring-1 ring-slate-100 group-hover:bg-[#009953] transition-colors"></div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-[#009953] bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Q2 2026</span>
                    <h4 className="text-sm font-bold text-[#001F66] pt-1">Diagnostic Laboratory Result Exchange</h4>
                    <p className="text-slate-500">LOINC & HL7 FHIR laboratory result standard integrations.</p>
                  </div>
                </div>

                <div className="relative group text-xs">
                  <div className="absolute -left-[41px] top-1.5 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white bg-slate-300 ring-1 ring-slate-100 group-hover:bg-[#009953] transition-colors"></div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-[#009953] bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Q3 2026</span>
                    <h4 className="text-sm font-bold text-[#001F66] pt-1">Pharmacy Safety Network & E-Prescriptions</h4>
                    <p className="text-slate-500">Dispensation check and allergy anaphylaxis warning alerts.</p>
                  </div>
                </div>

                <div className="relative group text-xs">
                  <div className="absolute -left-[41px] top-1.5 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white bg-slate-300 ring-1 ring-slate-100 group-hover:bg-[#009953] transition-colors"></div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-[#009953] bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Q4 2026</span>
                    <h4 className="text-sm font-bold text-[#001F66] pt-1">Audit Governance Console</h4>
                    <p className="text-slate-500">Central audit governance portal release for regional authorities.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance details sidebar */}
            <div className="space-y-6">
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 text-xs font-semibold text-slate-700">
                <ShieldCheck className="w-10 h-10 text-[#009953]" />
                <h3 className="text-base font-bold text-[#001F66]">HIPAA Security Specifications</h3>
                <p className="text-slate-500 font-medium font-manrope">The network implements strict security compliance benchmarks:</p>
                <ul className="space-y-2.5 divide-y divide-slate-100">
                  <li className="pt-2 flex justify-between"><span>Audit Trail Access Controls</span><span className="text-emerald-700">MANDATORY</span></li>
                  <li className="pt-2 flex justify-between"><span>Data Transmission Encryption</span><span className="text-emerald-700">TLS 1.3 / AES-256</span></li>
                  <li className="pt-2 flex justify-between"><span>Automatic Logout Timer</span><span className="text-slate-400">ENABLED</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ PAGE 5: SOLUTIONS USER ROLES ═══════════════ */}
      {activeTab === 'solutions' && (
        <div className="w-full max-w-7xl mx-auto px-6 py-24 space-y-16">
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-10 md:p-16 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#009953]">Operational Role Definitions</span>
            <h1 className="text-4xl md:text-5xl font-medium text-[#001F66] font-manrope">System Role-Based Access Control Matrix</h1>
            <p className="text-slate-600 text-lg font-light max-w-3xl leading-relaxed">
              Delineation of specific healthcare operational permissions under the HIPAA Security Framework.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-[#001F66]">Role Permission Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[#001F66] font-bold uppercase border-b border-slate-100">
                    <th className="p-4">Access Role Capability</th>
                    <th className="p-4">Doctor</th>
                    <th className="p-4">Patient</th>
                    <th className="p-4">Lab Staff</th>
                    <th className="p-4">Pharmacist</th>
                    <th className="p-4">Hosp Admin</th>
                    <th className="p-4">Sys Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600 font-medium">
                  <tr>
                    <td className="p-4 font-bold text-[#001F66]">Demographics Registry Search</td>
                    <td className="p-4 text-emerald-600 font-bold">READ ONLY</td>
                    <td className="p-4 text-slate-400">NO</td>
                    <td className="p-4 text-emerald-600 font-bold">READ ONLY</td>
                    <td className="p-4 text-emerald-600 font-bold">READ ONLY</td>
                    <td className="p-4 text-emerald-600 font-bold">READ ONLY</td>
                    <td className="p-4 text-emerald-600 font-bold">READ ONLY</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#001F66]">Encounter Note Creation</td>
                    <td className="p-4 text-emerald-600 font-bold">EXECUTE</td>
                    <td className="p-4 text-slate-400">NO</td>
                    <td className="p-4 text-slate-400">NO</td>
                    <td className="p-4 text-slate-400">NO</td>
                    <td className="p-4 text-slate-400">NO</td>
                    <td className="p-4 text-slate-400">NO</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#001F66]">Lab Observations Exchange</td>
                    <td className="p-4 text-emerald-600 font-bold">READ ONLY</td>
                    <td className="p-4 text-slate-400">NO</td>
                    <td className="p-4 text-emerald-600 font-bold">EXECUTE</td>
                    <td className="p-4 text-slate-400">NO</td>
                    <td className="p-4 text-slate-400">NO</td>
                    <td className="p-4 text-slate-400">NO</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#001F66]">E-Prescription Dispense Toggle</td>
                    <td className="p-4 text-slate-400">NO</td>
                    <td className="p-4 text-slate-400">NO</td>
                    <td className="p-4 text-slate-400">NO</td>
                    <td className="p-4 text-emerald-600 font-bold">EXECUTE</td>
                    <td className="p-4 text-slate-400">NO</td>
                    <td className="p-4 text-slate-400">NO</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#001F66]">Consent Grant / Revoke Toggles</td>
                    <td className="p-4 text-slate-400">NO</td>
                    <td className="p-4 text-emerald-600 font-bold">FULL CONTROL</td>
                    <td className="p-4 text-slate-400">NO</td>
                    <td className="p-4 text-slate-400">NO</td>
                    <td className="p-4 text-slate-400">NO</td>
                    <td className="p-4 text-slate-400">NO</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
