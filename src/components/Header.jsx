import React from 'react';
import { LogOut } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  user,
  handleLogout,
  setShowLoginModal,
  setShowDemoModal
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 glass-nav h-16">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }} className="flex items-center gap-2 group">
          <div className="bg-[#001F66] text-white w-8 h-8 flex items-center justify-center rounded-md font-semibold tracking-tighter text-sm font-manrope">
            HC
          </div>
          <span className="text-[#001F66] font-extrabold tracking-tight text-lg group-hover:opacity-80 transition-opacity font-manrope">
            INTEROPHEALTH
          </span>
        </a>

        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-xs lg:text-sm font-semibold text-slate-500 font-manrope">
          <button onClick={() => setActiveTab('home')} className={`hover:text-[#001F66] transition-colors ${activeTab === 'home' ? 'text-[#001F66] font-bold border-b-2 border-[#009953]' : ''}`}>
            Overview
          </button>
          <button onClick={() => setActiveTab('about')} className={`hover:text-[#001F66] transition-colors ${activeTab === 'about' ? 'text-[#001F66] font-bold border-b-2 border-[#009953]' : ''}`}>
            Strategy
          </button>
          <button onClick={() => setActiveTab('modules')} className={`hover:text-[#001F66] transition-colors ${activeTab === 'modules' ? 'text-[#001F66] font-bold border-b-2 border-[#009953]' : ''}`}>
            Capabilities
          </button>
          <button onClick={() => setActiveTab('pathway')} className={`hover:text-[#001F66] transition-colors ${activeTab === 'pathway' ? 'text-[#001F66] font-bold border-b-2 border-[#009953]' : ''}`}>
            Security & Roadmap
          </button>
          <button onClick={() => setActiveTab('solutions')} className={`hover:text-[#001F66] transition-colors ${activeTab === 'solutions' ? 'text-[#001F66] font-bold border-b-2 border-[#009953]' : ''}`}>
            User Roles
          </button>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border border-slate-200 ${user.badgeBg}`}>
                {user.name}
              </span>
              <button onClick={() => setActiveTab('dashboard')} className="text-xs font-bold bg-[#001F66] text-white px-4 py-2 rounded-md hover:bg-[#009953] transition-all shadow-sm font-manrope">
                Dashboard
              </button>
              <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-colors p-1" title="Sign Out">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 font-manrope">
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-xs font-semibold text-slate-700 hover:text-[#001F66] bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3.5 py-2 rounded-lg transition-all"
              >
                Live Software Demo
              </button>

              <button
                onClick={() => setShowDemoModal(true)}
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white transition-all bg-[#001F66] hover:bg-[#009953] rounded-lg shadow-sm"
              >
                Request Customization
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
