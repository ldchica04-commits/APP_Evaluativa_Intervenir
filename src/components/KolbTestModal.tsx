import React, { useState } from 'react';
import { KolbResult, ApprenticeInfo } from '../types';
import { KOLB_QUESTIONS, calculateKolbStyle, KOLB_PROFILES } from '../data/kolbData';
import { Sparkles, CheckCircle2, ArrowRight, Brain, RotateCcw, X, Compass, Lightbulb, Target } from 'lucide-react';

interface KolbTestModalProps {
  apprentice: ApprenticeInfo;
  onSaveResult: (result: KolbResult) => void;
  onClose: () => void;
  isMandatoryOnboarding?: boolean;
}

export const KolbTestModal: React.FC<KolbTestModalProps> = ({
  apprentice,
  onSaveResult,
  onClose,
  isMandatoryOnboarding = false,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'EC' | 'OR' | 'CA' | 'EA'>>({});
  const [calculatedResult, setCalculatedResult] = useState<KolbResult | null>(null);

  const totalQuestions = KOLB_QUESTIONS.length;
  const currentQ = KOLB_QUESTIONS[currentStep];
  const isAllAnswered = Object.keys(answers).length === totalQuestions;

  const handleSelectOption = (dimension: 'EC' | 'OR' | 'CA' | 'EA') => {
    const updated = { ...answers, [currentQ.id]: dimension };
    setAnswers(updated);

    if (currentStep < totalQuestions - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate
      const res = calculateKolbStyle(updated);
      setCalculatedResult(res);
    }
  };

  const handleCompleteAndSave = () => {
    if (calculatedResult) {
      onSaveResult(calculatedResult);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setCalculatedResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-7">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-7 py-5 bg-gradient-to-r from-[#00324D] to-[#001f30] text-white flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#39A900] flex items-center justify-center text-white shrink-0">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Modelo Pedagógico SENA · Diagnóstico Cognitivo
              </div>
              <h3 className="text-lg sm:text-xl font-bold">
                Test de Estilos de Aprendizaje de David Kolb
              </h3>
            </div>
          </div>

          {!isMandatoryOnboarding && (
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-7 sm:p-9">
          {!calculatedResult ? (
            <div className="space-y-6">
              {/* Stepper Progress */}
              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-slate-500 mb-2">
                  <span>Situación {currentStep + 1} de {totalQuestions}</span>
                  <span>{Math.round(((currentStep) / totalQuestions) * 100)}% Completado</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#39A900] transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Autoevaluación de preferencias para {apprentice.fullName}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {currentQ.situation}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const isSelected = answers[currentQ.id] === option.dimension;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option.dimension)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 group cursor-pointer ${
                        isSelected
                          ? 'border-[#39A900] bg-emerald-50/50 ring-2 ring-[#39A900]/20'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 bg-white'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border ${
                        isSelected
                          ? 'bg-[#39A900] text-white border-[#39A900]'
                          : 'bg-slate-100 text-slate-600 border-slate-300 group-hover:bg-slate-200'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div className="flex-1">
                        <span className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed block">
                          {option.text}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium mt-1 block">
                          Enfoque: {option.tag}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Step Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>

                {!isMandatoryOnboarding && (
                  <button
                    onClick={onClose}
                    className="text-xs text-slate-400 hover:text-slate-600 font-medium"
                  >
                    Responder más tarde
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#007832] flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8 text-[#39A900]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Diagnóstico Culminado con Éxito
                </span>
                <h3 className="text-2xl font-extrabold text-[#00324D] mt-0.5">
                  Tu Estilo Predominante es: <span className="text-[#39A900]">{calculatedResult.style}</span>
                </h3>
                <p className="text-xs font-medium text-slate-600 mt-1 max-w-lg mx-auto">
                  {calculatedResult.tagline}
                </p>
              </div>

              {/* Description Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                {calculatedResult.description}
              </div>

              {/* Strengths & Recommendations Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    <Target className="w-4 h-4 text-[#39A900]" />
                    <span>Tus Fortalezas Cognitivas</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {calculatedResult.characteristics.map((char, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-1.5">
                        <span className="text-[#39A900] font-bold">✓</span>
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    <span>Estrategias para Mejoramiento Organizacional</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {calculatedResult.recommendedStrategies.map((strat, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-1.5">
                        <span className="text-blue-600 font-bold">→</span>
                        <span>{strat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleReset}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Repetir Test
                </button>

                <button
                  onClick={handleCompleteAndSave}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-xl shadow-sm flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Guardar y Comenzar Formación</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
