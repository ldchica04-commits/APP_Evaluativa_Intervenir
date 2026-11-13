import React, { useState, useMemo } from 'react';
import { ApprenticeRecord, EvaluationResult, KolbStyle, RAPId } from '../types';
import { SenaLogo } from './SenaLogo';
import { RAPS_DATA } from '../data/senaData';
import { STYLE_METADATA } from '../data/differentiatedQuestions';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Brain, 
  Filter, 
  Award, 
  X, 
  Sparkles, 
  Zap, 
  Target, 
  CheckCircle2, 
  HelpCircle, 
  Users, 
  Printer, 
  Layers,
  ArrowUpRight,
  Lightbulb
} from 'lucide-react';

interface AnalyticsDashboardModalProps {
  apprentices: ApprenticeRecord[];
  allCertificates: EvaluationResult[];
  allowedFichas?: string[];
  onClose: () => void;
}

const KOB_STYLES: KolbStyle[] = ['Acomodador', 'Divergente', 'Convergente', 'Asimilador'];

const STYLE_COLORS: Record<KolbStyle, { bg: string; text: string; border: string; bar: string; fill: string }> = {
  Acomodador: {
    bg: 'bg-emerald-50',
    text: 'text-[#007832]',
    border: 'border-emerald-300',
    bar: 'bg-[#39A900]',
    fill: '#39A900'
  },
  Divergente: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-300',
    bar: 'bg-blue-600',
    fill: '#2563EB'
  },
  Convergente: {
    bg: 'bg-teal-50',
    text: 'text-teal-800',
    border: 'border-teal-300',
    bar: 'bg-teal-600',
    fill: '#0D9488'
  },
  Asimilador: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-800',
    border: 'border-indigo-300',
    bar: 'bg-indigo-600',
    fill: '#4F46E5'
  }
};

