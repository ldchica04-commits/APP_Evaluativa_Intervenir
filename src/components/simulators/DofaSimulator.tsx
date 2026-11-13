import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, RefreshCw, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

interface DofaItem {
  id: string;
  text: string;
  category: 'F' | 'D' | 'O' | 'A';
  pestelType?: string;
  feedback: string;
}

const INITIAL_ITEMS: DofaItem[] = [
  {
    id: '1',
    text: 'Certificación de calidad ISO 9001:2015 obtenida y vigente en toda la línea de producción.',
    category: 'F',
    pestelType: 'Interno',
    feedback: '¡Correcto! Es una capacidad interna sobresaliente y controlable que otorga ventaja competitiva (Fortaleza).'
  },
  {
    id: '2',
    text: 'Aumento del 25% en la tasa de cambio del dólar (TRM) que encarece la importación de maquinaria.',
    category: 'A',
    pestelType: 'Económico (PESTEL)',
    feedback: '¡Exacto! Es un factor macroeconómico externo no controlable desfavorable para la empresa (Amenaza).'
  },
  {
    id: '3',
    text: 'Alta rotación de personal operativo en planta por falta de un plan de incentivos estructurado.',
    category: 'D',
    pestelType: 'Interno',
    feedback: '¡Muy bien! Es una vulnerabilidad interna de gestión de talento humano subsanable por la organización (Debilidad).'
  },
  {
    id: '4',
    text: 'Convocatoria del Fondo Emprender y Ministerio de Comercio para subsidios de transformación digital.',
    category: 'O',
    pestelType: 'Político / Legal (PESTEL)',
    feedback: '¡Excelente! Es una condición externa favorable del entorno que la empresa puede aprovechar (Oportunidad).'
  },
  {
    id: '5',
    text: 'Falta de mantenimiento preventivo documentado en los equipos de envasado al vacío.',
    category: 'D',
    pestelType: 'Interno',
    feedback: '¡Correcto! Es una debilidad técnica interna que genera riesgos de paradas no programadas.'
  },
  {
    id: '6',
    text: 'Creciente tendencia de consumidores jóvenes hacia productos sostenibles y con empaque ecológico.',
    category: 'O',
    pestelType: 'Social / Ecológico (PESTEL)',
    feedback: '¡Exacto! Es una oportunidad del mercado social y ecológico para lanzar nuevas líneas verdes.'
  }
];

