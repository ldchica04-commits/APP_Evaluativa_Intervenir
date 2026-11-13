import React, { useState } from 'react';
import { ApprenticeInfo } from '../types';
import { User, X, Check, Building2, IdCard, Hash, MapPin } from 'lucide-react';

interface ApprenticeModalProps {
  currentInfo: ApprenticeInfo;
  onSave: (info: ApprenticeInfo) => void;
  onClose: () => void;
}

export const ApprenticeModal: React.FC<ApprenticeModalProps> = ({
  currentInfo,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<ApprenticeInfo>({ ...currentInfo });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...currentInfo,
      ...formData,
      fullName: formData.fullName.trim() || currentInfo.fullName,
      docNumber: formData.docNumber.trim() || currentInfo.docNumber,
      ficha: formData.ficha.trim() || currentInfo.ficha,
      center: formData.center.trim() || currentInfo.center,
      regional: formData.regional.trim() || currentInfo.regional,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-[#00324D] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#39A900] flex items-center justify-center text-white">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Datos del Aprendiz SENA</h3>
              <p className="text-xs text-slate-300">
                Esta información figurará en la constancia oficial de resultados
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nombre Completo del Aprendiz
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Ej. Carlos Andrés Mendoza Restrepo"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tipo Doc.
              </label>
              <select
                value={formData.docType}
                onChange={(e) => setFormData({ ...formData, docType: e.target.value as any })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:border-transparent bg-white"
              >
                <option value="C.C.">C.C.</option>
                <option value="T.I.">T.I.</option>
                <option value="C.E.">C.E.</option>
                <option value="P.P.T.">P.P.T.</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Número de Documento
              </label>
              <input
                type="text"
                required
                value={formData.docNumber}
                onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                placeholder="1020789456"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:border-transparent font-medium text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Ficha de Caracterización (Código de Grupo)
            </label>
            <input
              type="text"
              required
              value={formData.ficha}
              onChange={(e) => setFormData({ ...formData, ficha: e.target.value })}
              placeholder="Ej. 2874195"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:border-transparent font-medium text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Centro de Formación SENA
            </label>
            <input
              type="text"
              required
              value={formData.center}
              onChange={(e) => setFormData({ ...formData, center: e.target.value })}
              placeholder="Ej. Centro de Gestión de Mercados, Logística y TI"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Regional SENA
            </label>
            <input
              type="text"
              required
              value={formData.regional}
              onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
              placeholder="Ej. Regional Distrito Capital"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:border-transparent"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Check className="w-4 h-4" />
              Guardar Datos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
