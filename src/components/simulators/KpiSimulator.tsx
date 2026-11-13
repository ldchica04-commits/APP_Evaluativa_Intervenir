import React, { useState } from 'react';
import { Gauge, Calculator, CheckCircle2, AlertTriangle, AlertCircle, TrendingUp, Sliders } from 'lucide-react';

export const KpiSimulator: React.FC = () => {
  // Simulator state
  const [goal, setGoal] = useState<number>(100);
  const [actual, setActual] = useState<number>(85);
  const [budgetProgrammed, setBudgetProgrammed] = useState<number>(5000000);
  const [budgetExecuted, setBudgetExecuted] = useState<number>(5200000);

  // Calculations
  const eficaciaPercentage = goal > 0 ? Math.round((actual / goal) * 100) : 0;
  const eficienciaPercentage = budgetExecuted > 0 ? Math.round((budgetProgrammed / budgetExecuted) * 100) : 0;
  const efectividadScore = Math.round((eficaciaPercentage + eficienciaPercentage) / 2);

  // Semaphore determination:
  // Verde: >= 90%
  // Amarillo: 75% - 89%
  // Rojo: < 75%
  const getTrafficStatus = (value: number) => {
    if (value >= 90) return { color: 'text-emerald-700', bg: 'bg-emerald-500', label: 'Verde (Óptimo / Cumple Meta)', status: 'green' };
    if (value >= 75) return { color: 'text-amber-700', bg: 'bg-amber-500', label: 'Amarillo (Zona Preventiva de Alerta)', status: 'yellow' };
    return { color: 'text-rose-700', bg: 'bg-rose-500', label: 'Rojo (Zona Crítica / No Cumplimiento)', status: 'red' };
  };

  const status = getTrafficStatus(eficaciaPercentage);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-emerald-50 via-slate-50 to-white border-b border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <span>Simulador Matemático & Dashboard</span>
              <span>·</span>
              <span>RAP 4: Creación y Análisis de Indicadores</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Calculadora y Tablero de Control de KPIs
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Modifique las variables en tiempo real para observar cómo se calculan la eficacia, eficiencia y efectividad con su correspondiente semaforización de control.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Parameters Form */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Sliders className="w-3.5 h-3.5" />
              1. Medición de Eficacia (Logro de Metas)
            </h4>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Meta Programada (Denominador):</span>
                  <span className="font-mono font-bold text-slate-900">{goal} pedidos</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="200"
                  step="5"
                  value={goal}
                  onChange={(e) => setGoal(Number(e.target.value))}
                  className="w-full accent-[#39A900] h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Resultado Real Alcanzado (Numerador):</span>
                  <span className="font-mono font-bold text-[#007832]">{actual} pedidos</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="5"
                  value={actual}
                  onChange={(e) => setActual(Number(e.target.value))}
                  className="w-full accent-[#39A900] h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="pt-2 text-[11px] text-slate-500 font-mono">
                Fórmula: ( {actual} / {goal} ) × 100 = <strong className="text-slate-900">{eficaciaPercentage}%</strong>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Calculator className="w-3.5 h-3.5" />
              2. Medición de Eficiencia (Uso de Recursos Financieros)
            </h4>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Presupuesto Programado:</span>
                  <span className="font-mono font-bold text-slate-900">${budgetProgrammed.toLocaleString('es-CO')}</span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="10000000"
                  step="500000"
                  value={budgetProgrammed}
                  onChange={(e) => setBudgetProgrammed(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Costo Real Ejecutado:</span>
                  <span className="font-mono font-bold text-slate-900">${budgetExecuted.toLocaleString('es-CO')}</span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="10000000"
                  step="500000"
                  value={budgetExecuted}
                  onChange={(e) => setBudgetExecuted(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="pt-2 text-[11px] text-slate-500 font-mono">
                Eficiencia Presupuestal: <strong className="text-slate-900">{eficienciaPercentage}%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Semaphore & Dashboard Cards */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="p-5 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Semáforo del Indicador de Eficacia
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${status.color} bg-slate-100`}>
                {status.label}
              </span>
            </div>

            {/* Gauge Visual Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs font-mono font-bold mb-1.5">
                <span>0%</span>
                <span className="text-slate-900 text-xl font-extrabold">{eficaciaPercentage}%</span>
                <span>100%</span>
              </div>
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200 flex">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${status.bg}`}
                  style={{ width: `${Math.min(eficaciaPercentage, 100)}%` }}
                />
              </div>

              {/* Threshold tick marks */}
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 px-1">
                <span>Rojo (&lt;75%)</span>
                <span>Amarillo (75-89%)</span>
                <span>Verde (≥90%)</span>
              </div>
            </div>

            {/* Summary Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-100">
              <div className="p-2 rounded bg-slate-50">
                <div className="text-[10px] uppercase font-bold text-slate-400">Eficacia</div>
                <div className="text-base font-extrabold text-slate-900 font-mono">{eficaciaPercentage}%</div>
              </div>
              <div className="p-2 rounded bg-slate-50">
                <div className="text-[10px] uppercase font-bold text-slate-400">Eficiencia</div>
                <div className="text-base font-extrabold text-slate-900 font-mono">{eficienciaPercentage}%</div>
              </div>
              <div className="p-2 rounded bg-slate-50">
                <div className="text-[10px] uppercase font-bold text-slate-400">Efectividad</div>
                <div className="text-base font-extrabold text-[#39A900] font-mono">{efectividadScore}%</div>
              </div>
            </div>
          </div>

          {/* Action Plan Guidance (5W2H) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4 text-slate-700" />
              <span>Decisión de Gestión ante este Desempeño:</span>
            </div>

            {status.status === 'green' && (
              <p className="text-xs text-emerald-900 leading-relaxed">
                <strong>Meta Alcanzada:</strong> El proceso se encuentra bajo control estadístico. Corresponde documentar la lección aprendida y mantener la estandarización del procedimiento.
              </p>
            )}

            {status.status === 'yellow' && (
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>Alerta Preventiva:</strong> El indicador se acerca al límite inferior permitido. Se recomienda convocar al líder del proceso para revisar desviaciones antes de que caiga a zona crítica.
              </p>
            )}

            {status.status === 'red' && (
              <p className="text-xs text-rose-900 leading-relaxed">
                <strong>Acción Correctiva Obligatoria:</strong> El resultado incumple la meta fijada. Debe abrirse de forma inmediata un plan de acción 5W2H y aplicar espina de pescado (Ishikawa) para encontrar la causa raíz.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
