import React, { useState } from 'react';
import { Layers, FileText, ArrowRight, CheckCircle2, RotateCcw, Shapes } from 'lucide-react';

interface SipocElement {
  id: string;
  component: 'S' | 'I' | 'P' | 'O' | 'C';
  label: string;
  name: string;
  description: string;
  example: string;
}

const SIPOC_COMPONENTS: SipocElement[] = [
  {
    id: 's',
    component: 'S',
    label: 'Proveedor (Supplier)',
    name: 'Área Solicitante / Clientes Internos',
    description: 'Entidad, persona u organización interna o externa que suministra los requerimientos, insumos o materias primas.',
    example: 'Departamentos de Producción, Ventas, Talento Humano que emiten necesidades de compra.'
  },
  {
    id: 'i',
    component: 'I',
    label: 'Entrada (Input)',
    name: 'Requisición de Compra Formal',
    description: 'Bienes, materiales o información que ingresan al proceso para ser transformados u operados.',
    example: 'Formato diligenciado con especificaciones técnicas, presupuesto asignado y fecha requerida.'
  },
  {
    id: 'p',
    component: 'P',
    label: 'Proceso (Process)',
    name: 'Secuencia PHVA de Adquisición',
    description: 'Conjunto de actividades mutuamente relacionadas que transforman las entradas en resultados con valor.',
    example: '1. Cotizar con mínimo 3 proveedores -> 2. Evaluar cuadro comparativo -> 3. Emitir y autorizar orden de compra.'
  },
  {
    id: 'o',
    component: 'O',
    label: 'Salida (Output)',
    name: 'Orden de Compra Aprobada e Insumos',
    description: 'Producto, servicio o documento resultante generado con cumplimiento de especificaciones de calidad.',
    example: 'Orden de compra legalizada radicada al proveedor y recepción conforme en bodega con factura.'
  },
  {
    id: 'c',
    component: 'C',
    label: 'Cliente (Customer)',
    name: 'Usuario Final y Contabilidad',
    description: 'Quien recibe el producto o servicio generado para su uso, consumo o registro contable.',
    example: 'Líder del área solicitante (recibe el insumo) y Departamento de Contabilidad (recibe soporte de pago).'
  }
];

const FLOWCHART_SYMBOLS = [
  {
    name: 'Terminal / Inicio - Fin',
    shape: 'Óvalo',
    meaning: 'Marca el inicio o término de un proceso o procedimiento documentado.',
    standard: 'ANSI X3.5 / ISO 5807',
    svg: (
      <svg className="w-14 h-8" viewBox="0 0 100 50">
        <rect x="5" y="5" width="90" height="40" rx="20" className="fill-emerald-100 stroke-emerald-600 stroke-[3]" />
      </svg>
    )
  },
  {
    name: 'Actividad / Operación',
    shape: 'Rectángulo',
    meaning: 'Representa una tarea concreta, ejecución operativa o cálculo en el proceso.',
    standard: 'ANSI X3.5 / ISO 5807',
    svg: (
      <svg className="w-14 h-8" viewBox="0 0 100 50">
        <rect x="5" y="5" width="90" height="40" rx="4" className="fill-blue-100 stroke-blue-600 stroke-[3]" />
      </svg>
    )
  },
  {
    name: 'Decisión / Condición',
    shape: 'Rombo',
    meaning: 'Punto de bifurcación condicional donde se evalúa una variable (Sí / No).',
    standard: 'ANSI X3.5 / ISO 5807',
    svg: (
      <svg className="w-14 h-8" viewBox="0 0 100 50">
        <polygon points="50,5 95,25 50,45 5,25" className="fill-amber-100 stroke-amber-600 stroke-[3]" />
      </svg>
    )
  },
  {
    name: 'Documento / Registro',
    shape: 'Base Ondulada',
    meaning: 'Generación, consulta, firma o archivo de un documento o formato de calidad.',
    standard: 'ANSI X3.5 / ISO 5807',
    svg: (
      <svg className="w-14 h-8" viewBox="0 0 100 50">
        <path d="M5,5 H95 V35 Q72.5,20 50,35 Q27.5,50 5,35 Z" className="fill-purple-100 stroke-purple-600 stroke-[3]" />
      </svg>
    )
  },
  {
    name: 'Línea de Flujo / Dirección',
    shape: 'Flecha',
    meaning: 'Indica la dirección y secuencia cronológica obligatoria de ejecución.',
    standard: 'ANSI X3.5 / ISO 5807',
    svg: (
      <svg className="w-14 h-8" viewBox="0 0 100 50">
        <line x1="10" y1="25" x2="80" y2="25" className="stroke-slate-700 stroke-[4]" />
        <polygon points="80,18 95,25 80,32" className="fill-slate-700" />
      </svg>
    )
  }
];

export const SipocSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sipoc' | 'flowchart'>('sipoc');
  const [selectedElement, setSelectedElement] = useState<SipocElement | null>(SIPOC_COMPONENTS[0]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Banner */}
      <div className="p-5 bg-gradient-to-r from-emerald-50 via-slate-50 to-white border-b border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <span>Simulador de Modelado Documental</span>
              <span>·</span>
              <span>RAP 2: Planeación de Documentos</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Caracterización de Procesos (SIPOC) & Simbología ANSI
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Aprenda a mapear la cédula de un proceso organizacional y domine la simbología estandarizada para diagramación de flujogramas.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('sipoc')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'sipoc'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Matriz SIPOC
            </button>
            <button
              onClick={() => setActiveTab('flowchart')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'flowchart'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shapes className="w-3.5 h-3.5" />
              Simbología de Flujogramas
            </button>
          </div>
        </div>
      </div>

      {/* Content View */}
      {activeTab === 'sipoc' ? (
        <div className="p-6">
          <div className="mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Caso Aplicado: Proceso de Gestión de Compras y Suministros
            </span>
            <p className="text-xs text-slate-600 mt-0.5">
              Haga clic sobre cada casilla del flujo SIPOC para ver su desglose técnico y articulación con el SGC:
            </p>
          </div>

          {/* Interactive SIPOC Chain Bar */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
            {SIPOC_COMPONENTS.map((item) => {
              const isSelected = selectedElement?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedElement(item)}
                  className={`p-3.5 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'border-[#39A900] bg-emerald-50/50 ring-2 ring-[#39A900]/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'bg-[#39A900] text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.component}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">Paso</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                    {item.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail card of selected component */}
          {selectedElement && (
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-[#007832] uppercase tracking-wider mb-1">
                <span>Detalle Técnico del Componente: {selectedElement.label}</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                {selectedElement.name}
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                {selectedElement.description}
              </p>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Ejemplo en la Caracterización Documentada:
                </span>
                <p className="text-xs font-medium text-slate-800">
                  {selectedElement.example}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-6">
          <div className="mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Norma Técnica ANSI X3.5 / ISO 5807
            </span>
            <p className="text-xs text-slate-600 mt-0.5">
              Cada símbolo tiene un significado universal obligatorio en la gestión documental de procesos:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FLOWCHART_SYMBOLS.map((symbol, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {symbol.shape}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {symbol.standard}
                  </span>
                </div>

                <div className="flex items-center justify-center p-3 bg-slate-50 rounded-lg mb-3">
                  {symbol.svg}
                </div>

                <h5 className="text-sm font-bold text-slate-900 mb-1">
                  {symbol.name}
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {symbol.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
