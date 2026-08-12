import React, { useState } from 'react';
import { LogOut, Menu, X, ChevronRight, Sparkles } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  user,
  handleLogout,
  setShowLoginModal,
  setShowDemoModal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Overview' },
    { id: 'about', label: 'Strategy' },
    { id: 'modules', label: 'Capabilities' },
    { id: 'pathway', label: 'Security & Roadmap' },
    { id: 'solutions', label: 'User Roles' },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md h-16 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0"
          >
            <div className="bg-[#001F66] text-white w-8 h-8 flex items-center justify-center rounded-lg font-extrabold tracking-tighter text-sm font-manrope shadow-sm group-hover:scale-105 transition-transform">
              HC
            </div>
            <span className="text-[#001F66] font-black tracking-tight text-base sm:text-lg group-hover:opacity-90 transition-opacity font-manrope">
              INTEROP<span className="text-[#009953]">HEALTH</span>
            </span>
          </a>

          {/* Desktop Navigation Links (md and up) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 text-xs lg:text-sm font-semibold text-slate-600 font-manrope">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    isActive
                      ? 'text-[#001F66] font-bold bg-slate-100/80 border-b-2 border-[#009953]'
                      : 'hover:text-[#001F66] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Section: Actions + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <span className={`hidden sm:inline-flex text-xs font-semibold px-3 py-1 rounded-full border border-slate-200 ${user.badgeBg}`}>
                  {user.name}
                </span>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="text-xs font-bold bg-[#001F66] text-white px-3.5 sm:px-4 py-2 rounded-lg hover:bg-[#009953] transition-all shadow-xs font-manrope flex items-center gap-1"
                >
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 font-manrope">
                <button
                  onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); }}
                  className="text-xs font-semibold text-slate-700 hover:text-[#001F66] bg-slate-100 hover:bg-slate-200 border border-slate-200/80 px-2.5 sm:px-3.5 py-2 rounded-lg transition-all"
                >
                  <span className="hidden sm:inline">Live Software Demo</span>
                  <span className="sm:hidden">Demo</span>
                </button>

                <button
                  onClick={() => { setShowDemoModal(true); setMobileMenuOpen(false); }}
                  className="hidden sm:inline-flex items-center justify-center px-3.5 sm:px-4 py-2 text-xs font-bold text-white transition-all bg-[#001F66] hover:bg-[#009953] rounded-lg shadow-xs"
                >
                  Request Customization
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle Button (md:hidden) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-[#001F66] hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/70"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Dropdown Drawer (md:hidden) */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Drawer */}
          <div className="fixed top-16 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-2xl md:hidden overflow-hidden transition-all duration-300">
            <div className="p-4 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto font-manrope">
              
              {/* User info header inside mobile menu if logged in */}
              {user && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#001F66] text-white flex items-center justify-center text-xs font-bold">
                      {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{user.name}</div>
                      <div className="text-[10px] text-slate-500 font-semibold">{user.role}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${user.badgeBg}`}>
                    Active
                  </span>
                </div>
              )}

              {/* Navigation Links */}
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-1">
                Navigation
              </div>
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeTab === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all text-left ${
                        isActive
                          ? 'bg-[#001F66]/10 text-[#001F66] font-bold border-l-4 border-[#009953] pl-3'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-[#001F66]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#009953] translate-x-0.5' : 'text-slate-300'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Mobile Actions Divider & Buttons */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                {!user ? (
                  <>
                    <button
                      onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-[#009953]" />
                      <span>Live Software Demo</span>
                    </button>

                    <button
                      onClick={() => { setShowDemoModal(true); setMobileMenuOpen(false); }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-[#001F66] hover:bg-[#009953] rounded-xl transition-all shadow-sm"
                    >
                      <span>Request Customization</span>
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#001F66] hover:bg-[#009953] rounded-xl transition-all shadow-sm"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl transition-all"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
}

