import React from 'react';
import { SenaLogo } from './SenaLogo';
import { RAPId, ApprenticeInfo } from '../types';
import { User, GraduationCap, Brain, LogOut, Settings, BarChart3, BookOpen } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | RAPId;
  currentMode: 'study' | 'evaluate';
  onNavigateHome: () => void;
  onNavigateRap: (rapId: RAPId, mode?: 'study' | 'evaluate') => void;
  apprentice: ApprenticeInfo;
  onOpenApprenticeModal: () => void;
  onOpenKolbModal: () => void;
  onOpenInstructorPanel?: () => void;
  onOpenManual?: () => void;
  onSwitchApprentice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  currentMode,
  onNavigateHome,
  onNavigateRap,
  apprentice,
  onOpenApprenticeModal,
  onOpenKolbModal,
  onOpenInstructorPanel,
  onOpenManual,
  onSwitchApprentice,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single element Brand Wordmark */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 text-left focus:outline-none cursor-pointer"
        >
          <SenaLogo className="h-10 w-auto" variant="color" showText={false} />
        </button>

        {/* Zone 2: 4-5 Concise Single-line Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <button
            onClick={onNavigateHome}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#007832] ${
              currentView === 'home' ? 'text-[#007832] font-bold border-b-2 border-[#39A900] pb-1' : ''
            }`}
          >
            Inicio
          </button>

          <button
            onClick={() => onNavigateRap('rap1')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#007832] ${
              currentView === 'rap1' ? 'text-[#007832] font-bold border-b-2 border-[#39A900] pb-1' : ''
            }`}
          >
            RAP 1: Diagnóstico
          </button>

          <button
            onClick={() => onNavigateRap('rap2')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#007832] ${
              currentView === 'rap2' ? 'text-[#007832] font-bold border-b-2 border-[#39A900] pb-1' : ''
            }`}
          >
            RAP 2: Documentos
          </button>

          <button
            onClick={() => onNavigateRap('rap3')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#007832] ${
              currentView === 'rap3' ? 'text-[#007832] font-bold border-b-2 border-[#39A900] pb-1' : ''
            }`}
          >
            RAP 3: Auditorías
          </button>

          <button
            onClick={() => onNavigateRap('rap4')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#007832] ${
              currentView === 'rap4' ? 'text-[#007832] font-bold border-b-2 border-[#39A900] pb-1' : ''
            }`}
          >
            RAP 4: Indicadores
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Area (Kolb Indicator + Apprentice Profile) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenKolbModal}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
              apprentice.kolbResult
                ? 'bg-emerald-50 text-[#007832] border-emerald-300 hover:bg-emerald-100'
                : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 animate-pulse'
            }`}
            title="Diagnóstico de Estilo de Aprendizaje de David Kolb"
          >
            <Brain className="w-3.5 h-3.5 text-[#39A900]" />
            <span className="hidden sm:inline">
              {apprentice.kolbResult ? `Estilo: ${apprentice.kolbResult.style}` : 'Hacer Test de Kolb'}
            </span>
            <span className="sm:hidden">
              {apprentice.kolbResult ? apprentice.kolbResult.style : 'Kolb'}
            </span>
          </button>

          <button
            onClick={onOpenApprenticeModal}
            className="px-3 py-1.5 text-xs font-semibold text-[#00324D] bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 border border-slate-200 cursor-pointer"
            title="Editar datos del aprendiz o cambiar de usuario"
          >
            <User className="w-3.5 h-3.5 text-[#39A900]" />
            <span className="hidden lg:inline max-w-[120px] truncate">{apprentice.fullName}</span>
            <span className="font-mono text-[11px] text-slate-500">F:{apprentice.ficha}</span>
          </button>

          {onOpenManual && (
            <button
              onClick={onOpenManual}
              className="p-1.5 text-slate-600 hover:text-[#007832] bg-slate-100 hover:bg-emerald-50 rounded-lg transition-colors border border-slate-200 shrink-0 cursor-pointer"
              title="Manual de Uso para el Aprendiz (M_Aprendiz)"
            >
              <BookOpen className="w-4 h-4 text-[#39A900]" />
            </button>
          )}

          {onOpenInstructorPanel && (
            <button
              onClick={onOpenInstructorPanel}
              className="p-1.5 text-slate-600 hover:text-[#007832] bg-slate-100 hover:bg-emerald-50 rounded-lg transition-colors border border-slate-200 shrink-0 cursor-pointer"
              aria-label="Configuración"
            >
              <Settings className="w-4 h-4 text-[#39A900]" />
            </button>
          )}

          <button
            onClick={onSwitchApprentice}
            className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 hover:underline transition-colors whitespace-nowrap shrink-0"
            title="Salir y registrar otro aprendiz"
          >
            Salir
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar for Small Screens */}
      <div className="md:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50 text-xs font-semibold">
        <button
          onClick={onNavigateHome}
          className={`px-2.5 py-1 rounded whitespace-nowrap shrink-0 ${
            currentView === 'home' ? 'bg-[#39A900] text-white' : 'text-slate-600'
          }`}
        >
          Inicio
        </button>
        <button
          onClick={() => onNavigateRap('rap1')}
          className={`px-2.5 py-1 rounded whitespace-nowrap shrink-0 ${
            currentView === 'rap1' ? 'bg-[#39A900] text-white' : 'text-slate-600'
          }`}
        >
          RAP 1
        </button>
        <button
          onClick={() => onNavigateRap('rap2')}
          className={`px-2.5 py-1 rounded whitespace-nowrap shrink-0 ${
            currentView === 'rap2' ? 'bg-[#39A900] text-white' : 'text-slate-600'
          }`}
        >
          RAP 2
        </button>
        <button
          onClick={() => onNavigateRap('rap3')}
          className={`px-2.5 py-1 rounded whitespace-nowrap shrink-0 ${
            currentView === 'rap3' ? 'bg-[#39A900] text-white' : 'text-slate-600'
          }`}
        >
          RAP 3
        </button>
        <button
          onClick={() => onNavigateRap('rap4')}
          className={`px-2.5 py-1 rounded whitespace-nowrap shrink-0 ${
            currentView === 'rap4' ? 'bg-[#39A900] text-white' : 'text-slate-600'
          }`}
        >
          RAP 4
        </button>
      </div>
    </header>
  );
};
