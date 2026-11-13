import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, Lightbulb, CheckCircle2, RotateCcw } from 'lucide-react';

interface AuditScenario {
  id: string;
  title: string;
  process: string;
  evidence: string;
  isoClause: string;
  correctClassification: 'MAYOR' | 'MENOR' | 'CONFORMIDAD' | 'MEJORA';
  explanation: string;
}

const AUDIT_SCENARIOS: AuditScenario[] = [
  {
    id: 'aud_1',
    title: 'Caso 1: Mantenimiento y Calibración en Laboratorio',
    process: 'Control de Calidad y Metrología',
    evidence: 'En la inspección física se constata que 8 de 8 termohigrómetros de la bodega de almacenamiento biológico tienen el certificado de calibración vencido hace 9 meses. No existe plan de contingencia ni trazabilidad metrológica.',
    isoClause: 'ISO 9001:2015 Numeral 7.1.5 (Recursos de seguimiento y medición)',
    correctClassification: 'MAYOR',
    explanation: 'Al ser un incumplimiento generalizado y total sobre la totalidad de los equipos críticos que garantizan la preservación del producto, se clasifica como No Conformidad Mayor.'
  },
  {
    id: 'aud_2',
    title: 'Caso 2: Registro de Capacitación de Personal',
    process: 'Gestión de Talento Humano',
    evidence: 'Se verifican 40 carpetas de inducción de nuevos colaboradores. En 39 carpetas se encuentran las evaluaciones y firmas completas. En una (1) carpeta falta la firma del evaluador en la última hoja por olvido involuntario.',
    isoClause: 'ISO 9001:2015 Numeral 7.2 (Competencia)',
    correctClassification: 'MENOR',
    explanation: 'Es un hallazgo aislado y esporádico (1 de 40) que no evidencia ausencia del control ni afecta de forma sistémica la competencia del personal. Corresponde a una No Conformidad Menor.'
  },
  {
    id: 'aud_3',
    title: 'Caso 3: Digitalización de Sugerencias de Clientes',
    process: 'Servicio al Cliente y PQR',
    evidence: 'El proceso atiende oportunamente el 100% de las PQR en buzón físico cumpliendo el procedimiento formal. No obstante, el auditor observa que habilitar un código QR en los puntos de venta agilizaría la captura de opiniones de usuarios jóvenes.',
    isoClause: 'ISO 9001:2015 Numeral 10.3 (Mejora continua)',
    correctClassification: 'MEJORA',
    explanation: 'No se está violando ningún requisito normativo ni procedimental actual; es una recomendación de valor agregado para optimizar la eficiencia y alcance futuro (Oportunidad de Mejora).'
  },
  {
    id: 'aud_4',
    title: 'Caso 4: Trazabilidad y Liberación de Lote',
    process: 'Producción y Empaque',
    evidence: 'Se audita el lote de producción #8472. Se revisan las órdenes de producción, firmas de liberación de calidad, registros de pesaje y rotulado según el procedimiento PR-PRD-004. Todos los registros coinciden.',
    isoClause: 'ISO 9001:2015 Numeral 8.6 (Liberación de los productos)',
    correctClassification: 'CONFORMIDAD',
    explanation: 'La evidencia objetiva demuestra cumplimiento pleno y satisfactorio con los requisitos de la norma y el procedimiento operativo interno (Conformidad).'
  }
];

export const AuditSimulator: React.FC = () => {
  const [userChoices, setUserChoices] = useState<Record<string, string | null>>({
    aud_1: null,
    aud_2: null,
    aud_3: null,
    aud_4: null
  });
  const [isVerified, setIsVerified] = useState(false);

  const handleSelect = (scenarioId: string, classification: string) => {
    setUserChoices(prev => ({
      ...prev,
      [scenarioId]: classification
    }));
    setIsVerified(false);
  };

  const resetAll = () => {
    setUserChoices({
      aud_1: null,
      aud_2: null,
      aud_3: null,
      aud_4: null
    });
    setIsVerified(false);
  };

  const answeredCount = Object.values(userChoices).filter(Boolean).length;
  const correctCount = AUDIT_SCENARIOS.filter(s => userChoices[s.id] === s.correctClassification).length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-emerald-50 via-slate-50 to-white border-b border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <span>Laboratorio de Campo</span>
              <span>·</span>
              <span>RAP 3: Auditorías Internas ISO 19011</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Clasificador Técnico de Hallazgos de Auditoría
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Examine las evidencias recolectadas en el trabajo de campo y determine si corresponde a No Conformidad Mayor, Menor, Oportunidad de Mejora o Conformidad.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetAll}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar
            </button>
            <button
              onClick={() => setIsVerified(true)}
              disabled={answeredCount === 0}
              className={`px-4 py-2 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all ${
                answeredCount === AUDIT_SCENARIOS.length
                  ? 'bg-[#39A900] hover:bg-[#007832] text-white'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Validar Hallazgos ({answeredCount}/{AUDIT_SCENARIOS.length})
            </button>
          </div>
        </div>
      </div>

      {/* Scenarios List */}
      <div className="p-6 space-y-4">
        {AUDIT_SCENARIOS.map((scenario) => {
          const selected = userChoices[scenario.id];
          const isCorrect = selected === scenario.correctClassification;

          return (
            <div
              key={scenario.id}
              className={`p-5 rounded-xl border transition-all ${
                isVerified
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/40'
                    : 'border-rose-300 bg-rose-50/40'
                  : selected
                  ? 'border-slate-300 bg-slate-50/50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                  {scenario.title}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  Proceso: <strong>{scenario.process}</strong>
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 mb-3 text-xs leading-relaxed text-slate-800">
                <div className="font-semibold text-slate-500 mb-1 uppercase tracking-wider text-[11px]">
                  Evidencia Objetiva Recolectada por el Auditor:
                </div>
                {scenario.evidence}
              </div>

              <div className="text-[11px] text-slate-500 mb-3">
                Criterio Normativo: <span className="font-mono text-slate-700">{scenario.isoClause}</span>
              </div>

              {/* Classification choices */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button
                  onClick={() => handleSelect(scenario.id, 'CONFORMIDAD')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                    selected === 'CONFORMIDAD'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Conformidad
                </button>

                <button
                  onClick={() => handleSelect(scenario.id, 'MEJORA')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                    selected === 'MEJORA'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  Oportunidad Mejora
                </button>

                <button
                  onClick={() => handleSelect(scenario.id, 'MENOR')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                    selected === 'MENOR'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  NC Menor
                </button>

                <button
                  onClick={() => handleSelect(scenario.id, 'MAYOR')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                    selected === 'MAYOR'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <AlertOctagon className="w-3.5 h-3.5" />
                  NC Mayor
                </button>
              </div>

              {/* Verified Feedback */}
              {isVerified && (
                <div className={`mt-3 pt-3 border-t text-xs ${isCorrect ? 'text-emerald-800 border-emerald-200' : 'text-rose-800 border-rose-200'}`}>
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>¡Dictamen Correcto! Clasificación oficial: {scenario.correctClassification}</span>
                      </>
                    ) : (
                      <>
                        <AlertOctagon className="w-4 h-4 text-rose-600" />
                        <span>Dictamen Erróneo. La clasificación técnica correcta es: {scenario.correctClassification}</span>
                      </>
                    )}
                  </div>
                  <p className="text-[12px] opacity-90">{scenario.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
