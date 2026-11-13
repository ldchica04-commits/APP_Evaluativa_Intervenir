import React, { useState } from 'react';
import { EvaluationResult, InstructorRecord, ApprenticeRecord } from '../types';
import { FileText, X, Search, Award, CheckCircle2, XCircle, Printer } from 'lucide-react';

interface CertificatesHistoryModalProps {
  allCertificates: EvaluationResult[];
  apprentices: ApprenticeRecord[];
  loggedInInstructor: InstructorRecord | null;
  onViewCertificate: (cert: EvaluationResult) => void;
  onClose: () => void;
}

export const CertificatesHistoryModal: React.FC<CertificatesHistoryModalProps> = ({
  allCertificates,
  apprentices,
  loggedInInstructor,
  onViewCertificate,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterConcept, setFilterConcept] = useState<'ALL' | 'APROBADO' | 'NO APROBADO'>('ALL');

  // Scope apprentices by loggedInInstructor if applicable
  const scopedDocNumbers = new Set(
    (loggedInInstructor
      ? apprentices.filter((a) => loggedInInstructor.fichas.includes(a.ficha))
      : apprentices
    ).map((a) => a.docNumber.trim())
  );

  const scopedCertificates = allCertificates.filter((c) =>
    scopedDocNumbers.has(c.apprentice.docNumber.trim())
  );

  const filteredCertificates = scopedCertificates.filter((cert) => {
    const matchesSearch =
      cert.apprentice.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.apprentice.docNumber.includes(searchTerm) ||
      cert.apprentice.ficha.includes(searchTerm) ||
      cert.rapCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesConcept =
      filterConcept === 'ALL' || cert.concept === filterConcept;

    return matchesSearch && matchesConcept;
  });

  return (
    <div className="fixed inset-0 z-70 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col font-sans">
        
        {/* Header Bar */}
        <div className="px-6 py-4.5 bg-[#00324D] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#39A900] text-white shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-slate-800 text-emerald-300 font-mono px-2 py-0.5 rounded border border-slate-700 font-bold uppercase tracking-wider">
                  Módulo del Instructor SENA
                </span>
                <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                  {filteredCertificates.length} Constancias Registradas
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-white font-display mt-0.5">
                Historial de Constancias y Evaluaciones Emitidas
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar historial"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por aprendiz, documento, ficha o ID de constancia..."
              className="w-full pl-9.5 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] bg-white text-slate-900 font-medium"
            />
          </div>

          {/* Concept Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 uppercase">Concepto:</span>
            <select
              value={filterConcept}
              onChange={(e) => setFilterConcept(e.target.value as any)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#39A900]"
            >
              <option value="ALL">Todos ({scopedCertificates.length})</option>
              <option value="APROBADO">Aprobados ({scopedCertificates.filter(c => c.isApproved).length})</option>
              <option value="NO APROBADO">No Aprobados ({scopedCertificates.filter(c => !c.isApproved).length})</option>
            </select>
          </div>
        </div>

        {/* Certificates Table */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px]">
                    <th className="py-3 px-4">Aprendiz</th>
                    <th className="py-3 px-4">Ficha</th>
                    <th className="py-3 px-4">RAP Evaluado</th>
                    <th className="py-3 px-4">Estilo Kolb</th>
                    <th className="py-3 px-4 text-center">Calificación</th>
                    <th className="py-3 px-4 text-center">Concepto</th>
                    <th className="py-3 px-4">Fecha</th>
                    <th className="py-3 px-4 text-center">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredCertificates.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500 italic">
                        No se encontraron constancias o evaluaciones registradas con los criterios de búsqueda.
                      </td>
                    </tr>
                  ) : (
                    filteredCertificates.map((cert) => (
                      <tr key={cert.certificateId} className="hover:bg-slate-50/80 transition-colors">
                        {/* Aprendiz */}
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          <div>{cert.apprentice.fullName}</div>
                          <div className="text-[10px] text-slate-400 font-mono font-normal">
                            {cert.apprentice.docType} {cert.apprentice.docNumber}
                          </div>
                        </td>

                        {/* Ficha */}
                        <td className="py-3.5 px-4 font-mono font-bold text-[#00324D]">
                          {cert.apprentice.ficha}
                        </td>

                        {/* RAP Evaluado */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{cert.rapCode}</div>
                          <div className="text-[10px] text-slate-500 truncate max-w-[180px]">
                            {cert.rapTitle}
                          </div>
                        </td>

                        {/* Estilo Kolb */}
                        <td className="py-3.5 px-4 font-semibold text-[#007832]">
                          {cert.evaluatedStyle}
                        </td>

                        {/* Calificación */}
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900">
                          {cert.percentage}%
                        </td>

                        {/* Concepto */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          {cert.isApproved ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] font-bold bg-emerald-100 text-[#007832] border border-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-[#39A900]" />
                              {cert.concept}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] font-bold bg-rose-100 text-rose-700 border border-rose-300">
                              <XCircle className="w-3 h-3 text-rose-600" />
                              {cert.concept}
                            </span>
                          )}
                        </td>

                        {/* Fecha */}
                        <td className="py-3.5 px-4 font-mono text-slate-500 whitespace-nowrap text-[11px]">
                          {cert.completedAt}
                        </td>

                        {/* Acción */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <button
                            onClick={() => onViewCertificate(cert)}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#00324D] hover:bg-[#002235] rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#39A900]" />
                            <span>Ver Constancia</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