export const DofaSimulator: React.FC = () => {
  const [userAssignments, setUserAssignments] = useState<Record<string, 'F' | 'D' | 'O' | 'A' | null>>({
    '1': null,
    '2': null,
    '3': null,
    '4': null,
    '5': null,
    '6': null
  });
  const [showResults, setShowResults] = useState(false);
  const [activeStrategyTab, setActiveStrategyTab] = useState<'FO' | 'DO' | 'FA' | 'DA'>('FO');

  const handleSelect = (itemId: string, category: 'F' | 'D' | 'O' | 'A') => {
    setUserAssignments(prev => ({
      ...prev,
      [itemId]: category
    }));
    setShowResults(false);
  };

  const resetSimulator = () => {
    setUserAssignments({
      '1': null,
      '2': null,
      '3': null,
      '4': null,
      '5': null,
      '6': null
    });
    setShowResults(false);
  };

  const completedCount = Object.values(userAssignments).filter(v => v !== null).length;
  const correctCount = INITIAL_ITEMS.filter(item => userAssignments[item.id] === item.category).length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-emerald-50 via-slate-50 to-white border-b border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <span>Taller Práctico Interactivo</span>
              <span>·</span>
              <span>RAP 1: Diagnóstico Empresarial</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Laboratorio de Clasificación DOFA & Cruces Estratégicos
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Analice cada situación de la empresa y clasifíquela correctamente en la matriz. Luego explore cómo generar los cruces estratégicos FO, DO, FA y DA.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetSimulator}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reiniciar
            </button>
            <button
              onClick={() => setShowResults(true)}
              disabled={completedCount === 0}
              className={`px-4 py-2 text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2 ${
                completedCount === INITIAL_ITEMS.length
                  ? 'bg-[#39A900] hover:bg-[#007832] text-white'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Verificar Diagnóstico ({completedCount}/{INITIAL_ITEMS.length})
            </button>
          </div>
        </div>
      </div>

      {/* Grid of items to classify */}
      <div className="p-6">
        <div className="text-xs font-medium text-slate-500 mb-3 flex items-center gap-2">
          <span>Clasifique los siguientes factores identificados en la empresa:</span>
          <span className="text-slate-400">Seleccione F (Fortaleza), D (Debilidad), O (Oportunidad) o A (Amenaza)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INITIAL_ITEMS.map((item, idx) => {
            const currentSelection = userAssignments[item.id];
            const isEvaluated = showResults;
            const isCorrect = currentSelection === item.category;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all ${
                  isEvaluated
                    ? isCorrect
                      ? 'bg-emerald-50/60 border-emerald-300'
                      : 'bg-rose-50/60 border-rose-300'
                    : currentSelection
                    ? 'bg-slate-50 border-slate-300'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Factor #{idx + 1}
                  </span>
                  {item.pestelType && (
                    <span className="text-[11px] text-slate-500">
                      Entorno: {item.pestelType}
                    </span>
                  )}
                </div>

                <p className="text-sm font-medium text-slate-800 leading-snug mb-3">
                  {item.text}
                </p>

                {/* Classification buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSelect(item.id, 'F')}
                    className={`flex-1 py-1 px-2 text-xs font-semibold rounded border transition-colors ${
                      currentSelection === 'F'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Fortaleza (F)
                  </button>
                  <button
                    onClick={() => handleSelect(item.id, 'D')}
                    className={`flex-1 py-1 px-2 text-xs font-semibold rounded border transition-colors ${
                      currentSelection === 'D'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Debilidad (D)
                  </button>
                  <button
                    onClick={() => handleSelect(item.id, 'O')}
                    className={`flex-1 py-1 px-2 text-xs font-semibold rounded border transition-colors ${
                      currentSelection === 'O'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Oportunidad (O)
                  </button>
                  <button
                    onClick={() => handleSelect(item.id, 'A')}
                    className={`flex-1 py-1 px-2 text-xs font-semibold rounded border transition-colors ${
                      currentSelection === 'A'
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Amenaza (A)
                  </button>
                </div>

                {/* Instant Feedback on verification */}
                {isEvaluated && (
                  <div className={`mt-3 pt-2 text-xs border-t ${isCorrect ? 'text-emerald-800 border-emerald-200' : 'text-rose-800 border-rose-200'}`}>
                    <div className="flex items-center gap-1.5 font-semibold mb-0.5">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>¡Correcto! ({item.category})</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>Incorrecto (Categoría real: {item.category})</span>
                        </>
                      )}
                    </div>
                    <p className="text-[12px] opacity-90">{item.feedback}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Global Evaluation Banner */}
        {showResults && (
          <div className="mt-6 p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Resultado del Taller Práctico
              </div>
              <div className="text-lg font-bold mt-0.5">
                Puntaje Obtenido: {correctCount} de {INITIAL_ITEMS.length} aciertos ({Math.round((correctCount / INITIAL_ITEMS.length) * 100)}%)
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {correctCount >= 5 
                  ? '¡Excelente dominio del diagnóstico! Ha clasificado con precisión los factores internos y del macroentorno.' 
                  : 'Buen ejercicio. Revise los factores no acertados para fortalecer el concepto antes de la evaluación oficial.'}
              </p>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                correctCount >= 4 ? 'bg-[#39A900] text-white' : 'bg-amber-500 text-slate-900'
              }`}>
                {correctCount >= 4 ? 'Competencia en Progreso' : 'Reforzar Conceptos'}
              </span>
            </div>
          </div>
        )}

        {/* Interactive Strategic Crossings Guide */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#39A900]" />
                Cruces de Estrategias Organizacionales (Matriz DOFA Cruzada)
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Conozca cómo se articulan las variables para formular planes de mejoramiento continuo:
              </p>
            </div>

            {/* Strategy selector tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              {(['FO', 'DO', 'FA', 'DA'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveStrategyTab(tab)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    activeStrategyTab === tab
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Estrategia {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            {activeStrategyTab === 'FO' && (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                  <span>Estrategia Maxi - Maxi (Fortalezas + Oportunidades)</span>
                </div>
                <h5 className="text-sm font-bold text-slate-900 mb-1">
                  Aprovechar al máximo las capacidades internas para capturar oportunidades de mercado.
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ejemplo formulado para el caso: Utilizar la <strong>Certificación ISO 9001 (F1)</strong> para postularse como proveedor calificado a las <strong>Convocatorias de fomento gubernamental y compras sostenibles (O4, O6)</strong>, acelerando la penetración en mercados institucionales.
                </p>
              </div>
            )}

            {activeStrategyTab === 'DO' && (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                  <span>Estrategia Mini - Maxi (Debilidades + Oportunidades)</span>
                </div>
                <h5 className="text-sm font-bold text-slate-900 mb-1">
                  Superar las vulnerabilidades internas aprovechando las condiciones favorables externas.
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ejemplo formulado para el caso: Aprovechar los <strong>subsidios de transformación digital (O4)</strong> para implementar un software de mantenimiento preventivo y control de turnos que reduzca la <strong>falta de mantenimiento y rotación laboral (D3, D5)</strong>.
                </p>
              </div>
            )}

            {activeStrategyTab === 'FA' && (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                  <span>Estrategia Maxi - Mini (Fortalezas + Amenazas)</span>
                </div>
                <h5 className="text-sm font-bold text-slate-900 mb-1">
                  Utilizar la solidez interna para blindarse y neutralizar riesgos del entorno.
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ejemplo formulado para el caso: Respaldarse en la <strong>alta calidad y estandarización del proceso (F1)</strong> para justificar márgenes ante clientes y amortiguar el <strong>impacto de la devaluación y aumento de costos de maquinaria (A2)</strong>.
                </p>
              </div>
            )}

            {activeStrategyTab === 'DA' && (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
                  <span>Estrategia Mini - Mini (Debilidades + Amenazas - Defensiva)</span>
                </div>
                <h5 className="text-sm font-bold text-slate-900 mb-1">
                  Reducir fallas internas para evitar que las amenazas externas colapsen la operación.
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ejemplo formulado para el caso: Diseñar de inmediato un protocolo de contingencia y retención de talento clave (D3) para evitar paradas operativas que agraven las pérdidas financieras por la crisis cambiaria (A2).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
