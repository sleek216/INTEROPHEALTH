# InteropHealth Co. — Unified Health Information Exchange (HIE) & Interoperability Platform

![InteropHealth Banner](public/hero_doctor.png)

## 📌 Executive Summary
**InteropHealth** is an enterprise-grade, cloud-native Health Information Exchange (HIE) platform designed to eliminate clinical data fragmentation across healthcare ecosystems. By seamlessly bridging hospital networks, outpatient clinics, diagnostic laboratories, retail pharmacies, and patient self-service portals, InteropHealth creates a synchronized, single source of truth for Electronic Health Records (EHR).

The system features real-time patient identity resolution via Universal Patient Identifiers (UPI), automated drug-allergy collision detection, LOINC-standard pathology result processing, WHO ICD-10 diagnostic coding, and HIPAA-certified immutable access audit governance.

---

## 🏗️ Technical Architecture & Interoperability Standards

InteropHealth is built on modern Web standards and healthcare data protocols:

| Layer / Domain | Standards & Technologies Applied | Operational Description |
|---|---|---|
| **Core Frontend** | React 19, Vite 8, Tailwind CSS | Modular component layout with mobile-responsive drawer navigation and zero-latency UI rendering. |
| **Backend & Database** | Supabase Cloud PostgreSQL, REST APIs | Real-time database persistence, row-level security policies, and live event triggers. |
| **Clinical Interoperability** | HL7 FHIR Release 4 (R4) | Standardized schemas for `Patient`, `Encounter`, `Condition`, `Observation`, and `MedicationRequest`. |
| **Laboratory Standard** | LOINC (Logical Observation Identifiers) | Unified mapping for pathology blood biochemistry, hematology, and microbiology reference ranges. |
| **Medical Coding** | WHO ICD-10 Classification | Standardized diagnostic coding for outpatient visits and inpatient progress notes. |
| **Security & Privacy** | HIPAA Title II Compliance, AES-256, TLS 1.3 | Immutable audit trail logging, session timeouts, and role-based access controls. |

---

## 👥 Role-Based Access Control (RBAC) Matrix

InteropHealth enforces granular, role-based security boundaries across 6 discrete healthcare operating personas:

| User Role | System Scope & Operating Permissions | Key Workflows |
|---|---|---|
| 👨‍⚕️ **Doctor / Physician** | Clinical EHR Search, Visit Logging, Vitals, E-Prescriptions, Specialist Referrals | Document patient encounters, inspect allergy alerts, prescribe medications |
| 🙋‍♀️ **Patient Self-Service** | Personal UPI Health Timeline, Lab Results, Active Medications, Consent Controls | View personal EHR 360, inspect lab reports, manage provider access consent |
| 🧪 **Lab Specialist** | Pending Test Queue, LOINC Code Directory, Biochemistry & Pathology Results Upload | Process diagnostic orders, upload LOINC blood reports, flag panic values |
| 💊 **Retail Pharmacist** | E-Prescription Dispense, Point of Sale (POS), Allergy Collision Interceptor, Drug Catalog | Retrieve digital prescriptions, run anaphylaxis collision safety checks, checkout orders |
| 🏥 **Hospital Administrator** | Clinical Staff Management, Ward & Department Registry, Inpatient Bed Management | Onboard physicians & lab staff, assign department roles, manage hospital bed occupancy |
| 🛡️ **System Administrator** | **Super-Admin 100% Full Access** across all sub-portals, Duplicate UPI Resolver, Audit Logs | Audit HIPAA compliance, resolve duplicate UPI records, manage HL7 integrations |

---

## ⚡ Core Functional Modules Scope

### 1. 🆔 Universal Patient Identifier (UPI) & Deduplication Engine (FR-24)
- Assigns a unique global checksum UPI (e.g. `UPI-20260811-A89F11`) based on national ID algorithms.
- **Fuzzy-Matching Resolver**: Identifies duplicate patient records created under spelling variations or alternate CNIC formats with confidence scoring (e.g. 94% match confidence).

### 2. 🩺 Clinical Visit Logger & EHR 360° Profile
- Aggregates outpatient consultations, emergency admissions, telehealth notes, and inpatient progress notes into a single chronological timeline.
- Enforces WHO ICD-10 diagnostic coding for chronic disease tracking (e.g. Asthma `J45.909`, Type 2 Diabetes `E11.9`).

### 3. 🧪 LOINC Pathology & Biochemistry Lab Engine
- Processes diagnostic orders across hematology, biochemistry, and microbiology.
- Standardizes lab report formatting with upper/lower reference ranges and automated panic value highlighting.

### 4. ⚠️ Drug Allergy Collision Interceptor (Anaphylaxis Prevention)
- Cross-references incoming e-prescriptions against the patient's registered allergen profile.
- Displays immediate warning banners if a prescribed drug collides with patient allergies (e.g. Penicillin V Potassium anaphylaxis warning).

### 5. 💳 Retail Pharmacy Point of Sale (POS) & Drug Inventory
- Real-time prescription verification and digital dispensation.
- POS cart checkout system with automated inventory stock deduction and low-stock replenishment alerts.

### 6. 🛡️ HIPAA Immutable Access Audit Inspector (FR-21)
- Records an unalterable log entry for every EHR view, edit, prescription write, or login event.
- Logs User Name, Role, Action Type, Patient UPI, Facility Location, IP Address, and Timestamp.

---

## 🛠️ Local Development & Vercel Deployment Setup

### 1. Local Prerequisites
- Node.js `v20.x` or higher
- npm `v10.x` or higher

### 2. Local Installation Commands
```bash
# Clone the repository
git clone https://github.com/sleek216/INTEROPHEALTH.git
cd INTEROPHEALTH

# Install dependencies
npm install

# Start local development server
npm run dev
```
Open **`http://127.0.0.1:3000/`** in your browser.

---

## 📄 License & Organization
Developed for enterprise healthcare information exchange governance.  
© 2026 **InteropHealth Co.** — All Rights Reserved.
