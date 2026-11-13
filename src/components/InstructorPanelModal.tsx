import React, { useState } from 'react';
import { ApprenticeRecord, EvaluationResult, InstructorRecord, KolbStyle, RAPId } from '../types';
import { SenaLogo } from './SenaLogo';
import { RAPS_DATA } from '../data/senaData';
import { 
  ShieldCheck, 
  Lock, 
  Download, 
  UserCheck, 
  Edit3, 
  Trash2, 
  X, 
  Search, 
  Award, 
  FileSpreadsheet, 
  Brain, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  RotateCcw,
  Check,
  Users as UsersIcon, 
  FileCheck, 
  BarChart2, 
  Calendar, 
  UserPlus, 
  Save,
  Mail,
  User,
  Sparkles,
  UserCog,
  FileText,
  Video
} from 'lucide-react';
import { ManageInstructorsModal } from './ManageInstructorsModal';
import { CertificatesHistoryModal } from './CertificatesHistoryModal';
import { fetchInstructorsFromDb } from '../services/firestoreService';

interface InstructorPanelModalProps {
  apprentices: ApprenticeRecord[];
  allCertificates: EvaluationResult[];
  instructors: InstructorRecord[];
  onUpdateApprentice: (updated: ApprenticeRecord) => void;
  onDeleteApprentice: (docNumber: string) => void;
  onUpdateInstructor?: (updated: InstructorRecord) => void;
  onDeleteInstructor?: (instructorId: string) => void;
  onInstructorsSynced?: (records: InstructorRecord[]) => void;
  onOpenAnalyticsDashboard?: (fichas?: string[]) => void;
  onOpenRegisterInstructor?: () => void;
  onViewCertificate?: (cert: EvaluationResult) => void;
  onClose: () => void;
}

