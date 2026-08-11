import React, { useState, useMemo, useEffect } from 'react';
import { LogIn, Check } from 'lucide-react';
import { supabase } from './supabaseClient';

// Import newly created components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

// Import newly created pages
import LandingPage from './pages/LandingPage';
import DashboardOverview from './pages/DashboardOverview';
import DoctorPortal from './pages/DoctorPortal';
import PatientPortal from './pages/PatientPortal';
import LabPortal from './pages/LabPortal';
import PharmacyPortal from './pages/PharmacyPortal';
import HospitalAdminPortal from './pages/HospitalAdminPortal';
import SystemAdminPortal from './pages/SystemAdminPortal';

export default function App() {
  const isSupabaseConfigured = () => true;

  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('doctor');
  const [loginEmail, setLoginEmail] = useState('doctor@healthcare.gov');
  const [loginPassword, setLoginPassword] = useState('password');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeDashboardTab, setActiveDashboardTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hospital Clinicians & System Orgs States
  const [cliniciansList, setCliniciansList] = useState([
    { id: 1, name: 'Dr. Tariq Mahmood', role: 'Physician', dept: 'Cardiology', status: 'Active' },
    { id: 2, name: 'Dr. Bilal Qureshi', role: 'Administrator', dept: 'Operations', status: 'Active' },
    { id: 3, name: 'Sara Ahmed', role: 'Lab Specialist', dept: 'Pathology', status: 'Active' }
  ]);
  const [newClinician, setNewClinician] = useState({ name: '', role: 'Physician', dept: '' });

  const [orgsList, setOrgsList] = useState([
    { id: 1, name: 'City General Hospital', type: 'Hospital', location: 'Lahore', code: 'CGH-01', status: 'Active' },
    { id: 2, name: 'Apex Diagnostics Lab', type: 'Laboratory', location: 'Karachi', code: 'ADL-02', status: 'Active' },
    { id: 3, name: 'CareRx Pharmacy Network', type: 'Pharmacy', location: 'Islamabad', code: 'CRX-03', status: 'Active' }
  ]);
  const [newOrg, setNewOrg] = useState({ name: '', type: 'Hospital', location: '', code: '' });

  const [duplicatesList, setDuplicatesList] = useState([
    { id: 1, upi1: 'UPI-20260811-A89F11', name1: 'Zainab Malik', upi2: 'UPI-20260811-B22A14', name2: 'Zaynab M.', confidence: '94%', reason: 'Name similarity & matching DOB (1988-08-11)' }
  ]);

  // Request Demo Form States
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoForm, setDemoForm] = useState({
    fullName: '',
    email: '',
    organization: '',
    interest: 'doctor',
    message: ''
  });

  // Interactive System State for Live Portals
  const [searchUpi, setSearchUpi] = useState('UPI-20260811-A89F11');
  const [prescriptionStatus, setPrescriptionStatus] = useState('Pending Dispense');
  const [patientConsents, setPatientConsents] = useState({
    cityHospital: true,
    apexLab: true,
    carePharmacy: true
  });

  // Modules Filter & Search State
  const [moduleCategory, setModuleCategory] = useState('all');
  const [moduleQuery, setModuleQuery] = useState('');

  // Roadmap Active Quarter State
  const [activeQuarter, setActiveQuarter] = useState('all');

  // Clinical Encounters State (FR-05)
  const [encountersList, setEncountersList] = useState([
    { id: 1, date: '2026-08-11', facility: 'City General Hospital', type: 'Outpatient Clinic', provider: 'Dr. Tariq Mahmood', icd10: 'J45.909 Asthma Exacerbation', notes: 'Patient presented with mild wheezing. Prescribed Salbutamol 100mcg inhaler.' },
    { id: 2, date: '2026-07-24', facility: 'Apex Diagnostics Lab', type: 'Pathology Visit', provider: 'Sara Ahmed', icd10: 'E11.9 Type 2 Diabetes', notes: 'HbA1c blood test panel executed. Borderline high result 6.8%.' },
    { id: 3, date: '2026-06-15', facility: 'National Specialty Hospital', type: 'Cardiology Review', provider: 'Dr. Bilal Qureshi', icd10: 'I10 Essential Hypertension', notes: 'Blood pressure 135/85 mmHg. Continued low-sodium diet and exercise regimen.' }
  ]);

  const [newEncounter, setNewEncounter] = useState({
    visitType: 'Outpatient Clinic Visit',
    icd10: 'J45.909 Asthma Exacerbation',
    notes: ''
  });

  // Lab Results State (FR-09)
  const [labResultsList, setLabResultsList] = useState([
    { id: 1, testName: 'HbA1c Glycated Hemoglobin', upi: 'UPI-20260811-A89F11', result: '6.8 %', range: '4.0 - 5.6 %', status: 'Completed', lab: 'Apex Diagnostics', date: '2026-08-10' },
    { id: 2, testName: 'Complete Blood Count (CBC)', upi: 'UPI-20260811-A89F11', result: 'Normal (WBC: 6.2)', range: '4.5 - 11.0 10^3/uL', status: 'Completed', lab: 'Apex Diagnostics', date: '2026-08-08' },
    { id: 3, testName: 'Lipid Profile - Total Cholesterol', upi: 'UPI-20260811-A89F11', result: '195 mg/dL', range: '< 200 mg/dL', status: 'Completed', lab: 'Central Reference Lab', date: '2026-07-12' }
  ]);

  const [newLabEntry, setNewLabEntry] = useState({
    testName: 'Fasting Blood Glucose',
    result: '110 mg/dL',
    range: '70 - 99 mg/dL'
  });

  // HIPAA Audit Logs State (FR-21)
  const [auditLogsList, setAuditLogsList] = useState([
    { id: 101, timestamp: '2026-08-11 16:40:12', user: 'Dr. Tariq Mahmood (Doctor)', action: 'EHR Patient Record Read', upi: 'UPI-20260811-A89F11', facility: 'City General • 192.168.1.45', status: 'AUTHORIZED' },
    { id: 102, timestamp: '2026-08-11 15:22:05', user: 'Usman Farooq (Pharmacist)', action: 'E-Prescription Dispense', upi: 'UPI-20260811-A89F11', facility: 'CareRx Pharmacy • 10.0.4.12', status: 'AUTHORIZED' },
    { id: 103, timestamp: '2026-08-11 14:10:00', user: 'Sara Ahmed (Lab Specialist)', action: 'Lab Report Upload', upi: 'UPI-20260811-A89F11', facility: 'Apex Diagnostics • 172.16.0.8', status: 'AUTHORIZED' },
    { id: 104, timestamp: '2026-08-11 11:05:44', user: 'Dr. Bilal Qureshi (Admin)', action: 'User Permissions Audit', upi: 'SYSTEM-WIDE', facility: 'City Health HQ • 10.0.0.1', status: 'AUTHORIZED' }
  ]);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', org: '', message: '', submitted: false });

  const demoUsersMap = {
    doctor: { name: 'Dr. Tariq Mahmood', role: 'Doctor / Physician', email: 'doctor@healthcare.gov', org: 'City General Hospital', badgeBg: 'bg-emerald-100 text-emerald-800' },
    patient: { name: 'Zainab Malik', role: 'Patient Self-Service', email: 'patient@healthcare.gov', org: 'Patient Self-Service Portal', badgeBg: 'bg-blue-100 text-blue-800' },
    lab_staff: { name: 'Sara Ahmed', role: 'Lab Specialist', email: 'lab@healthcare.gov', org: 'Apex Diagnostics Lab', badgeBg: 'bg-purple-100 text-purple-800' },
    pharmacist: { name: 'Usman Farooq', role: 'Retail Pharmacist', email: 'pharmacy@healthcare.gov', org: 'CareRx Pharmacy Network', badgeBg: 'bg-teal-100 text-teal-800' },
    hospital_admin: { name: 'Dr. Bilal Qureshi', role: 'Hospital Administrator', email: 'hospadmin@healthcare.gov', org: 'City Health Network', badgeBg: 'bg-indigo-100 text-indigo-800' },
    sys_admin: { name: 'System Auditor', role: 'System Admin', email: 'admin@healthcare.gov', org: 'Central HIE Governance', badgeBg: 'bg-amber-100 text-amber-800' }
  };

  const handleRoleChange = (roleKey) => {
    setSelectedRole(roleKey);
    setLoginEmail(demoUsersMap[roleKey].email);
    setLoginPassword('password');
    setLoginError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    const emailTrimmed = loginEmail.trim().toLowerCase();
    const passTrimmed = loginPassword.trim();

    if (!emailTrimmed) {
      setLoginError('❌ Email Required: Please enter your business email address.');
      setIsLoggingIn(false);
      return;
    }

    if (!passTrimmed) {
      setLoginError('❌ Password Required: Please enter your account password.');
      setIsLoggingIn(false);
      return;
    }

    const demoEmails = Object.values(demoUsersMap).map(u => u.email.toLowerCase());
    const fallbackUser = demoUsersMap[selectedRole];

    try {
      // 1. Query user from Supabase users table
      let { data: dbUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', emailTrimmed)
        .maybeSingle();

      const isRecognizedEmail = dbUser || demoEmails.includes(emailTrimmed);

      if (!isRecognizedEmail) {
        setLoginError(`❌ Email Not Found: "${loginEmail}" is not registered in the database. Please select a valid role or enter a registered email.`);
        setIsLoggingIn(false);
        return;
      }

      // 2. Validate Password
      const expectedPassword = dbUser?.password || 'password';
      if (passTrimmed !== expectedPassword) {
        setLoginError(`❌ Incorrect Password: The password entered for "${loginEmail}" is incorrect. Please check your credentials.`);
        setIsLoggingIn(false);
        return;
      }

      // 3. Authenticate User
      const activeUser = dbUser ? {
        name: dbUser.name || fallbackUser.name,
        role: dbUser.role || fallbackUser.role,
        email: dbUser.email || loginEmail,
        org: dbUser.organization || fallbackUser.org,
        badgeBg: fallbackUser.badgeBg
      } : fallbackUser;

      setUser(activeUser);

      // Log audit event to Supabase
      await supabase.from('audit_logs').insert([{
        user_name: `${activeUser.name} (${activeUser.role})`,
        action: 'Database Auth Sign In Successful',
        upi: 'SYSTEM-AUTH',
        facility: activeUser.org
      }]);

      setShowLoginModal(false);
      setActiveTab('dashboard');
      setActiveDashboardTab('overview');
    } catch (err) {
      console.warn("Supabase auth integration fallback:", err);
      if (passTrimmed !== 'password') {
        setLoginError(`❌ Incorrect Password: The password entered for "${loginEmail}" is incorrect.`);
        setIsLoggingIn(false);
        return;
      }
      setUser(fallbackUser);
      setShowLoginModal(false);
      setActiveTab('dashboard');
      setActiveDashboardTab('overview');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  // Auto-seed all 6 role accounts into Supabase database on app startup
  useEffect(() => {
    const seedDemoUsers = async () => {
      try {
        const usersToSeed = [
          { name: 'Dr. Tariq Mahmood', email: 'doctor@healthcare.gov', password: 'password', role: 'Doctor / Physician', organization: 'City General Hospital' },
          { name: 'Zainab Malik', email: 'patient@healthcare.gov', password: 'password', role: 'Patient Self-Service', organization: 'Patient Self-Service Portal' },
          { name: 'Sara Ahmed', email: 'lab@healthcare.gov', password: 'password', role: 'Lab Specialist', organization: 'Apex Diagnostics Lab' },
          { name: 'Usman Farooq', email: 'pharmacy@healthcare.gov', password: 'password', role: 'Retail Pharmacist', organization: 'CareRx Pharmacy Network' },
          { name: 'Dr. Bilal Qureshi', email: 'hospadmin@healthcare.gov', password: 'password', role: 'Hospital Administrator', organization: 'City Health Network' },
          { name: 'System Auditor', email: 'admin@healthcare.gov', password: 'password', role: 'System Admin', organization: 'Central HIE Governance' }
        ];

        for (const u of usersToSeed) {
          const { data: existing } = await supabase.from('users').select('id').eq('email', u.email).maybeSingle();
          if (!existing) {
            await supabase.from('users').insert([u]);
          }
        }
      } catch (err) {
        console.warn("Supabase user seeder notice:", err);
      }
    };

    seedDemoUsers();
  }, []);

  // Dynamic Full Data Fetching Effect from Supabase Database
  useEffect(() => {
    const loadPlatformData = async () => {
      try {
        // A. Seed Healthcare Organizations if empty
        const { data: orgCheck } = await supabase.from('healthcare_organizations').select('id').limit(1);
        if (!orgCheck || orgCheck.length === 0) {
          await supabase.from('healthcare_organizations').insert([
            { name: 'City General Hospital', type: 'Hospital', city: 'Lahore', org_code: 'CGH-01', status: 'Active' },
            { name: 'Apex Diagnostics Lab', type: 'Laboratory', city: 'Karachi', org_code: 'ADL-02', status: 'Active' },
            { name: 'CareRx Pharmacy Network', type: 'Pharmacy', city: 'Islamabad', org_code: 'CRX-03', status: 'Active' }
          ]);
        }

        // B. Seed Patient Profile if empty
        let { data: patient } = await supabase.from('patient_profiles').select('*').eq('upi', searchUpi).maybeSingle();
        if (!patient) {
          const { data: newPat } = await supabase.from('patient_profiles').insert([{
            upi: searchUpi,
            first_name: 'Zainab',
            last_name: 'Malik',
            national_id: '35202-9182341-2',
            dob: '1988-08-11',
            gender: 'Female',
            blood_group: 'O+'
          }]).select().maybeSingle();
          if (newPat) patient = newPat;
        }

        // C. Seed Visits, Labs, Prescriptions if empty
        if (patient) {
          const { data: visitCheck } = await supabase.from('clinical_visits').select('id').eq('patient_id', patient.id).limit(1);
          if (!visitCheck || visitCheck.length === 0) {
            await supabase.from('clinical_visits').insert([
              { patient_id: patient.id, visit_date: new Date().toISOString(), visit_type: 'Outpatient Consultation', reason_for_visit: 'J45.909 Asthma Exacerbation', clinical_notes: 'Patient reports shortness of breath. Salbutamol inhaler prescribed. Spirometry scheduled.' },
              { patient_id: patient.id, visit_date: new Date(Date.now() - 864000000).toISOString(), visit_type: 'Inpatient Progress Note', reason_for_visit: 'E11.9 Type 2 Diabetes', clinical_notes: 'Blood glucose monitoring. HbA1c test requested. Diet advice provided.' }
            ]);
          }

          const { data: labCheck } = await supabase.from('lab_reports').select('id').eq('patient_id', patient.id).limit(1);
          if (!labCheck || labCheck.length === 0) {
            await supabase.from('lab_reports').insert([
              { patient_id: patient.id, test_name: 'HbA1c Glycated Hemoglobin', result_value: '6.8 %', reference_range: '4.0 - 5.6 %', report_status: 'Completed' },
              { patient_id: patient.id, test_name: 'Complete Blood Count (CBC)', result_value: '13.5 g/dL', reference_range: '12.0 - 15.5 g/dL', report_status: 'Completed' }
            ]);
          }

          const { data: rxCheck } = await supabase.from('prescriptions').select('id').eq('patient_id', patient.id).limit(1);
          if (!rxCheck || rxCheck.length === 0) {
            await supabase.from('prescriptions').insert([
              { patient_id: patient.id, prescription_code: 'RX-2026-991', medication_name: 'Salbutamol Inhaler 100mcg', dosage: '2 puffs q4-6h PRN', instructions: 'Use when feeling dyspnea', dispense_status: 'Pending' },
              { patient_id: patient.id, prescription_code: 'RX-2026-982', medication_name: 'Metformin 500mg', dosage: '1 tablet BD after meals', instructions: 'Take with food', dispense_status: 'Dispensed' }
            ]);
          }
        }

        // 1. Fetch Audit Logs from Supabase DB
        const { data: dbLogs } = await supabase
          .from('audit_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);

        if (dbLogs && dbLogs.length > 0) {
          setAuditLogsList(dbLogs.map(l => ({
            id: l.id,
            timestamp: (l.created_at || '').replace('T', ' ').substring(0, 19),
            user: l.user_name || 'System User',
            action: l.action || 'EHR Access',
            upi: l.upi || searchUpi,
            facility: l.facility || 'City Health Network',
            status: 'AUTHORIZED'
          })));
        }

        // 2. Fetch Organizations from Supabase DB
        const { data: dbOrgs } = await supabase
          .from('healthcare_organizations')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbOrgs && dbOrgs.length > 0) {
          setOrgsList(dbOrgs.map(o => ({
            id: o.id,
            name: o.name,
            type: o.type,
            location: o.city || 'Lahore',
            code: o.org_code,
            status: o.status || 'Active'
          })));
        }

        // 3. Fetch Clinicians / Users from Supabase DB
        const { data: dbUsers } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbUsers && dbUsers.length > 0) {
          setCliniciansList(dbUsers.map(u => ({
            id: u.id,
            name: u.name,
            role: u.role,
            dept: u.organization || 'General Medicine',
            status: 'Active'
          })));
        }

        // 4. Fetch Patient Visits & Lab Reports from Supabase DB
        if (patient) {
          const { data: visits } = await supabase
            .from('clinical_visits')
            .select('*')
            .eq('patient_id', patient.id)
            .order('visit_date', { ascending: false });

          if (visits && visits.length > 0) {
            setEncountersList(visits.map(v => ({
              id: v.id,
              date: (v.visit_date || '').split('T')[0],
              facility: user?.org || 'City General Hospital',
              type: v.visit_type || 'Outpatient Clinic',
              provider: user?.name || 'Dr. Tariq Mahmood',
              icd10: v.reason_for_visit || 'J45.909 Asthma',
              notes: v.clinical_notes || ''
            })));
          }

          const { data: labs } = await supabase
            .from('lab_reports')
            .select('*')
            .eq('patient_id', patient.id)
            .order('created_at', { ascending: false });

          if (labs && labs.length > 0) {
            setLabResultsList(labs.map(l => ({
              id: l.id,
              testName: l.test_name,
              upi: searchUpi,
              result: l.result_value,
              range: l.reference_range,
              status: l.report_status || 'Completed',
              lab: user?.org || 'Apex Diagnostics',
              date: (l.created_at || '').split('T')[0]
            })));
          }
        }
      } catch (e) {
        console.warn("Supabase platform data load notice:", e);
      }
    };

    loadPlatformData();
  }, [searchUpi, activeTab, user]);

  const handleAddEncounter = async (e) => {
    e.preventDefault();
    if (!newEncounter.notes.trim()) return;

    const entry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      facility: user?.org || 'City General Hospital',
      type: newEncounter.visitType,
      provider: user?.name || 'Dr. Tariq Mahmood',
      icd10: newEncounter.icd10,
      notes: newEncounter.notes
    };

    setEncountersList([entry, ...encountersList]);
    setNewEncounter({ visitType: 'Outpatient Clinic Visit', icd10: 'J45.909 Asthma Exacerbation', notes: '' });

    const auditEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: `${user?.name || 'Dr. Tariq Mahmood'} (${user?.role || 'Doctor'})`,
      action: 'Encounter Record Added',
      upi: searchUpi,
      facility: `${user?.org || 'City General'} • HIE Network`,
      status: 'AUTHORIZED'
    };
    setAuditLogsList([auditEntry, ...auditLogsList]);

    try {
      let { data: patient } = await supabase
        .from('patient_profiles')
        .select('id')
        .eq('upi', searchUpi)
        .maybeSingle();

      if (!patient) {
        const { data: newPat } = await supabase
          .from('patient_profiles')
          .insert([{
            upi: searchUpi,
            first_name: 'Zainab',
            last_name: 'Malik',
            national_id: '35202-9182341-' + Math.floor(Math.random() * 100),
            dob: '1988-08-11',
            gender: 'Female',
            blood_group: 'O+'
          }])
          .select()
          .single();
        patient = newPat;
      }

      if (patient) {
        await supabase
          .from('clinical_visits')
          .insert([{
            patient_id: patient.id,
            visit_date: new Date().toISOString(),
            visit_type: newEncounter.visitType,
            reason_for_visit: newEncounter.icd10,
            clinical_notes: newEncounter.notes
          }]);
      }

      await supabase.from('audit_logs').insert([{
        user_name: `${user?.name || 'Dr. Tariq Mahmood'} (${user?.role || 'Doctor'})`,
        action: 'Encounter Record Added',
        upi: searchUpi,
        facility: user?.org || 'City General'
      }]);
    } catch (err) {
      console.warn("Insert encounter notice:", err);
    }
    alert('New Clinical Encounter logged successfully in Central HIE Registry!');
  };

  const handleAddLabResult = async (e) => {
    e.preventDefault();
    if (!newLabEntry.testName.trim()) return;

    const entry = {
      id: Date.now(),
      testName: newLabEntry.testName,
      upi: searchUpi,
      result: newLabEntry.result,
      range: newLabEntry.range,
      status: 'Completed',
      lab: user?.org || 'Apex Diagnostics',
      date: new Date().toISOString().split('T')[0]
    };

    setLabResultsList([entry, ...labResultsList]);
    setNewLabEntry({ testName: '', result: '', range: '' });

    const auditEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: `${user?.name || 'Sara Ahmed'} (${user?.role || 'Lab Specialist'})`,
      action: 'Lab Result Uploaded',
      upi: searchUpi,
      facility: `${user?.org || 'Apex Diagnostics'} • HIE Network`,
      status: 'AUTHORIZED'
    };
    setAuditLogsList([auditEntry, ...auditLogsList]);

    try {
      let { data: patient } = await supabase
        .from('patient_profiles')
        .select('id')
        .eq('upi', searchUpi)
        .maybeSingle();

      if (patient) {
        await supabase
          .from('lab_reports')
          .insert([{
            patient_id: patient.id,
            test_name: newLabEntry.testName,
            result_value: newLabEntry.result,
            reference_range: newLabEntry.range,
            report_status: 'Completed'
          }]);
      }

      await supabase.from('audit_logs').insert([{
        user_name: `${user?.name || 'Sara Ahmed'} (${user?.role || 'Lab Specialist'})`,
        action: 'Lab Result Uploaded',
        upi: searchUpi,
        facility: user?.org || 'Apex Diagnostics'
      }]);
    } catch (err) {
      console.warn("Insert lab report notice:", err);
    }
    alert('Laboratory result uploaded successfully in Central HIE Registry!');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactForm(prev => ({ ...prev, submitted: true }));
  };

  const toggleConsent = (key) => {
    setPatientConsents(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Full Functional Capabilities Data Array
  const allModulesData = [
    { code: 'Feature 01', cat: 'identity', name: 'Patient Demographic Registration', desc: 'Captures full legal name, date of birth, gender, home address, emergency contacts, national CNIC identifier, and demographic metadata.' },
    { code: 'Feature 02', cat: 'identity', name: 'Universal Patient Identifier (UPI) Generator', desc: 'Generates immutable 16-character checksum UPI identifiers to link patient records across disconnected hospital databases.' },
    { code: 'Feature 03', cat: 'clinical', name: 'Patient Record Master Management', desc: 'Aggregates personal medical histories, chronic diagnoses, drug allergies, surgeries, and family medical lineage into a unified view.' },
    { code: 'Feature 04', cat: 'clinical', name: 'Chronological Encounter Timeline', desc: 'Indexes all inpatient, outpatient, and emergency room encounters in real-time, sorted chronologically with attending physician signatures.' },
    { code: 'Feature 05', cat: 'clinical', name: 'Clinical Visit Notes & Observations Logger', desc: 'Enables licensed physicians to document symptoms, vital signs, physical examination notes, and treatment progress.' },
    { code: 'Feature 06', cat: 'clinical', name: 'ICD-10 Standardized Diagnosis Coding', desc: 'Provides auto-complete lookup for WHO ICD-10 medical coding standards to record official diagnostic codes.' },
    { code: 'Feature 07', cat: 'pharmacy', name: 'Active Medication & Prescription Manager', desc: 'Maintains active medication regimens, dosages, administration routes, prescribing doctor details, and refill schedules.' },
    { code: 'Feature 08', cat: 'pharmacy', name: 'Drug Allergy Anaphylaxis Collision Warning', desc: 'Automated safety banner alerting clinicians and pharmacists to severe drug-drug interactions and known patient allergies.' },
    { code: 'Feature 09', cat: 'lab', name: 'Diagnostic Laboratory Records Exchange', desc: 'Receives pathology and biochemistry test results with LOINC standardization, normal reference ranges, and critical status flags.' },
    { code: 'Feature 10', cat: 'lab', name: 'Pathology & Diagnostic Report Attachment', desc: 'Stores PDF diagnostic reports and high-resolution imaging assets linked directly to the patient UPI record.' },
    { code: 'Feature 11', cat: 'pharmacy', name: 'Retail Pharmacy E-Prescription Dispatch', desc: 'Transmits digital prescriptions to retail pharmacy networks with automated dispensing verification status.' },
    { code: 'Feature 12', cat: 'consent', name: 'Patient Self-Service Access Portal', desc: 'Enables patients to view complete medical histories, active medications, lab reports, and facility access permissions.' },
    { code: 'Feature 17', cat: 'consent', name: 'Consent Policy Governance Engine', desc: 'Enforces patient-configured data sharing policies across participating hospital networks and diagnostic labs.' },
    { code: 'Feature 18', cat: 'consent', name: 'Facility Access Consent Toggles', desc: 'Granular controls allowing patients to Grant or Revoke record viewing permissions for specific healthcare facilities.' },
    { code: 'Feature 19', cat: 'security', name: 'Role-Based Access Control (RBAC)', desc: 'Strict permission matrix restricting system feature access based on verified user roles (Doctor, Patient, Lab, Pharmacy, Admin).' },
    { code: 'Feature 20', cat: 'security', name: 'Multi-Factor Authentication (MFA)', desc: 'Mandatory two-factor authentication for healthcare providers accessing sensitive Electronic Health Records (EHR).' },
    { code: 'Feature 21', cat: 'security', name: 'HIPAA Immutable Access Audit Trail', desc: 'Logs user ID, action type, patient UPI, timestamp, facility name, and IP address for every EHR access event.' },
    { code: 'Feature 24', cat: 'identity', name: 'Duplicate Record Resolution Engine', desc: 'Advanced fuzzy-matching algorithm identifying duplicate patient records created under alternate spelling variations.' }
  ];

  const filteredModules = useMemo(() => {
    return allModulesData.filter(item => {
      const matchesCat = moduleCategory === 'all' || item.cat === moduleCategory;
      const matchesQuery = item.name.toLowerCase().includes(moduleQuery.toLowerCase()) || 
                           item.desc.toLowerCase().includes(moduleQuery.toLowerCase()) ||
                           item.code.toLowerCase().includes(moduleQuery.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [moduleCategory, moduleQuery]);

  return (
    <div className="w-full min-h-screen bg-white text-slate-600 font-sans antialiased selection:bg-[#009953] selection:text-white">
      
      {/* ═══════════════ NAVIGATION HEADER & PUBLIC PAGES ═══════════════ */}
      {(activeTab !== 'dashboard' || !user) && (
        <>
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            user={user}
            handleLogout={handleLogout}
            setShowLoginModal={setShowLoginModal}
            setShowDemoModal={setShowDemoModal}
          />
          <div className="h-16"></div>
          <LandingPage
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setShowLoginModal={setShowLoginModal}
            setShowDemoModal={setShowDemoModal}
            handleRoleChange={handleRoleChange}
            moduleCategory={moduleCategory}
            setModuleCategory={setModuleCategory}
            moduleQuery={moduleQuery}
            setModuleQuery={setModuleQuery}
            filteredModules={filteredModules}
            activeQuarter={activeQuarter}
            setActiveQuarter={setActiveQuarter}
            contactForm={contactForm}
            setContactForm={setContactForm}
            handleContactSubmit={handleContactSubmit}
          />
        </>
      )}

      {/* ═══════════════ PORTAL DASHBOARD WORKSPACE ═══════════════ */}
      {activeTab === 'dashboard' && user && (
        <div className="flex h-screen overflow-hidden bg-[#f0f2f5] font-sans antialiased text-slate-800">
          {/* Left Navigation Sidebar */}
          <Sidebar
            user={user}
            activeDashboardTab={activeDashboardTab}
            setActiveDashboardTab={setActiveDashboardTab}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />

          {/* Right Main Panel */}
          <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
            {/* Admin Top Bar */}
            <TopBar
              user={user}
              activeDashboardTab={activeDashboardTab}
              isSupabaseConfigured={isSupabaseConfigured}
              handleLogout={handleLogout}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />

            {/* Content Canvas */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#f0f2f5]">
              {activeDashboardTab === 'overview' && (
                <DashboardOverview
                  user={user}
                  encountersList={encountersList}
                  labResultsList={labResultsList}
                  auditLogsList={auditLogsList}
                  isSupabaseConfigured={isSupabaseConfigured}
                />
              )}

              {/* Render Doctor Portal modules */}
              {(user.role === 'Doctor / Physician' || user.role === 'System Admin' || user.role === 'Hospital Administrator' || ['search_patients', 'encounters', 'vitals', 'prescriptions', 'icd10', 'referrals', 'patient_history'].includes(activeDashboardTab)) && activeDashboardTab !== 'overview' && ['search_patients', 'encounters', 'vitals', 'prescriptions', 'icd10', 'referrals', 'patient_history'].includes(activeDashboardTab) && (
                <DoctorPortal
                  activeDashboardTab={activeDashboardTab}
                  searchUpi={searchUpi}
                  setSearchUpi={setSearchUpi}
                  encountersList={encountersList}
                  newEncounter={newEncounter}
                  setNewEncounter={setNewEncounter}
                  handleAddEncounter={handleAddEncounter}
                  prescriptionStatus={prescriptionStatus}
                  setPrescriptionStatus={setPrescriptionStatus}
                />
              )}

              {/* Render Patient Portal modules */}
              {(user.role === 'Patient Self-Service' || (user.role === 'System Admin' && ['patient_360', 'timeline', 'medications', 'consent', 'appointments'].includes(activeDashboardTab))) && activeDashboardTab !== 'overview' && (
                <PatientPortal
                  activeDashboardTab={activeDashboardTab}
                  searchUpi={searchUpi}
                  encountersList={encountersList}
                  labResultsList={labResultsList}
                  patientConsents={patientConsents}
                  toggleConsent={toggleConsent}
                />
              )}

              {/* Render Lab Portal modules */}
              {(user.role === 'Lab Specialist' || user.role === 'System Admin' || user.role === 'Hospital Administrator' || ['pending_tests', 'biochemistry', 'loinc'].includes(activeDashboardTab) || (activeDashboardTab === 'lab_reports' && user.role !== 'Patient Self-Service')) && activeDashboardTab !== 'overview' && ['pending_tests', 'lab_reports', 'biochemistry', 'loinc'].includes(activeDashboardTab) && user.role !== 'Patient Self-Service' && (
                <LabPortal
                  activeDashboardTab={activeDashboardTab}
                  newLabEntry={newLabEntry}
                  setNewLabEntry={setNewLabEntry}
                  handleAddLabResult={handleAddLabResult}
                  labResultsList={labResultsList}
                  searchUpi={searchUpi}
                />
              )}

              {/* Render Pharmacy Portal modules */}
              {(user.role === 'Retail Pharmacist' || user.role === 'System Admin' || user.role === 'Hospital Administrator' || ['pharmacy', 'pos', 'inventory', 'allergies', 'billing', 'drug_catalog'].includes(activeDashboardTab)) && activeDashboardTab !== 'overview' && ['pharmacy', 'pos', 'inventory', 'allergies', 'billing', 'drug_catalog'].includes(activeDashboardTab) && (
                <PharmacyPortal
                  activeDashboardTab={activeDashboardTab}
                  prescriptionStatus={prescriptionStatus}
                  setPrescriptionStatus={setPrescriptionStatus}
                />
              )}

              {/* Render Hospital Admin Portal modules */}
              {(user.role === 'Hospital Administrator' || user.role === 'System Admin' || ['clinicians', 'departments', 'bed_management'].includes(activeDashboardTab)) && activeDashboardTab !== 'overview' && ['clinicians', 'departments', 'bed_management'].includes(activeDashboardTab) && (
                <HospitalAdminPortal
                  activeDashboardTab={activeDashboardTab}
                  cliniciansList={cliniciansList}
                  setCliniciansList={setCliniciansList}
                  newClinician={newClinician}
                  setNewClinician={setNewClinician}
                  auditLogsList={auditLogsList}
                />
              )}

              {/* Render System Admin Portal modules */}
              {(user.role === 'System Admin' || user.role === 'Hospital Administrator' || ['orgs', 'deduplication', 'integrations', 'audit'].includes(activeDashboardTab)) && activeDashboardTab !== 'overview' && ['orgs', 'deduplication', 'integrations', 'audit'].includes(activeDashboardTab) && (
                <SystemAdminPortal
                  activeDashboardTab={activeDashboardTab}
                  orgsList={orgsList}
                  setOrgsList={setOrgsList}
                  newOrg={newOrg}
                  setNewOrg={setNewOrg}
                  duplicatesList={duplicatesList}
                  setDuplicatesList={setDuplicatesList}
                  auditLogsList={auditLogsList}
                />
              )}
            </main>
          </div>
        </div>
      )}

      {/* ═══════════════ AUTH SIGN IN MODAL ═══════════════ */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#001F66]">Software Sign In</h2>
              <button onClick={() => setShowLoginModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-lg">
                ⚠ {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Select System Role</label>
                <select value={selectedRole} onChange={(e) => handleRoleChange(e.target.value)} className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 outline-none cursor-pointer">
                  <option value="doctor">Doctor / Clinical Provider</option>
                  <option value="patient">Patient Self-Service</option>
                  <option value="lab_staff">Laboratory Specialist</option>
                  <option value="pharmacist">Retail Pharmacist</option>
                  <option value="hospital_admin">Hospital Administrator</option>
                  <option value="sys_admin">System Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Email Address</label>
                <input type="email" value={loginEmail} onChange={(e) => { setLoginEmail(e.target.value); setLoginError(''); }} required className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-[#009953]" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Password</label>
                <input type="password" value={loginPassword} onChange={(e) => { setLoginPassword(e.target.value); setLoginError(''); }} required className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-[#009953]" placeholder="Enter password..." />
              </div>

              <button type="submit" disabled={isLoggingIn} className="w-full bg-[#001F66] text-white hover:bg-[#009953] py-3.5 rounded-full font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50">
                <LogIn className="w-4 h-4" /> {isLoggingIn ? 'Authenticating...' : 'Sign In to Proceed to Dashboard'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════ REQUEST DEMO MODAL ═══════════════ */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 space-y-6 shadow-2xl border border-slate-200 relative">
            <button onClick={() => { setShowDemoModal(false); setDemoSubmitted(false); }} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            
            {demoSubmitted ? (
              <div className="text-center space-y-4 py-6">
                <div className="w-16 h-16 bg-emerald-100 text-[#009953] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-[#001F66]">Demo Request Submitted</h2>
                <p className="text-sm text-slate-500 leading-relaxed font-manrope">
                  Thank you for your interest in InteropHealth. Your request has been logged successfully in our system integration registry. Our technical deployment team will contact you at <strong>{demoForm.email}</strong> shortly.
                </p>
                <button onClick={() => { setShowDemoModal(false); setDemoSubmitted(false); }} className="bg-[#001F66] text-white hover:bg-[#009953] px-6 py-2.5 rounded-full text-xs font-bold transition-all">
                  Close Window
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-[#001F66]">Request Platform Demo</h2>
                  <p className="text-xs text-slate-500 font-manrope">Provide details below to schedule an integration demonstration.</p>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  setDemoSubmitted(true);
                  // Log audit trail
                  const auditEntry = {
                    id: Date.now(),
                    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                    user: `${demoForm.fullName || 'Guest'} (Public Request)`,
                    action: 'HIE Demo Requested',
                    upi: 'PUBLIC-ACCESS',
                    facility: `${demoForm.organization || 'Independent'} • Web Entry`,
                    status: 'AUTHORIZED'
                  };
                  setAuditLogsList([auditEntry, ...auditLogsList]);
                }} className="space-y-4 font-manrope">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Full Name</label>
                    <input type="text" required value={demoForm.fullName} onChange={(e) => setDemoForm({...demoForm, fullName: e.target.value})} placeholder="e.g. Zain Malik" className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm font-medium outline-none" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Business Email</label>
                    <input type="email" required value={demoForm.email} onChange={(e) => setDemoForm({...demoForm, email: e.target.value})} placeholder="e.g. zmalik@hospital.org" className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm font-medium outline-none" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Organization Name</label>
                    <input type="text" required value={demoForm.organization} onChange={(e) => setDemoForm({...demoForm, organization: e.target.value})} placeholder="e.g. City General Health Network" className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm font-medium outline-none" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">System Role of Interest</label>
                    <select value={demoForm.interest} onChange={(e) => setDemoForm({...demoForm, interest: e.target.value})} className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 outline-none cursor-pointer">
                      <option value="doctor">Doctor / Physician Portal</option>
                      <option value="patient">Patient Self-Service EHR</option>
                      <option value="lab_staff">Diagnostic Lab Exchange</option>
                      <option value="pharmacist">Retail Pharmacy Safety Portal</option>
                      <option value="hospital_admin">Hospital Administrator Console</option>
                      <option value="sys_admin">System Governance Auditor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Additional Notes</label>
                    <textarea rows="2" value={demoForm.message} onChange={(e) => setDemoForm({...demoForm, message: e.target.value})} placeholder="Describe your EHR or lab integration requirements..." className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-xs font-medium outline-none"></textarea>
                  </div>

                  <button type="submit" className="w-full bg-[#001F66] text-white hover:bg-[#009953] py-3.5 rounded-full font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all">
                    Submit Demo Request
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════ FOOTER ═══════════════ */}
      {(activeTab !== 'dashboard' || !user) && (
        <footer className="bg-[#001F66] text-white border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14 font-manrope">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#009953] text-white flex items-center justify-center font-bold text-sm">HC</div>
                  <span className="font-extrabold text-base text-white tracking-wider uppercase">InteropHealth</span>
                </div>
                <p className="text-slate-300 text-xs font-medium leading-relaxed">
                  Unified Health Information Exchange platform connecting hospitals, laboratories, pharmacies, and patients through cloud-native interoperability.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#009953] mb-4 font-semibold">Capabilities</h4>
                <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
                  <li><button onClick={() => setActiveTab('modules')} className="hover:text-white transition-colors">Functional System Scope</button></li>
                  <li><button onClick={() => setActiveTab('pathway')} className="hover:text-white transition-colors">Security & Audit Compliance</button></li>
                  <li><button onClick={() => setActiveTab('solutions')} className="hover:text-white transition-colors">6 System User Roles</button></li>
                  <li><button onClick={() => setShowLoginModal(true)} className="hover:text-white transition-colors">Live Software Demo</button></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#009953] mb-4 font-semibold">Organization</h4>
                <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
                  <li><button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">Problem Statement</button></li>
                  <li><button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">Project Objectives</button></li>
                  <li><span className="cursor-default">Privacy Policy</span></li>
                  <li><span className="cursor-default">Terms of Service</span></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#009953] mb-4 font-semibold">Contact</h4>
                <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
                  <li className="flex items-center gap-2">contact@interophealth.co</li>
                  <li className="flex items-center gap-2">+92 (42) 3576-8900</li>
                  <li className="flex items-center gap-2">Lahore, Pakistan</li>
                  <li className="flex items-center gap-2">Mon–Fri, 9AM – 6PM PKT</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 font-manrope">
              <p className="text-xs text-slate-400 font-medium">&copy; 2026 InteropHealth Co. All rights reserved.</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                <span>Enterprise HIE Cloud</span>
                <span className="text-slate-500 font-bold">•</span>
                <span>HIPAA Compliant</span>
                <span className="text-slate-500 font-bold">•</span>
                <span>Cloud-Native Architecture</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