export const AnalyticsDashboardModal: React.FC<AnalyticsDashboardModalProps> = ({
  apprentices,
  allCertificates,
  allowedFichas,
  onClose,
}) => {
  const [selectedFicha, setSelectedFicha] = useState<string>('ALL');

  // Base apprentices scoped by allowedFichas if provided
  const baseApprentices = useMemo(() => {
    if (allowedFichas && allowedFichas.length > 0) {
      return apprentices.filter((a) => allowedFichas.includes(a.ficha));
    }
    return apprentices;
  }, [apprentices, allowedFichas]);

  // Unique Fichas for filter
  const uniqueFichas = useMemo(() => {
    return Array.from(new Set(baseApprentices.map((a) => a.ficha)));
  }, [baseApprentices]);

  // Filtered apprentices based on selected Ficha
  const filteredApprentices = useMemo(() => {
    if (selectedFicha === 'ALL') return baseApprentices;
    return baseApprentices.filter((a) => a.ficha === selectedFicha);
  }, [baseApprentices, selectedFicha]);

  // Document numbers of filtered apprentices
  const filteredDocNumbers = useMemo(() => {
    return new Set(filteredApprentices.map((a) => a.docNumber.trim()));
  }, [filteredApprentices]);

  // Filtered certificates based on selected Ficha
  const filteredCertificates = useMemo(() => {
    return allCertificates.filter((c) => filteredDocNumbers.has(c.apprentice.docNumber.trim()));
  }, [allCertificates, filteredDocNumbers]);

  // 1. Kolb Style Distribution Computation
  const kolbDistribution = useMemo(() => {
    const counts: Record<KolbStyle, number> = {
      Acomodador: 0,
      Divergente: 0,
      Convergente: 0,
      Asimilador: 0,
    };

    filteredApprentices.forEach((app) => {
      const style = app.kolbResult?.style;
      if (style && counts[style] !== undefined) {
        counts[style] += 1;
      }
    });

    const totalWithStyle = Object.values(counts).reduce((a, b) => a + b, 0);

    return {
      counts,
      totalWithStyle,
      percentages: {
        Acomodador: totalWithStyle > 0 ? Math.round((counts.Acomodador / totalWithStyle) * 100) : 0,
        Divergente: totalWithStyle > 0 ? Math.round((counts.Divergente / totalWithStyle) * 100) : 0,
        Convergente: totalWithStyle > 0 ? Math.round((counts.Convergente / totalWithStyle) * 100) : 0,
        Asimilador: totalWithStyle > 0 ? Math.round((counts.Asimilador / totalWithStyle) * 100) : 0,
      }
    };
  }, [filteredApprentices]);

  // 2. Efficiency by Kolb Style Computation
  // (Approval rate, avg score %, avg attempts until approval)
  const styleEfficiencyStats = useMemo(() => {
    const stats: Record<KolbStyle, {
      totalTests: number;
      approvedTests: number;
      scoresSum: number;
      attemptsCount: number;
      apprenticeCount: number;
    }> = {
      Acomodador: { totalTests: 0, approvedTests: 0, scoresSum: 0, attemptsCount: 0, apprenticeCount: kolbDistribution.counts.Acomodador },
      Divergente: { totalTests: 0, approvedTests: 0, scoresSum: 0, attemptsCount: 0, apprenticeCount: kolbDistribution.counts.Divergente },
      Convergente: { totalTests: 0, approvedTests: 0, scoresSum: 0, attemptsCount: 0, apprenticeCount: kolbDistribution.counts.Convergente },
      Asimilador: { totalTests: 0, approvedTests: 0, scoresSum: 0, attemptsCount: 0, apprenticeCount: kolbDistribution.counts.Asimilador },
    };

    filteredCertificates.forEach((cert) => {
      const style = cert.evaluatedStyle;
      if (stats[style]) {
        stats[style].totalTests += 1;
        if (cert.isApproved) stats[style].approvedTests += 1;
        stats[style].scoresSum += cert.percentage;
      }
    });

    // Compute metrics
    const results = KOB_STYLES.map((style) => {
      const s = stats[style];
      const approvalRate = s.totalTests > 0 ? Math.round((s.approvedTests / s.totalTests) * 100) : 0;
      const avgPercentage = s.totalTests > 0 ? Math.round(s.scoresSum / s.totalTests) : 0;
      // Efficiency score = (Approval Rate * 0.6) + (Avg Percentage * 0.4)
      const efficiencyIndex = Math.round((approvalRate * 0.6) + (avgPercentage * 0.4));
      
      // Calculate avg attempts
      const avgAttempts = s.approvedTests > 0 ? (s.totalTests / s.approvedTests).toFixed(1) : (s.totalTests > 0 ? `${s.totalTests}` : '1.0');

      return {
        style,
        totalTests: s.totalTests,
        approvedTests: s.approvedTests,
        approvalRate,
        avgPercentage,
        efficiencyIndex,
        avgAttempts,
        apprenticeCount: s.apprenticeCount
      };
    });

    // Sort by efficiency index to find most efficient style
    const sorted = [...results].sort((a, b) => b.efficiencyIndex - a.efficiencyIndex);
    const mostEfficient = sorted[0];

    return {
      byStyle: results,
      mostEfficient,
    };
  }, [filteredCertificates, kolbDistribution]);

  // 3. Efficiency & Approval Breakdown by RAP
  const rapStats = useMemo(() => {
    const raps: Record<RAPId, {
      id: RAPId;
      code: string;
      title: string;
      total: number;
      approved: number;
      stylePerformance: Record<KolbStyle, { total: number; approved: number; scoreSum: number }>;
    }> = {
      rap1: { id: 'rap1', code: 'RAP 01', title: 'Diagnóstico Empresarial', total: 0, approved: 0, stylePerformance: { Acomodador: { total: 0, approved: 0, scoreSum: 0 }, Divergente: { total: 0, approved: 0, scoreSum: 0 }, Convergente: { total: 0, approved: 0, scoreSum: 0 }, Asimilador: { total: 0, approved: 0, scoreSum: 0 } } },
      rap2: { id: 'rap2', code: 'RAP 02', title: 'Planeación Documentos', total: 0, approved: 0, stylePerformance: { Acomodador: { total: 0, approved: 0, scoreSum: 0 }, Divergente: { total: 0, approved: 0, scoreSum: 0 }, Convergente: { total: 0, approved: 0, scoreSum: 0 }, Asimilador: { total: 0, approved: 0, scoreSum: 0 } } },
      rap3: { id: 'rap3', code: 'RAP 03', title: 'Auditorías Internas', total: 0, approved: 0, stylePerformance: { Acomodador: { total: 0, approved: 0, scoreSum: 0 }, Divergente: { total: 0, approved: 0, scoreSum: 0 }, Convergente: { total: 0, approved: 0, scoreSum: 0 }, Asimilador: { total: 0, approved: 0, scoreSum: 0 } } },
      rap4: { id: 'rap4', code: 'RAP 04', title: 'Análisis Indicadores', total: 0, approved: 0, stylePerformance: { Acomodador: { total: 0, approved: 0, scoreSum: 0 }, Divergente: { total: 0, approved: 0, scoreSum: 0 }, Convergente: { total: 0, approved: 0, scoreSum: 0 }, Asimilador: { total: 0, approved: 0, scoreSum: 0 } } },
    };

    filteredCertificates.forEach((cert) => {
      const r = raps[cert.rapId];
      if (r) {
        r.total += 1;
        if (cert.isApproved) r.approved += 1;

        const stylePerf = r.stylePerformance[cert.evaluatedStyle];
        if (stylePerf) {
          stylePerf.total += 1;
          if (cert.isApproved) stylePerf.approved += 1;
          stylePerf.scoreSum += cert.percentage;
        }
      }
    });

    return Object.values(raps).map((r) => {
      const approvalRate = r.total > 0 ? Math.round((r.approved / r.total) * 100) : 0;
      
      // Find best style for this RAP
      let bestStyleForRap: KolbStyle = 'Convergente';
      let bestEfficiency = -1;

      KOB_STYLES.forEach((st) => {
        const perf = r.stylePerformance[st];
        if (perf.total > 0) {
          const rate = perf.approved / perf.total;
          if (rate > bestEfficiency) {
            bestEfficiency = rate;
            bestStyleForRap = st;
          }
        }
      });

      return {
        ...r,
        approvalRate,
        bestStyleForRap,
      };
    });
  }, [filteredCertificates]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] print:max-h-none flex flex-col">
        
        {/* Header Bar */}
        <div className="no-print px-6 py-4 bg-[#00324D] text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#39A900] text-white">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  SENA · Formación Profesional Integral
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded border border-slate-700">
                  Dashboard Analítico Pedagógico
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white font-display">
                Indicadores de Estilos de Aprendizaje y Eficiencia Formativa (Kolb)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              title="Imprimir o guardar reporte analítico en PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir Reporte</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Cerrar dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-slate-50 font-sans print:bg-white print:p-0">
          
          {/* Top Filter & Context Bar */}
          <div className="no-print p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SenaLogo className="h-9 w-auto" variant="color" showText={false} />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Filtro de Selección por Ficha de Caracterización:
                </div>
                <div className="text-[11px] text-slate-500">
                  Mostrando datos de {filteredApprentices.length} aprendices y {filteredCertificates.length} pruebas presentadas
                </div>
              </div>
            </div>

            {/* Ficha Dropdown Filter */}
            <div className="flex items-center gap-2.5 shrink-0">
              <Filter className="w-4 h-4 text-[#39A900]" />
              <span className="text-xs font-bold text-slate-700 uppercase">Ficha:</span>
              <select
                value={selectedFicha}
                onChange={(e) => setSelectedFicha(e.target.value)}
                className="px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white font-bold text-[#00324D] focus:outline-none focus:ring-2 focus:ring-[#39A900] shadow-2xs"
              >
                <option value="ALL">Todas las Fichas ({apprentices.length} aprendices)</option>
                {uniqueFichas.map((f) => (
                  <option key={f} value={f}>
                    Ficha {f} ({apprentices.filter((a) => a.ficha === f).length} aprendices)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Printable Header Title */}
          <div className="hidden print:block border-b border-slate-300 pb-3 mb-4">
            <h1 className="text-xl font-bold uppercase text-[#00324D]">
              Reporte Analítico de Eficiencia Pedagógica por Estilos de Aprendizaje
            </h1>
            <p className="text-xs text-slate-600">
              Programa Tecnólogo en Gestión Empresarial · Ficha: {selectedFicha === 'ALL' ? 'Todas las Fichas' : selectedFicha} · Fecha: {new Date().toLocaleDateString('es-CO')}
            </p>
          </div>

          {/* Executive KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* KPI 1: Estilo Más Eficiente */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-[#007832] text-white shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-100 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  Estilo Más Eficiente
                </span>
                <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-bold font-mono">
                  ★ Ranking #1
                </span>
              </div>
              <div className="text-2xl font-black font-display my-1">
                {styleEfficiencyStats.mostEfficient ? styleEfficiencyStats.mostEfficient.style : 'N/A'}
              </div>
              <div className="text-xs text-emerald-100 font-medium">
                {styleEfficiencyStats.mostEfficient
                  ? `${styleEfficiencyStats.mostEfficient.approvalRate}% Aprobación · ${styleEfficiencyStats.mostEfficient.avgAttempts} intentos prom.`
                  : 'Sin suficientes datos'}
              </div>
            </div>

            {/* KPI 2: Tasa de Aprobación Global */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                <span>Tasa de Aprobación Global</span>
                <Award className="w-4 h-4 text-[#39A900]" />
              </div>
              <div className="text-2xl font-black text-[#00324D]">
                {filteredCertificates.length > 0
                  ? `${Math.round((filteredCertificates.filter((c) => c.isApproved).length / filteredCertificates.length) * 100)}%`
                  : '0%'}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {filteredCertificates.filter((c) => c.isApproved).length} aprobadas de {filteredCertificates.length} pruebas
              </div>
            </div>

            {/* KPI 3: Estilo Predominante */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                <span>Estilo Predominante</span>
                <Brain className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">
                {Object.entries(kolbDistribution.counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {kolbDistribution.percentages[Object.entries(kolbDistribution.counts).sort((a, b) => b[1] - a[1])[0]?.[0] as KolbStyle || 'Convergente']}% del grupo ({filteredApprentices.length} aprendices)
              </div>
            </div>

            {/* KPI 4: Promedio de Intentos */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                <span>Prom. Intentos / Aprobación</span>
                <TrendingUp className="w-4 h-4 text-teal-600" />
              </div>
              <div className="text-2xl font-black text-[#007832]">
                {filteredCertificates.length > 0
                  ? (filteredCertificates.length / Math.max(1, filteredCertificates.filter((c) => c.isApproved).length)).toFixed(1)
                  : '1.0'}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Pruebas requeridas para lograr el RAP
              </div>
            </div>
          </div>

          {/* MAIN CHARTS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* CHART 1: Distribución de Estilos Kolb */}
            <div className="lg:col-span-6 p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-[#007832]">
                    <PieChart className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#00324D] uppercase tracking-wider">
                      1. Distribución de Estilos Kolb en el Grupo
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Proporción de aprendices por perfil de aprendizaje
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {kolbDistribution.totalWithStyle} Evaluados
                </span>
              </div>

              {/* Segmented Stacked Bar Chart */}
              <div className="space-y-2">
                <div className="h-6 w-full rounded-xl bg-slate-100 overflow-hidden flex shadow-inner">
                  {KOB_STYLES.map((style) => {
                    const pct = kolbDistribution.percentages[style];
                    if (pct === 0) return null;
                    return (
                      <div
                        key={style}
                        style={{ width: `${pct}%` }}
                        className={`${STYLE_COLORS[style].bar} transition-all relative group flex items-center justify-center text-[10px] font-bold text-white`}
                        title={`${style}: ${pct}% (${kolbDistribution.counts[style]} aprendices)`}
                      >
                        {pct >= 10 && <span>{pct}%</span>}
                      </div>
                    );
                  })}
                </div>

                <div className="text-[10px] text-slate-400 text-right italic">
                  * Basado en el Test de Diagnóstico de David Kolb aplicado
                </div>
              </div>

              {/* Individual Breakdown Cards */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {KOB_STYLES.map((style) => {
                  const count = kolbDistribution.counts[style];
                  const pct = kolbDistribution.percentages[style];
                  const c = STYLE_COLORS[style];

                  return (
                    <div
                      key={style}
                      className={`p-3 rounded-xl border ${c.bg} ${c.border} transition-all hover:shadow-2xs`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-extrabold ${c.text}`}>
                          {style}
                        </span>
                        <span className={`text-xs font-black ${c.text}`}>
                          {pct}%
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium">
                        {count} aprendiz{count !== 1 ? 'es' : ''}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate mt-1">
                        {STYLE_METADATA[style].focus}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CHART 2: Eficiencia Pedagógica por Estilo */}
            <div className="lg:col-span-6 p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#00324D] uppercase tracking-wider">
                      2. Estilo de Aprendizaje Más Eficiente
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Comparativa multivariable de efectividad en pruebas
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                  Ranking por Tasa de Aprobación
                </span>
              </div>

              {/* Comparative Progress Bars */}
              <div className="space-y-3.5 pt-1">
                {styleEfficiencyStats.byStyle.map((item) => {
                  const c = STYLE_COLORS[item.style];
                  const isWinner = styleEfficiencyStats.mostEfficient?.style === item.style;

                  return (
                    <div key={item.style} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${c.bg} ${c.text} font-black`}>
                            {item.style}
                          </span>
                          {isWinner && (
                            <span className="text-[10px] font-bold text-[#007832] bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-300 flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5 text-[#39A900]" />
                              Más Eficiente
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 font-mono text-[11px]">
                          <span className="text-slate-600">
                            Aprobación: <strong>{item.approvalRate}%</strong>
                          </span>
                          <span className="text-slate-400">|</span>
                          <span className="text-slate-600">
                            Prom. Intentos: <strong>{item.avgAttempts}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Bar */}
                      <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                        <div
                          style={{ width: `${Math.max(5, item.approvalRate)}%` }}
                          className={`h-full ${c.bar} rounded-full transition-all duration-500`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2 mt-2">
                <Lightbulb className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <strong>Criterio de Eficiencia Pedagógica SENA:</strong> Se calcula combinando la tasa de aprobación directa y el número promedio de intentos requeridos. Un menor número de intentos con alto % refleja mayor afinidad con la técnica evaluativa.
                </div>
              </div>
            </div>

          </div>

          {/* CHART 3: Desempeño y Estilo Más Eficiente por RAP */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-teal-100 text-teal-800">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#00324D] uppercase tracking-wider">
                    3. Análisis de Eficiencia por Resultado de Aprendizaje (RAP 1 - RAP 4)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Estilo de aprendizaje óptimo para cada eje temático de la competencia
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold text-slate-500">
                4 RAPs Evaluados
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {rapStats.map((rap) => {
                const c = STYLE_COLORS[rap.bestStyleForRap];

                return (
                  <div
                    key={rap.id}
                    className="p-4 rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-mono font-black text-xs text-[#007832]">
                        {rap.code}
                      </span>
                      <span className={`px-2 py-0.5 rounded font-extrabold text-[10px] ${
                        rap.approvalRate >= 70 ? 'bg-emerald-100 text-[#007832]' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {rap.approvalRate}% Aprobado
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 h-8">
                      {rap.title}
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Estilo Más Eficiente en este RAP:
                      </div>
                      <div className={`p-2 rounded-lg border ${c.bg} ${c.border} flex items-center justify-between`}>
                        <span className={`text-xs font-extrabold ${c.text}`}>
                          {rap.bestStyleForRap}
                        </span>
                        <span className="text-[10px] font-bold text-slate-600 font-mono">
                          ★ Máx. Eficiencia
                        </span>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 flex justify-between">
                      <span>Pruebas presentadas:</span>
                      <strong className="text-slate-800 font-mono">{rap.total}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hallazgos Pedagógicos y Recomendaciones Formativas */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-emerald-50/60 to-white border border-blue-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-[#00324D] text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#39A900]" />
              <span>Conclusiones y Recomendaciones para el Instructor SENA</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
              <div className="p-3.5 bg-white rounded-xl border border-blue-100 space-y-1 shadow-2xs">
                <span className="font-bold text-[#007832] block">
                  1. Diagnóstico de Eficiencia General:
                </span>
                <p className="leading-relaxed text-[11 font-medium text-slate-600">
                  El estilo <strong>{styleEfficiencyStats.mostEfficient?.style || 'Convergente'}</strong> demostró la mayor tasa de aprobación y requerimiento de intentos en la competencia de Mejoramiento Organizacional.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-emerald-100 space-y-1 shadow-2xs">
                <span className="font-bold text-[#00324D] block">
                  2. Estrategia Pedagógica Sugerida:
                </span>
                <p className="leading-relaxed text-[11px] font-medium text-slate-600">
                  Para aprendices de estilo Acomodador o Divergente, se sugiere acompañar las evaluaciones con guías de simulación en piso y estudios de caso participativos para maximizar su curva de aprendizaje.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
