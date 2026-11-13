import React, { useState } from 'react';
import { InstructorRecord } from '../types';
import { 
  UserCog, 
  X, 
  Search, 
  Plus, 
  Edit3, 
  Key, 
  Trash2, 
  Eye, 
  EyeOff, 
  Check, 
  Save, 
  AlertTriangle, 
  Mail, 
  User, 
  Hash, 
  Layers, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface ManageInstructorsModalProps {
  instructors: InstructorRecord[];
  availableFichas: string[];
  onUpdateInstructor: (updated: InstructorRecord) => void;
  onDeleteInstructor: (instructorId: string) => void;
  onOpenCreateInstructor: () => void;
  onClose: () => void;
}

export const ManageInstructorsModal: React.FC<ManageInstructorsModalProps> = ({
  instructors,
  availableFichas,
  onUpdateInstructor,
  onDeleteInstructor,
  onOpenCreateInstructor,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  // Editing modal state
  const [editingInstructor, setEditingInstructor] = useState<InstructorRecord | null>(null);
  const [customFicha, setCustomFicha] = useState('');

  // Password change modal state
  const [passwordChangeInstructor, setPasswordChangeInstructor] = useState<InstructorRecord | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Delete confirmation modal state
  const [deletingInstructor, setDeletingInstructor] = useState<InstructorRecord | null>(null);

  // Toggle password visibility in the table
  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter instructors by search term
  const filteredInstructors = instructors.filter((inst) => {
    const term = searchTerm.toLowerCase();
    return (
      inst.fullName.toLowerCase().includes(term) ||
      inst.docNumber.includes(term) ||
      inst.username.toLowerCase().includes(term) ||
      inst.fichas.some((f) => f.includes(term))
    );
  });

  // Handle saving general edits
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInstructor) return;
    if (!editingInstructor.fullName.trim() || !editingInstructor.username.trim() || !editingInstructor.docNumber.trim()) {
      return;
    }
    if (editingInstructor.fichas.length === 0) {
      return;
    }

    onUpdateInstructor(editingInstructor);
    setEditingInstructor(null);
  };

  // Toggle ficha in edit modal
  const handleToggleFichaInEdit = (fichaStr: string) => {
    if (!editingInstructor) return;
    if (editingInstructor.fichas.includes(fichaStr)) {
      if (editingInstructor.fichas.length === 1) return; // Keep at least one
      setEditingInstructor({
        ...editingInstructor,
        fichas: editingInstructor.fichas.filter((f) => f !== fichaStr),
      });
    } else {
      setEditingInstructor({
        ...editingInstructor,
        fichas: [...editingInstructor.fichas, fichaStr],
      });
    }
  };

  // Add custom ficha in edit modal
  const handleAddCustomFichaInEdit = () => {
    if (!editingInstructor) return;
    const trimmed = customFicha.trim();
    if (trimmed && !editingInstructor.fichas.includes(trimmed)) {
      setEditingInstructor({
        ...editingInstructor,
        fichas: [...editingInstructor.fichas, trimmed],
      });
      setCustomFicha('');
    }
  };

  // Handle saving password change
  const handleSavePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (!passwordChangeInstructor) return;
    if (!newPassword.trim()) {
      setPasswordError('La nueva contraseña no puede estar vacía.');
      return;
    }
    if (newPassword.trim().length < 4) {
      setPasswordError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden. Verifique nuevamente.');
      return;
    }

    const updated: InstructorRecord = {
      ...passwordChangeInstructor,
      password: newPassword.trim(),
    };

    onUpdateInstructor(updated);
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setPasswordChangeInstructor(null);
      setNewPassword('');
      setConfirmPassword('');
    }, 1200);
  };

  // Handle confirmed delete
  const handleConfirmDelete = () => {
    if (!deletingInstructor) return;
    onDeleteInstructor(deletingInstructor.id);
    setDeletingInstructor(null);
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col font-sans">
        
        {/* Header Bar */}
        <div className="px-6 py-4.5 bg-[#00324D] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#39A900] text-white shadow-xs">
              <UserCog className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-slate-800 text-emerald-300 font-mono px-2 py-0.5 rounded border border-slate-700 font-bold uppercase tracking-wider">
                  Módulo de Configuración SENA
                </span>
                <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                  {instructors.length} Instructores Registrados
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-white font-display mt-0.5">
                Administración de Usuarios Instructores
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar administración de instructores"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar instructor por nombre, documento, usuario o ficha..."
              className="w-full pl-9.5 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] bg-white text-slate-900 font-medium"
            />
          </div>

          {/* Add New Instructor Button */}
          <button
            onClick={onOpenCreateInstructor}
            className="px-4 py-2.5 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Nuevo Instructor</span>
          </button>
        </div>

        {/* Instructors Table */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px]">
                    <th className="py-3 px-4">Instructor</th>
                    <th className="py-3 px-4">Documento</th>
                    <th className="py-3 px-4">Usuario de Acceso</th>
                    <th className="py-3 px-4">Fichas Asignadas</th>
                    <th className="py-3 px-4">Contraseña</th>
                    <th className="py-3 px-4 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredInstructors.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500 italic">
                        No se encontraron instructores registrados con el criterio de búsqueda.
                      </td>
                    </tr>
                  ) : (
                    filteredInstructors.map((inst) => {
                      const isPasswordVisible = visiblePasswords[inst.id] || false;

                      return (
                        <tr key={inst.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* Nombre */}
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#007832] flex items-center justify-center font-bold text-xs shrink-0">
                                {inst.fullName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="leading-tight">{inst.fullName}</div>
                                <div className="text-[10px] text-slate-400 font-normal mt-0.5 font-mono">
                                  ID: {inst.id} · Registrado: {inst.registeredAt}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Documento */}
                          <td className="py-3.5 px-4 font-mono font-semibold text-slate-700 whitespace-nowrap">
                            {inst.docNumber}
                          </td>

                          {/* Usuario */}
                          <td className="py-3.5 px-4 font-medium text-slate-800">
                            <span className="font-mono text-[#00324D] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              {inst.username}
                            </span>
                          </td>

                          {/* Fichas */}
                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {inst.fichas.map((f) => (
                                <span
                                  key={f}
                                  className="px-2 py-0.5 rounded bg-emerald-50 text-[#007832] border border-emerald-300 font-mono font-bold text-[10px]"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </td>

                          {/* Contraseña */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-xs text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 min-w-[70px] text-center">
                                {isPasswordVisible ? inst.password : '••••••••'}
                              </span>
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility(inst.id)}
                                className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors cursor-pointer"
                                title={isPasswordVisible ? "Ocultar contraseña" : "Ver contraseña"}
                              >
                                {isPasswordVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </td>

                          {/* Acciones */}
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* Botón Cambiar Contraseña */}
                              <button
                                onClick={() => {
                                  setPasswordChangeInstructor(inst);
                                  setNewPassword('');
                                  setConfirmPassword('');
                                  setPasswordError('');
                                  setPasswordSuccess(false);
                                }}
                                className="px-2 py-1 text-[11px] font-bold text-[#00324D] hover:text-white bg-slate-100 hover:bg-[#00324D] border border-slate-200 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                                title="Cambiar contraseña de este instructor"
                              >
                                <Key className="w-3 h-3 text-[#39A900]" />
                                <span>Clave</span>
                              </button>

                              {/* Botón Corregir Información */}
                              <button
                                onClick={() => setEditingInstructor({ ...inst })}
                                className="p-1.5 text-slate-600 hover:text-[#007832] bg-slate-100 hover:bg-emerald-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                                title="Editar datos e información del instructor"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {/* Botón Eliminar Instructor */}
                              <button
                                onClick={() => setDeletingInstructor(inst)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                                title="Eliminar instructor del sistema"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SUB-MODAL: CAMBIAR CONTRASEÑA */}
        {passwordChangeInstructor && (
          <div className="fixed inset-0 z-70 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-[#00324D]">
                  <Key className="w-4 h-4 text-[#39A900]" />
                  <span>Cambiar Contraseña de Instructor</span>
                </div>
                <button
                  onClick={() => setPasswordChangeInstructor(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {passwordSuccess ? (
                <div className="p-5 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#007832] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 text-[#39A900]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#00324D]">
                    ¡Contraseña Actualizada con Éxito!
                  </h4>
                  <p className="text-xs text-slate-500">
                    La nueva clave para <strong>{passwordChangeInstructor.fullName}</strong> ya está activa.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSavePasswordChange} className="space-y-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-[11px] text-slate-500 font-bold uppercase">Instructor:</div>
                    <div className="font-bold text-slate-900 text-xs mt-0.5">
                      {passwordChangeInstructor.fullName}
                    </div>
                    <div className="font-mono text-[11px] text-slate-500">
                      Usuario: {passwordChangeInstructor.username}
                    </div>
                  </div>

                  {passwordError && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{passwordError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Nueva Contraseña *
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        required
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setPasswordError('');
                        }}
                        placeholder="Mínimo 4 caracteres"
                        className="w-full px-3 py-2 pr-9 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] font-mono text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Confirmar Nueva Contraseña *
                    </label>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordError('');
                      }}
                      placeholder="Repita la nueva contraseña"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] font-mono text-slate-900"
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setPasswordChangeInstructor(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-xl flex items-center gap-1.5 shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Actualizar Contraseña</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* SUB-MODAL: CORREGIR INFORMACIÓN DEL INSTRUCTOR */}
        {editingInstructor && (
          <div className="fixed inset-0 z-70 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-[#00324D]">
                  <Edit3 className="w-4 h-4 text-[#39A900]" />
                  <span>Corregir Información del Instructor</span>
                </div>
                <button
                  onClick={() => setEditingInstructor(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Nombres y Apellidos *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingInstructor.fullName}
                    onChange={(e) =>
                      setEditingInstructor({ ...editingInstructor, fullName: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Número de Documento *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingInstructor.docNumber}
                      onChange={(e) =>
                        setEditingInstructor({ ...editingInstructor, docNumber: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Usuario / Correo *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingInstructor.username}
                      onChange={(e) =>
                        setEditingInstructor({ ...editingInstructor, username: e.target.value.toLowerCase() })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-medium"
                    />
                  </div>
                </div>

                {/* Fichas Asignadas */}
                <div className="pt-2 border-t border-slate-200">
                  <label className="block font-bold uppercase tracking-wider text-[#00324D] mb-1.5">
                    Fichas Asignadas al Instructor *
                  </label>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Seleccione o agregue las fichas que este instructor podrá visualizar y supervisar:
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {Array.from(new Set([...availableFichas, '2874195', '2874196'])).map((f) => {
                      const isChecked = editingInstructor.fichas.includes(f);
                      return (
                        <button
                          type="button"
                          key={f}
                          onClick={() => handleToggleFichaInEdit(f)}
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
                      placeholder="Agregar otra Ficha (ej. 2874198)..."
                      className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-xl font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomFichaInEdit}
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 cursor-pointer shrink-0"
                    >
                      + Agregar
                    </button>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setEditingInstructor(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Guardar Corrección</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SUB-MODAL: CONFIRMAR ELIMINACIÓN */}
        {deletingInstructor && (
          <div className="fixed inset-0 z-70 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900">
                  ¿Confirmar eliminación de instructor?
                </h4>
                <p className="text-xs text-slate-600 mt-1.5">
                  Se eliminará el acceso del instructor <strong>{deletingInstructor.fullName}</strong> ({deletingInstructor.username}). Ya no podrá ingresar al sistema de control ni consultar las fichas <strong>{deletingInstructor.fichas.join(', ')}</strong>.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeletingInstructor(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs cursor-pointer"
                >
                  Eliminar Instructor
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