export const InstructorPanelModal: React.FC<InstructorPanelModalProps> = ({
  apprentices,
  allCertificates,
  instructors,
  onUpdateApprentice,
  onDeleteApprentice,
  onUpdateInstructor,
  onDeleteInstructor,
  onInstructorsSynced,
  onOpenAnalyticsDashboard,
  onOpenRegisterInstructor,
  onViewCertificate,
  onClose,
}) => {
  // Auth state: can login via master password admonsena123 OR individual instructor username/password
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInInstructor, setLoggedInInstructor] = useState<InstructorRecord | null>(null);
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isManageInstructorsOpen, setIsManageInstructorsOpen] = useState(false);
  const [isCertificatesHistoryOpen, setIsCertificatesHistoryOpen] = useState(false);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFichaFilter, setSelectedFichaFilter] = useState('ALL');

  // Edit Apprentice State
  const [editingApprentice, setEditingApprentice] = useState<ApprenticeRecord | null>(null);

  // Delete Confirmation State
  const [deletingApprentice, setDeletingApprentice] = useState<ApprenticeRecord | null>(null);

  const activeLoggedInInstructor = loggedInInstructor
    ? instructors.find((i) => i.id === loggedInInstructor.id) || loggedInInstructor
    : null;

  const findMatchingInstructor = (
    list: InstructorRecord[],
    inputUser: string,
    inputPass: string
  ): InstructorRecord | undefined => {
    const exactMatch = list.find(
      (inst) =>
        (inst.username.trim().toLowerCase() === inputUser ||
          inst.docNumber.trim().toLowerCase() === inputUser) &&
        inst.password.trim() === inputPass
    );
    if (exactMatch) return exactMatch;

    if (!inputUser) {
      return list.find((inst) => inst.password.trim() === inputPass);
    }
    return undefined;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggingIn) return;
    setAuthError('');

    const inputPass = passwordInput.trim();
    const inputUser = usernameInput.trim().toLowerCase();

    // Check master admin credentials (User: ADMON, Password: admonsena123)
    if (inputUser === 'admon') {
      if (inputPass === 'admonsena123') {
        setIsAuthenticated(true);
        setLoggedInInstructor(null); // Master Admin sees all fichas
        return;
      } else {
        setAuthError('Contraseña incorrecta para el usuario administrador ADMON.');
        return;
      }
    }

    // Direct password match for admin
    if (inputPass === 'admonsena123' && (!inputUser || inputUser === 'admonsena123')) {
      setIsAuthenticated(true);
      setLoggedInInstructor(null);
      return;
    }

    // Check registered instructors currently in memory
    const matchedInMemory = findMatchingInstructor(instructors, inputUser, inputPass);
    if (matchedInMemory) {
      setIsAuthenticated(true);
      setLoggedInInstructor(matchedInMemory);
      return;
    }

    // Fallback: query Firestore directly in case a newly registered instructor has not arrived via listener yet
    setIsLoggingIn(true);
    try {
      const freshInstructors = await fetchInstructorsFromDb();
      if (onInstructorsSynced && freshInstructors.length > 0) {
        onInstructorsSynced(freshInstructors);
      }
      const matchedFromDb = findMatchingInstructor(freshInstructors, inputUser, inputPass);
      if (matchedFromDb) {
        setIsAuthenticated(true);
        setLoggedInInstructor(matchedFromDb);
        return;
      }
    } catch (err) {
      console.error('Error consultando instructores en Firestore:', err);
    } finally {
      setIsLoggingIn(false);
    }

    setAuthError('Usuario o contraseña incorrectos. Usuario administrador: ADMON (Clave: admonsena123).');
  };

  // Helper to get all certificates for a specific apprentice
  const getApprenticeCertificates = (docNumber: string): EvaluationResult[] => {
    return allCertificates.filter(
      (c) => c.apprentice.docNumber.trim() === docNumber.trim()
    );
  };

  // Helper to get attempt stats for an apprentice
  const getApprenticeAttemptStats = (docNumber: string) => {
    const certs = getApprenticeCertificates(docNumber);
    
    // Group attempts by RAP
    const attemptsByRap: Record<RAPId, { total: number; approvedAtAttempt?: number; isApproved: boolean }> = {
      rap1: { total: 0, isApproved: false },
      rap2: { total: 0, isApproved: false },
      rap3: { total: 0, isApproved: false },
      rap4: { total: 0, isApproved: false },
    };

    certs.forEach((cert) => {
      const rapId = cert.rapId;
      if (attemptsByRap[rapId]) {
        attemptsByRap[rapId].total += 1;
        if (cert.isApproved) {
          attemptsByRap[rapId].isApproved = true;
          if (!attemptsByRap[rapId].approvedAtAttempt) {
            attemptsByRap[rapId].approvedAtAttempt = attemptsByRap[rapId].total;
          }
        }
      }
    });

    const totalAttempts = certs.length;
    const lastResult = certs.length > 0 ? certs[0] : null;

    return {
      certs,
      attemptsByRap,
      totalAttempts,
      lastResult,
    };
  };

  // Scope apprentices by activeLoggedInInstructor's assigned fichas if logged in as individual instructor
  const scopedApprentices = activeLoggedInInstructor
    ? apprentices.filter((app) =>
        activeLoggedInInstructor.fichas.some((f) => f.trim() === app.ficha.trim())
      )
    : apprentices;

  const scopedDocNumbers = new Set(scopedApprentices.map((a) => a.docNumber.trim()));

  const scopedCertificates = allCertificates.filter((c) =>
    scopedDocNumbers.has(c.apprentice.docNumber.trim())
  );

  // Filter apprentices by search and selected ficha filter
  const filteredApprentices = scopedApprentices.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.docNumber.includes(searchTerm) ||
      app.ficha.includes(searchTerm);

    const matchesFicha =
      selectedFichaFilter === 'ALL' || app.ficha === selectedFichaFilter;

    return matchesSearch && matchesFicha;
  });

  // Unique fichas for filter dropdown
  const uniqueFichas = Array.from(new Set(scopedApprentices.map((a) => a.ficha)));

  // Download Excel Export
  const handleDownloadExcel = () => {
    const listToExport = filteredApprentices;

    const rowsHtml = listToExport.map((app) => {
      const stats = getApprenticeAttemptStats(app.docNumber);
      const last = stats.lastResult;

      const formatRapAttempts = (rapId: RAPId) => {
        const rapStat = stats.attemptsByRap[rapId];
        if (!rapStat || rapStat.total === 0) return '0 intentos (No presentada)';
        if (rapStat.isApproved) {
          return `${rapStat.total} intento(s) [Aprobado en #${rapStat.approvedAtAttempt || 1}]`;
        }
        return `${rapStat.total} intento(s) [En proceso]`;
      };

      const conceptClass = last
        ? last.isApproved
          ? 'background-color: #d1fae5; color: #007832; font-weight: bold;'
          : 'background-color: #ffe4e6; color: #be123c; font-weight: bold;'
        : '';

      return `
        <tr>
          <td style="border: 1px solid #d1d5db; padding: 6px; font-weight: bold;">${app.fullName}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">${app.docType}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px; font-family: monospace;">${app.docNumber}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px; font-family: monospace; font-weight: bold;">${app.ficha}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">${app.center}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">${app.regional}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px; font-weight: bold; color: #007832;">${app.kolbResult?.style || 'Sin definir'}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">${last ? `${last.rapCode} - ${last.rapTitle}` : 'Sin pruebas'}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">${last ? last.evaluatedStyle : 'N/A'}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: bold;">${last ? `${last.percentage}%` : 'N/A'}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; ${conceptClass}">${last ? last.concept : 'N/A'}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${last ? last.completedAt : 'N/A'}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">${formatRapAttempts('rap1')}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">${formatRapAttempts('rap2')}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">${formatRapAttempts('rap3')}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">${formatRapAttempts('rap4')}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: bold;">${stats.totalAttempts}</td>
        </tr>
      `;
    }).join('');

    const excelTemplate = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Reporte Aprendices SENA</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          table { border-collapse: collapse; font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 11pt; }
          th { background-color: #007832; color: #ffffff; font-weight: bold; text-align: left; padding: 8px; border: 1px solid #005824; }
          .title-row { background-color: #00324D; color: #ffffff; font-size: 14pt; font-weight: bold; text-align: center; padding: 12px; }
          .subtitle-row { background-color: #f3f4f6; color: #4b5563; font-size: 10pt; text-align: center; padding: 6px; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              <th colSpan="17" class="title-row">SERVICIO NACIONAL DE APRENDIZAJE SENA · REPORTE DE APRENDICES Y PRUEBAS</th>
            </tr>
            <tr>
              <th colSpan="17" class="subtitle-row">Programa Tecnólogo en Gestión Empresarial (Cód. 210601003) · Ficha: ${selectedFichaFilter === 'ALL' ? 'Todas las Fichas' : selectedFichaFilter} · Fecha Exportación: ${new Date().toLocaleDateString('es-CO')}</th>
            </tr>
            <tr>
              <th>Nombres y Apellidos</th>
              <th>Tipo Doc</th>
              <th>Número Documento</th>
              <th>Ficha</th>
              <th>Centro de Formación</th>
              <th>Regional</th>
              <th>Estilo Kolb</th>
              <th>Última Prueba (RAP)</th>
              <th>Estilo Evaluado</th>
              <th>Calificación (%)</th>
              <th>Concepto Oficial</th>
              <th>Fecha Última Prueba</th>
              <th>Intentos RAP 1</th>
              <th>Intentos RAP 2</th>
              <th>Intentos RAP 3</th>
              <th>Intentos RAP 4</th>
              <th>Total Intentos</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\uFEFF' + excelTemplate], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Reporte_Aprendices_SENA_Gestion_Empresarial_${new Date().toISOString().slice(0, 10)}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle saving edit apprentice
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingApprentice) {
      onUpdateApprentice(editingApprentice);
      setEditingApprentice(null);
    }
  };

  // Handle confirmed delete
  const handleConfirmDelete = () => {
    if (deletingApprentice) {
      onDeleteApprentice(deletingApprentice.docNumber);
      setDeletingApprentice(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#39A900] text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Panel de Control del Instructor SENA
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded border border-slate-700">
                  Acceso Administrativo
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white font-display">
                Espacio de Control e Inspección Formativa
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar panel de instructor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PASSWORD / INSTRUCTOR AUTHENTICATION SCREEN */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-[#00324D] flex items-center justify-center mx-auto border border-slate-200 shadow-sm">
              <Lock className="w-8 h-8 text-[#39A900]" />
            </div>

            <div>
              <h3 className="text-xl font-black text-[#00324D]">
                Autenticación de Instructor / Administrador
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Ingrese sus credenciales de instructor o el usuario administrador <strong className="text-[#007832] font-mono">ADMON</strong> para consultar los resultados y el dashboard de sus fichas.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3.5 text-left">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Usuario / Correo Institucional *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => {
                      setUsernameInput(e.target.value);
                      setAuthError('');
                    }}
                    placeholder="Ej. ADMON o su correo institucional"
                    className="w-full pl-9 pr-4 py-2.5 font-medium text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] bg-slate-50 focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Contraseña *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setAuthError('');
                    }}
                    placeholder="Clave de acceso"
                    className="w-full pl-9 pr-4 py-2.5 font-mono text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] bg-slate-50 focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              {authError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-md transition-all hover:scale-[1.01] cursor-pointer mt-1"
              >
                {isLoggingIn ? 'Verificando credenciales...' : 'Acceder al Espacio del Instructor'}
              </button>
            </form>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              {onOpenRegisterInstructor && (
                <button
                  type="button"
                  onClick={onOpenRegisterInstructor}
                  className="w-full py-2.5 px-4 text-xs font-bold text-[#00324D] bg-slate-100 hover:bg-emerald-50 hover:text-[#007832] border border-slate-200 hover:border-emerald-300 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-[#39A900]" />
                  <span>¿Es Instructor Nuevo? Crear Usuario y Contraseña</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => window.open('/assets/aistudio/2026__22_08_80ba0edf.mp4', '_blank')}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#007832] hover:bg-[#005824] rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Video className="w-4 h-4" />
                <span>Manual del Instructor</span>
              </button>

              <div className="text-[10.5px] text-slate-400">
                Acceso Administrador: Usuario <strong className="font-mono text-slate-700">ADMON</strong> · Clave: <strong className="font-mono text-slate-700">admonsena123</strong>
              </div>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED INSTRUCTOR DASHBOARD */
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-slate-50">
            
            {/* Logged in Admin or Instructor Banner */}
            {!activeLoggedInInstructor ? (
              <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#00324D] text-white border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#39A900] text-white flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                      Sesión de Administrador General · Usuario ADMON
                    </div>
                    <div className="text-sm font-black text-white">
                      Control Central e Inspección de Todas las Fichas
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsManageInstructorsOpen(true)}
                    className="px-3.5 py-2 text-xs font-bold text-[#00324D] bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <UserCog className="w-4 h-4 text-[#00324D]" />
                    <span>Administrar Instructores ({instructors.length})</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#007832] text-white flex items-center justify-center font-bold font-mono">
                    <UserCheck className="w-5 h-5 text-[#39A900]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#007832]">
                      Instructor Autenticado · FPI SENA
                    </div>
                    <div className="text-sm font-black text-[#00324D]">
                      {activeLoggedInInstructor.fullName} ({activeLoggedInInstructor.username})
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Fichas Asignadas:</span>
                  {activeLoggedInInstructor.fichas.map((f) => (
                    <span key={f} className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-xs font-mono font-bold text-[#007832] shadow-2xs">
                      Ficha {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                  <span>Aprendices Registrados</span>
                  <UsersIcon className="w-4 h-4 text-[#39A900]" />
                </div>
                <div className="text-2xl font-black text-[#00324D]">
                  {scopedApprentices.length}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Fichas activas del instructor
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                  <span>Pruebas Presentadas</span>
                  <FileCheck className="w-4 h-4 text-[#007832]" />
                </div>
                <div className="text-2xl font-black text-[#007832]">
                  {scopedCertificates.length}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Evaluaciones completadas
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                  <span>Pruebas Aprobadas</span>
                  <Award className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-emerald-700">
                  {scopedCertificates.filter((c) => c.isApproved).length}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Conceptos Aprobatorios (≥ 70%)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                  <span>Test de Kolb Al día</span>
                  <Brain className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-[#00324D]">
                  {scopedApprentices.filter((a) => a.kolbResult?.style).length} / {scopedApprentices.length}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Estilos de aprendizaje definidos
                </div>
              </div>
            </div>

            {/* Filter & Action Controls Bar */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-3.5 w-full min-w-0">
              
              {/* Search & Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full min-w-0">
                <div className="relative flex-1 min-w-0">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por Nombre, Documento o Ficha..."
                    className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] bg-slate-50 focus:bg-white text-slate-900"
                  />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-600 uppercase">Ficha:</span>
                  <select
                    value={selectedFichaFilter}
                    onChange={(e) => setSelectedFichaFilter(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value="ALL">Todas las Fichas ({scopedApprentices.length})</option>
                    {uniqueFichas.map((f) => (
                      <option key={f} value={f}>
                        Ficha {f}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons: Manage Instructors, Analytics Dashboard & Export CSV */}
              <div className="flex flex-wrap items-center gap-2.5 w-full pt-3 border-t border-slate-100">
                {!activeLoggedInInstructor && (
                  <button
                    onClick={() => setIsManageInstructorsOpen(true)}
                    className="px-3.5 py-2.5 text-xs font-bold text-[#00324D] bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                    title="Administrar usuarios instructor: cambiar contraseña, eliminar o corregir información"
                  >
                    <UserCog className="w-4 h-4 text-[#007832] shrink-0" />
                    <span>Administrar Instructores ({instructors.length})</span>
                  </button>
                )}

                <button
                  onClick={() => setIsCertificatesHistoryOpen(true)}
                  className="px-3.5 py-2.5 text-xs font-bold text-white bg-[#00324D] hover:bg-[#002235] rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                  title="Ver historial detallado de constancias emitidas"
                >
                  <FileText className="w-4 h-4 text-[#39A900] shrink-0" />
                  <span>Historial de Constancias ({allCertificates.length})</span>
                </button>

                <button
                  onClick={() => window.open('/assets/aistudio/2026__22_08_80ba0edf.mp4', '_blank')}
                  className="px-3.5 py-2.5 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                  title="Ver video del manual del instructor"
                >
                  <Video className="w-4 h-4 shrink-0" />
                  <span>Manual del Instructor</span>
                </button>

                {onOpenAnalyticsDashboard && (
                  <button
                    onClick={() => onOpenAnalyticsDashboard(activeLoggedInInstructor ? activeLoggedInInstructor.fichas : undefined)}
                    className="px-4 py-2.5 text-xs font-bold text-white bg-[#00324D] hover:bg-[#002235] rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                    title="Ver Dashboard de gráficos sobre Estilos de Aprendizaje y Eficiencia"
                  >
                    <BarChart2 className="w-4 h-4 text-[#39A900] shrink-0" />
                    <span>Ver Dashboard Analítico</span>
                  </button>
                )}

                <button
                  onClick={handleDownloadExcel}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                  title="Descargar reporte consolidado directamente en Excel (.xls)"
                >
                  <FileSpreadsheet className="w-4 h-4 shrink-0" />
                  <span>Descargar en Excel</span>
                </button>
              </div>
            </div>

            {/* Apprentices Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                <div className="text-xs font-bold text-[#00324D] uppercase tracking-wider flex items-center gap-2">
                  <UsersIcon className="w-4 h-4 text-[#39A900]" />
                  <span>Listado de Aprendices e Historial de Evaluaciones</span>
                </div>
                <span className="text-xs text-slate-500 font-semibold">
                  Mostrando {filteredApprentices.length} de {scopedApprentices.length} aprendices
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px]">
                      <th className="py-3 px-4">Aprendiz</th>
                      <th className="py-3 px-4">Documento</th>
                      <th className="py-3 px-4">Ficha</th>
                      <th className="py-3 px-4">Estilo Kolb</th>
                      <th className="py-3 px-4">Última Prueba Presentada</th>
                      <th className="py-3 px-4">Intentos Realizados</th>
                      <th className="py-3 px-4 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredApprentices.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-500 italic">
                          No se encontraron aprendices registrados con los criterios de búsqueda.
                        </td>
                      </tr>
                    ) : (
                      filteredApprentices.map((app) => {
                        const stats = getApprenticeAttemptStats(app.docNumber);
                        const last = stats.lastResult;

                        return (
                          <tr key={app.docNumber} className="hover:bg-slate-50/80 transition-colors">
                            {/* Nombre */}
                            <td className="py-3 px-4 font-bold text-slate-900">
                              <div>{app.fullName}</div>
                              <div className="text-[10px] text-slate-400 font-normal">
                                {app.center}
                              </div>
                            </td>

                            {/* Documento */}
                            <td className="py-3 px-4 font-mono font-semibold text-slate-700 whitespace-nowrap">
                              {app.docType} {app.docNumber}
                            </td>

                            {/* Ficha */}
                            <td className="py-3 px-4 font-mono font-bold text-[#00324D]">
                              {app.ficha}
                            </td>

                            {/* Estilo Kolb */}
                            <td className="py-3 px-4">
                              {app.kolbResult?.style ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] font-bold bg-emerald-100 text-[#007832] border border-emerald-300">
                                  <Brain className="w-3 h-3 text-[#39A900]" />
                                  {app.kolbResult.style}
                                </span>
                              ) : (
                                <span className="text-[10px] text-slate-400 italic">
                                  Sin test
                                </span>
                              )}
                            </td>

                            {/* Última Prueba */}
                            <td className="py-3 px-4">
                              {last ? (
                                <div>
                                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                    <span className="font-mono text-[#007832]">{last.rapCode}</span>
                                    <span>·</span>
                                    <span className={last.isApproved ? 'text-[#007832]' : 'text-rose-700'}>
                                      {last.concept} ({last.percentage}%)
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-slate-500 mt-0.5">
                                    Estilo: <strong>{last.evaluatedStyle}</strong> · {last.completedAt}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-[10.5px] text-slate-400 italic">
                                  Sin pruebas aún
                                </span>
                              )}
                            </td>

                            {/* Intentos Realizados */}
                            <td className="py-3 px-4">
                              <div className="space-y-1 text-[10.5px]">
                                <div className="font-semibold text-slate-800">
                                  Total: <strong>{stats.totalAttempts} prueba(s)</strong>
                                </div>
                                <div className="flex flex-wrap gap-1 text-[9.5px]">
                                  {Object.entries(stats.attemptsByRap).map(([rId, rStat]) => {
                                    if (rStat.total === 0) return null;
                                    return (
                                      <span
                                        key={rId}
                                        className={`px-1.5 py-0.5 rounded font-mono font-bold ${
                                          rStat.isApproved
                                            ? 'bg-emerald-100 text-[#007832]'
                                            : 'bg-slate-100 text-slate-600'
                                        }`}
                                        title={`${rId.toUpperCase()}: ${rStat.total} intento(s) ${rStat.isApproved ? `(Aprobado en intento #${rStat.approvedAtAttempt})` : ''}`}
                                      >
                                        {rId.toUpperCase()}: {rStat.total} {rStat.isApproved ? `(Aprobado #${rStat.approvedAtAttempt})` : ''}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            </td>

                            {/* Acciones */}
                            <td className="py-3 px-4 text-center whitespace-nowrap">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => setEditingApprentice({ ...app })}
                                  className="p-1.5 text-slate-600 hover:text-[#007832] bg-slate-100 hover:bg-emerald-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                                  title="Editar datos del aprendiz"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>

                                <button
                                  onClick={() => setDeletingApprentice(app)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                                  title="Eliminar aprendiz del sistema"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SUB-MODAL: EDIT APPRENTICE DATA */}
        {editingApprentice && (
          <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-[#00324D]">
                  <Edit3 className="w-4 h-4 text-[#39A900]" />
                  <span>Modificar Datos del Aprendiz</span>
                </div>
                <button
                  onClick={() => setEditingApprentice(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Nombres y Apellidos *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingApprentice.fullName}
                    onChange={(e) =>
                      setEditingApprentice({ ...editingApprentice, fullName: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Tipo Documento *
                    </label>
                    <select
                      value={editingApprentice.docType}
                      onChange={(e) =>
                        setEditingApprentice({
                          ...editingApprentice,
                          docType: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                    >
                      <option value="C.C.">C.C. (Cédula)</option>
                      <option value="T.I.">T.I. (Tarjeta Identidad)</option>
                      <option value="C.E.">C.E. (Extranjería)</option>
                      <option value="P.P.T.">P.P.T. (Permiso)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Número Documento *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingApprentice.docNumber}
                      onChange={(e) =>
                        setEditingApprentice({ ...editingApprentice, docNumber: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Número de Ficha *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingApprentice.ficha}
                    onChange={(e) =>
                      setEditingApprentice({ ...editingApprentice, ficha: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Estilo de Aprendizaje (Kolb)
                  </label>
                  <select
                    value={editingApprentice.kolbResult?.style || ''}
                    onChange={(e) => {
                      const newStyle = e.target.value as KolbStyle;
                      if (!newStyle) {
                        setEditingApprentice({ ...editingApprentice, kolbResult: null });
                      } else {
                        setEditingApprentice({
                          ...editingApprentice,
                          kolbResult: {
                            style: newStyle,
                            tagline: `Estilo ${newStyle} asignado manualmente`,
                            description: 'Asignación administrativa de estilo.',
                            characteristics: [],
                            recommendedStrategies: [],
                            completedAt: new Date().toLocaleDateString('es-CO'),
                          },
                        });
                      }
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white font-semibold text-[#007832]"
                  >
                    <option value="">Sin definir</option>
                    <option value="Acomodador">Acomodador</option>
                    <option value="Divergente">Divergente</option>
                    <option value="Convergente">Convergente</option>
                    <option value="Asimilador">Asimilador</option>
                  </select>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setEditingApprentice(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-xl flex items-center gap-1.5 shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Guardar Cambios</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SUB-MODAL: CONFIRM DELETE APPRENTICE */}
        {deletingApprentice && (
          <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900">
                  ¿Confirmar eliminación de aprendiz?
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Se eliminará permanentemente al aprendiz <strong>{deletingApprentice.fullName}</strong> ({deletingApprentice.docType} {deletingApprentice.docNumber}) y sus registros de la plataforma.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeletingApprentice(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs"
                >
                  Eliminar Aprendiz
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUB-MODAL: MANAGE INSTRUCTORS */}
        {isManageInstructorsOpen && (
          <ManageInstructorsModal
            instructors={instructors}
            availableFichas={Array.from(new Set(apprentices.map((a) => a.ficha)))}
            onUpdateInstructor={(updated) => {
              if (onUpdateInstructor) onUpdateInstructor(updated);
              if (loggedInInstructor?.id === updated.id) {
                setLoggedInInstructor(updated);
              }
            }}
            onDeleteInstructor={(id) => {
              if (onDeleteInstructor) onDeleteInstructor(id);
              if (loggedInInstructor?.id === id) {
                setIsAuthenticated(false);
                setLoggedInInstructor(null);
              }
            }}
            onOpenCreateInstructor={() => {
              setIsManageInstructorsOpen(false);
              if (onOpenRegisterInstructor) onOpenRegisterInstructor();
            }}
            onClose={() => setIsManageInstructorsOpen(false)}
          />
        )}

        {/* SUB-MODAL: CERTIFICATES HISTORY */}
        {isCertificatesHistoryOpen && (
          <CertificatesHistoryModal
            allCertificates={allCertificates}
            apprentices={apprentices}
            loggedInInstructor={activeLoggedInInstructor}
            onViewCertificate={(cert) => {
              if (onViewCertificate) onViewCertificate(cert);
            }}
            onClose={() => setIsCertificatesHistoryOpen(false)}
          />
        )}

      </div>
    </div>
  );
};
