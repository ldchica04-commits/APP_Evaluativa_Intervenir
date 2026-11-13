import React from 'react';
import { EvaluationResult } from '../types';
import { SenaLogo } from './SenaLogo';
import { COMPETENCY_INFO } from '../data/senaData';
import { Printer, X, CheckCircle2, XCircle, Award, Calendar } from 'lucide-react';

interface CertificateModalProps {
  result: EvaluationResult;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ result, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 print:shadow-none print:border-none print:max-w-full flex flex-col max-h-[92vh] sm:max-h-[95vh] print:max-h-none">
        
        {/* Printable Document Container - Strictly formatted for 1 Letter Sheet */}
        <div className="overflow-y-auto p-6 sm:p-8 print:p-0 bg-white print-page-break text-slate-900 font-sans flex-1">
          
          {/* 1. ENCABEZADO EN TABLA EN LA PARTE SUPERIOR (Requisito Estricto) */}
          <table className="w-full border-collapse border border-slate-400 text-xs mb-3">
            <tbody>
              <tr>
                {/* Cuadrante Izquierdo: Logo SENA */}
                <td className="w-1/4 border border-slate-400 p-2.5 text-center align-middle bg-slate-50/60">
                  <div className="flex flex-col items-center justify-center">
                    <SenaLogo
                      className="h-12 w-auto"
                      variant="color"
                      showText={true}
                      textClassName="text-[6.5px] sm:text-[7.5px] leading-[1.15] tracking-normal text-left"
                    />
                    <span className="text-[8.5px] font-bold text-[#00324D] uppercase mt-1 tracking-wider">
                      SENA · Regional Colombia
                    </span>
                  </div>
                </td>

                {/* Cuadrante Central: Título "Evidencia de Conocimiento" */}
                <td className="w-2/4 border border-slate-400 p-2.5 text-center align-middle">
                  <div className="text-[9px] font-extrabold uppercase text-[#007832] tracking-wider">
                    Servicio Nacional de Aprendizaje · Dirección de Formación
                  </div>
                  <h1 className="text-base sm:text-lg font-black uppercase text-[#00324D] tracking-wide my-0.5 font-display">
                    EVIDENCIA DE CONOCIMIENTO
                  </h1>
                  <div className="text-[10px] text-slate-700 font-bold">
                    Instrumento de Evaluación y Constancia Oficial de Aprendizaje
                  </div>
                  <div className="text-[9px] text-slate-500 font-medium mt-0.5">
                    Sistema de Gestión de la Calidad y Evaluación Formativa
                  </div>
                </td>

