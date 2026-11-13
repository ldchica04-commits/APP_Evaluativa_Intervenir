import React, { useState } from 'react';
import { InstructorRecord } from '../types';
import { SenaLogo } from './SenaLogo';
import { 
  UserPlus, 
  ShieldCheck, 
  X, 
  User, 
  Lock, 
  Mail, 
  Hash, 
  CheckCircle2, 
  Check, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface InstructorRegisterModalProps {
  availableFichas: string[];
  onRegisterSuccess: (newInstructor: InstructorRecord) => void;
  onClose: () => void;
}

export const InstructorRegisterModal: React.FC<InstructorRegisterModalProps> = ({
  availableFichas,
  onRegisterSuccess,
  onClose,
}) => {
  const [fullName, setFullName] = useState('');
  const [docNumber, setDocNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedFichas, setSelectedFichas] = useState<string[]>(
    availableFichas.length > 0 ? [availableFichas[0]] : ['2874195']
  );
  const [customFicha, setCustomFicha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleToggleFicha = (fichaStr: string) => {
    if (selectedFichas.includes(fichaStr)) {
      if (selectedFichas.length === 1) return; // Must have at least 1 ficha
      setSelectedFichas(selectedFichas.filter((f) => f !== fichaStr));
    } else {
      setSelectedFichas([...selectedFichas, fichaStr]);
    }
  };

  const handleAddCustomFicha = () => {
    const trimmed = customFicha.trim();
    if (trimmed && !selectedFichas.includes(trimmed)) {
      setSelectedFichas([...selectedFichas, trimmed]);
      setCustomFicha('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !username.trim() || !password.trim() || !docNumber.trim()) {
      setErrorMessage('Por favor diligencie todos los campos obligatorios del instructor.');
      return;
    }

    if (selectedFichas.length === 0) {
      setErrorMessage('Debe asociar al menos una ficha de formación a este instructor.');
      return;
    }

    const newInstructor: InstructorRecord = {
      id: `INST-${docNumber.trim()}`,
      fullName: fullName.trim(),
      docNumber: docNumber.trim(),
      username: username.trim().toLowerCase(),
      password: password.trim(),
      fichas: selectedFichas,
      registeredAt: new Date().toLocaleDateString('es-CO'),
    };

    setSuccessMessage(true);
    setTimeout(() => {
      onRegisterSuccess(newInstructor);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#00324D] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#39A900] text-white">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] bg-slate-800 text-emerald-300 font-mono px-2 py-0.5 rounded border border-slate-700 font-bold uppercase tracking-wider">
                Servicio Nacional de Aprendizaje SENA
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-white font-display mt-0.5">
                Crear Cuenta de Instructor SENA
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar registro de instructor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-5">
          {successMessage ? (
            <div className="p-8 text-center space-y-4 my-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#007832] flex items-center justify-center mx-auto border border-emerald-300">
                <CheckCircle2 className="w-10 h-10 text-[#39A900]" />
              </div>
              <h3 className="text-xl font-black text-[#00324D]">
                ¡Cuenta de Instructor Creada Exitosamente!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Bienvenido(a), <strong>{fullName}</strong>. Su usuario y contraseña han sido registrados. Ingresando a las fichas asociadas: <strong className="font-mono text-[#007832]">{selectedFichas.join(', ')}</strong>...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-slate-700 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11.5px]">
                  Cree su usuario y contraseña para acceder al Módulo de Configuración. Podrá consultar la lista de aprendices, las calificaciones y el <strong>Dashboard Analítico de las Fichas asociadas a su nombre</strong>.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Nombre completo */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">
                  Nombres y Apellidos del Instructor *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Ing. Roberto Carlos Silva"
                    className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] bg-slate-50 focus:bg-white text-slate-900 font-medium"
                  />
                </div>
              </div>

              {/* Documento e Usuario */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">
                    Número de Documento *
                  </label>
                  <div className="relative">
                    <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={docNumber}
                      onChange={(e) => setDocNumber(e.target.value)}
                      placeholder="Ej. 52418930"
                      className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] bg-slate-50 focus:bg-white text-slate-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">
                    Usuario / Correo Institucional *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Ej. roberto.silva@sena.edu.co"
                      className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] bg-slate-50 focus:bg-white text-slate-900 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">
                  Contraseña del Instructor *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Defina una contraseña segura"
                    className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] bg-slate-50 focus:bg-white text-slate-900 font-mono"
                  />
                </div>
              </div>

              {/* Fichas Asociadas */}
              <div className="pt-2 border-t border-slate-200">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#00324D] mb-1.5">
                  Fichas de Formación Asociadas a su Nombre *
                </label>
                <p className="text-[11px] text-slate-500 mb-2">
                  Seleccione las fichas de los aprendices que estarán bajo su supervisión directa:
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {Array.from(new Set([...availableFichas, '2874195', '2874196'])).map((f) => {
                    const isChecked = selectedFichas.includes(f);
                    return (
                      <button
                        type="button"
                        key={f}
                        onClick={() => handleToggleFicha(f)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#39A900] text-white border-[#007832] shadow-2xs'
                            : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                        <span>Ficha {f}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Ficha add input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customFicha}
                    onChange={(e) => setCustomFicha(e.target.value)}
                    placeholder="Agregar otra Ficha (ej. 2874197)..."
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomFicha}
                    className="px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 cursor-pointer shrink-0"
                  >
                    + Agregar Ficha
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Crear Cuenta de Instructor</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
