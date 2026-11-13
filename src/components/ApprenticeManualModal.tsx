import React, { useState } from 'react';
import { SenaLogo } from './SenaLogo';
import { 
  BookOpen, 
  X, 
  Printer, 
  CheckCircle2, 
  Award, 
  Brain, 
  FileText, 
  ShieldCheck, 
  HelpCircle, 
  Search,
  ExternalLink,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface ApprenticeManualModalProps {
  onClose: () => void;
}

export const ApprenticeManualModal: React.FC<ApprenticeManualModalProps> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [searchTerm, setSearchTerm] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: 'intro', title: '1. Introducción y Propósito', icon: BookOpen },
    { id: 'acceso', title: '2. Requisitos y Acceso', icon: ShieldCheck },
    { id: 'kolb', title: '3. Estilos de Aprendizaje (Kolb)', icon: Brain },
    { id: 'raps', title: '4. Estructura de los 4 RAPs', icon: FileText },
    { id: 'estudio', title: '5. Guía de Estudio', icon: BookOpen },
    { id: 'evaluacion', title: '6. Guía de Evaluaciones', icon: Award },
    { id: 'criterios', title: '7. Criterios de Aprobación', icon: CheckCircle2 },
    { id: 'constancias', title: '8. Emisión de Constancias', icon: FileText },
    { id: 'perfil', title: '9. Gestión de Perfil y Salida', icon: HelpCircle },
    { id: 'faqs', title: '10. Preguntas Frecuentes', icon: HelpCircle },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static no-print:flex">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] print:max-h-none flex flex-col font-sans">
        
        {/* Header Bar */}
        <div className="no-print px-6 py-4.5 bg-[#00324D] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#39A900] text-white shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-slate-800 text-emerald-300 font-mono px-2 py-0.5 rounded border border-slate-700 font-bold uppercase tracking-wider">
                  Documento Oficial SENA · M_Aprendiz
                </span>
                <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                  Versión 2026.1
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-white font-display mt-0.5">
                Manual de Uso para el Aprendiz · Formación y Evaluación
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              title="Imprimir o guardar manual en PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir Manual</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Cerrar manual de uso"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body with Sidebar and Content */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-slate-50 print:bg-white">
          
          {/* Navigation Sidebar (Desktop) */}
          <div className="no-print w-full md:w-64 bg-white border-r border-slate-200 p-4 shrink-0 overflow-y-auto hidden md:block">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-2">
              Secciones del Manual
            </div>
            <nav className="space-y-1">
              {sections.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-[#007832] font-bold border border-emerald-200 shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#39A900]' : 'text-slate-400'}`} />
                      <span className="truncate">{sec.title}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#39A900] shrink-0" />}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-slate-100 p-2 text-[11px] text-slate-500 space-y-1.5">
              <div className="font-bold text-[#00324D]">Centro de Formación:</div>
              <div className="text-[10.5px] leading-relaxed">
                Centro de Servicios y Gestión Empresarial · Regional Antioquia
              </div>
              <div className="font-mono text-[10px] text-emerald-700 font-bold mt-1">
                Archivo raíz: /M_Aprendiz.md
              </div>
            </div>
          </div>

          {/* Main Manual Content */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8 bg-white print:p-0">
            
            {/* Printable Header */}
            <div className="border-b border-slate-200 pb-5">
              <div className="flex items-center gap-3 mb-2">
                <SenaLogo className="h-8 w-auto" variant="color" showText={false} />
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#00324D] font-display">
                    MANUAL DE USO PARA EL APRENDIZ
                  </h1>
                  <p className="text-xs text-slate-600">
                    Centro de Servicios y Gestión Empresarial · Regional Antioquia · Tecnólogo en Gestión Empresarial
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-[#007832]">
                <span>Competencia: 210601003 Mejoramiento Organizacional</span>
                <span>·</span>
                <span>Documento: M_Aprendiz</span>
              </div>
            </div>

            {/* Section 1 */}
            <div id="intro" className="space-y-3">
              <h3 className="text-base font-bold text-[#00324D] flex items-center gap-2 border-b border-slate-100 pb-2">
                <BookOpen className="w-4.5 h-4.5 text-[#39A900]" />
                <span>1. Introducción y Propósito</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                Bienvenido(a) a la plataforma interactiva de aprendizaje y evaluación del SENA. Este aplicativo ha sido diseñado como un recurso pedagógico de apoyo a la <strong>Formación Profesional Integral (FPI)</strong> para los aprendices del programa <strong>Tecnólogo en Gestión Empresarial</strong>.
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">
                El objetivo central de este entorno es fortalecer y evaluar de manera práctica y contextualizada los conocimientos, habilidades y destrezas requeridos para intervenir eficazmente en los programas de mejoramiento organizacional dentro de cualquier tipo de empresa, articulando normativas internacionales de calidad (ISO 9001, ISO 19011) y herramientas de gestión estratégica.
              </p>
            </div>

            {/* Section 2 */}
            <div id="acceso" className="space-y-3">
              <h3 className="text-base font-bold text-[#00324D] flex items-center gap-2 border-b border-slate-100 pb-2">
                <ShieldCheck className="w-4.5 h-4.5 text-[#39A900]" />
                <span>2. Requisitos de Acceso y Datos de Identificación</span>
              </h3>
              <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside">
                <li><strong>Ingreso en la Pantalla Inicial:</strong> Diligencie su Nombre y Apellidos completos tal como figuran en Sofía Plus.</li>
                <li><strong>Tipo y Número de Documento:</strong> Seleccione su tipo de identificación (C.C., T.I., C.E., P.P.T.) e introduzca únicamente números.</li>
                <li><strong>Ficha de Caracterización:</strong> Ingrese el código de su grupo de formación (ej. 2874195).</li>
                <li><strong>Persistencia Local:</strong> La plataforma recordará sus datos y constancias en su navegador web. Para cambiar de usuario en el mismo equipo, use el botón <strong>"Salir"</strong> en el menú superior.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div id="kolb" className="space-y-3">
              <h3 className="text-base font-bold text-[#00324D] flex items-center gap-2 border-b border-slate-100 pb-2">
                <Brain className="w-4.5 h-4.5 text-[#39A900]" />
                <span>3. Diagnóstico de Estilos de Aprendizaje (David Kolb)</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                El modelo de David Kolb identifica cómo asimila y procesa la información cada aprendiz. La plataforma adapta los casos de estudio y las evaluaciones al perfil predominante:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                  <span className="font-bold text-[#007832] block">Acomodador (Acción / Pragmático):</span>
                  <p className="text-slate-600 mt-1">Aprende haciendo, experimentando y enfrentando contingencias operativas en piso.</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs">
                  <span className="font-bold text-blue-700 block">Divergente (Creativo / Observador):</span>
                  <p className="text-slate-600 mt-1">Sobresale en la visión holística, el clima laboral, la empatía y la generación de ideas.</p>
                </div>
                <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-xs">
                  <span className="font-bold text-teal-800 block">Convergente (Analítico / Deductivo):</span>
                  <p className="text-slate-600 mt-1">Destaca en la solución técnica de problemas, cálculo de fórmulas y formulación de KPIs.</p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 text-xs">
                  <span className="font-bold text-indigo-800 block">Asimilador (Estructurado / Normativo):</span>
                  <p className="text-slate-600 mt-1">Dominio de taxonomías normativas (ISO 9001/19011), modelos teóricos y síntesis.</p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div id="raps" className="space-y-3">
              <h3 className="text-base font-bold text-[#00324D] flex items-center gap-2 border-b border-slate-100 pb-2">
                <FileText className="w-4.5 h-4.5 text-[#39A900]" />
                <span>4. Estructura Formativa de la Competencia (Los 4 RAPs)</span>
              </h3>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <strong className="text-[#39A900] font-mono">RAP 01 · Diagnóstico Empresarial:</strong> Ciclo PHVA, Matriz PESTEL (Macroentorno), Cinco Fuerzas de Michael Porter (Microentorno), Matriz DOFA y formulación de cruces estratégicos (FO, DO, FA, DA).
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <strong className="text-[#007832] font-mono">RAP 02 · Planeación de Documentos:</strong> Control de información documentada (ISO 9001:2015 Numeral 7.5), pirámide documental, caracterización de procesos SIPOC y flujogramas ANSI/ISO 5807.
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <strong className="text-[#00324D] font-mono">RAP 03 · Auditorías Internas:</strong> Directrices ISO 19011:2018, principios de auditoría, programas vs. planes, reuniones de apertura y cierre, y redacción técnica de No Conformidades (Mayor, Menor y Oportunidad de Mejora).
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <strong className="text-[#39A900] font-mono">RAP 04 · Creación y Análisis de Indicadores:</strong> Eficacia vs. Eficiencia vs. Efectividad, fichas técnicas de KPIs, semaforización de control (Verde, Amarillo, Rojo) y Cuadro de Mando Integral (Balanced Scorecard).
                </div>
              </div>
            </div>

            {/* Section 5 & 6 */}
            <div id="evaluacion" className="space-y-3">
              <h3 className="text-base font-bold text-[#00324D] flex items-center gap-2 border-b border-slate-100 pb-2">
                <Award className="w-4.5 h-4.5 text-[#39A900]" />
                <span>5 y 6. Guía de Estudio y Presentación de Evaluaciones</span>
              </h3>
              <ol className="text-xs text-slate-700 space-y-2 list-decimal list-inside">
                <li>Seleccione el RAP en el menú y revise primero los módulos del modo <strong>"Estudiar"</strong>.</li>
                <li>Pase al modo <strong>"Evaluar"</strong> cuando se encuentre preparado(a).</li>
                <li>Lea detenidamente cada uno de los 5 casos de estudio empresariales reales.</li>
                <li>Seleccione la opción que considere correcta y haga clic en <strong>"Confirmar y Enviar Respuesta"</strong>.</li>
                <li>Revise la <strong>Retroalimentación Formativa Inmediata</strong> para conocer la justificación técnica y el estándar normativo.</li>
                <li>Al culminar las 5 preguntas, la plataforma emitirá su calificación porcentual y concepto oficial.</li>
              </ol>
            </div>

            {/* Section 7 & 8 */}
            <div id="constancias" className="space-y-3">
              <h3 className="text-base font-bold text-[#00324D] flex items-center gap-2 border-b border-slate-100 pb-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#39A900]" />
                <span>7 y 8. Criterios de Aprobación y Emisión de Constancias</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-2.5">Porcentaje (%)</th>
                      <th className="p-2.5">Calificación</th>
                      <th className="p-2.5">Concepto Oficial</th>
                      <th className="p-2.5">Condición</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-emerald-50/60 font-bold text-[#007832]">
                      <td className="p-2.5">≥ 70% (4 ó 5 aciertos)</td>
                      <td className="p-2.5">3.5 a 5.0</td>
                      <td className="p-2.5">APROBADO</td>
                      <td className="p-2.5">Competencia Alcanzada</td>
                    </tr>
                    <tr className="bg-rose-50/50 text-rose-700">
                      <td className="p-2.5">&lt; 70% (0 a 3 aciertos)</td>
                      <td className="p-2.5">0.0 a 3.4</td>
                      <td className="p-2.5">NO APROBADO</td>
                      <td className="p-2.5">Oportunidad de reintento</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Al finalizar con éxito, haga clic en <strong>"Ver Constancia Oficial de Evaluación"</strong> para visualizar, imprimir o guardar en PDF su constancia con firma digital, sello institucional y código alfanumérico único.
              </p>
            </div>

            {/* Section 10 */}
            <div id="faqs" className="space-y-3">
              <h3 className="text-base font-bold text-[#00324D] flex items-center gap-2 border-b border-slate-100 pb-2">
                <HelpCircle className="w-4.5 h-4.5 text-[#39A900]" />
                <span>10. Preguntas Frecuentes</span>
              </h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block">¿Puedo volver a presentar una prueba si no aprobé?</strong>
                  <p className="text-slate-600 mt-0.5">Sí. La plataforma fomenta la mejora continua y permite volver a estudiar el material para presentar un nuevo intento.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block">¿Dónde quedan guardadas mis constancias?</strong>
                  <p className="text-slate-600 mt-0.5">En la sección "Historial de Constancias Emitidas" en la pantalla de Inicio de la plataforma.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="no-print px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#00324D]">SENA</span>
            <span>·</span>
            <span>Centro de Servicios y Gestión Empresarial · Regional Antioquia</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-[#00324D] hover:bg-[#002235] rounded-xl transition-colors cursor-pointer"
          >
            Entendido / Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
