import React, { useState, useEffect } from 'react';
import { RAPDefinition, ApprenticeInfo, EvaluationResult, QuestionResult, KolbStyle, RapProgress } from '../types';
import { CheckCircle2, XCircle, Award, BookOpen, RotateCcw, FileText, ChevronRight, ChevronLeft, ShieldCheck, Brain, Sparkles, Check, Target, ClipboardList, Lightbulb, Info, Layers } from 'lucide-react';
import { COMPETENCY_INFO } from '../data/senaData';
import { STYLE_METADATA } from '../data/differentiatedQuestions';

interface RapEvaluationViewProps {
  rap: RAPDefinition;
  apprentice: ApprenticeInfo;
  rapProgress?: RapProgress;
  onGoToStudy: () => void;
  onViewCertificate: (result: EvaluationResult) => void;
  onRecordResult?: (result: EvaluationResult) => void;
}

const STYLES_LIST: KolbStyle[] = ['Acomodador', 'Divergente', 'Convergente', 'Asimilador'];

const RAP_KEY_CONTENTS: Record<string, string> = {
  rap1: "Diagnóstico Organizacional, Matrices DOFA / PESTEL / Porter, Matriz MEFI/MEFE, Cadena de Valor y Causa Raíz.",
  rap2: "Información Documentada ISO 9001 (7.5), Pirámide ISO/TR 10013, Caracterización SIPOC, Flujogramas ANSI y Control de Versiones.",
  rap3: "Auditorías Internas ISO 19011:2018, Principios, Muestreo, Redacción de No Conformidades, Criterios y Reunión de Cierre.",
  rap4: "Indicadores de Gestión (Eficacia, Eficiencia, Efectividad, Productividad), Fichas Técnicas, Semaforización y Balanced Scorecard."
};

