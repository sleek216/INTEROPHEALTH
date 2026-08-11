import React, { useState } from 'react';
import {
  AlertTriangle, CheckCircle2, ScanLine, Package, ShoppingCart,
  BadgeDollarSign, Pill, Search, Plus, Printer, FileText,
  TrendingDown, AlertCircle, Clock, DollarSign, Users, 
  RefreshCw, ChevronRight, X, Check, Info, CreditCard, Barcode
} from 'lucide-react';

const STAT = ({ label, value, sub, color = 'text-[#001F66]', badge }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</span>
    <div className={`text-3xl font-extrabold font-manrope ${color}`}>{value}</div>
    {badge && <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{badge}</span>}
    {sub && <span className="text-[10px] text-slate-400 font-medium block">{sub}</span>}
  </div>
);

const TAG = ({ children, color = 'bg-slate-100 text-slate-600' }) => (
  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${color}`}>{children}</span>
);

// ──────────────────────────────────────────────
// DISPENSE DESK
// ──────────────────────────────────────────────
function DispenseDesk({ prescriptionStatus, setPrescriptionStatus }) {
  const [rxCode, setRxCode] = useState('RX-2026-991');
  const [dispensed, setDispensed] = useState(false);

  const prescriptions = [
    { code: 'RX-2026-991', patient: 'Zainab Malik', upi: 'UPI-20260811-A89F11', drug: 'Salbutamol Inhaler 100mcg', dosage: '2 puffs q4-6h PRN', doctor: 'Dr. Tariq Mahmood', issued: '2026-08-11', status: 'Pending', allergy: true },
    { code: 'RX-2026-982', patient: 'Ahmad Raza', upi: 'UPI-20260811-C11D33', drug: 'Metformin 500mg', dosage: '1 tablet BD after meals', doctor: 'Dr. Sara Hassan', issued: '2026-08-10', status: 'Pending', allergy: false },
    { code: 'RX-2026-975', patient: 'Fatima Noor', upi: 'UPI-20260811-F45K12', drug: 'Amlodipine 5mg', dosage: '1 tablet OD at night', doctor: 'Dr. Bilal Qureshi', issued: '2026-08-09', status: 'Dispensed', allergy: false },
    { code: 'RX-2026-963', patient: 'Omar Sheikh', upi: 'UPI-20260811-G78L99', drug: 'Pantoprazole 40mg', dosage: '1 tablet OD before breakfast', doctor: 'Dr. Tariq Mahmood', issued: '2026-08-08', status: 'Dispensed', allergy: false },
  ];

  return (
    <div className="space-y-6">
      {/* Scan / Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <ScanLine className="w-5 h-5 text-[#001F66]" />
          <h3 className="text-base font-bold text-[#001F66] font-manrope">Scan or Enter Prescription Code</h3>
        </div>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={rxCode}
              onChange={e => setRxCode(e.target.value)}
              placeholder="Scan barcode or enter Rx code..."
              className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm font-semibold outline-none focus:border-[#009953] font-manrope"
            />
          </div>
          <button className="bg-[#001F66] text-white hover:bg-[#009953] px-5 py-2 rounded-lg text-xs font-bold transition-all font-manrope">
            Verify Rx
          </button>
        </div>
      </div>

      {/* Allergy Warning */}
      <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs font-manrope">
          <div className="font-bold text-sm mb-0.5">⚠ ALLERGY COLLISION INTERCEPTED — RX-2026-991</div>
          <div>Patient Zainab Malik has a registered <strong>Penicillin V Potassium anaphylaxis</strong> allergy. This prescription does NOT contain a contraindicated drug — proceed with caution.</div>
        </div>
      </div>

      {/* Active Prescription Queue */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-[#001F66] font-manrope text-sm">Active Prescription Queue</h3>
          <TAG color="bg-amber-50 text-amber-700 border border-amber-200">2 Pending Dispense</TAG>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-manrope">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                <th className="p-3">Rx Code</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Medication</th>
                <th className="p-3">Dosage</th>
                <th className="p-3">Prescriber</th>
                <th className="p-3">Issued</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {prescriptions.map(rx => (
                <tr key={rx.code} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-[#001F66]">{rx.code}</td>
                  <td className="p-3">
                    <div className="font-semibold">{rx.patient}</div>
                    <div className="text-slate-400 text-[10px] font-mono">{rx.upi}</div>
                    {rx.allergy && <TAG color="bg-red-50 text-red-700">⚠ Allergy on File</TAG>}
                  </td>
                  <td className="p-3 font-semibold text-slate-800">{rx.drug}</td>
                  <td className="p-3 text-slate-500">{rx.dosage}</td>
                  <td className="p-3">{rx.doctor}</td>
                  <td className="p-3 text-slate-400 font-mono">{rx.issued}</td>
                  <td className="p-3">
                    <TAG color={rx.status === 'Dispensed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}>
                      {rx.status}
                    </TAG>
                  </td>
                  <td className="p-3">
                    {rx.status === 'Pending' ? (
                      <button
                        onClick={() => { setPrescriptionStatus('Dispensed'); alert(`${rx.code} marked as Dispensed!`); }}
                        className="bg-[#009953] text-white hover:bg-[#007a40] px-3 py-1 rounded-full text-[10px] font-bold transition-all"
                      >
                        Dispense
                      </button>
                    ) : (
                      <button className="text-slate-400 flex items-center gap-1 text-[10px] font-bold">
                        <Printer className="w-3 h-3" /> Receipt
                      </button>
                    )}
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
// POINT OF SALE (POS)
// ──────────────────────────────────────────────
function PointOfSale() {
  const [cart, setCart] = useState([
    { id: 1, name: 'Panadol Extra 500mg (Strip 10)', price: 85, qty: 2, stock: 120 },
    { id: 2, name: 'ORS Sachets (Orange)', price: 45, qty: 3, stock: 200 },
  ]);

  const catalog = [
    { id: 3, name: 'Brufen 400mg (10 tabs)', price: 120, stock: 85 },
    { id: 4, name: 'Augmentin 625mg (6 tabs)', price: 320, stock: 40 },
    { id: 5, name: 'Omeprazole 20mg (14 caps)', price: 200, stock: 110 },
    { id: 6, name: 'Zyrtec 10mg (10 tabs)', price: 175, stock: 60 },
  ];

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Drug catalog left panel */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search medication to add..." className="flex-1 text-sm outline-none font-manrope text-slate-700 placeholder:text-slate-400" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {catalog.map(drug => (
              <div key={drug.id} className="p-4 border border-slate-200 rounded-xl bg-[#F8FAFC] hover:border-[#009953] transition-colors group">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-bold text-slate-800 font-manrope">{drug.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Stock: {drug.stock} units</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#001F66]">Rs. {drug.price}</div>
                    <button onClick={() => addToCart(drug)} className="mt-1 bg-[#001F66] group-hover:bg-[#009953] text-white text-[10px] font-bold px-2 py-1 rounded-md transition-all flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart right panel */}
      <div className="space-y-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#001F66] font-manrope text-sm">Current Sale</h3>
            <TAG color="bg-[#001F66] text-white">{cart.length} items</TAG>
          </div>
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-xs font-manrope">
                <div>
                  <div className="font-semibold text-slate-800">{item.name}</div>
                  <div className="text-slate-400">Qty: {item.qty} × Rs. {item.price}</div>
                </div>
                <div className="font-bold text-[#001F66]">Rs. {item.qty * item.price}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 font-manrope text-xs">
            <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>Rs. {total}</span></div>
            <div className="flex justify-between text-slate-500"><span>Discount</span><span>- Rs. 0</span></div>
            <div className="flex justify-between text-[#001F66] font-bold text-sm"><span>Total Payable</span><span>Rs. {total}</span></div>
          </div>
          <div className="mt-4 space-y-2">
            <button onClick={() => alert(`Sale completed! Total: Rs. ${total}\nReceipt will be printed.`)} className="w-full bg-[#001F66] hover:bg-[#009953] text-white py-3 rounded-full text-xs font-bold transition-all font-manrope flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4" /> Process Payment
            </button>
            <button onClick={() => alert('Receipt printed!')} className="w-full border border-slate-200 hover:border-[#001F66] text-slate-600 hover:text-[#001F66] py-2 rounded-full text-xs font-semibold transition-all font-manrope flex items-center justify-center gap-2">
              <Printer className="w-3.5 h-3.5" /> Print Receipt
            </button>
          </div>
        </div>

        {/* Customer Queue */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h4 className="font-bold text-[#001F66] font-manrope text-xs uppercase tracking-wider mb-3">Customer Queue</h4>
          {['Token #A-01 — Waiting', 'Token #A-02 — In Progress', 'Token #A-03 — Waiting'].map((t, i) => (
            <div key={i} className="text-xs font-manrope py-2 border-b border-slate-100 last:border-0 flex justify-between items-center text-slate-600">
              <span>{t}</span>
              {i === 1 && <TAG color="bg-[#009953] text-white">Active</TAG>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// DRUG INVENTORY
// ──────────────────────────────────────────────
function DrugInventory() {
  const [search, setSearch] = useState('');
  const inventory = [
    { id: 1, name: 'Salbutamol Inhaler 100mcg', category: 'Respiratory', stock: 48, minStock: 30, expiry: '2027-03-01', supplier: 'GlaxoSmithKline', price: 480, status: 'In Stock' },
    { id: 2, name: 'Metformin 500mg (100 tabs)', category: 'Endocrine', stock: 12, minStock: 25, expiry: '2026-12-15', supplier: 'Abbott Pakistan', price: 245, status: 'Low Stock' },
    { id: 3, name: 'Augmentin 625mg (6 tabs)', category: 'Antibiotic', stock: 5, minStock: 20, expiry: '2026-09-30', supplier: 'GSK Pakistan', price: 320, status: 'Critical' },
    { id: 4, name: 'Amlodipine 5mg (10 tabs)', category: 'Cardiovascular', stock: 90, minStock: 30, expiry: '2027-06-30', supplier: 'Sanofi Pakistan', price: 195, status: 'In Stock' },
    { id: 5, name: 'Omeprazole 20mg (14 caps)', category: 'Gastro', stock: 75, minStock: 20, expiry: '2027-01-15', supplier: 'Highnoon Labs', price: 200, status: 'In Stock' },
    { id: 6, name: 'Panadol Extra 500mg (10s)', category: 'Analgesic', stock: 200, minStock: 50, expiry: '2028-02-28', supplier: 'GSK Pakistan', price: 85, status: 'In Stock' },
    { id: 7, name: 'ORS Sachets Orange (Pack)', category: 'Electrolyte', stock: 3, minStock: 30, expiry: '2026-10-20', supplier: 'Ferozsons Labs', price: 45, status: 'Critical' },
    { id: 8, name: 'Zyrtec 10mg (10 tabs)', category: 'Antihistamine', stock: 40, minStock: 20, expiry: '2027-04-15', supplier: 'UCB Pharma', price: 175, status: 'In Stock' },
  ];

  const statusColor = {
    'In Stock': 'bg-emerald-50 text-emerald-700',
    'Low Stock': 'bg-amber-50 text-amber-700',
    'Critical': 'bg-red-50 text-red-700',
  };

  const filtered = inventory.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  const criticalCount = inventory.filter(d => d.status === 'Critical').length;
  const lowCount = inventory.filter(d => d.status === 'Low Stock').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <STAT label="Total SKUs" value={inventory.length} sub="Active drug lines" />
        <STAT label="In Stock" value={inventory.filter(d => d.status === 'In Stock').length} badge="✓ Healthy" />
        <STAT label="Low Stock" value={lowCount} color="text-amber-600" sub="Reorder soon" />
        <STAT label="Critical" value={criticalCount} color="text-red-600" sub="Order immediately" />
      </div>

      {criticalCount > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-xs text-red-800 font-manrope">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <div><strong>{criticalCount} medications are critically low.</strong> Immediate purchase orders required to prevent stockout.</div>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <h3 className="font-bold text-[#001F66] font-manrope text-sm">Drug Inventory Register</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search drug..."
                className="pl-9 pr-4 py-2 text-xs bg-[#F8FAFC] border border-slate-200 rounded-lg outline-none font-manrope w-52"
              />
            </div>
            <button onClick={() => alert('Purchase order raised for all critical/low-stock items!')} className="bg-[#001F66] text-white hover:bg-[#009953] px-4 py-2 rounded-lg text-xs font-bold transition-all font-manrope flex items-center gap-1.5">
              <Plus className="w-3 h-3" /> Raise Purchase Order
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-manrope">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                <th className="p-3">Drug Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Stock (Units)</th>
                <th className="p-3">Min. Stock</th>
                <th className="p-3">Expiry Date</th>
                <th className="p-3">Supplier</th>
                <th className="p-3">Unit Price</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(drug => (
                <tr key={drug.id} className={`hover:bg-slate-50 transition-colors ${drug.status === 'Critical' ? 'bg-red-50/40' : ''}`}>
                  <td className="p-3 font-semibold">{drug.name}</td>
                  <td className="p-3 text-slate-500">{drug.category}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${drug.status === 'Critical' ? 'bg-red-500' : drug.status === 'Low Stock' ? 'bg-amber-500' : 'bg-[#009953]'}`}
                          style={{ width: `${Math.min(100, (drug.stock / (drug.minStock * 2)) * 100)}%` }}
                        />
                      </div>
                      <span className={`font-bold ${drug.status === 'Critical' ? 'text-red-600' : drug.status === 'Low Stock' ? 'text-amber-600' : 'text-[#009953]'}`}>
                        {drug.stock}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-slate-400">{drug.minStock}</td>
                  <td className="p-3 font-mono text-slate-500">{drug.expiry}</td>
                  <td className="p-3">{drug.supplier}</td>
                  <td className="p-3 font-bold text-[#001F66]">Rs. {drug.price}</td>
                  <td className="p-3"><TAG color={statusColor[drug.status]}>{drug.status}</TAG></td>
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
// ALLERGY INTERCEPTOR
// ──────────────────────────────────────────────
function AllergyInterceptor() {
  const allergies = [
    { patient: 'Zainab Malik', upi: 'UPI-20260811-A89F11', drug: 'Penicillin V Potassium', severity: 'Anaphylaxis', recorded: '2024-03-15', doctor: 'Dr. Tariq Mahmood', notes: 'Severe anaphylactic reaction documented. Carry EpiPen.' },
    { patient: 'Omar Sheikh', upi: 'UPI-20260811-G78L99', drug: 'Aspirin (Salicylates)', severity: 'Moderate', recorded: '2023-09-10', doctor: 'Dr. Bilal Qureshi', notes: 'Gastric intolerance and urticaria. Avoid all NSAIDs.' },
    { patient: 'Fatima Noor', upi: 'UPI-20260811-F45K12', drug: 'Sulfonamides', severity: 'Mild', recorded: '2025-01-22', doctor: 'Dr. Sara Hassan', notes: 'Rash reaction documented. Use alternatives.' },
  ];

  const interactions = [
    { drugA: 'Warfarin', drugB: 'Aspirin', severity: 'Critical', effect: 'Increased bleeding risk — avoid co-administration' },
    { drugA: 'Metformin', drugB: 'Contrast Dye', severity: 'High', effect: 'Risk of lactic acidosis — stop Metformin 48h before imaging' },
    { drugA: 'SSRIs', drugB: 'MAOIs', severity: 'Critical', effect: 'Serotonin syndrome — absolute contraindication' },
    { drugA: 'ACE Inhibitors', drugB: 'Potassium Supplements', severity: 'High', effect: 'Hyperkalemia risk — monitor serum potassium levels' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <STAT label="Patient Allergies on File" value={allergies.length} sub="Cross-checked on every dispense" />
        <STAT label="Drug Interactions Blocked" value="12" color="text-red-600" sub="This month" />
        <STAT label="Safety Alerts Triggered" value="4" color="text-amber-600" sub="Last 7 days" />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-[#001F66] font-manrope text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" /> Registered Patient Allergies
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {allergies.map((a, i) => (
            <div key={i} className={`p-5 font-manrope ${a.severity === 'Anaphylaxis' ? 'bg-red-50/50' : a.severity === 'Moderate' ? 'bg-amber-50/50' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-800 text-sm">{a.patient}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{a.upi}</div>
                </div>
                <TAG color={a.severity === 'Anaphylaxis' ? 'bg-red-100 text-red-700' : a.severity === 'Moderate' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}>
                  {a.severity}
                </TAG>
              </div>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div><span className="text-slate-400 block">Allergen</span><span className="font-bold text-red-700">{a.drug}</span></div>
                <div><span className="text-slate-400 block">Recorded</span><span className="font-semibold">{a.recorded}</span></div>
                <div><span className="text-slate-400 block">Prescribing Doctor</span><span className="font-semibold">{a.doctor}</span></div>
              </div>
              <div className="mt-2 text-xs text-slate-500 bg-white border border-slate-100 rounded-lg px-3 py-2">{a.notes}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-[#001F66] font-manrope text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Drug Interaction Reference Database
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-manrope">
            <thead>
              <tr className="bg-slate-50 font-bold text-slate-600 border-b border-slate-100">
                <th className="p-3">Drug A</th>
                <th className="p-3">Drug B</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Clinical Effect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {interactions.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{row.drugA}</td>
                  <td className="p-3 font-bold text-slate-800">{row.drugB}</td>
                  <td className="p-3">
                    <TAG color={row.severity === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}>{row.severity}</TAG>
                  </td>
                  <td className="p-3 text-slate-500">{row.effect}</td>
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
// BILLING & INSURANCE
// ──────────────────────────────────────────────
function BillingInsurance() {
  const bills = [
    { id: 'INV-2026-101', patient: 'Zainab Malik', date: '2026-08-11', items: ['Salbutamol Inhaler', 'ORS Sachets'], total: 525, insurer: 'State Life', status: 'Claimed', paid: 420 },
    { id: 'INV-2026-100', patient: 'Ahmad Raza', date: '2026-08-10', items: ['Metformin 500mg'], total: 245, insurer: 'EFU Life', status: 'Pending', paid: 0 },
    { id: 'INV-2026-099', patient: 'Fatima Noor', date: '2026-08-09', items: ['Amlodipine 5mg', 'Panadol'], total: 280, insurer: 'Jubilee Insurance', status: 'Rejected', paid: 0 },
    { id: 'INV-2026-098', patient: 'Omar Sheikh', date: '2026-08-08', items: ['Pantoprazole 40mg'], total: 315, insurer: 'Cash', status: 'Paid', paid: 315 },
  ];

  const statusColor = { Claimed: 'bg-emerald-50 text-emerald-700', Pending: 'bg-amber-50 text-amber-700', Rejected: 'bg-red-50 text-red-700', Paid: 'bg-[#001F66]/10 text-[#001F66]' };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <STAT label="Today's Revenue" value="Rs. 12,840" sub="8 transactions" />
        <STAT label="Insurance Claims" value="6" badge="Processing" />
        <STAT label="Claims Rejected" value="1" color="text-red-600" sub="Follow up required" />
        <STAT label="Pending Payments" value="Rs. 3,250" color="text-amber-600" sub="Collect from patients" />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-[#001F66] font-manrope text-sm">Invoice & Insurance Claims Register</h3>
          <button onClick={() => alert('New invoice form opened!')} className="bg-[#001F66] text-white hover:bg-[#009953] px-4 py-2 rounded-lg text-xs font-bold transition-all font-manrope flex items-center gap-1.5">
            <Plus className="w-3 h-3" /> New Invoice
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-manrope">
            <thead>
              <tr className="bg-slate-50 font-bold text-slate-600 border-b border-slate-100">
                <th className="p-3">Invoice #</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Date</th>
                <th className="p-3">Medications</th>
                <th className="p-3">Total</th>
                <th className="p-3">Insurer</th>
                <th className="p-3">Paid</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bills.map(b => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-[#001F66]">{b.id}</td>
                  <td className="p-3 font-semibold">{b.patient}</td>
                  <td className="p-3 text-slate-400 font-mono">{b.date}</td>
                  <td className="p-3 text-slate-500">{b.items.join(', ')}</td>
                  <td className="p-3 font-bold">Rs. {b.total}</td>
                  <td className="p-3">{b.insurer}</td>
                  <td className="p-3 font-bold text-[#009953]">Rs. {b.paid}</td>
                  <td className="p-3"><TAG color={statusColor[b.status]}>{b.status}</TAG></td>
                  <td className="p-3">
                    <button onClick={() => alert(`Invoice ${b.id} action performed!`)} className="text-[#001F66] hover:text-[#009953] font-bold text-[10px] flex items-center gap-1 transition-colors">
                      <FileText className="w-3 h-3" /> View
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
// DRUG CATALOG
// ──────────────────────────────────────────────
function DrugCatalog() {
  const drugs = [
    { name: 'Salbutamol Inhaler 100mcg', brand: 'Ventolin', category: 'Respiratory', type: 'Inhaler', formula: 'Salbutamol Sulfate', manufacturer: 'GlaxoSmithKline', requires_rx: true, schedule: 'Schedule H' },
    { name: 'Metformin 500mg Tablets', brand: 'Glucophage', category: 'Endocrine', type: 'Oral Tablet', formula: 'Metformin Hydrochloride', manufacturer: 'Abbott Pakistan', requires_rx: true, schedule: 'Schedule H' },
    { name: 'Amlodipine 5mg Tablets', brand: 'Norvasc', category: 'Cardiovascular', type: 'Oral Tablet', formula: 'Amlodipine Besylate', manufacturer: 'Sanofi Pakistan', requires_rx: true, schedule: 'Schedule H' },
    { name: 'Amoxicillin 500mg Capsules', brand: 'Amoxil', category: 'Antibiotic', type: 'Capsule', formula: 'Amoxicillin Trihydrate', manufacturer: 'GSK Pakistan', requires_rx: true, schedule: 'Schedule H' },
    { name: 'Paracetamol 500mg Tablets', brand: 'Panadol', category: 'Analgesic', type: 'Oral Tablet', formula: 'Acetaminophen', manufacturer: 'GSK Pakistan', requires_rx: false, schedule: 'OTC' },
    { name: 'Omeprazole 20mg Capsules', brand: 'Prilosec', category: 'Gastro', type: 'Capsule', formula: 'Omeprazole Magnesium', manufacturer: 'Highnoon Labs', requires_rx: true, schedule: 'Schedule H' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search drug by generic or brand name..." className="pl-9 pr-4 py-2.5 text-xs bg-[#F8FAFC] border border-slate-200 rounded-lg w-full outline-none font-manrope" />
        </div>
        <select className="text-xs bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 outline-none font-manrope">
          <option>All Categories</option>
          <option>Antibiotic</option>
          <option>Cardiovascular</option>
          <option>Endocrine</option>
          <option>Respiratory</option>
        </select>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-manrope">
            <thead>
              <tr className="bg-slate-50 font-bold text-slate-600 border-b border-slate-100">
                <th className="p-3">Generic Name</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Category</th>
                <th className="p-3">Form</th>
                <th className="p-3">Formula</th>
                <th className="p-3">Manufacturer</th>
                <th className="p-3">Schedule</th>
                <th className="p-3">Rx Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {drugs.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{d.name}</td>
                  <td className="p-3 font-semibold text-[#001F66]">{d.brand}</td>
                  <td className="p-3"><TAG color="bg-[#001F66]/10 text-[#001F66]">{d.category}</TAG></td>
                  <td className="p-3 text-slate-500">{d.type}</td>
                  <td className="p-3 text-slate-500">{d.formula}</td>
                  <td className="p-3">{d.manufacturer}</td>
                  <td className="p-3"><TAG color="bg-slate-100 text-slate-700">{d.schedule}</TAG></td>
                  <td className="p-3">
                    {d.requires_rx
                      ? <TAG color="bg-red-50 text-red-700">Yes — Rx</TAG>
                      : <TAG color="bg-emerald-50 text-emerald-700">OTC</TAG>}
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
// MAIN PHARMACY PORTAL
// ──────────────────────────────────────────────
export default function PharmacyPortal({ activeDashboardTab, prescriptionStatus, setPrescriptionStatus }) {
  return (
    <div className="space-y-6 font-manrope">
      {activeDashboardTab === 'pharmacy' && (
        <DispenseDesk prescriptionStatus={prescriptionStatus} setPrescriptionStatus={setPrescriptionStatus} />
      )}
      {activeDashboardTab === 'pos' && <PointOfSale />}
      {activeDashboardTab === 'inventory' && <DrugInventory />}
      {activeDashboardTab === 'allergies' && <AllergyInterceptor />}
      {activeDashboardTab === 'billing' && <BillingInsurance />}
      {activeDashboardTab === 'drug_catalog' && <DrugCatalog />}
    </div>
  );
}
