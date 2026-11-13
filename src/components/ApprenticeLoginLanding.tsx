import React, { useState } from 'react';
import { ApprenticeInfo } from '../types';
import { SenaLogo } from './SenaLogo';
import { COMPETENCY_INFO } from '../data/senaData';
import { User, IdCard, Hash, ArrowRight, ShieldCheck, Sparkles, BookOpen, Brain, CheckCircle2, Settings, BarChart3, Video } from 'lucide-react';

interface ApprenticeLoginLandingProps {
  initialData: ApprenticeInfo;
  onLoginSuccess: (apprentice: ApprenticeInfo, shouldPromptKolb: boolean) => void;
  onOpenInstructorPanel: () => void;
  onOpenManual?: () => void;
}

export const ApprenticeLoginLanding: React.FC<ApprenticeLoginLandingProps> = ({
  initialData,
  onLoginSuccess,
  onOpenInstructorPanel,
  onOpenManual,
}) => {
  // Always initialize fields empty on page load / refresh
  const [formData, setFormData] = useState<ApprenticeInfo>({
    fullName: '',
    docType: 'C.C.',
    docNumber: '',
    ficha: '',
    center: initialData.center || 'Centro de Servicios y Gestión Empresarial',
    regional: initialData.regional || 'Regional Antioquia',
    kolbResult: null,
  });
  const [showGreetingModal, setShowGreetingModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.docNumber.trim() || !formData.ficha.trim()) {
      return;
    }
    // Show the greeting and prompt to answer the Kolb test
    setShowGreetingModal(true);
  };

  const handleStartKolb = () => {
    onLoginSuccess(formData, true);
  };

  const handleSkipKolb = () => {
    onLoginSuccess(formData, false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-[#39A900]/20 selection:text-[#007832]">
      {/* Top Brand Bar */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <SenaLogo className="h-10 w-auto" variant="color" showText={true} />
          
          <div className="flex items-center gap-2.5">


            {/* Manual de Uso para Aprendices Button */}
            {onOpenManual && (
              <button
                onClick={onOpenManual}
                className="px-3 py-2 text-xs font-bold text-[#00324D] hover:text-[#007832] bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:scale-[1.02]"
                title="Ver Manual de Uso para Aprendices (M_Aprendiz)"
              >
                <BookOpen className="w-4 h-4 text-[#39A900]" />
                <span className="hidden sm:inline">Manual del Aprendiz</span>
              </button>
            )}

            {/* Configuration / Instructor Panel Button */}
            <button
              type="button"
              onClick={() => window.open('/assets/aistudio/2026__22_08_80ba0edf.mp4', '_blank')}
              className="px-3.5 py-2 text-xs font-bold text-white bg-[#007832] hover:bg-[#005824] rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:scale-[1.02]"
              title="Ver Video del Manual del Instructor"
            >
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Manual del Instructor</span>
            </button>

            <button
              onClick={onOpenInstructorPanel}
              className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-[#007832] bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-2xs hover:scale-[1.02]"
              title="Espacio de control e inspección del instructor (Usuario ADMON / admonsena123)"
            >
              <Settings className="w-4 h-4 text-[#39A900]" />
              <span>Configuración</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Split */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Context, Competency & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-sm font-bold text-[#007832]">
              <Sparkles className="w-4.5 h-4.5 text-[#39A900]" />
              <span>Portal de Estudio y Evaluación de la Competencia</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00324D] tracking-tight leading-tight font-display">
              Intervenir en el Desarrollo de los Programas de Mejoramiento Organizacional
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Bienvenido al entorno interactivo de aprendizaje y evaluación para el programa <strong>Tecnólogo en Gestión Empresarial</strong>. Ingrese sus datos oficiales de aprendiz para registrar sus avances, realizar el <strong>Test de Estilos de Aprendizaje de David Kolb</strong> y emitir sus constancias oficiales aprobatorias (≥ 70%).
            </p>

            {/* Competency RAPs Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-mono font-bold text-[#39A900] block">RAP 01</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">Diagnóstico Empresarial</span>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-mono font-bold text-[#007832] block">RAP 02</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">Planeación Documentos</span>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-mono font-bold text-[#00324D] block">RAP 03</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">Auditorías Internas</span>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-mono font-bold text-[#39A900] block">RAP 04</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">Análisis Indicadores</span>
              </div>
            </div>

            {/* Test Kolb feature teaser */}
            <div className="p-4.5 rounded-xl bg-gradient-to-r from-blue-50/80 via-emerald-50/50 to-white border border-blue-200 flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#00324D] text-[#39A900] flex items-center justify-center shrink-0">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#00324D] uppercase tracking-wider">
                  Diagnóstico Pedagógico de David Kolb Incluido
                </h4>
                <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">
                  Al ingresar, responderás un breve test que identificará si tu estilo es <strong>Acomodador, Divergente, Convergente o Asimilador</strong>, recomendándote las mejores estrategias para abordar la competencia.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Apprentice Data Input Form Card (+15% scale & font) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-7 sm:p-9 relative overflow-hidden">
              <div className="border-b border-slate-100 pb-4.5 mb-6">
                <div className="flex items-center gap-2 text-sm font-bold text-[#39A900] uppercase tracking-wider mb-1">
                  <User className="w-4.5 h-4.5" />
                  <span>Ingreso del Aprendiz SENA</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#00324D]">
                  Datos de Identificación
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Diligencie los campos tal como figuran en Sofia Plus:
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nombres y Apellidos */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Nombres y Apellidos Completos *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Nombres y Apellidos"
                      className="w-full px-4 py-3 text-base border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:border-transparent bg-slate-50/50 hover:bg-white focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400 focus:placeholder-transparent"
                    />
                  </div>
                </div>

                {/* Tipo Documento & Numero Documento */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                  <div className="sm:col-span-4">
                    <label className="block text-sm font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                      Tipo Doc. *
                    </label>
                    <select
                      required
                      value={formData.docType}
                      onChange={(e) => setFormData({ ...formData, docType: e.target.value as any })}
                      className="w-full px-3.5 py-3 text-base border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:border-transparent bg-white font-medium text-slate-800"
                    >
                      <option value="C.C.">C.C. (Cédula de Ciudadanía)</option>
                      <option value="T.I.">T.I. (Tarjeta de Identidad)</option>
                      <option value="C.E.">C.E. (Cédula de Extranjería)</option>
                      <option value="P.P.T.">P.P.T. (Permiso Protección)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-8">
                    <label className="block text-sm font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                      Número de Documento *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.docNumber}
                      onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                      placeholder="Número de Documento"
                      className="w-full px-4 py-3 text-base border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:border-transparent bg-slate-50/50 hover:bg-white focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400 focus:placeholder-transparent"
                    />
                  </div>
                </div>

                {/* Número de Ficha */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Número de Ficha de Caracterización *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.ficha}
                      onChange={(e) => setFormData({ ...formData, ficha: e.target.value })}
                      placeholder="Número de Ficha"
                      className="w-full px-4 py-3 text-base border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:border-transparent bg-slate-50/50 hover:bg-white focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400 focus:placeholder-transparent"
                    />
                  </div>
                </div>

                {/* Submit CTA Button */}
                <div className="pt-3.5">
                  <button
                    type="submit"
                    className="w-full py-4 px-5 text-base font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <span>Ingresar y Definir Estilo de Aprendizaje</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>

              <div className="mt-5 pt-4.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Servicio Nacional de Aprendizaje SENA</span>
                <span className="flex items-center gap-1.5 text-[#007832] font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  Registro Seguro
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="bg-white border-t border-slate-200 py-4.5 px-4 text-xs text-center text-slate-500">
        Servicio Nacional de Aprendizaje SENA · Centro de servicios y gestión empresarial - Regional Antioquia
      </footer>

      {/* Greeting & Kolb Test Prompt Modal (+15% scale) */}
      {showGreetingModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-7 bg-gradient-to-r from-[#00324D] via-[#00283e] to-[#001f30] text-white text-center relative">
              <div className="w-18 h-18 rounded-2xl bg-[#39A900] text-white flex items-center justify-center mx-auto mb-3.5 shadow-lg">
                <SenaLogo className="h-11 w-auto" variant="white" showText={false} />
              </div>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest block mb-1">
                Servicio Nacional de Aprendizaje · SENA
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display">
                ¡Bienvenido(a), {formData.fullName}!
              </h3>
              <p className="text-sm text-slate-200 mt-1 font-medium">
                Aprendiz registrado en la Ficha <strong className="text-emerald-300 font-mono">{formData.ficha}</strong>
              </p>
            </div>

            {/* Modal Body: Kolb Test Prompt */}
            <div className="p-7 sm:p-9 space-y-6">
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-slate-700 leading-relaxed">
                <div className="flex items-center gap-2.5 font-bold text-[#007832] uppercase tracking-wider mb-1.5">
                  <Brain className="w-5 h-5 text-[#39A900]" />
                  <span>Diagnóstico Inicial de Estilo de Aprendizaje</span>
                </div>
                <p>
                  Para garantizar una experiencia formativa exitosa en la competencia de <strong>Mejoramiento Organizacional</strong>, te solicitamos responder el <strong>Test de David Kolb</strong> (5 breves preguntas).
                </p>
                <p className="mt-2 font-medium text-slate-800">
                  Esto permitirá definir si tu perfil es <strong>Acomodador, Divergente, Convergente o Asimilador</strong> y orientarte en el estudio de los 4 RAPs.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleStartKolb}
                  className="w-full py-4 px-5 text-sm sm:text-base font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-xl shadow-md flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <Brain className="w-5 h-5" />
                  <span>Responder Test de Kolb Ahora (Recomendado)</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={handleSkipKolb}
                  className="w-full py-3 px-5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer text-center"
                >
                  Ir directo a los contenidos (Responder el test después)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
