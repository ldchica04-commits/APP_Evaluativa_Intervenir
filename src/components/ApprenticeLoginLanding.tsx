import React, { useEffect, useState } from 'react';
import { ApprenticeInfo, ApprenticeRecord } from '../types';
import { SenaLogo } from './SenaLogo';
import { COMPETENCY_INFO } from '../data/senaData';
import { getApprenticeFromDb, makeSafeDocId } from '../services/firestoreService';
import { User, IdCard, Hash, ArrowRight, ShieldCheck, Sparkles, BookOpen, Brain, CheckCircle2, Settings, BarChart3, Video, AlertCircle } from 'lucide-react';

interface ApprenticeLoginLandingProps {
  initialData: ApprenticeInfo;
  existingApprentices?: ApprenticeRecord[];
  onLoginSuccess: (apprentice: ApprenticeInfo, shouldPromptKolb: boolean) => void;
  onRegisterApprentice?: (apprentice: ApprenticeInfo) => ApprenticeRecord | void;
  onOpenInstructorPanel: () => void;
  onOpenManual?: () => void;
}

export const ApprenticeLoginLanding: React.FC<ApprenticeLoginLandingProps> = ({
  initialData,
  existingApprentices = [],
  onLoginSuccess,
  onRegisterApprentice,
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
  const [touchedFields, setTouchedFields] = useState({
    fullName: false,
    docType: false,
    ficha: false,
  });
  const [matchedApprentice, setMatchedApprentice] = useState<ApprenticeRecord | null>(null);
  const [resolvedApprentice, setResolvedApprentice] = useState<ApprenticeInfo | null>(null);
  const [formError, setFormError] = useState('');
  const [isCheckingDoc, setIsCheckingDoc] = useState(false);
  const [showGreetingModal, setShowGreetingModal] = useState(false);

  const findLocalMatch = (rawDoc: string): ApprenticeRecord | null => {
    const trimmed = rawDoc.trim();
    if (!trimmed) return null;
    const safeId = makeSafeDocId(trimmed);
    return (
      existingApprentices.find(
        (a) => a.docNumber.trim() === trimmed || a.id === safeId
      ) || null
    );
  };

  const applyMatchedRecordToForm = (found: ApprenticeRecord) => {
    setMatchedApprentice(found);
    setFormData((prev) => ({
      ...prev,
      fullName: !touchedFields.fullName || !prev.fullName.trim() ? found.fullName : prev.fullName,
      docType: !touchedFields.docType ? found.docType : prev.docType,
      ficha: !touchedFields.ficha || !prev.ficha.trim() ? found.ficha : prev.ficha,
      center: found.center || prev.center,
      regional: found.regional || prev.regional,
      kolbResult: found.kolbResult ?? null,
    }));
  };

  useEffect(() => {
    const trimmedDoc = formData.docNumber.trim();
    if (!trimmedDoc) {
      if (matchedApprentice) {
        setMatchedApprentice(null);
        setFormData((prev) => ({
          ...prev,
          fullName: touchedFields.fullName ? prev.fullName : '',
          docType: touchedFields.docType ? prev.docType : 'C.C.',
          ficha: touchedFields.ficha ? prev.ficha : '',
          center: initialData.center || 'Centro de Servicios y Gestión Empresarial',
          regional: initialData.regional || 'Regional Antioquia',
          kolbResult: null,
        }));
      }
      return;
    }

    const localFound = findLocalMatch(trimmedDoc);
    if (localFound) {
      if (matchedApprentice?.id !== localFound.id || matchedApprentice?.updatedAt !== localFound.updatedAt) {
        applyMatchedRecordToForm(localFound);
      }
      return;
    }

    if (matchedApprentice && matchedApprentice.docNumber.trim() !== trimmedDoc) {
      setMatchedApprentice(null);
      setFormData((prev) => ({
        ...prev,
        fullName: touchedFields.fullName ? prev.fullName : '',
        docType: touchedFields.docType ? prev.docType : 'C.C.',
        ficha: touchedFields.ficha ? prev.ficha : '',
        center: initialData.center || 'Centro de Servicios y Gestión Empresarial',
        regional: initialData.regional || 'Regional Antioquia',
        kolbResult: null,
      }));
    }

    if (trimmedDoc.length < 4) return;

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        const dbFound = await getApprenticeFromDb(trimmedDoc);
        if (!cancelled && dbFound && dbFound.docNumber.trim() === trimmedDoc) {
          applyMatchedRecordToForm(dbFound);
        }
      } catch {
        // Non-blocking lookup fallback
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [formData.docNumber, existingApprentices]);

  const buildMergedApprenticeData = (existing: ApprenticeRecord | null): ApprenticeInfo => {
    const trimmedDoc = formData.docNumber.trim();
    const typedName = formData.fullName.trim();
    const typedFicha = formData.ficha.trim();

    if (existing) {
      return {
        ...existing,
        fullName: (touchedFields.fullName ? typedName : '') || typedName || existing.fullName,
        docType: touchedFields.docType ? formData.docType : existing.docType,
        docNumber: trimmedDoc || existing.docNumber,
        ficha: (touchedFields.ficha ? typedFicha : '') || typedFicha || existing.ficha,
        center: (existing.center || formData.center || 'Centro de Servicios y Gestión Empresarial').trim(),
        regional: (existing.regional || formData.regional || 'Regional Antioquia').trim(),
        kolbResult: existing.kolbResult ?? null,
      };
    }

    return {
      ...formData,
      fullName: typedName,
      docNumber: trimmedDoc,
      ficha: typedFicha,
      center: (formData.center || 'Centro de Servicios y Gestión Empresarial').trim(),
      regional: (formData.regional || 'Regional Antioquia').trim(),
      kolbResult: null,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCheckingDoc) return;
    setFormError('');

    const trimmedDoc = formData.docNumber.trim();
    if (!trimmedDoc) {
      setFormError('Por favor ingrese su número de documento.');
      return;
    }

    let existing = matchedApprentice || findLocalMatch(trimmedDoc);
    if (!existing) {
      setIsCheckingDoc(true);
      try {
        existing = await getApprenticeFromDb(trimmedDoc);
      } catch {
        // Proceed with local data if lookup fails
      } finally {
        setIsCheckingDoc(false);
      }
    }

    const mergedData = buildMergedApprenticeData(existing);

    if (!mergedData.fullName || !mergedData.docNumber || !mergedData.ficha) {
      setFormError('Por favor diligencie sus nombres completos, número de documento y ficha.');
      return;
    }

    setMatchedApprentice(existing);
    setFormData(mergedData);
    const savedOrMerged = onRegisterApprentice ? onRegisterApprentice(mergedData) : undefined;
    setResolvedApprentice(savedOrMerged || mergedData);
    setShowGreetingModal(true);
  };

  const handleStartKolb = () => {
    const payload = resolvedApprentice || buildMergedApprenticeData(matchedApprentice);
    onLoginSuccess(payload, true);
  };

  const handleSkipKolb = () => {
    const payload = resolvedApprentice || buildMergedApprenticeData(matchedApprentice);
    onLoginSuccess(payload, false);
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
                {matchedApprentice && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-slate-700 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#007832] block">
                        Cédula / documento ya registrado
                      </span>
                      <span className="text-[11.5px] leading-snug block mt-0.5">
                        Se conservan sus datos del primer registro{matchedApprentice.kolbResult?.style ? ` y su estilo Kolb (${matchedApprentice.kolbResult.style})` : ''}. Ajuste únicamente los campos que necesite actualizar.
                      </span>
                    </div>
                  </div>
                )}

                {formError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Nombres y Apellidos */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Nombres y Apellidos Completos *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormError('');
                        setTouchedFields((prev) => ({ ...prev, fullName: true }));
                        setFormData({ ...formData, fullName: e.target.value });
                      }}
                      placeholder="Nombres y Apellidos"
                      className="w-full px-4 py-3 text-base border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:border-transparent bg-slate-50/50 hover:bg-white focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400 focus:placeholder:transparent"
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
                      onChange={(e) => {
                        setTouchedFields((prev) => ({ ...prev, docType: true }));
                        setFormData({ ...formData, docType: e.target.value as any });
                      }}
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
                      onChange={(e) => {
                        setFormError('');
                        setFormData({ ...formData, docNumber: e.target.value });
                      }}
                      placeholder="Número de Documento"
                      className="w-full px-4 py-3 text-base border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:border-transparent bg-slate-50/50 hover:bg-white focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400 focus:placeholder:transparent"
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
                      value={formData.ficha}
                      onChange={(e) => {
                        setFormError('');
                        setTouchedFields((prev) => ({ ...prev, ficha: true }));
                        setFormData({ ...formData, ficha: e.target.value });
                      }}
                      placeholder="Número de Ficha"
                      className="w-full px-4 py-3 text-base border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:border-transparent bg-slate-50/50 hover:bg-white focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400 focus:placeholder:transparent"
                    />
                  </div>
                </div>

                {/* Submit CTA Button */}
                <div className="pt-3.5">
                  <button
                    type="submit"
                    disabled={isCheckingDoc}
                    className="w-full py-4 px-5 text-base font-bold text-white bg-[#39A900] hover:bg-[#007832] disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <span>
                      {isCheckingDoc
                        ? 'Verificando registro...'
                        : matchedApprentice
                        ? 'Ingresar con Datos Conservados'
                        : 'Ingresar y Definir Estilo de Aprendizaje'}
                    </span>
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
                {matchedApprentice ? `¡Bienvenido(a) de nuevo, ${formData.fullName}!` : `¡Bienvenido(a), ${formData.fullName}!`}
              </h3>
              <p className="text-sm text-slate-200 mt-1 font-medium">
                Aprendiz registrado en la Ficha <strong className="text-emerald-300 font-mono">{formData.ficha}</strong>
              </p>
            </div>

            {/* Modal Body: Kolb Test Prompt */}
            <div className="p-7 sm:p-9 space-y-6">
              {resolvedApprentice?.kolbResult?.style ? (
                <>
                  <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-slate-700 leading-relaxed">
                    <div className="flex items-center gap-2.5 font-bold text-[#007832] uppercase tracking-wider mb-1.5">
                      <CheckCircle2 className="w-5 h-5 text-[#39A900]" />
                      <span>Registro y Avances Conservados</span>
                    </div>
                    <p>
                      Hemos conservado tus datos del primer registro junto con tu estilo de aprendizaje <strong className="text-[#00324D]">{resolvedApprentice.kolbResult.style}</strong> y el historial de evaluaciones realizadas.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleSkipKolb}
                      className="w-full py-4 px-5 text-sm sm:text-base font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-xl shadow-md flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] cursor-pointer"
                    >
                      <span>Continuar a la Plataforma</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <button
                      onClick={handleStartKolb}
                      className="w-full py-3 px-5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
                    >
                      <Brain className="w-4 h-4 text-[#39A900]" />
                      <span>Actualizar Test de Kolb (Opcional)</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