                {/* Cuadrante Lateral / Fecha de la Evidencia */}
                <td className="w-1/4 border border-slate-400 p-2 text-center align-middle bg-slate-50/60">
                  <div className="text-[8.5px] uppercase font-bold text-slate-500">
                    Fecha de la Evidencia
                  </div>
                  <div className="text-xs font-bold text-slate-900 my-0.5 flex items-center justify-center gap-1">
                    <Calendar className="w-3 h-3 text-[#39A900] inline shrink-0" />
                    <span>{result.completedAt}</span>
                  </div>
                  <div className="text-[8px] uppercase font-semibold text-slate-400 mt-1">
                    Código de Registro
                  </div>
                  <div className="text-[9.5px] font-mono font-bold text-slate-900 bg-white border border-slate-300 px-1.5 py-0.5 rounded inline-block mt-0.5">
                    {result.certificateId}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* 2. DATOS DEL APRENDIZ */}
          <table className="w-full border-collapse border border-slate-400 text-[10.5px] mb-2.5">
            <thead>
              <tr className="bg-slate-100 text-[#00324D] border-b border-slate-400 font-bold text-[9.5px] uppercase">
                <th colSpan={4} className="py-1 px-2.5 text-left tracking-wider">
                  I. Datos Generales del Aprendiz
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-300">
                <td className="py-1 px-2.5 font-bold text-slate-600 bg-slate-50/70 w-1/5">Nombre del Aprendiz:</td>
                <td className="py-1 px-2.5 font-bold text-slate-900 w-[30%]">{result.apprentice.fullName}</td>
                <td className="py-1 px-2.5 font-bold text-slate-600 bg-slate-50/70 w-1/5">Documento Identidad:</td>
                <td className="py-1 px-2.5 font-semibold text-slate-800 w-[30%]">
                  {result.apprentice.docType} {result.apprentice.docNumber}
                </td>
              </tr>
              <tr className="border-b border-slate-300">
                <td className="py-1 px-2.5 font-bold text-slate-600 bg-slate-50/70">Número de Ficha:</td>
                <td className="py-1 px-2.5 font-mono font-bold text-slate-900">{result.apprentice.ficha}</td>
                <td className="py-1 px-2.5 font-bold text-slate-600 bg-slate-50/70">Estilo de Aprendizaje (Kolb):</td>
                <td className="py-1 px-2.5 font-bold text-[#007832]">
                  {result.apprentice.kolbResult?.style || result.evaluatedStyle} ({result.evaluatedStyleTag})
                </td>
              </tr>
              <tr>
                <td className="py-1 px-2.5 font-bold text-slate-600 bg-slate-50/70">Centro y Regional:</td>
                <td colSpan={3} className="py-1 px-2.5 text-slate-700">
                  {result.apprentice.center} · {result.apprentice.regional}
                </td>
              </tr>
            </tbody>
          </table>

          {/* 3. INFORMACIÓN DE LA COMPETENCIA Y RAP */}
          <table className="w-full border-collapse border border-slate-400 text-[10.5px] mb-2.5">
            <thead>
              <tr className="bg-slate-100 text-[#00324D] border-b border-slate-400 font-bold text-[9.5px] uppercase">
                <th colSpan={4} className="py-1 px-2.5 text-left tracking-wider">
                  II. Información de la Competencia Laboral y Resultado de Aprendizaje (RAP)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-300">
                <td className="py-1 px-2.5 font-bold text-slate-600 bg-slate-50/70 w-1/5">Programa Formativo:</td>
                <td className="py-1 px-2.5 font-bold text-slate-900 w-[30%]">
                  {COMPETENCY_INFO.program} (Cód. {COMPETENCY_INFO.programCode})
                </td>
                <td className="py-1 px-2.5 font-bold text-slate-600 bg-slate-50/70 w-1/5">Técnica de Evaluación:</td>
                <td className="py-1 px-2.5 text-slate-800 text-[9.5px] font-medium w-[30%]">
                  {result.evaluationTechnique || 'Estudio de Casos y Pruebas Diferenciadas'}
                </td>
              </tr>
              <tr className="border-b border-slate-300">
                <td className="py-1 px-2.5 font-bold text-slate-600 bg-slate-50/70">Norma Competencia:</td>
                <td colSpan={3} className="py-1 px-2.5 text-slate-900 leading-tight">
                  <strong className="font-mono text-[#007832]">{COMPETENCY_INFO.code}</strong> - {COMPETENCY_INFO.name}
                </td>
              </tr>
              <tr className="border-b border-slate-300">
                <td className="py-1 px-2.5 font-bold text-slate-600 bg-slate-50/70">Resultado (RAP):</td>
                <td className="py-1 px-2.5 font-extrabold text-[#00324D]">
                  {result.rapCode}: {result.rapTitle}
                </td>
                <td className="py-1 px-2.5 font-bold text-slate-600 bg-slate-50/70">Instrumento:</td>
                <td className="py-1 px-2.5 text-slate-800 text-[9.5px]">
                  {result.evaluationInstrument || 'Cuestionario de Casos y Criterios'}
                </td>
              </tr>
              <tr>
                <td className="py-1.5 px-2.5 font-bold text-slate-600 bg-slate-50/70">Concepto Oficial:</td>
                <td colSpan={3} className="py-1.5 px-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded font-black text-xs ${
                      result.isApproved
                        ? 'bg-emerald-100 text-[#007832] border border-emerald-400'
                        : 'bg-rose-100 text-rose-800 border border-rose-400'
                    }`}>
                      {result.concept} ({result.percentage}%)
                    </span>
                    <span className="text-[10px] text-slate-600 font-semibold">
                      · Calificación: <strong>{result.score} de {result.maxScore} aciertos</strong> (Criterio aprobatorio: ≥ 70%)
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* 4. TABLA DE EVALUACIÓN: PREGUNTA, RESPUESTA CORRECTA Y ESTADO (Requisito Estricto) */}
          <div className="mb-2.5">
            <div className="text-[9.5px] uppercase font-bold text-[#00324D] tracking-wider mb-1 flex items-center justify-between">
              <span>III. Desglose de Reactivos: Pregunta, Respuesta Correcta y Estado</span>
              <span className="text-[9px] text-slate-500 font-medium">
                Total reactivos evaluados: {result.questionResults.length}
              </span>
            </div>

            <table className="w-full border-collapse border border-slate-400 text-[10px]">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-400 uppercase text-[9px]">
                  <th className="py-1 px-1.5 w-7 text-center border-r border-slate-400">#</th>
                  <th className="py-1 px-2 text-left border-r border-slate-400">Pregunta y Contexto Situacional</th>
                  <th className="py-1 px-2 text-left border-r border-slate-400 w-[38%]">Respuesta Correcta</th>
                  <th className="py-1 px-2 text-center w-24">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {result.questionResults.map((q) => (
                  <tr key={q.questionNumber} className={q.isCorrect ? 'bg-white' : 'bg-rose-50/20'}>
                    <td className="py-1 px-1.5 text-center font-bold text-slate-700 border-r border-slate-300 align-top">
                      {q.questionNumber}
                    </td>
                    <td className="py-1 px-2 text-slate-900 border-r border-slate-300 align-top">
                      <div className="font-semibold leading-tight">{q.questionText}</div>
                      {q.scenario && (
                        <div className="text-[9px] text-slate-500 mt-0.5 leading-snug">
                          <span className="font-semibold text-slate-600">Contexto:</span> {q.scenario}
                        </div>
                      )}
                    </td>
                    <td className="py-1 px-2 text-emerald-950 border-r border-slate-300 align-top">
                      <div className="font-medium leading-tight text-emerald-900">{q.correctOptionText}</div>
                      {!q.isCorrect && (
                        <div className="text-[8.5px] text-rose-700 mt-0.5 font-medium">
                          Aprendiz seleccionó: {q.selectedOptionText}
                        </div>
                      )}
                    </td>
                    <td className="py-1 px-2 text-center align-top whitespace-nowrap">
                      {q.isCorrect ? (
                        <span className="inline-flex items-center gap-1 font-bold text-[#007832] bg-emerald-50 border border-emerald-300 px-1.5 py-0.5 rounded text-[9px]">
                          <CheckCircle2 className="w-2.5 h-2.5 text-[#39A900] inline" />
                          Aprobado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-bold text-rose-700 bg-rose-50 border border-rose-300 px-1.5 py-0.5 rounded text-[9px]">
                          <XCircle className="w-2.5 h-2.5 text-rose-600 inline" />
                          No Aprobado
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 5. FIRMAS DE RESPONSABILIDAD Y VALIDACIÓN CRIPTOGRÁFICA (Ajustado para caber en 1 página Carta) */}
          <div className="pt-2 border-t border-slate-300">
            <div className="grid grid-cols-3 gap-4 text-center items-end">
              {/* Instructor */}
              <div className="px-2">
                <div className="h-9 border-b border-slate-400 flex items-center justify-center italic text-slate-600 text-[11px] font-serif">
                  Equipo Ejecutor SENA
                </div>
                <div className="text-[9.5px] font-bold text-slate-900 mt-0.5">
                  Instructor Técnico SENA
                </div>
                <div className="text-[8.5px] text-slate-500">
                  Gestión Empresarial · FPI
                </div>
              </div>

              {/* Sello y Validación */}
              <div className="flex flex-col items-center justify-center p-1.5 rounded border border-slate-200 bg-slate-50">
                <div className="text-[8px] font-bold text-[#007832] uppercase tracking-wider">
                  Certificación Digital SENA
                </div>
                <div className="text-[7.5px] font-mono text-slate-500 mt-0.5">
                  ID: {result.certificateId}
                </div>
                <div className="text-[7.5px] text-slate-400">
                  Autenticidad Verificada
                </div>
              </div>

              {/* Aprendiz */}
              <div className="px-2">
                <div className="h-9 border-b border-slate-400 flex items-center justify-center italic text-slate-700 text-[11px] font-serif">
                  {result.apprentice.fullName}
                </div>
                <div className="text-[9.5px] font-bold text-slate-900 mt-0.5">
                  Firma del Aprendiz
                </div>
                <div className="text-[8.5px] text-slate-500 font-mono">
                  {result.apprentice.docType}: {result.apprentice.docNumber}
                </div>
              </div>
            </div>

            <div className="mt-2 text-center text-[7.5px] text-slate-400">
              Servicio Nacional de Aprendizaje SENA · Documento oficial con valor probatorio en el Sistema de Gestión de Formación Profesional Integral.
            </div>
          </div>

        </div>

        {/* Action Controls Toolbar - Positioned at the BOTTOM of the document */}
        <div className="no-print sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 bg-slate-900 text-white border-t border-slate-800 shrink-0">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <Award className="w-4.5 h-4.5 text-[#39A900]" />
            <span className="font-semibold text-slate-200">Constancia Oficial SENA</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
              aria-label="Cerrar constancia"
              title="Cerrar constancia"
            >
              <X className="w-4 h-4" />
              <span>Cerrar</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 text-xs font-bold rounded-xl bg-[#39A900] hover:bg-[#007832] text-white flex items-center gap-2 transition-all shadow-md hover:scale-[1.02] cursor-pointer"
              title="Imprimir o guardar constancia en PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Guardar PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
