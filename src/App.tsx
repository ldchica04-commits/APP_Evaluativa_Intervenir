import React, { useState, useEffect } from 'react';
import { RAPId, ApprenticeInfo, ApprenticeRecord, EvaluationResult, KolbResult, RapProgress, InstructorRecord } from './types';
import { RAPS_DATA, DEFAULT_APPRENTICE, COMPETENCY_INFO } from './data/senaData';
import { Navbar } from './components/Navbar';
import { HomeOverview } from './components/HomeOverview';
import { RapStudyView } from './components/RapStudyView';
import { RapEvaluationView } from './components/RapEvaluationView';
import { CertificateModal } from './components/CertificateModal';
import { ApprenticeModal } from './components/ApprenticeModal';
import { KolbTestModal } from './components/KolbTestModal';
import { ApprenticeLoginLanding } from './components/ApprenticeLoginLanding';
import { InstructorPanelModal } from './components/InstructorPanelModal';
import { InstructorRegisterModal } from './components/InstructorRegisterModal';
import { AnalyticsDashboardModal } from './components/AnalyticsDashboardModal';
import { ApprenticeManualModal } from './components/ApprenticeManualModal';
import { SenaLogo } from './components/SenaLogo';
import { BookOpen, Award, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import {
  deleteApprenticeFromDb,
  deleteInstructorFromDb,
  makeSafeDocId,
  saveCertificateToDb,
  seedInitialDataIfNeeded,
  subscribeToApprentices,
  subscribeToCertificates,
  subscribeToInstructors,
  updateApprenticeKolbInDb,
  updateApprenticeProgressInDb,
  upsertApprenticeToDb,
  upsertInstructorToDb,
} from './services/firestoreService';

const createEmptyRapsProgress = (): Record<RAPId, RapProgress> => ({
  rap1: { rapId: 'rap1', isApproved: false, bestPercentage: 0, attemptsByStyle: {} },
  rap2: { rapId: 'rap2', isApproved: false, bestPercentage: 0, attemptsByStyle: {} },
  rap3: { rapId: 'rap3', isApproved: false, bestPercentage: 0, attemptsByStyle: {} },
  rap4: { rapId: 'rap4', isApproved: false, bestPercentage: 0, attemptsByStyle: {} },
});

const DEFAULT_APPRENTICES_REGISTRY: ApprenticeRecord[] = [
  {
    id: '1020789456',
    fullName: 'Carlos Andrés Mendoza Restrepo',
    docType: 'C.C.',
    docNumber: '1020789456',
    ficha: '2874195',
    center: 'Centro de Servicios y Gestión Empresarial',
    regional: 'Regional Antioquia',
    registeredAt: '2026-11-01',
    kolbResult: {
      style: 'Convergente',
      tagline: 'Pragmático & Deductivo',
      description: 'Destaca en la solución técnica de problemas y cálculos.',
      characteristics: [],
      recommendedStrategies: [],
      completedAt: '2026-11-01'
    }
  },
  {
    id: '1018452930',
    fullName: 'María Paula Gómez Castro',
    docType: 'C.C.',
    docNumber: '1018452930',
    ficha: '2874195',
    center: 'Centro de Servicios y Gestión Empresarial',
    regional: 'Regional Antioquia',
    registeredAt: '2026-11-03',
    kolbResult: {
      style: 'Divergente',
      tagline: 'Empática & Creativa',
      description: 'Sobresale en la visión holística y clima laboral.',
      characteristics: [],
      recommendedStrategies: [],
      completedAt: '2026-11-03'
    }
  },
  {
    id: '1032485921',
    fullName: 'Alejandro Ramírez Zapata',
    docType: 'T.I.',
    docNumber: '1032485921',
    ficha: '2874196',
    center: 'Centro de Servicios y Gestión Empresarial',
    regional: 'Regional Antioquia',
    registeredAt: '2026-11-05',
    kolbResult: {
      style: 'Acomodador',
      tagline: 'Orientado a la Acción y Riesgos',
      description: 'Especialista en respuesta a contingencias operativas.',
      characteristics: [],
      recommendedStrategies: [],
      completedAt: '2026-11-05'
    }
  },
  {
    id: '1022394812',
    fullName: 'Sofia Elena Jaramillo Ríos',
    docType: 'C.C.',
    docNumber: '1022394812',
    ficha: '2874195',
    center: 'Centro de Servicios y Gestión Empresarial',
    regional: 'Regional Antioquia',
    registeredAt: '2026-11-08',
    kolbResult: {
      style: 'Asimilador',
      tagline: 'Modelos Teóricos y Normativa ISO',
      description: 'Dominio de taxonomías normativas e ISO 9001/19011.',
      characteristics: [],
      recommendedStrategies: [],
      completedAt: '2026-11-08'
    }
  }
];

const DEFAULT_INSTRUCTORS_REGISTRY: InstructorRecord[] = [
  {
    id: 'INST-52418930',
    fullName: 'Ing. Roberto Carlos Silva',
    docNumber: '52418930',
    username: 'roberto.silva@sena.edu.co',
    password: 'instructor123',
    fichas: ['2874195', '2874196'],
    registeredAt: '2026-11-01',
  },
];

export default function App() {
  // Check if apprentice is already logged in from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const storedAuth = localStorage.getItem('sena_apprentice_logged_in');
      return storedAuth === 'true';
    } catch {
      return false;
    }
  });

  const [apprentice, setApprentice] = useState<ApprenticeInfo>(() => {
    try {
      const stored = localStorage.getItem('sena_apprentice_data');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return DEFAULT_APPRENTICE;
  });

  // Apprentice registry for Instructor panel tracking
  const [apprenticesRegistry, setApprenticesRegistry] = useState<ApprenticeRecord[]>(() => {
    try {
      const storedReg = localStorage.getItem('sena_apprentices_registry');
      if (storedReg) {
        return JSON.parse(storedReg);
      }
    } catch {}
    return DEFAULT_APPRENTICES_REGISTRY;
  });

  // Instructor registry
  const [instructorsRegistry, setInstructorsRegistry] = useState<InstructorRecord[]>(() => {
    try {
      const storedInst = localStorage.getItem('sena_instructors_registry');
      if (storedInst) {
        return JSON.parse(storedInst);
      }
    } catch {}
    return DEFAULT_INSTRUCTORS_REGISTRY;
  });

  const [isInstructorPanelOpen, setIsInstructorPanelOpen] = useState(false);
  const [isRegisterInstructorOpen, setIsRegisterInstructorOpen] = useState(false);
  const [isAnalyticsDashboardOpen, setIsAnalyticsDashboardOpen] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [analyticsAllowedFichas, setAnalyticsAllowedFichas] = useState<string[] | undefined>(undefined);
  const [currentView, setCurrentView] = useState<'home' | RAPId>('home');
  const [currentMode, setCurrentMode] = useState<'study' | 'evaluate'>('study');
  const [activeCertificate, setActiveCertificate] = useState<EvaluationResult | null>(null);
  const [isApprenticeModalOpen, setIsApprenticeModalOpen] = useState(false);
  const [isKolbModalOpen, setIsKolbModalOpen] = useState(false);
  const [savedCertificates, setSavedCertificates] = useState<EvaluationResult[]>(() => {
    try {
      const storedCerts = localStorage.getItem('sena_certificates');
      if (storedCerts) {
        return JSON.parse(storedCerts);
      }
    } catch {}
    return [];
  });

  // Track progress of each RAP (single pass rule)
  const [rapsProgress, setRapsProgress] = useState<Record<RAPId, RapProgress>>(() => {
    try {
      const storedProg = localStorage.getItem('sena_raps_progress');
      if (storedProg) {
        return JSON.parse(storedProg);
      }
    } catch {}
    return createEmptyRapsProgress();
  });

  // Connect to Firestore real-time database
  useEffect(() => {
    let isMounted = true;
    let unsubApprentices: (() => void) | undefined;
    let unsubInstructors: (() => void) | undefined;
    let unsubCertificates: (() => void) | undefined;

    const initFirestore = async () => {
      try {
        let localInstructorsToMigrate: InstructorRecord[] = [];
        try {
          const alreadyMigrated = localStorage.getItem('sena_firestore_instructors_migrated') === 'true';
          if (!alreadyMigrated) {
            const storedInst = localStorage.getItem('sena_instructors_registry');
            if (storedInst) {
              const parsed = JSON.parse(storedInst);
              if (Array.isArray(parsed)) {
                localInstructorsToMigrate = parsed;
              }
            }
          }
        } catch {}

        await seedInitialDataIfNeeded(
          DEFAULT_APPRENTICES_REGISTRY,
          DEFAULT_INSTRUCTORS_REGISTRY,
          localInstructorsToMigrate
        );

        try {
          localStorage.setItem('sena_firestore_instructors_migrated', 'true');
        } catch {}
      } catch (err) {
        console.error('Error seeding Firestore:', err);
      }

      if (!isMounted) return;

      unsubApprentices = subscribeToApprentices((records) => {
        if (isMounted) {
          setApprenticesRegistry(records);
        }
      });

      unsubInstructors = subscribeToInstructors((records) => {
        if (isMounted) {
          setInstructorsRegistry(records);
        }
      });

      unsubCertificates = subscribeToCertificates((records) => {
        if (isMounted) {
          setSavedCertificates(records);
        }
      });
    };

    initFirestore();

    return () => {
      isMounted = false;
      unsubApprentices?.();
      unsubInstructors?.();
      unsubCertificates?.();
    };
  }, []);

  // Persist apprentice info changes
  useEffect(() => {
    try {
      localStorage.setItem('sena_apprentice_data', JSON.stringify(apprentice));
      localStorage.setItem('sena_apprentice_logged_in', isAuthenticated ? 'true' : 'false');
    } catch {}
  }, [apprentice, isAuthenticated]);

  // Persist apprentices registry
  useEffect(() => {
    try {
      localStorage.setItem('sena_apprentices_registry', JSON.stringify(apprenticesRegistry));
    } catch {}
  }, [apprenticesRegistry]);

  // Persist certificates
  useEffect(() => {
    try {
      localStorage.setItem('sena_certificates', JSON.stringify(savedCertificates));
    } catch {}
  }, [savedCertificates]);

  // Persist RAPs progress
  useEffect(() => {
    try {
      localStorage.setItem('sena_raps_progress', JSON.stringify(rapsProgress));
    } catch {}
  }, [rapsProgress]);

  // Persist instructors registry
  useEffect(() => {
    try {
      localStorage.setItem('sena_instructors_registry', JSON.stringify(instructorsRegistry));
    } catch {}
  }, [instructorsRegistry]);

  const handleRegisterInstructorSuccess = async (newInstructor: InstructorRecord) => {
    const persisted = await upsertInstructorToDb(newInstructor);
    setInstructorsRegistry((prev) => [
      persisted,
      ...prev.filter((i) => i.id !== persisted.id),
    ]);
  };

  const handleUpdateInstructor = (updatedInstructor: InstructorRecord) => {
    setInstructorsRegistry((prev) =>
      prev.map((i) => (i.id === updatedInstructor.id ? updatedInstructor : i))
    );
    upsertInstructorToDb(updatedInstructor)
      .then((persisted) => {
        setInstructorsRegistry((prev) =>
          prev.map((i) => (i.id === persisted.id ? persisted : i))
        );
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteInstructor = (instructorId: string) => {
    setInstructorsRegistry((prev) => prev.filter((i) => i.id !== instructorId));
    deleteInstructorFromDb(instructorId).catch((err) => console.error(err));
  };

  const handleRecordResult = (result: EvaluationResult) => {
    setSavedCertificates(prev => {
      const filtered = prev.filter(c => c.certificateId !== result.certificateId);
      return [result, ...filtered];
    });
    saveCertificateToDb(result).catch((err) => console.error(err));

    setRapsProgress(prev => {
      const current = prev[result.rapId] || {
        rapId: result.rapId,
        isApproved: false,
        bestPercentage: 0,
        attemptsByStyle: {}
      };

      const newIsApproved = current.isApproved || result.isApproved;
      const newApprovedStyle = current.approvedByStyle || (result.isApproved ? result.evaluatedStyle : undefined);
      const newBestPercentage = Math.max(current.bestPercentage || 0, result.percentage);

      const nextProgress: Record<RAPId, RapProgress> = {
        ...prev,
        [result.rapId]: {
          ...current,
          isApproved: newIsApproved,
          approvedByStyle: newApprovedStyle,
          bestPercentage: newBestPercentage,
          attemptsByStyle: {
            ...current.attemptsByStyle,
            [result.evaluatedStyle]: {
              percentage: result.percentage,
              isApproved: result.isApproved,
              completedAt: result.completedAt
            }
          }
        }
      };

      if (apprentice.docNumber.trim()) {
        updateApprenticeProgressInDb(apprentice.docNumber, nextProgress, result).catch((err) =>
          console.error(err)
        );
      }

      return nextProgress;
    });
  };

  const activeRap = RAPS_DATA.find(r => r.id === currentView);

  const handleNavigateHome = () => {
    setCurrentView('home');
  };

  const handleNavigateRap = (rapId: RAPId, mode: 'study' | 'evaluate' = 'study') => {
    setCurrentView(rapId);
    setCurrentMode(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCertificate = (result: EvaluationResult) => {
    setActiveCertificate(result);
    // Add to saved certificates if not already present
    setSavedCertificates(prev => {
      const filtered = prev.filter(c => c.certificateId !== result.certificateId);
      return [result, ...filtered];
    });
    saveCertificateToDb(result).catch((err) => console.error(err));
  };

  const syncApprenticeToRegistryAndDb = (
    apprenticeData: ApprenticeInfo,
    options?: { fromLogin?: boolean }
  ): ApprenticeRecord => {
    const normalizedDoc = apprenticeData.docNumber.trim();
    const safeId = makeSafeDocId(normalizedDoc);
    const existing = apprenticesRegistry.find(
      (a) => a.id === safeId || a.docNumber.trim() === normalizedDoc
    );
    const preserveLocation = options?.fromLogin === true && Boolean(existing);

    const recordToSave: ApprenticeRecord = {
      ...(existing || {}),
      ...apprenticeData,
      id: existing?.id || safeId,
      fullName: apprenticeData.fullName.trim() || existing?.fullName || '',
      docType: apprenticeData.docType || existing?.docType || 'C.C.',
      docNumber: normalizedDoc || existing?.docNumber || '',
      ficha: apprenticeData.ficha.trim() || existing?.ficha || '',
      center: preserveLocation && existing?.center
        ? existing.center
        : (apprenticeData.center || existing?.center || 'Centro de Servicios y Gestión Empresarial').trim(),
      regional: preserveLocation && existing?.regional
        ? existing.regional
        : (apprenticeData.regional || existing?.regional || 'Regional Antioquia').trim(),
      kolbResult:
        apprenticeData.kolbResult !== undefined && apprenticeData.kolbResult !== null
          ? apprenticeData.kolbResult
          : existing?.kolbResult ?? null,
      rapsProgress: existing?.rapsProgress,
      attemptsCountByRap: existing?.attemptsCountByRap,
      totalAttempts: existing?.totalAttempts,
      lastResult: existing?.lastResult,
      registeredAt: existing?.registeredAt || new Date().toLocaleDateString('es-CO'),
      updatedAt: new Date().toISOString(),
    };

    setApprenticesRegistry((prev) => {
      const idx = prev.findIndex(
        (a) => a.id === recordToSave.id || a.docNumber.trim() === normalizedDoc
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = recordToSave;
        return updated;
      }
      return [recordToSave, ...prev];
    });

    upsertApprenticeToDb(recordToSave, { preserveExistingLocation: options?.fromLogin === true })
      .then((persisted) => {
        setApprenticesRegistry((prev) =>
          prev.map((a) =>
            a.id === persisted.id || a.docNumber.trim() === persisted.docNumber.trim()
              ? persisted
              : a
          )
        );
        setApprentice((curr) =>
          curr.docNumber.trim() === persisted.docNumber.trim()
            ? { ...curr, ...persisted }
            : curr
        );
        if (persisted.rapsProgress) {
          setRapsProgress(persisted.rapsProgress);
        }
      })
      .catch((err) => console.error(err));

    return recordToSave;
  };

  const handleLoginSuccess = (apprenticeData: ApprenticeInfo, shouldPromptKolb: boolean) => {
    const savedRecord = syncApprenticeToRegistryAndDb(apprenticeData, { fromLogin: true });
    setApprentice(savedRecord);
    setRapsProgress(savedRecord.rapsProgress || createEmptyRapsProgress());
    setIsAuthenticated(true);
    setCurrentView('home');

    if (shouldPromptKolb) {
      setIsKolbModalOpen(true);
    }
  };

  const handleSwitchApprentice = () => {
    setIsAuthenticated(false);
    setRapsProgress(createEmptyRapsProgress());
    try {
      localStorage.removeItem('sena_apprentice_logged_in');
    } catch {}
  };

  const handleSaveKolbResult = (result: KolbResult) => {
    const updated: ApprenticeInfo = {
      ...apprentice,
      kolbResult: result,
    };
    setApprentice(updated);
    const normalizedDoc = updated.docNumber.trim();
    const safeId = makeSafeDocId(normalizedDoc);

    setApprenticesRegistry(prev =>
      prev.map(a =>
        a.id === safeId || a.docNumber.trim() === normalizedDoc
          ? { ...a, kolbResult: result, updatedAt: new Date().toISOString() }
          : a
      )
    );

    updateApprenticeKolbInDb(normalizedDoc, result).catch(() => {
      syncApprenticeToRegistryAndDb(updated);
    });
    setIsKolbModalOpen(false);
  };

  const handleUpdateApprenticeFromInstructor = (updatedRecord: ApprenticeRecord) => {
    setApprenticesRegistry(prev =>
      prev.map(a =>
        a.docNumber === updatedRecord.docNumber || a.id === updatedRecord.id ? updatedRecord : a
      )
    );
    upsertApprenticeToDb(updatedRecord).catch((err) => console.error(err));
    if (apprentice.docNumber.trim() === updatedRecord.docNumber.trim()) {
      setApprentice(updatedRecord);
    }
  };

  const handleDeleteApprenticeFromInstructor = (docNumberToDelete: string) => {
    const target = apprenticesRegistry.find(
      (a) => a.docNumber === docNumberToDelete || a.id === docNumberToDelete
    );
    setApprenticesRegistry(prev => prev.filter(a => a.docNumber !== docNumberToDelete));
    deleteApprenticeFromDb(target?.id || docNumberToDelete).catch((err) => console.error(err));
    if (apprentice.docNumber === docNumberToDelete) {
      setIsAuthenticated(false);
    }
  };

  // If user has not entered data or chose to switch, display the Apprentice Login Landing Page
  if (!isAuthenticated) {
    return (
      <>
        <ApprenticeLoginLanding
          initialData={apprentice}
          existingApprentices={apprenticesRegistry}
          onRegisterApprentice={(data) => syncApprenticeToRegistryAndDb(data, { fromLogin: true })}
          onLoginSuccess={handleLoginSuccess}
          onOpenInstructorPanel={() => setIsInstructorPanelOpen(true)}
          onOpenManual={() => {
            window.open('/assets/aistudio/2026__22_43_3ed34c0a.mp4', '_blank');
            setIsManualOpen(true);
          }}
        />

        {isInstructorPanelOpen && (
          <InstructorPanelModal
            apprentices={apprenticesRegistry}
            allCertificates={savedCertificates}
            instructors={instructorsRegistry}
            onUpdateApprentice={handleUpdateApprenticeFromInstructor}
            onDeleteApprentice={handleDeleteApprenticeFromInstructor}
            onUpdateInstructor={handleUpdateInstructor}
            onDeleteInstructor={handleDeleteInstructor}
            onInstructorsSynced={setInstructorsRegistry}
            onOpenAnalyticsDashboard={(fichas) => {
              setAnalyticsAllowedFichas(fichas);
              setIsAnalyticsDashboardOpen(true);
            }}
            onOpenRegisterInstructor={() => setIsRegisterInstructorOpen(true)}
            onViewCertificate={(cert) => {
              setIsInstructorPanelOpen(false);
              handleViewCertificate(cert);
            }}
            onClose={() => setIsInstructorPanelOpen(false)}
          />
        )}

        {isRegisterInstructorOpen && (
          <InstructorRegisterModal
            availableFichas={Array.from(new Set(apprenticesRegistry.map((a) => a.ficha)))}
            existingInstructors={instructorsRegistry}
            onRegisterSuccess={handleRegisterInstructorSuccess}
            onClose={() => setIsRegisterInstructorOpen(false)}
          />
        )}

        {isAnalyticsDashboardOpen && (
          <AnalyticsDashboardModal
            apprentices={apprenticesRegistry}
            allCertificates={savedCertificates}
            allowedFichas={analyticsAllowedFichas}
            onClose={() => {
              setIsAnalyticsDashboardOpen(false);
              setAnalyticsAllowedFichas(undefined);
            }}
          />
        )}

        {isManualOpen && (
          <ApprenticeManualModal
            onClose={() => setIsManualOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Institutional Top Navbar */}
      <Navbar
        currentView={currentView}
        currentMode={currentMode}
        onNavigateHome={handleNavigateHome}
        onNavigateRap={handleNavigateRap}
        apprentice={apprentice}
        onOpenApprenticeModal={() => setIsApprenticeModalOpen(true)}
        onOpenKolbModal={() => setIsKolbModalOpen(true)}
        onOpenInstructorPanel={() => setIsInstructorPanelOpen(true)}
        onOpenManual={() => {
          window.open('/assets/aistudio/2026__22_43_3ed34c0a.mp4', '_blank');
          setIsManualOpen(true);
        }}
        onSwitchApprentice={handleSwitchApprentice}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentView === 'home' ? (
          <HomeOverview
            raps={RAPS_DATA}
            apprentice={apprentice}
            rapsProgress={rapsProgress}
            onSelectRapMode={(rapId, mode) => handleNavigateRap(rapId, mode)}
            onOpenApprenticeModal={() => setIsApprenticeModalOpen(true)}
            onOpenKolbTest={() => setIsKolbModalOpen(true)}
          />
        ) : activeRap ? (
          <div className="space-y-6">
            {/* RAP Top Control Bar with Back Button and Mode Switch (Estudiar / Evaluar) */}
            <div className="no-print flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <button
                onClick={handleNavigateHome}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#39A900]" />
                <span>Volver al Inicio</span>
              </button>

              {/* Mode Switcher: Estudiar / Evaluar */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setCurrentMode('study')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                    currentMode === 'study'
                      ? 'bg-white text-[#00324D] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className={`w-4 h-4 ${currentMode === 'study' ? 'text-[#007832]' : 'text-slate-500'}`} />
                  <span>Estudiar</span>
                </button>

                <button
                  onClick={() => setCurrentMode('evaluate')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                    currentMode === 'evaluate'
                      ? 'bg-[#39A900] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Evaluar</span>
                </button>
              </div>

              {/* Quick info tag */}
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-[#39A900]" />
                <span className="font-semibold">{activeRap.code}: {activeRap.shortName}</span>
              </div>
            </div>

            {/* View Mode Rendering */}
            {currentMode === 'study' ? (
              <RapStudyView
                rap={activeRap}
                onGoToEvaluation={() => setCurrentMode('evaluate')}
              />
            ) : (
              <RapEvaluationView
                rap={activeRap}
                apprentice={apprentice}
                rapProgress={rapsProgress[activeRap.id]}
                onGoToStudy={() => setCurrentMode('study')}
                onViewCertificate={handleViewCertificate}
                onRecordResult={handleRecordResult}
              />
            )}
          </div>
        ) : null}
      </main>

      {/* Institutional Footer */}
      <footer className="no-print mt-12 border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SenaLogo className="h-7 w-auto" variant="color" showText={false} />
            <span className="font-bold text-[#00324D]">SENA</span>
            <span>·</span>
            <span>Centro de servicios y gestión empresarial - Regional Antioquia</span>
          </div>
          <div className="text-center sm:text-right text-[11px]">
            Servicio Nacional de Aprendizaje SENA · Colombia · Formación Profesional Integral con Calidad
          </div>
        </div>
      </footer>

      {/* Official Certificate Modal */}
      {activeCertificate && (
        <CertificateModal
          result={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}

      {/* Apprentice Profile Edit Modal */}
      {isApprenticeModalOpen && (
        <ApprenticeModal
          currentInfo={apprentice}
          onSave={(newInfo) => {
            const savedRecord = syncApprenticeToRegistryAndDb(newInfo);
            setApprentice(savedRecord);
          }}
          onClose={() => setIsApprenticeModalOpen(false)}
        />
      )}

      {/* Kolb Learning Style Test Modal */}
      {isKolbModalOpen && (
        <KolbTestModal
          apprentice={apprentice}
          onSaveResult={handleSaveKolbResult}
          onClose={() => setIsKolbModalOpen(false)}
        />
      )}

      {/* Instructor Control Panel Modal */}
      {isInstructorPanelOpen && (
        <InstructorPanelModal
          apprentices={apprenticesRegistry}
          allCertificates={savedCertificates}
          instructors={instructorsRegistry}
          onUpdateApprentice={handleUpdateApprenticeFromInstructor}
          onDeleteApprentice={handleDeleteApprenticeFromInstructor}
          onUpdateInstructor={handleUpdateInstructor}
          onDeleteInstructor={handleDeleteInstructor}
          onInstructorsSynced={setInstructorsRegistry}
          onOpenAnalyticsDashboard={(fichas) => {
            setAnalyticsAllowedFichas(fichas);
            setIsAnalyticsDashboardOpen(true);
          }}
          onOpenRegisterInstructor={() => setIsRegisterInstructorOpen(true)}
          onViewCertificate={(cert) => {
            setIsInstructorPanelOpen(false);
            handleViewCertificate(cert);
          }}
          onClose={() => setIsInstructorPanelOpen(false)}
        />
      )}

      {/* Instructor Registration Modal */}
      {isRegisterInstructorOpen && (
        <InstructorRegisterModal
          availableFichas={Array.from(new Set(apprenticesRegistry.map((a) => a.ficha)))}
          existingInstructors={instructorsRegistry}
          onRegisterSuccess={handleRegisterInstructorSuccess}
          onClose={() => setIsRegisterInstructorOpen(false)}
        />
      )}

      {/* Pedagogical Analytics Dashboard Modal */}
      {isAnalyticsDashboardOpen && (
        <AnalyticsDashboardModal
          apprentices={apprenticesRegistry}
          allCertificates={savedCertificates}
          allowedFichas={analyticsAllowedFichas}
          onClose={() => {
            setIsAnalyticsDashboardOpen(false);
            setAnalyticsAllowedFichas(undefined);
          }}
        />
      )}

      {/* Apprentice User Manual Modal */}
      {isManualOpen && (
        <ApprenticeManualModal
          onClose={() => setIsManualOpen(false)}
        />
      )}
    </div>
  );
}
