import React, { useState } from 'react';
import { RAPDefinition } from '../types';
import { BookOpen, Award, CheckCircle2, ArrowRight, ShieldCheck, FileText, ChevronRight, Sparkles } from 'lucide-react';
import { DofaSimulator } from './simulators/DofaSimulator';
import { SipocSimulator } from './simulators/SipocSimulator';
import { AuditSimulator } from './simulators/AuditSimulator';
import { KpiSimulator } from './simulators/KpiSimulator';

interface RapStudyViewProps {
  rap: RAPDefinition;
  onGoToEvaluation: () => void;
}

export const RapStudyView: React.FC<RapStudyViewProps> = ({ rap, onGoToEvaluation }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(rap.topics[0]?.id || '');

  const activeTopic = rap.topics.find(t => t.id === selectedTopicId) || rap.topics[0];

  return (
    <div className="space-y-8">
      {/* RAP Hero Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#007832] mb-2">
              <span className="bg-[#39A900]/15 text-[#007832] px-2.5 py-0.5 rounded-full font-mono">
                {rap.code}
              </span>
              <span>·</span>
              <span>{rap.durationHours} Horas de Formación</span>
              <span>·</span>
              <span>Módulo de Estudio Guiado</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00324D] tracking-tight">
              {rap.title}
            </h2>

            <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                Resultado de Aprendizaje (Criterio de Evaluación SENA):
              </span>
              <p className="text-sm font-medium text-slate-800 leading-relaxed">
                {rap.learningOutcome}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
            <button
              onClick={onGoToEvaluation}
              className="px-6 py-3 text-sm font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Award className="w-4 h-4" />
              <span>Evaluar este RAP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-slate-400 text-center">
              5 preguntas · Aprobación ≥ 70%
            </span>
          </div>
        </div>
      </div>

      {/* Main Educational Split: Topic Navigation & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Topic Index Sidebar */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1 mb-2">
            Contenidos Temáticos Clave ({rap.topics.length})
          </div>

          <div className="space-y-1.5">
            {rap.topics.map((topic, index) => {
              const isActive = topic.id === activeTopic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    isActive
                      ? 'border-[#39A900] bg-white ring-2 ring-[#39A900]/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                    isActive ? 'bg-[#39A900] text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className={`text-xs font-bold leading-snug truncate ${
                      isActive ? 'text-[#00324D]' : 'text-slate-800'
                    }`}>
                      {topic.title}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {topic.subtitle}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? 'text-[#39A900] translate-x-0.5' : 'text-slate-300'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Quick jump to evaluation helper */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#00324D] to-[#001f30] text-white mt-4">
            <div className="text-xs font-bold text-[#39A900] uppercase tracking-wider mb-1">
              ¿Finalizaste el repaso teórico?
            </div>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              Pon a prueba tus conocimientos en la prueba diagnóstica y genera tu constancia aprobatoria.
            </p>
            <button
              onClick={onGoToEvaluation}
              className="w-full py-2 px-3 text-xs font-bold text-center bg-[#39A900] hover:bg-[#007832] text-white rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              Comenzar Evaluación Oficial
            </button>
          </div>
        </div>

        {/* Selected Topic Full Content Panel */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            {/* Topic Title */}
            <div className="border-b border-slate-100 pb-4 mb-5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Unidad de Aprendizaje
              </span>
              <h3 className="text-xl font-extrabold text-[#00324D] mt-1">
                {activeTopic.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {activeTopic.subtitle}
              </p>
            </div>

            {/* Key Concept Box */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#007832] uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 text-[#39A900]" />
                <span>Concepto Fundamental</span>
              </div>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {activeTopic.keyConcept}
              </p>
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Desarrollo Teórico y Metodológico
              </h4>
              {activeTopic.content.map((paragraph, pIdx) => (
                <div key={pIdx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] shrink-0 mt-2"></span>
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>

            {/* Practical Example (if available) */}
            {activeTopic.practicalExample && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Caso Práctico en la Empresa: {activeTopic.practicalExample.title}
                </span>
                <p className="text-xs font-medium text-slate-800 leading-relaxed">
                  {activeTopic.practicalExample.description}
                </p>
              </div>
            )}

            {/* Normative Reference */}
            {activeTopic.normativeReference && (
              <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>Referencia Normativa:</strong> {activeTopic.normativeReference}
                </span>
              </div>
            )}

            {/* Tips for Apprentice */}
            {activeTopic.tips && activeTopic.tips.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Recomendaciones del Instructor SENA:
                </div>
                <div className="space-y-1.5">
                  {activeTopic.tips.map((tip, tIdx) => (
                    <div key={tIdx} className="text-xs text-slate-600 flex items-start gap-2">
                      <span className="text-[#39A900] font-bold">✓</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Practical Simulator Section */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#00324D] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#39A900]"></span>
              Entorno de Simulación y Práctica Aplicada del {rap.code}
            </h3>
            <p className="text-xs text-slate-600">
              Experimente con variables reales antes de presentar la evaluación formal:
            </p>
          </div>
        </div>

        {rap.id === 'rap1' && <DofaSimulator />}
        {rap.id === 'rap2' && <SipocSimulator />}
        {rap.id === 'rap3' && <AuditSimulator />}
        {rap.id === 'rap4' && <KpiSimulator />}
      </div>
    </div>
  );
};
