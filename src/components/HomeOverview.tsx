import React from 'react';
import { RAPDefinition, RAPId, ApprenticeInfo, RapProgress } from '../types';
import { COMPETENCY_INFO } from '../data/senaData';
import { BookOpen, Award, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, GraduationCap, Clock, Brain, Sparkles, Target, Layers, ClipboardCheck } from 'lucide-react';

interface HomeOverviewProps {
  raps: RAPDefinition[];
  apprentice: ApprenticeInfo;
  rapsProgress?: Record<RAPId, RapProgress>;
  onSelectRapMode: (rapId: RAPId, mode: 'study' | 'evaluate') => void;
  onOpenApprenticeModal: () => void;
  onOpenKolbTest: () => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  raps,
  apprentice,
  rapsProgress = {} as Record<RAPId, RapProgress>,
  onSelectRapMode,
  onOpenApprenticeModal,
  onOpenKolbTest,
}) => {
  const approvedCount = raps.filter(r => rapsProgress[r.id]?.isApproved).length;

  return (
    <div className="space-y-10">
      {/* Hero Banner Section */}
      <div className="rounded-3xl bg-gradient-to-br from-[#00324D] via-[#002235] to-[#001724] text-white p-8 sm:p-12 relative overflow-hidden shadow-lg border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="bg-[#39A900] text-white px-3 py-1 rounded-full font-mono text-[11px] font-bold">
                CÓDIGO: {COMPETENCY_INFO.code}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-200">{COMPETENCY_INFO.program}</span>
              <span className="text-slate-300">·</span>
              <span className="text-emerald-400 font-medium">Nivel {COMPETENCY_INFO.level}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white font-display">
              Intervenir en el Desarrollo de los Programas de Mejoramiento Organizacional
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Plataforma institucional de formación y evaluación para aprendices del SENA. Estudie los fundamentos teóricos, practique en simuladores interactivos de gestión y certifique sus conocimientos con constancias oficiales evaluativas aprobatorias (≥ 70%).
            </p>

            {/* Apprentice quick badge + Kolb Profile status */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs text-xs flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#39A900]" />
                <span className="text-slate-200">Aprendiz:</span>
                <strong className="text-white">{apprentice.fullName}</strong>
                <span className="text-slate-400">({apprentice.docType} {apprentice.docNumber})</span>
                <span className="text-emerald-400 font-mono">Ficha: {apprentice.ficha}</span>
              </div>

              {apprentice.kolbResult ? (
                <button
                  onClick={onOpenKolbTest}
                  className="px-3.5 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs flex items-center gap-2 hover:bg-emerald-900 transition-colors cursor-pointer"
                >
                  <Brain className="w-4 h-4 text-[#39A900]" />
                  <span className="text-slate-300">Estilo Kolb:</span>
                  <strong className="text-emerald-300 font-bold">{apprentice.kolbResult.style}</strong>
                </button>
              ) : (
                <button
                  onClick={onOpenKolbTest}
                  className="px-3.5 py-2 rounded-xl bg-blue-900/60 border border-blue-400/30 text-xs flex items-center gap-2 hover:bg-blue-800 transition-colors text-blue-200 cursor-pointer animate-pulse"
                >
                  <Brain className="w-4 h-4 text-blue-400" />
                  <span>Realizar Test de Kolb</span>
                </button>
              )}

              <button
                onClick={onOpenApprenticeModal}
                className="text-xs text-[#39A900] hover:text-emerald-300 font-semibold underline underline-offset-4 transition-colors"
              >
                Actualizar ficha
              </button>
            </div>
          </div>

          {/* Hero Visual Image Asset */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 bg-slate-900 group">
              <img
                src="/src/assets/images/hero_gestion_empresarial_1794454445941.jpg"
                alt="Aprendices y profesionales del SENA analizando procesos de mejoramiento organizacional"
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-3 bg-slate-900/90 text-white text-[11px] flex items-center justify-between border-t border-white/10">
                <span className="font-semibold text-emerald-400">Gestión de Procesos & Calidad</span>
                <span className="text-slate-400">Normas ISO 9001:2015 · ISO 19011</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RAPs Cards Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#007832] flex items-center gap-2">
              <span>Estructura Curricular de la Competencia</span>
              <span>·</span>
              <span>Progreso: {approvedCount} de {raps.length} RAPs Aprobados</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#00324D] mt-1 font-display">
              Resultados de Aprendizaje del Programa (RAP)
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Evaluaciones diferenciadas por estilo de Kolb. <strong>Con solo aprobar una de las pruebas diferenciadas por RAP (≥ 70%), el RAP queda aprobado.</strong>
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Criterio de Evaluación: <strong>Aprobado ≥ 70%</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {raps.map((rap) => {
            const progress = rapsProgress[rap.id];
            const isApproved = progress?.isApproved;

            return (
              <div
                key={rap.id}
                className={`p-6 rounded-2xl bg-white border transition-all flex flex-col justify-between group ${
                  isApproved ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#39A900]/15 text-[#007832]">
                      {rap.code}
                    </span>
                    <div className="flex items-center gap-2 text-xs">
                      {isApproved ? (
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#39A900]" />
                          <span>Aprobado ({progress.approvedByStyle})</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">4 Pruebas Kolb</span>
                      )}
                      <span>·</span>
                      <span className="text-slate-500">{rap.durationHours}h</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#00324D] group-hover:text-[#007832] transition-colors">
                    {rap.title}
                  </h3>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {rap.learningOutcome}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-[11px] text-slate-500">
                  {rap.topics.map((t, tIdx) => (
                    <span key={tIdx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {t.title.split('. ')[1] || t.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons for Each RAP: Estudiar y Evaluar */}
              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                <button
                  onClick={() => onSelectRapMode(rap.id, 'study')}
                  className="py-2.5 px-3 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4 text-[#007832]" />
                  <span>Estudiar</span>
                </button>

                <button
                  onClick={() => onSelectRapMode(rap.id, 'evaluate')}
                  className="py-2.5 px-3 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                >
                  <Award className="w-4 h-4" />
                  <span>Evaluar</span>
                </button>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Institutional Quality Framework Footer Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#39A900] shrink-0 font-bold">
            1
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-0.5">Enfoque por Competencias</h4>
            <p className="text-[11px] leading-relaxed">
              Formación integral que articula saber, saber hacer y saber ser bajo el modelo pedagógico del SENA y la normatividad ISO vigente.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#39A900] shrink-0 font-bold">
            2
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-0.5">Evaluación Objetiva y Formativa</h4>
            <p className="text-[11px] leading-relaxed">
              Reactivos basados en situaciones y estudios de casos empresariales colombianos con retroalimentación inmediata por cada respuesta.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#39A900] shrink-0 font-bold">
            3
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-0.5">Certificación con Validez</h4>
            <p className="text-[11px] leading-relaxed">
              Generación de constancias oficiales imprimibles y descargables con desglose pormenorizado y código de verificación institucional.
            </p>
          </div>
        </div>
      </div>

      {/* Matriz Pedagógica: Técnicas e Instrumentos de Evaluación por Estilo Kolb */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#007832] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#39A900]" />
              <span>Modelo de Evaluación por Competencias · FPI SENA</span>
            </div>
            <h3 className="text-lg font-extrabold text-[#00324D] mt-0.5">
              Técnicas e Instrumentos de Evaluación Diferenciados por Estilo de Aprendizaje
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Cada estilo cuenta con una <strong>técnica pedagógica especializada</strong> diseñada para medir el desempeño con el instrumento más útil y pertinente a su perfil cognitivo:
            </p>
          </div>
          <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 self-start md:self-auto shrink-0">
            Regla: Aprobado con ≥ 70% en 1 sola prueba
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
          {/* Acomodador */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Acomodador
                </span>
                <span className="text-[10px] font-bold text-emerald-700">Desempeño</span>
              </div>
              <div className="text-xs font-bold text-[#00324D] mb-1">
                Simulación de Incidentes Críticos
              </div>
              <div className="text-[11px] text-slate-600 leading-snug">
                <strong className="text-slate-700">Técnica:</strong> Simulación de contingencias operativas en tiempo real.
              </div>
              <div className="text-[11px] text-slate-600 leading-snug mt-1">
                <strong className="text-slate-700">Instrumento:</strong> Guía de decisión inmediata en piso.
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-emerald-200/60 text-[10px] text-emerald-800 font-medium italic">
              "Aprende haciendo y respondiendo a imprevistos operativos en planta."
            </div>
          </div>

          {/* Divergente */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800 border border-blue-300">
                  Divergente
                </span>
                <span className="text-[10px] font-bold text-blue-700">Colaborativo</span>
              </div>
              <div className="text-xs font-bold text-[#00324D] mb-1">
                Estudio de Caso Organizacional
              </div>
              <div className="text-[11px] text-slate-600 leading-snug">
                <strong className="text-slate-700">Técnica:</strong> Análisis holístico de clima y partes interesadas.
              </div>
              <div className="text-[11px] text-slate-600 leading-snug mt-1">
                <strong className="text-slate-700">Instrumento:</strong> Rúbrica de criterios cualitativos e innovación.
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-blue-200/60 text-[10px] text-blue-800 font-medium italic">
              "Aprende integrando múltiples perspectivas humanas y empatía."
            </div>
          </div>

          {/* Convergente */}
          <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-teal-100 text-teal-800 border border-teal-300">
                  Convergente
                </span>
                <span className="text-[10px] font-bold text-teal-700">Técnico</span>
              </div>
              <div className="text-xs font-bold text-[#00324D] mb-1">
                Modelado Cuantitativo & 5W2H
              </div>
              <div className="text-[11px] text-slate-600 leading-snug">
                <strong className="text-slate-700">Técnica:</strong> Resolución deductiva de problemas y fórmulas.
              </div>
              <div className="text-[11px] text-slate-600 leading-snug mt-1">
                <strong className="text-slate-700">Instrumento:</strong> Cuestionario de casos cuantitativos y planes 5W2H.
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-teal-200/60 text-[10px] text-teal-800 font-medium italic">
              "Aprende aplicando lógica deductiva, métricas y datos cuantitativos."
            </div>
          </div>

          {/* Asimilador */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-800 border border-indigo-300">
                  Asimilador
                </span>
                <span className="text-[10px] font-bold text-indigo-700">Sistémico</span>
              </div>
              <div className="text-xs font-bold text-[#00324D] mb-1">
                Auditoría de Conformidad Normativa
              </div>
              <div className="text-[11px] text-slate-600 leading-snug">
                <strong className="text-slate-700">Técnica:</strong> Verificación de estándares ISO (9001/19011) y PHVA.
              </div>
              <div className="text-[11px] text-slate-600 leading-snug mt-1">
                <strong className="text-slate-700">Instrumento:</strong> Lista maestra de verificación y coherencia estructural.
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-indigo-200/60 text-[10px] text-indigo-800 font-medium italic">
              "Aprende estructurando modelos conceptuales y taxonomías normativas."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