export const RapEvaluationView: React.FC<RapEvaluationViewProps> = ({
  rap,
  apprentice,
  rapProgress,
  onGoToStudy,
  onViewCertificate,
  onRecordResult,
}) => {
  // Pre-select apprentice's detected Kolb style if available, otherwise 'Convergente'
  const defaultStyle: KolbStyle = apprentice.kolbResult?.style || 'Convergente';
  const [selectedStyle, setSelectedStyle] = useState<KolbStyle>(defaultStyle);

  // Store answers and submission states per style: { [style]: { answers, isSubmitted, lastResult } }
  const [styleStates, setStyleStates] = useState<Record<KolbStyle, {
    answers: Record<string, string>;
    currentQuestionIndex: number;
    isSubmitted: boolean;
    lastResult: EvaluationResult | null;
  }>>({
    Acomodador: { answers: {}, currentQuestionIndex: 0, isSubmitted: false, lastResult: null },
    Divergente: { answers: {}, currentQuestionIndex: 0, isSubmitted: false, lastResult: null },
    Convergente: { answers: {}, currentQuestionIndex: 0, isSubmitted: false, lastResult: null },
    Asimilador: { answers: {}, currentQuestionIndex: 0, isSubmitted: false, lastResult: null },
  });

  const currentState = styleStates[selectedStyle];
  const questions = (rap.differentiatedQuestions && rap.differentiatedQuestions[selectedStyle])
    ? rap.differentiatedQuestions[selectedStyle]
    : rap.questions;

  const currentQ = questions[currentState.currentQuestionIndex] || questions[0];
  const answeredCount = Object.keys(currentState.answers).length;
  const isAllAnswered = answeredCount === questions.length;

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (currentState.isSubmitted) return;
    setStyleStates(prev => ({
      ...prev,
      [selectedStyle]: {
        ...prev[selectedStyle],
        answers: {
          ...prev[selectedStyle].answers,
          [questionId]: optionId
        }
      }
    }));
  };

  const handleSetQuestionIndex = (index: number) => {
    setStyleStates(prev => ({
      ...prev,
      [selectedStyle]: {
        ...prev[selectedStyle],
        currentQuestionIndex: index
      }
    }));
  };

  const handleEvaluate = () => {
    let score = 0;
    const questionResults: QuestionResult[] = questions.map((q) => {
      const selectedId = currentState.answers[q.id] || '';
      const selectedOption = q.options.find(o => o.id === selectedId);
      const correctOption = q.options.find(o => o.id === q.correctOptionId);
      const isCorrect = selectedId === q.correctOptionId;
      if (isCorrect) score += 1;

      return {
        questionNumber: q.questionNumber,
        questionText: q.question,
        scenario: q.scenario,
        selectedOptionId: selectedId,
        selectedOptionText: selectedOption ? selectedOption.text : 'Sin respuesta',
        correctOptionId: q.correctOptionId,
        correctOptionText: correctOption ? correctOption.text : '',
        isCorrect,
        explanation: q.explanation,
        competencyStandard: q.competencyStandard
      };
    });

    const percentage = Math.round((score / questions.length) * 100);
    const isApproved = percentage >= COMPETENCY_INFO.passingScorePercentage;
    const meta = STYLE_METADATA[selectedStyle];

    const evalResult: EvaluationResult = {
      certificateId: `SENA-${rap.id.toUpperCase()}-${selectedStyle.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      rapId: rap.id,
      rapTitle: rap.shortName,
      rapCode: rap.code,
      evaluatedStyle: selectedStyle,
      evaluatedStyleTag: meta.focus,
      evaluationTechnique: meta.technique,
      evaluationInstrument: meta.instrument,
      evidenceType: meta.evidenceType,
      apprentice: { ...apprentice },
      completedAt: new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      score,
      maxScore: questions.length,
      percentage,
      concept: isApproved ? 'APROBADO' : 'NO APROBADO',
      isApproved,
      questionResults
    };

    setStyleStates(prev => ({
      ...prev,
      [selectedStyle]: {
        ...prev[selectedStyle],
        isSubmitted: true,
        lastResult: evalResult
      }
    }));

    if (onRecordResult) {
      onRecordResult(evalResult);
    }
  };

  const handleResetCurrentStyle = () => {
    setStyleStates(prev => ({
      ...prev,
      [selectedStyle]: {
        answers: {},
        currentQuestionIndex: 0,
        isSubmitted: false,
        lastResult: null
      }
    }));
  };

  // Determine if the overall RAP is approved (either in rapProgress or any local style in this session)
  const isRapApprovedOverall = rapProgress?.isApproved || Object.values(styleStates).some(s => s.lastResult?.isApproved);
  const approvedStyleName = rapProgress?.approvedByStyle || Object.entries(styleStates).find(([_, s]) => s.lastResult?.isApproved)?.[0];

  return (
    <div className="space-y-6">
      {/* Top Banner with Competency and Kolb Rule */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="font-mono text-[#007832] font-bold">{rap.code}</span>
              <span>·</span>
              <span>Evaluaciones Diferenciadas por Estilo de Aprendizaje (David Kolb)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#00324D]">
              Evaluación: {rap.shortName}
            </h2>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <span className="font-bold text-[#007832] shrink-0">Eje Temático Exclusivo:</span>
              <span className="text-slate-700">{RAP_KEY_CONTENTS[rap.id]}</span>
            </div>
            <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl font-medium">
              <Sparkles className="w-4 h-4 text-[#39A900] shrink-0" />
              <span>
                <strong>Criterio de Evaluación SENA:</strong> Con solo aprobar <strong>una de las 4 pruebas diferenciadas (≥ 70%)</strong>, este RAP queda oficialmente <strong>APROBADO</strong>.
              </span>
            </div>
          </div>

          {/* RAP Status Badge */}
          <div className="flex items-center gap-3 shrink-0">
            {isRapApprovedOverall ? (
              <div className="px-4 py-2 rounded-xl bg-emerald-100 text-[#007832] border border-emerald-300 text-xs font-bold flex items-center gap-2 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#39A900]" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-emerald-800">Estado del RAP</div>
                  <div>APROBADO ✓ {approvedStyleName ? `(${approvedStyleName})` : ''}</div>
                </div>
              </div>
            ) : (
              <div className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold flex items-center gap-2">
                <Award className="w-4 h-4 text-slate-400" />
                <span>Pendiente por Aprobar</span>
              </div>
            )}

            <button
              onClick={onGoToStudy}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#007832]" />
              <span className="hidden sm:inline">Repasar Teoría</span>
            </button>
          </div>
        </div>

        {/* 4 Differentiated Kolb Style Selector Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <span>Seleccione el Estilo de Prueba para Responder:</span>
            {apprentice.kolbResult && (
              <span className="text-[11px] font-semibold text-emerald-700">
                Tu perfil Kolb detectado: <strong>{apprentice.kolbResult.style}</strong>
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {STYLES_LIST.map((style) => {
              const meta = STYLE_METADATA[style];
              const isSelected = selectedStyle === style;
              const isApprenticeRecommended = apprentice.kolbResult?.style === style;
              const attempt = styleStates[style].lastResult;
              const isStyleApproved = attempt?.isApproved;

              return (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`p-3 rounded-xl border text-left transition-all relative cursor-pointer ${
                    isSelected
                      ? 'border-[#39A900] bg-emerald-50/50 ring-2 ring-[#39A900]/25 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-extrabold text-[#00324D]">
                      {style}
                    </span>
                    {isStyleApproved ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {attempt.percentage}%
                      </span>
                    ) : attempt ? (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                        {attempt.percentage}%
                      </span>
                    ) : null}
                  </div>

                  <div className="text-[11px] text-slate-500 font-medium truncate">
                    {meta.focus}
                  </div>

                  <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center gap-1 text-[10px]">
                    <span className="text-slate-400 font-medium shrink-0">Técnica:</span>
                    <span className="font-semibold text-slate-700 truncate">{meta.shortTechnique}</span>
                  </div>

                  {isApprenticeRecommended && (
                    <div className="mt-1 text-[9px] font-bold text-[#007832] flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-[#39A900]" />
                      <span>Recomendada para ti</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ficha Técnica Pedagógica de Evaluación por Estilo SENA */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#39A900]/15 text-[#007832] flex items-center justify-center font-bold">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${STYLE_METADATA[selectedStyle].badgeColor}`}>
                  Estilo {selectedStyle}
                </span>
                <span className="text-xs font-bold text-slate-800">
                  Ficha Técnica de Evaluación Diferenciada · Modelo FPI SENA
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                {STYLE_METADATA[selectedStyle].focus}
              </div>
            </div>
          </div>

          {currentState.isSubmitted && (
            <button
              onClick={handleResetCurrentStyle}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer self-start md:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reintentar este estilo</span>
            </button>
          )}
        </div>

        {/* 3 Pillars: Técnica, Instrumento, Evidencia */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3.5">
          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              <Target className="w-3.5 h-3.5 text-[#39A900]" />
              <span>Técnica de Evaluación</span>
            </div>
            <div className="text-xs font-bold text-slate-900 leading-snug">
              {STYLE_METADATA[selectedStyle].technique}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              <ClipboardList className="w-3.5 h-3.5 text-[#007832]" />
              <span>Instrumento de Evaluación</span>
            </div>
            <div className="text-xs font-bold text-slate-900 leading-snug">
              {STYLE_METADATA[selectedStyle].instrument}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Tipo de Evidencia Recolectada</span>
            </div>
            <div className="text-xs font-bold text-[#007832] leading-snug">
              {STYLE_METADATA[selectedStyle].evidenceType}
            </div>
          </div>
        </div>

        {/* Callout: Por qué esta técnica es la más útil para este estilo */}
        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs">
          <div className="flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-950 block mb-0.5">
                ¿Por qué esta técnica es la más adecuada y útil para el estilo {selectedStyle}?
              </span>
              <p className="text-emerald-900/90 leading-relaxed text-[11px]">
                {STYLE_METADATA[selectedStyle].utilityRationale}
              </p>
              <div className="mt-2 pt-2 border-t border-emerald-200/60 flex flex-wrap items-center gap-2 text-[10px] text-emerald-800">
                <span className="font-bold uppercase tracking-wider">Metodología de los reactivos:</span>
                <span>{STYLE_METADATA[selectedStyle].methodologyOverview}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation Results Banner (when active style is submitted) */}
      {currentState.isSubmitted && currentState.lastResult && (
        <div className={`p-6 rounded-2xl border shadow-sm transition-all ${
          currentState.lastResult.isApproved
            ? 'bg-gradient-to-r from-emerald-50 via-white to-emerald-50/30 border-[#39A900]'
            : 'bg-gradient-to-r from-rose-50 via-white to-rose-50/30 border-rose-300'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                currentState.lastResult.isApproved ? 'bg-[#39A900] text-white' : 'bg-rose-600 text-white'
              }`}>
                {currentState.lastResult.isApproved ? (
                  <ShieldCheck className="w-8 h-8" />
                ) : (
                  <XCircle className="w-8 h-8" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Concepto Evaluativo SENA · Prueba Estilo {selectedStyle}
                </span>
                <div className="flex items-center gap-3 mt-0.5">
                  <h3 className={`text-2xl font-black uppercase tracking-wide ${
                    currentState.lastResult.isApproved ? 'text-[#007832]' : 'text-rose-700'
                  }`}>
                    {currentState.lastResult.concept} ({currentState.lastResult.percentage}%)
                  </h3>
                  <span className="text-xs font-bold font-mono text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    {currentState.lastResult.score} / {currentState.lastResult.maxScore} Aciertos
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 max-w-xl">
                  {currentState.lastResult.isApproved
                    ? `¡Excelente! Has superado el umbral del 70% en la prueba de estilo ${selectedStyle}. Al aprobar esta prueba, el ${rap.code} queda formalmente APROBADO.`
                    : `Obtuviste ${currentState.lastResult.percentage}%. Recuerda que puedes reintentar esta prueba o presentar la evaluación de cualquiera de los otros 3 estilos (Acomodador, Divergente, Convergente, Asimilador). Con solo aprobar una, apruebas el RAP.`}
                </p>

                {/* Applied Technique and Instrument in Result Banner */}
                <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-700">
                  <div>
                    <span className="text-slate-400 font-medium">Técnica: </span>
                    <strong className="text-slate-800">{currentState.lastResult.evaluationTechnique}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Instrumento: </span>
                    <strong className="text-slate-800">{currentState.lastResult.evaluationInstrument}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
              <button
                onClick={() => onViewCertificate(currentState.lastResult!)}
                className="px-5 py-3 text-xs font-bold text-white bg-[#00324D] hover:bg-[#002235] rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#39A900]" />
                <span>Ver Constancia Oficial de Resultados</span>
              </button>
              <button
                onClick={handleResetCurrentStyle}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Presentar Nuevamente</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Question Stepper / Navigator Bar */}
      <div className="flex items-center justify-between gap-2 p-3 bg-white rounded-xl border border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {questions.map((q, idx) => {
            const isAnswered = !!currentState.answers[q.id];
            const isCurrent = idx === currentState.currentQuestionIndex;
            let badgeStyle = 'bg-slate-100 text-slate-700 hover:bg-slate-200';

            if (currentState.isSubmitted && currentState.lastResult) {
              const res = currentState.lastResult.questionResults[idx];
              if (res?.isCorrect) {
                badgeStyle = 'bg-emerald-600 text-white';
              } else {
                badgeStyle = 'bg-rose-600 text-white';
              }
            } else if (isCurrent) {
              badgeStyle = 'bg-[#00324D] text-white ring-2 ring-[#39A900]';
            } else if (isAnswered) {
              badgeStyle = 'bg-[#39A900] text-white';
            }

            return (
              <button
                key={q.id}
                onClick={() => handleSetQuestionIndex(idx)}
                className={`w-9 h-9 rounded-lg text-xs font-bold flex items-center justify-center transition-all shrink-0 cursor-pointer ${badgeStyle}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 font-medium whitespace-nowrap pl-2">
          {answeredCount} de {questions.length} respondidas
        </div>
      </div>

      {/* Active Question Display Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded">
              Pregunta {currentQ.questionNumber} de {questions.length}
            </span>
            <span className="text-[11px] font-bold text-[#007832] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              Estilo {selectedStyle}
            </span>
            <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded flex items-center gap-1">
              <Target className="w-3 h-3 text-[#39A900]" />
              <span>{STYLE_METADATA[selectedStyle].shortTechnique}</span>
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Estándar: {currentQ.competencyStandard}
          </span>
        </div>

        {/* Case Study Context (if provided) */}
        {currentQ.scenario && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-5">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00324D] flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#39A900]" />
                <span>{STYLE_METADATA[selectedStyle].scenarioTag}:</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                Técnica: {STYLE_METADATA[selectedStyle].shortTechnique}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {currentQ.scenario}
            </p>
          </div>
        )}

        {/* Question Statement */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6 leading-snug">
          {currentQ.question}
        </h3>

        {/* Options List */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option) => {
            const isSelected = currentState.answers[currentQ.id] === option.id;
            const isCorrectOption = option.id === currentQ.correctOptionId;

            let optionClass = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white cursor-pointer';

            if (currentState.isSubmitted) {
              if (isCorrectOption) {
                optionClass = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold ring-1 ring-emerald-500';
              } else if (isSelected && !isCorrectOption) {
                optionClass = 'border-rose-400 bg-rose-50/70 text-rose-950 line-through';
              } else {
                optionClass = 'border-slate-200 bg-slate-50/40 opacity-70';
              }
            } else if (isSelected) {
              optionClass = 'border-[#39A900] bg-emerald-50/30 ring-2 ring-[#39A900]/30';
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(currentQ.id, option.id)}
                disabled={currentState.isSubmitted}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${optionClass}`}
              >
                <span className={`w-6 h-6 rounded-full text-xs font-bold uppercase flex items-center justify-center shrink-0 mt-0.5 border ${
                  isSelected
                    ? currentState.isSubmitted
                      ? isCorrectOption
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-rose-600 text-white border-rose-600'
                      : 'bg-[#39A900] text-white border-[#39A900]'
                    : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}>
                  {option.id}
                </span>
                <span className="text-xs sm:text-sm leading-relaxed flex-1">
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Post-submission Technical Explanation */}
        {currentState.isSubmitted && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mt-6">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4 text-[#007832]" />
              <span>Retroalimentación Pedagógica del Instructor:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
          <button
            onClick={() => handleSetQuestionIndex(Math.max(0, currentState.currentQuestionIndex - 1))}
            disabled={currentState.currentQuestionIndex === 0}
            className="px-4 py-2 text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          {!currentState.isSubmitted ? (
            currentState.currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleEvaluate}
                disabled={!isAllAnswered}
                className={`px-6 py-2.5 text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer ${
                  isAllAnswered
                    ? 'bg-[#39A900] hover:bg-[#007832] text-white hover:scale-105'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Finalizar Evaluación ({answeredCount}/{questions.length})</span>
              </button>
            ) : (
              <button
                onClick={() => handleSetQuestionIndex(Math.min(questions.length - 1, currentState.currentQuestionIndex + 1))}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#00324D] hover:bg-[#002235] rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )
          ) : (
            currentState.currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={() => handleSetQuestionIndex(currentState.currentQuestionIndex + 1)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#00324D] hover:bg-[#002235] rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Siguiente Pregunta</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => currentState.lastResult && onViewCertificate(currentState.lastResult)}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#00324D] hover:bg-[#002235] rounded-xl flex items-center gap-2 shadow-sm transition-transform hover:scale-105 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#39A900]" />
                <span>Generar Constancia Oficial</span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
