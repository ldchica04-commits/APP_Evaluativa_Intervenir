import { Question, KolbStyle, RAPId } from '../types';

export const STYLE_METADATA: Record<KolbStyle, {
  label: string;
  focus: string;
  badgeColor: string;
  description: string;
  shortTechnique: string;
  technique: string;
  instrument: string;
  evidenceType: string;
  utilityRationale: string;
  methodologyOverview: string;
  scenarioTag: string;
}> = {
  Acomodador: {
    label: "Evaluación Estilo Acomodador",
    focus: "Práctica Vivencial & Acción Inmediata",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    description: "Evaluación centrada en resolución de imprevistos, liderazgo situacional y toma rápida de decisiones prácticas en el entorno operativo.",
    shortTechnique: "Simulación de Incidentes Críticos",
    technique: "Simulación de Incidentes Críticos y Contingencias Operativas en Tiempo Real",
    instrument: "Guía de Decisión Inmediata en Piso y Escenarios de Contingencia Operativa",
    evidenceType: "Evidencia de Desempeño y Producto Operativo",
    utilityRationale: "El estilo Acomodador aprende haciendo y asumiendo riesgos directos en el terreno. Esta técnica es la más adecuada y útil porque sitúa al aprendiz frente a imprevistos reales (fallas de proveedores, paradas de línea, reclamos urgentes), evaluando su capacidad de reacción inmediata, liderazgo en planta y activación de planes de contingencia sin dilaciones burocráticas.",
    methodologyOverview: "Casos reactivos de contingencia súbita donde el aprendiz debe seleccionar la respuesta operativa inmediata que mitiga riesgos y asegura la continuidad del servicio.",
    scenarioTag: "Incidente Crítico en Piso"
  },
  Divergente: {
    label: "Evaluación Estilo Divergente",
    focus: "Perspectivas Múltiples & Creatividad",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    description: "Evaluación enfocada en el análisis reflexivo, clima organizacional, empatía con partes interesadas y generación de ideas de mejora.",
    shortTechnique: "Estudio de Caso Organizacional",
    technique: "Estudio de Caso Organizacional y Análisis Holístico de Partes Interesadas",
    instrument: "Rúbrica de Criterios Cualitativos, Clima Laboral y Propuestas de Innovación",
    evidenceType: "Evidencia de Conocimiento y Desempeño Colaborativo",
    utilityRationale: "El estilo Divergente destaca por su empatía, sensibilidad humana y habilidad para ver los problemas desde múltiples aristas. Esta técnica es la más adecuada y útil porque plantea dilemas de clima laboral, cultura organizacional y expectativas de partes interesadas (stakeholders), evaluando su capacidad de mediación, visión holística de 360° y formulación de soluciones creativas de valor compartido.",
    methodologyOverview: "Dilemas de interacción humana y clima organizacional donde el aprendiz valora la dimensión psicosocial y formula alternativas participativas y de consenso.",
    scenarioTag: "Dilema Humano & Clima Organizacional"
  },
  Convergente: {
    label: "Evaluación Estilo Convergente",
    focus: "Análisis Lógico & Aplicación Práctica",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
    description: "Evaluación orientada al cálculo cuantitativo, resolución deductiva de problemas, aplicación de fórmulas técnicas y planes de acción 5W2H.",
    shortTechnique: "Modelado Cuantitativo & 5W2H",
    technique: "Resolución de Problemas Técnicos, Modelado Cuantitativo y Plan de Acción 5W2H",
    instrument: "Cuestionario de Casos Cuantitativos con Fórmulas, Métricas y Planes de Acción",
    evidenceType: "Evidencia de Conocimiento y Producto Técnico",
    utilityRationale: "El estilo Convergente sobresale en el razonamiento lógico-deductivo, manejo de datos duros y aplicación pragmática de herramientas estandarizadas. Esta técnica es la más adecuada y útil porque exige calcular índices numéricos (Pareto 80/20, MEFI, indicadores de eficacia/eficiencia) y formular planes de mejoramiento estructurados bajo la matriz 5W2H, evaluando su precisión analítica para resolver fallas concretas.",
    methodologyOverview: "Problemas con datos cuantitativos, matrices de ponderación y modelos de causa raíz donde el aprendiz deduce la solución técnica óptima y medible.",
    scenarioTag: "Problema Cuantitativo & Plan 5W2H"
  },
  Asimilador: {
    label: "Evaluación Estilo Asimilador",
    focus: "Modelos Conceptuales & Normatividad",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
    description: "Evaluación estructurada sobre coherencia conceptual, marcos normativos técnicos (ISO 9001, ISO 19011) y rigor metodológico.",
    shortTechnique: "Auditoría de Conformidad Normativa",
    technique: "Auditoría de Conformidad Normativa, Análisis de Modelos Teóricos y Ciclo PHVA",
    instrument: "Lista Maestra de Verificación de Estándares ISO (9001/19011/9004) y Coherencia Estructural",
    evidenceType: "Evidencia de Conocimiento Sistémico y Rigor Conceptual",
    utilityRationale: "El estilo Asimilador tiene gran facilidad para estructurar modelos teóricos abstractos, asimilar taxonomías normativas complejas e integrar leyes y estándares internacionales. Esta técnica es la más adecuada y útil porque evalúa la coherencia de los sistemas integrados de gestión (HLS), la arquitectura documental jerárquica y el rigor epistemológico del ciclo PHVA sin dispersión.",
    methodologyOverview: "Verificación de requisitos normativos formales, taxonomía de sistemas de gestión y coherencia de modelos conceptuales organizacionales.",
    scenarioTag: "Auditoría de Conformidad Normativa ISO"
  }
};

export const RAP1_QUESTIONS: Record<KolbStyle, Question[]> = {
  Acomodador: [
    {
      id: 'r1_aco_1',
      questionNumber: 1,
      scenario: 'En plena jornada de despacho, el proveedor de transporte principal se declara en cese de actividades. El tecnólogo en gestión debe actuar de inmediato para salvaguardar la entrega a clientes clave.',
      question: '¿Cuál es la primera acción operativa que debe activar con base en el diagnóstico de riesgos de la empresa?',
      options: [
        { id: 'a', text: 'Activar el plan de contingencia preestablecido contratando la flota secundaria calificada.' },
        { id: 'b', text: 'Cancelar indefinidamente todos los pedidos de la semana.' },
        { id: 'c', text: 'Esperar a la reunión ordinaria de gerencia del mes entrante.' },
        { id: 'd', text: 'Redactar una queja formal sin despachar ninguna mercancía.' }
      ],
      correctOptionId: 'a',
      explanation: 'El enfoque acomodador prioriza la respuesta ágil y la activación inmediata de planes de contingencia documentados para asegurar la continuidad del negocio y el servicio.',
      competencyStandard: 'Gestión de Riesgos Operativos y Planes de Contingencia SENA.'
    },
    {
      id: 'r1_aco_2',
      questionNumber: 2,
      scenario: 'Los operarios de producción detectan que una nueva máquina genera ruidos anormales y pequeños desajustes en el sellado de bolsas.',
      question: 'Desde un enfoque práctico de diagnóstico en planta, ¿qué debe realizar el tecnólogo?',
      options: [
        { id: 'a', text: 'Ignorar el hecho si no hay reclamos de clientes ese mismo día.' },
        { id: 'b', text: 'Asumir que es normal y esperar a que la máquina se rompa por completo.' },
        { id: 'c', text: 'Acudir directamente a la máquina, levantar la evidencia en campo con los operarios y solicitar inspección técnica inmediata.' },
        { id: 'd', text: 'Cambiar de producto sin revisar el equipo.' }
      ],
      correctOptionId: 'c',
      explanation: 'El diagnóstico eficaz exige verificación directa en el lugar de los hechos (Gemba) y toma de medidas preventivas inmediatas.',
      competencyStandard: 'Diagnóstico Operativo en Planta / Metodología PHVA.'
    },
    {
      id: 'r1_aco_3',
      questionNumber: 3,
      scenario: 'Un competidor local lanza sorpresivamente una campaña con 20% de descuento en el mismo segmento de clientes de la empresa.',
      question: '¿Qué estrategia de respuesta adaptativa (DOFA) debe liderar el equipo comercial para no perder cuota de mercado?',
      options: [
        { id: 'a', text: 'Estrategia DA: Cerrar las sucursales comerciales de la ciudad.' },
        { id: 'b', text: 'Estrategia FA: Apoyarse en la reputación de entrega puntual y servicio posventa para ofrecer paquetes de valor agregado inmediato.' },
        { id: 'c', text: 'No hacer nada porque los clientes nunca comparan precios.' },
        { id: 'd', text: 'Pedir al gobierno que multe al competidor.' }
      ],
      correctOptionId: 'b',
      explanation: 'Una estrategia FA permite usar una fortaleza interna (servicio/cumplimiento) para contrarrestar la amenaza comercial agresiva de forma proactiva.',
      competencyStandard: 'Estrategias DOFA Cruzadas de Reacción Rápida.'
    },
    {
      id: 'r1_aco_4',
      questionNumber: 4,
      scenario: 'Durante el diagnóstico de clima laboral, los trabajadores de empaque afirman que las herramientas actuales les causan fatiga muscular excesiva.',
      question: '¿Qué solución práctica de mejora debe proponerse en el plan de acción inmediato?',
      options: [
        { id: 'a', text: 'Eliminar el área de empaque.' },
        { id: 'b', text: 'Aumentar la jornada laboral a 12 horas.' },
        { id: 'c', text: 'Prohibir que los trabajadores manifiesten molestias físicas.' },
        { id: 'd', text: 'Realizar un rediseño ergonómico del puesto de trabajo e implementar pausas activas programadas.' }
      ],
      correctOptionId: 'd',
      explanation: 'El mejoramiento continuo enfocado en la acción busca adecuar las condiciones ergonómicas para aumentar la productividad y reducir el ausentismo.',
      competencyStandard: 'Salud y Seguridad Organizacional en el Diagnóstico.'
    },
    {
      id: 'r1_aco_5',
      questionNumber: 5,
      scenario: 'Una empresa requiere diagnosticar velozmente el impacto de un corte imprevisto de energía en su zona industrial.',
      question: '¿Cuál es el instrumento más ágil para registrar las pérdidas y tiempos muertos en cada estación?',
      options: [
        { id: 'a', text: 'Un mensaje informal de chat sin datos cuantificables.' },
        { id: 'b', text: 'Una tesis académica de 200 páginas entregada tres meses después.' },
        { id: 'c', text: 'Una lista de chequeo de incidencias en tiempo real diligenciada por cada supervisor de línea.' },
        { id: 'd', text: 'Una reunión sin acta de compromisos.' }
      ],
      correctOptionId: 'c',
      explanation: 'Las listas de verificación estandarizadas proporcionan datos objetivos y oportunos para la toma de decisiones gerenciales rápidas.',
      competencyStandard: 'Instrumentos de Captura Rápida de Datos SENA.'
    }
  ],
  Divergente: [
    {
      id: 'r1_div_1',
      questionNumber: 1,
      scenario: 'En un taller de diagnóstico empresarial, el equipo directivo tiene opiniones totalmente opuestas sobre por qué ha bajado la satisfacción del cliente.',
      question: 'Como facilitador con estilo divergente, ¿qué técnica participativa debe aplicar para explorar todas las perspectivas sin juzgar?',
      options: [
        { id: 'a', text: 'Una sesión de lluvia de ideas (Brainstorming) y mapas de empatía con clientes para capturar múltiples puntos de vista.' },
        { id: 'b', text: 'Imponer la opinión del gerente general sin escuchar a nadie más.' },
        { id: 'c', text: 'Sancionar a los líderes que opinen diferente.' },
        { id: 'd', text: 'Cancelar el diagnóstico y no volver a evaluar a los clientes.' }
      ],
      correctOptionId: 'a',
      explanation: 'El estilo divergente se apoya en la creatividad y la exploración de múltiples perspectivas para enriquecer el diagnóstico cualitativo.',
      competencyStandard: 'Técnicas Cualitativas de Diagnóstico Organizacional.'
    },
    {
      id: 'r1_div_2',
      questionNumber: 2,
      scenario: 'Al analizar el macroentorno (PESTEL), el equipo observa cambios culturales profundos en los hábitos de las familias jóvenes respecto a la alimentación saludable.',
      question: '¿A qué dimensión del análisis PESTEL pertenece este fenómeno y qué oportunidad sugiere?',
      options: [
        { id: 'a', text: 'Dimensión Tecnológica; sugiere cambiar los computadores.' },
        { id: 'b', text: 'Dimensión Legal; sugiere pagar más impuestos.' },
        { id: 'c', text: 'Dimensión Social y Cultural; sugiere la oportunidad de innovar con productos orgánicos y empaques limpios.' },
        { id: 'd', text: 'Dimensión Financiera; sugiere pedir un préstamo bancario.' }
      ],
      correctOptionId: 'c',
      explanation: 'Los hábitos, valores y estilos de vida corresponden al factor Sociocultural de PESTEL, clave para descubrir oportunidades de diferenciación.',
      competencyStandard: 'Análisis del Macroentorno Sociocultural PESTEL.'
    },
    {
      id: 'r1_div_3',
      questionNumber: 3,
      scenario: 'Durante las entrevistas de diagnóstico con los colaboradores de una sucursal, se percibe desmotivación y falta de sentido de pertenencia.',
      question: '¿Por qué es fundamental no desestimar estas percepciones subjetivas en el diagnóstico empresarial?',
      options: [
        { id: 'a', text: 'Porque la norma ISO exige despedir a los trabajadores que expresen tristeza.' },
        { id: 'b', text: 'Porque el clima organizacional y las emociones impactan directamente la productividad, la retención de talento y el servicio al cliente.' },
        { id: 'c', text: 'Porque las percepciones no tienen ninguna relación con los resultados.' },
        { id: 'd', text: 'Porque solo importan los balances contables.' }
      ],
      correctOptionId: 'b',
      explanation: 'El factor humano es el motor de los procesos; un diagnóstico divergente integra la dimensión emocional y cultural de la organización.',
      competencyStandard: 'Diagnóstico de Clima y Cultura Organizacional.'
    },
    {
      id: 'r1_div_4',
      questionNumber: 4,
      scenario: 'Para diseñar propuestas de mejora creativa, el tecnólogo reúne a personal de ventas, almacén y finanzas en una mesa redonda.',
      question: '¿Cuál es la principal ventaja de conformar un equipo interdisciplinario en el diagnóstico?',
      options: [
        { id: 'a', text: 'Disminuir el salario de los participantes.' },
        { id: 'b', text: 'Generar discusiones interminables sin ningún acuerdo.' },
        { id: 'c', text: 'Reemplazar el manual de funciones de la empresa.' },
        { id: 'd', text: 'Obtener una visión holística de 360 grados que visibilice interacciones y cuellos de botella que un solo departamento no detecta.' }
      ],
      correctOptionId: 'd',
      explanation: 'La visión interdisciplinaria rompe los silos departamentales y fomenta soluciones creativas integradas.',
      competencyStandard: 'Enfoque Sistémico y Trabajo Colaborativo SENA.'
    },
    {
      id: 'r1_div_5',
      questionNumber: 5,
      scenario: 'Al formular la matriz DOFA, se descubre que la empresa tiene una gran reputación ética y comunitaria en su región.',
      question: '¿Cómo puede apalancarse esta fortaleza en una estrategia innovadora de cara a la comunidad?',
      options: [
        { id: 'a', text: 'Cobrar el doble a los vecinos del sector.' },
        { id: 'b', text: 'Ocultar la reputación para que nadie la conozca.' },
        { id: 'c', text: 'Crear alianzas de valor compartido y programas de responsabilidad social empresarial que fidelicen a los clientes locales.' },
        { id: 'd', text: 'Eliminar los canales de comunicación comunitaria.' }
      ],
      correctOptionId: 'c',
      explanation: 'La reputación ética es un activo intangible de alto valor para generar estrategias de posicionamiento y sostenibilidad.',
      competencyStandard: 'Estrategias de Sostenibilidad y Valor Compartido.'
    }
  ],
  Convergente: [
    {
      id: 'r1_con_1',
      questionNumber: 1,
      scenario: 'Al aplicar la matriz MEFI (Evaluación de Factores Internos), se ponderan 10 fortalezas y debilidades. La puntuación total ponderada obtenida por la empresa es de 1.85 (en una escala de 1.0 a 4.0, con punto medio de 2.5).',
      question: '¿Cuál es la conclusión técnica y cuantitativa sobre la posición interna de la organización?',
      options: [
        { id: 'a', text: 'La organización tiene una posición interna débil, donde las debilidades superan significativamente a las fortalezas.' },
        { id: 'b', text: 'La organización está en una posición interna de excelencia y liderazgo.' },
        { id: 'c', text: 'El resultado indica que no se requiere ninguna acción de mejora.' },
        { id: 'd', text: 'La escala es incorrecta porque el puntaje máximo siempre es 100.' }
      ],
      correctOptionId: 'a',
      explanation: 'En las matrices MEFI y MEFE, una media por debajo de 2.50 indica debilidad interna sustancial, exigiendo planes correctivos de choque.',
      competencyStandard: 'Matrices Cuantitativas de Evaluación Estratégica (MEFI/MEFE).'
    },
    {
      id: 'r1_con_2',
      questionNumber: 2,
      scenario: 'Una fábrica presenta un índice de productos defectuosos del 8.4%, mientras el estándar máximo tolerado es del 2.0%. Se requiere aislar la causa raíz con datos precisos.',
      question: '¿Qué herramienta cuantitativa de calidad es la más idónea para priorizar el 20% de las causas que originan el 80% de los defectos?',
      options: [
        { id: 'a', text: 'Un organigrama jerárquico.' },
        { id: 'b', text: 'Una encuesta de satisfacción abierta.' },
        { id: 'c', text: 'El Diagrama de Pareto (Principio 80/20).' },
        { id: 'd', text: 'Una bitácora de asistencia del personal.' }
      ],
      correctOptionId: 'c',
      explanation: 'El Diagrama de Pareto permite ordenar cuantitativamente las frecuencias de los problemas para focalizar los recursos en las causas vitales.',
      competencyStandard: 'Herramientas Estadísticas de Calidad - Diagrama de Pareto.'
    },
    {
      id: 'r1_con_3',
      questionNumber: 3,
      scenario: 'En el análisis de las 5 Fuerzas de Porter, el sector presenta: 15 competidores directos con productos idénticos, costos fijos altos y barreras de salida elevadas.',
      question: '¿Cuál es el veredicto lógico sobre el nivel de rivalidad en la industria?',
      options: [
        { id: 'a', text: 'Rivalidad nula, monopolio absoluto.' },
        { id: 'b', text: 'Rivalidad muy alta entre competidores, lo que genera presiones continuas a la baja en los márgenes de ganancia.' },
        { id: 'c', text: 'Sector sin competencia con rentabilidad garantizada.' },
        { id: 'd', text: 'Los competidores no influyen en los precios.' }
      ],
      correctOptionId: 'b',
      explanation: 'Productos poco diferenciados con altos costos fijos y muchas empresas conllevan una guerra de precios y altísima rivalidad competitiva.',
      competencyStandard: 'Modelo de Estructura de Industrias de Michael Porter.'
    },
    {
      id: 'r1_con_4',
      questionNumber: 4,
      scenario: 'Al elaborar la matriz MEFE (Evaluación de Factores Externos), el equipo diagnostica 12 oportunidades y amenazas clave del macro y microentorno. La puntuación total ponderada obtenida por la empresa es de 3.35 (en una escala de 1.0 a 4.0, donde el punto medio de equilibrio es 2.50).',
      question: '¿Cuál es la conclusión técnica y analítica sobre la capacidad estratégica de la organización para responder al entorno?',
      options: [
        { id: 'a', text: 'La matriz MEFE solo evalúa las debilidades internas del personal.' },
        { id: 'b', text: 'La organización tiene un desempeño deficiente frente al entorno externo.' },
        { id: 'c', text: 'El resultado indica que el entorno no tiene ninguna influencia en la empresa.' },
        { id: 'd', text: 'La organización responde con alta eficacia a las oportunidades y neutraliza activamente las amenazas externas del mercado.' }
      ],
      correctOptionId: 'd',
      explanation: 'En la matriz MEFE, un puntaje ponderado significativamente superior a 2.50 (3.35) demuestra que la empresa aprovecha eficazmente las oportunidades existentes y mitiga los riesgos exógenos.',
      competencyStandard: 'Matriz Cuantitativa MEFE de Diagnóstico Externo SENA.'
    },
    {
      id: 'r1_con_5',
      questionNumber: 5,
      scenario: 'Para resolver un problema de desperdicio de materia prima, el tecnólogo aplica la técnica de los 5 Porqués hasta llegar al origen mecánico del desgaste de un rodamiento.',
      question: '¿Cuál es la función del método de los 5 Porqués en el diagnóstico empresarial?',
      options: [
        { id: 'a', text: 'Prolongar la duración de las reuniones de trabajo.' },
        { id: 'b', text: 'Culpar a un operario para descontar de su salario.' },
        { id: 'c', text: 'Profundizar en la cadena de causa-efecto para eliminar la causa raíz y no solo los síntomas superficiales.' },
        { id: 'd', text: 'Aumentar la compra de materias primas sin control.' }
      ],
      correctOptionId: 'c',
      explanation: 'La técnica de los 5 Porqués es una herramienta analítica deductiva para erradicar las causas fundamentales de las no conformidades.',
      competencyStandard: 'Análisis de Causa Raíz - Metodología 5 Porqués.'
    }
  ],
  Asimilador: [
    {
      id: 'r1_asi_1',
      questionNumber: 1,
      scenario: 'El marco del éxito sostenido de una organización según la norma ISO 9004:2018 exige que el diagnóstico estratégico trascienda la satisfacción inmediata del cliente.',
      question: '¿Qué principio conceptual sustenta esta directriz normativa de calidad?',
      options: [
        { id: 'a', text: 'El equilibrio entre las necesidades y expectativas de todas las partes interesadas pertinentes a largo plazo.' },
        { id: 'b', text: 'El enfoque exclusivo en maximizar dividendos del accionista en el corto plazo.' },
        { id: 'c', text: 'La eliminación de auditorías internas para reducir costos.' },
        { id: 'd', text: 'La sustitución de la misión institucional por anuncios publicitarios.' }
      ],
      correctOptionId: 'a',
      explanation: 'ISO 9004 amplía el alcance de ISO 9001 orientando el diagnóstico hacia el éxito sostenido y la satisfacción armónica de todas las partes interesadas.',
      competencyStandard: 'Norma Técnica ISO 9004:2018 Gestión para el Éxito Sostenido.'
    },
    {
      id: 'r1_asi_2',
      questionNumber: 2,
      scenario: 'En la teoría del Ciclo PHVA (Shewhart/Deming), el diagnóstico se sitúa como el cimiento epistemológico de la fase Planear.',
      question: '¿Qué postulado conceptual define el paso del Diagnóstico a la Planeación en este ciclo?',
      options: [
        { id: 'a', text: 'La fase Planear solo aplica para compras de insumos.' },
        { id: 'b', text: 'El azar y la intuición son suficientes para definir políticas de calidad.' },
        { id: 'c', text: 'El principio de gestión basada en la evidencia: no se puede planear la mejora sin datos objetivos del estado actual.' },
        { id: 'd', text: 'El ciclo PHVA debe ejecutarse en sentido inverso (Actuar primero).' }
      ],
      correctOptionId: 'c',
      explanation: 'La toma de decisiones basada en la evidencia (Principio 6 de Calidad ISO) exige que el diagnóstico provea los hechos verificables para la planeación.',
      competencyStandard: 'Principios de Gestión de la Calidad ISO 9000:2015.'
    },
    {
      id: 'r1_asi_3',
      questionNumber: 3,
      scenario: 'Al estructurar un análisis PESTEL, un analista clasifica una nueva ley de Habeas Data (Protección de Datos) únicamente como una debilidad interna.',
      question: '¿Cuál es la incoherencia epistemológica de esta clasificación según la teoría administrativa?',
      options: [
        { id: 'a', text: 'Las leyes nunca afectan a las empresas colombianas.' },
        { id: 'b', text: 'Una ley estatal es una variable externa macroambiental no controlable; su cumplimiento o incumplimiento es lo que genera fortalezas o debilidades internas.' },
        { id: 'c', text: 'El análisis PESTEL no incluye aspectos normativos ni legales.' },
        { id: 'd', text: 'El Habeas Data solo rige para entidades bancarias extranjeras.' }
      ],
      correctOptionId: 'b',
      explanation: 'El entorno PESTEL está compuesto por variables del macroentorno exógenas; la organización responde a ellas mediante sus capacidades internas.',
      competencyStandard: 'Epistemología y Teoría del Macroentorno Organizacional.'
    },
    {
      id: 'r1_asi_4',
      questionNumber: 4,
      scenario: 'La teoría de la Cadena de Valor de Michael Porter categoriza las actividades de la empresa en Primarias y de Soporte.',
      question: '¿Cuál de las siguientes actividades se conceptualiza formalmente como una Actividad de Soporte o Apoyo?',
      options: [
        { id: 'a', text: 'Servicio posventa al consumidor final.' },
        { id: 'b', text: 'Logística de entrada y recepción de mercancías.' },
        { id: 'c', text: 'Operaciones de transformación en planta.' },
        { id: 'd', text: 'Desarrollo de Tecnología y Gestión de Recursos Humanos.' }
      ],
      correctOptionId: 'd',
      explanation: 'En la Cadena de Valor, la infraestructura, recursos humanos, tecnología y compras son actividades de soporte transversales a las primarias.',
      competencyStandard: 'Modelo Teórico de la Cadena de Valor (M. Porter).'
    },
    {
      id: 'r1_asi_5',
      questionNumber: 5,
      scenario: 'El numeral 4.1 de la norma ISO 9001:2015 exige determinar las cuestiones externas e internas pertinentes para su propósito y dirección estratégica.',
      question: '¿Qué documento o herramienta sintetiza formalmente este requisito en un sistema de gestión?',
      options: [
        { id: 'a', text: 'El catálogo publicitario de productos.' },
        { id: 'b', text: 'El recibo de pago de nómina del mes anterior.' },
        { id: 'c', text: 'El informe integral del contexto organizacional y la matriz DOFA articulada con la planeación estratégica.' },
        { id: 'd', text: 'La factura cambiaria de compraventa de insumos.' }
      ],
      correctOptionId: 'c',
      explanation: 'El análisis del contexto (4.1) se evidencia a través del informe diagnóstico y las matrices de contexto validadas por la alta dirección.',
      competencyStandard: 'ISO 9001:2015 Requisito 4.1 Comprensión de la Organización.'
    }
  ]
};


export const RAP2_QUESTIONS: Record<KolbStyle, Question[]> = {
  Acomodador: [
    {
      id: 'r2_aco_1',
      questionNumber: 1,
      scenario: 'Un nuevo operario en bodega de materias primas no recuerda el procedimiento de rotulado de mercancías químicas peligrosas. La producción está detenida a la espera del insumo.',
      question: '¿Qué herramienta documental ágil debe estar ubicada visiblemente en el puesto de trabajo para resolver la duda en menos de 2 minutos?',
      options: [
        { id: 'a', text: 'Una ayuda visual (One Point Lesson / Instructivo visual de 1 página) plastificada junto al puesto.' },
        { id: 'b', text: 'Un manual empastado de 150 páginas guardado en el archivo central de gerencia.' },
        { id: 'c', text: 'Una solicitud escrita enviada al comité de calidad que sesiona en 15 días.' },
        { id: 'd', text: 'Pedirle al operario que adivine el procedimiento.' }
      ],
      correctOptionId: 'a',
      explanation: 'Para operarios en estaciones dinámicas, las ayudas visuales e instructivos de un solo punto garantizan estandarización inmediata sin detener la operación.',
      competencyStandard: 'Información Documentada en el Punto de Uso (ISO 9001:2015).'
    },
    {
      id: 'r2_aco_2',
      questionNumber: 2,
      scenario: 'El formato físico de entrega de turnos en planta es engorroso y los supervisores pierden 40 minutos diarios llenando casillas redundantes.',
      question: 'Desde un enfoque de mejoramiento continuo práctico, ¿qué acción debe liderar el tecnólogo?',
      options: [
        { id: 'a', text: 'Eliminar todo registro y dejar la entrega de turno sin ninguna constancia.' },
        { id: 'b', text: 'Obligar a los supervisores a quedarse 1 hora extra sin salario para llenar el formato.' },
        { id: 'c', text: 'Realizar un rediseño simplificado del formato eliminando datos duplicados y probarlo en un piloto de 3 días.' },
        { id: 'd', text: 'Sancionar a los supervisores por expresar inconformidad.' }
      ],
      correctOptionId: 'c',
      explanation: 'La simplificación de formatos y pruebas piloto es el método activo para eliminar desperdicio de tiempo burocrático (Lean Management).',
      competencyStandard: 'Optimización y Control de Formatos de Calidad.'
    },
    {
      id: 'r2_aco_3',
      questionNumber: 3,
      scenario: 'Un cliente internacional exige que los despachos incluyan una etiqueta con código de barras GS1 en menos de 48 horas o cancelará el contrato.',
      question: '¿Qué procedimiento operativo interno debe modificarse con carácter de urgencia?',
      options: [
        { id: 'a', text: 'El manual de inducción de personal nuevo.' },
        { id: 'b', text: 'El procedimiento de empaque, rotulado y despacho, liberando un control de cambio de versión de emergencia.' },
        { id: 'c', text: 'El acta de constitución de la sociedad ante cámara de comercio.' },
        { id: 'd', text: 'La política ambiental de ahorro de energía.' }
      ],
      correctOptionId: 'b',
      explanation: 'Las exigencias críticas de clientes demandan agilidad en el procedimiento de control de cambios documentales para no perder negocios.',
      competencyStandard: 'Control de Cambios Documentales Ágiles.'
    },
    {
      id: 'r2_aco_4',
      questionNumber: 4,
      scenario: 'En un simulacro de evacuación, los brigadistas no encuentran los planos de rutas de salida porque fueron retirados por pintura.',
      question: '¿Cuál es la medida correctiva documental inmediata?',
      options: [
        { id: 'a', text: 'Dejar que cada persona busque su propia salida sin señalización.' },
        { id: 'b', text: 'Esperar a que termine el año para imprimirlos de nuevo.' },
        { id: 'c', text: 'Eliminar las rutas de evacuación.' },
        { id: 'd', text: 'Reinstalar de inmediato los planos vigentes autorizados en los puntos de afluencia masiva y verificar su legibilidad.' }
      ],
      correctOptionId: 'd',
      explanation: 'La disponibilidad de información de seguridad en los puntos de uso es prioritaria y no admite demoras administrativas.',
      competencyStandard: 'Disponibilidad de Información Documentada Crítica.'
    },
    {
      id: 'r2_aco_5',
      questionNumber: 5,
      scenario: 'Un operario detecta un error de tipeo en un instructivo impreso que indica una temperatura equivocada de horneado.',
      question: '¿Qué debe hacer de inmediato para evitar que otro compañero queme un lote de producto?',
      options: [
        { id: 'a', text: 'Rayar el documento con marcador sin avisar a nadie.' },
        { id: 'b', text: 'Quedarse callado y dejar que ocurran accidentes.' },
        { id: 'c', text: 'Detener el uso del instructivo erróneo, avisar al líder de calidad y emitir nota de advertencia inmediata.' },
        { id: 'd', text: 'Tirar el instructivo a la basura sin dejar constancia.' }
      ],
      correctOptionId: 'c',
      explanation: 'El reporte ágil de inconsistencias previene la ocurrencia de no conformidades mayores en la fabricación.',
      competencyStandard: 'Prevención de Errores Operativos en Documentación.'
    }
  ],
  Divergente: [
    {
      id: 'r2_div_1',
      questionNumber: 1,
      scenario: 'La empresa va a redactar su nueva Política de Calidad. La gerencia redactó un texto frío y técnico que ningún empleado de planta comprende.',
      question: 'Desde un estilo divergente y centrado en las personas, ¿cómo debe reformularse la construcción de la política?',
      options: [
        { id: 'a', text: 'Involucrar a representantes de todos los niveles en un taller participativo para construir un enunciado claro, inspirador y comprensible.' },
        { id: 'b', text: 'Exigir que los empleados memoricen el texto frío bajo amenaza de sanción.' },
        { id: 'c', text: 'Eliminar la política de calidad porque no sirve para nada.' },
        { id: 'd', text: 'Contratar a un abogado para que use términos jurídicos más difíciles.' }
      ],
      correctOptionId: 'a',
      explanation: 'La política de calidad debe ser entendida, comunicada y aplicada por todo el personal (ISO 9001:2015 numeral 5.2.2); la empatía y participación facilitan su adopción real.',
      competencyStandard: 'Comunicación y Comprensión de la Política de Calidad.'
    },
    {
      id: 'r2_div_2',
      questionNumber: 2,
      scenario: 'Al elaborar la caracterización SIPOC del proceso de Atención al Usuario, los aprendices debaten sobre quién es el "Cliente".',
      question: '¿Cómo describe un enfoque divergente la relación con el cliente en este proceso?',
      options: [
        { id: 'a', text: 'Como un obstáculo para el trabajo diario de la empresa.' },
        { id: 'b', text: 'Como un número de radicado que debe despacharse lo más rápido posible sin importar si quedó satisfecho.' },
        { id: 'c', text: 'Como un ser humano con expectativas, emociones y necesidades que evalúa la calidez y empatía del servicio, no solo el trámite.' },
        { id: 'd', text: 'Como alguien que nunca tiene derecho a opinar.' }
      ],
      correctOptionId: 'c',
      explanation: 'El enfoque divergente pone en el centro la experiencia y percepción del usuario para rediseñar procesos con alto valor humano.',
      competencyStandard: 'Enfoque al Cliente en la Caracterización de Procesos.'
    },
    {
      id: 'r2_div_3',
      questionNumber: 3,
      scenario: 'Un flujograma de inducción es aburrido y está diagramado únicamente con bloques grises y letras diminutas.',
      question: '¿Qué propuesta creativa de diseño documental mejorará la retención de los nuevos aprendices?',
      options: [
        { id: 'a', text: 'Obligar a los aprendices a transcribir a mano el flujograma 50 veces.' },
        { id: 'b', text: 'Utilizar diagramas visuales con código de colores por rol, íconos explicativos y lenguaje claro respetando la norma ANSI.' },
        { id: 'c', text: 'No mostrar ningún flujograma.' },
        { id: 'd', text: 'Reemplazarlo por una grabación de voz de 4 horas.' }
      ],
      correctOptionId: 'b',
      explanation: 'El diseño instruccional y la comunicación visual aumentan la efectividad de la documentación en la formación de talento.',
      competencyStandard: 'Diseño Visual y Comunicación de Procesos.'
    },
    {
      id: 'r2_div_4',
      questionNumber: 4,
      scenario: 'En una empresa de artes gráficas, los diseñadores afirman que los manuales de procedimientos limitan su inspiración y creatividad artística.',
      question: '¿Cómo conciliar la estandarización documental con la creatividad del equipo humano?',
      options: [
        { id: 'a', text: 'Cerrar la imprenta.' },
        { id: 'b', text: 'Despedir a todos los diseñadores.' },
        { id: 'c', text: 'Eliminar los controles de calidad y entregar productos con fallas.' },
        { id: 'd', text: 'Estandarizar los parámetros de entrega, formatos y tiempos (el qué), dando libertad técnica para la creación artística (el cómo).' }
      ],
      correctOptionId: 'd',
      explanation: 'La buena gestión documental no asfixia la creatividad; estandariza las interfaces y entregables esenciales para garantizar la calidad final.',
      competencyStandard: 'Gestión Documental en Procesos Creativos.'
    },
    {
      id: 'r2_div_5',
      questionNumber: 5,
      scenario: 'Se quiere documentar un procedimiento de mediación y resolución de conflictos interpersonales entre compañeros de trabajo.',
      question: '¿Qué componente cualitativo debe ser primordial en este procedimiento?',
      options: [
        { id: 'a', text: 'Hacer público el conflicto en la cartelera general.' },
        { id: 'b', text: 'La aplicación inmediata de sanciones económicas sin diálogo.' },
        { id: 'c', text: 'La escucha activa, la confidencialidad, el respeto mutuo y la búsqueda de acuerdos ganar-ganar.' },
        { id: 'd', text: 'Ignorar el problema hasta que los trabajadores renuncien.' }
      ],
      correctOptionId: 'c',
      explanation: 'Los procedimientos de convivencia laboral deben basarse en principios de dignidad humana y mediación pacífica.',
      competencyStandard: 'Procedimientos de Gestión del Clima y Convivencia Laboral.'
    }
  ],
  Convergente: [
    {
      id: 'r2_con_1',
      questionNumber: 1,
      scenario: 'En un flujograma de otorgamiento de créditos, un rombo de decisión plantea: "¿El solicitante tiene capacidad de endeudamiento > 40%?".',
      question: '¿Cuál es la regla lógica obligatoria para las flechas de salida de este símbolo según la norma ANSI/ISO?',
      options: [
        { id: 'a', text: 'Debe tener exactamente dos salidas claramente identificadas: "Sí" hacia la aprobación y "No" hacia la causal de rechazo.' },
        { id: 'b', text: 'Debe tener una sola salida sin ninguna rotulación.' },
        { id: 'c', text: 'Debe conectarse directamente con el óvalo de inicio del flujograma.' },
        { id: 'd', text: 'Los rombos no pueden tener flechas de salida.' }
      ],
      correctOptionId: 'a',
      explanation: 'Un símbolo de decisión (rombo) requiere bifurcaciones mutuamente excluyentes (Sí / No) con lógica deductiva clara.',
      competencyStandard: 'Norma ANSI X3.5 Lógica de Diagramación de Procesos.'
    },
    {
      id: 'r2_con_2',
      questionNumber: 2,
      scenario: 'Un sistema documental almacena 450 documentos. Se necesita diseñar una codificación alfanumérica sin ambigüedades.',
      question: '¿Cuál es la codificación más eficiente y trazable para el "Manual de Funciones del Área de Producción, versión 3"?',
      options: [
        { id: 'a', text: 'DOC-12345' },
        { id: 'b', text: 'MANUAL_DE_FUNCIONES_FINAL_AHORA_SI_3.DOCX' },
        { id: 'c', text: 'MN-PRD-001 V.03' },
        { id: 'd', text: 'SENA_2026' }
      ],
      correctOptionId: 'c',
      explanation: 'La codificación técnica estandarizada (Tipo-Área-Consecutivo Versión) permite identificación unívoca y control informático preciso.',
      competencyStandard: 'Buenas Prácticas de Codificación y Control Documental.'
    },
    {
      id: 'r2_con_3',
      questionNumber: 3,
      scenario: 'Al estructurar un procedimiento documentado, se definen las 5 preguntas lógicas de estandarización:',
      question: '¿Cuáles son estas 5 variables clave de control operativo en un procedimiento?',
      options: [
        { id: 'a', text: '¿Cuánto dinero se gana?, ¿Quién es el dueño?, ¿Dónde se come?, ¿Por qué llueve? y ¿Cuándo salimos?' },
        { id: 'b', text: '¿Qué se hace?, ¿Quién lo hace?, ¿Cuándo se hace?, ¿Dónde se hace? y ¿Cómo se hace y evidencia?' },
        { id: 'c', text: 'Solo importa el nombre del gerente.' },
        { id: 'd', text: 'No se requieren preguntas en un procedimiento.' }
      ],
      correctOptionId: 'b',
      explanation: 'Un procedimiento describe con precisión la secuencia de pasos, roles responsables y mecanismos de evidencia de la actividad.',
      competencyStandard: 'Estructura Técnica de Procedimientos Documentados.'
    },
    {
      id: 'r2_con_4',
      questionNumber: 4,
      scenario: 'Se revisa la lista maestra de documentos. Se evidencia que existen 4 formatos obsoletos circulando en el servidor compartido que confunden al área contable.',
      question: '¿Qué mecanismo de control digital debe implementarse de forma lógica e inmediata?',
      options: [
        { id: 'a', text: 'Imprimir 10.000 copias del formato viejo.' },
        { id: 'b', text: 'Formatear todos los computadores de la empresa perdiendo la contabilidad.' },
        { id: 'c', text: 'Dejar que cada empleado use la versión que más le guste.' },
        { id: 'd', text: 'Restringir permisos de edición, archivar las versiones obsoletas en carpeta de sólo lectura con marca "OBSOLETO" y publicar la versión vigente.' }
      ],
      correctOptionId: 'd',
      explanation: 'El control de la información documentada (7.5.3) exige prevenir el uso no intencionado de documentos obsoletos mediante marcas y control de acceso.',
      competencyStandard: 'ISO 9001:2015 Numeral 7.5.3 Control de Versiones.'
    },
    {
      id: 'r2_con_5',
      questionNumber: 5,
      scenario: 'En un proceso de ensamble electrónico, la tasa de error por omisión de un tornillo es del 3%. El tecnólogo propone un mecanismo Poka-Yoke (a prueba de errores) dentro del instructivo.',
      question: '¿Cuál es el propósito convergente y práctico de este mecanismo en el documento?',
      options: [
        { id: 'a', text: 'Aumentar el número de hojas del instructivo.' },
        { id: 'b', text: 'Sancionar al trabajador al final del mes.' },
        { id: 'c', text: 'Hacer físicamente imposible cometer el error de ensamble o detener la línea automáticamente si falta el componente.' },
        { id: 'd', text: 'Pagar horas extras para revisar de nuevo cada aparato.' }
      ],
      correctOptionId: 'c',
      explanation: 'El enfoque Poka-Yoke en la estandarización busca diseñar la tarea para que sea imposible equivocarse (calidad en la fuente).',
      competencyStandard: 'Estandarización Poka-Yoke y Calidad en la Fuente.'
    }
  ],
  Asimilador: [
    {
      id: 'r2_asi_1',
      questionNumber: 1,
      scenario: 'El numeral 7.5.1 de la norma ISO 9001:2015 establece los requisitos para la información documentada requerida por la norma y la que la organización determina como necesaria.',
      question: '¿Cuál es la diferencia conceptual entre "mantener" información documentada y "conservar" información documentada en la norma?',
      options: [
        { id: 'a', text: '"Mantener" se refiere a documentos actualizables (procedimientos, políticas); "conservar" se refiere a registros no modificables que evidencian hechos pasados.' },
        { id: 'b', text: 'Son sinónimos exactos sin ninguna diferencia técnica en las normas ISO.' },
        { id: 'c', text: '"Mantener" aplica solo para papel y "conservar" para computadores.' },
        { id: 'd', text: '"Conservar" significa guardar en una caja fuerte en un banco suizo.' }
      ],
      correctOptionId: 'a',
      explanation: 'En la estructura de alto nivel ISO, "mantener" = manuales/procedimientos; "conservar" = registros de evidencia objetiva.',
      competencyStandard: 'Taxonomía y Vocabulario ISO 9000:2015.'
    },
    {
      id: 'r2_asi_2',
      questionNumber: 2,
      scenario: 'La pirámide jerárquica documental tradicional organiza los documentos en 4 niveles de mayor a menor generalidad estratégica.',
      question: '¿Cuál es el orden jerárquico descendente correcto según la guía ISO/TR 10013?',
      options: [
        { id: 'a', text: 'Nivel 1: Instructivos -> Nivel 2: Políticas -> Nivel 3: Registros -> Nivel 4: Manual de Calidad.' },
        { id: 'b', text: 'Nivel 1: Facturas -> Nivel 2: Misión -> Nivel 3: Cheques -> Nivel 4: Organigrama.' },
        { id: 'c', text: 'Nivel 1: Políticas y Objetivos -> Nivel 2: Caracterizaciones de Procesos -> Nivel 3: Procedimientos e Instructivos -> Nivel 4: Registros y Formatos.' },
        { id: 'd', text: 'Todos los documentos tienen exactamente la misma jerarquía legal y técnica.' }
      ],
      correctOptionId: 'c',
      explanation: 'La jerarquía documental va desde las directrices estratégicas de la alta dirección hasta la evidencia objetiva del nivel operativo.',
      competencyStandard: 'Guía ISO/TR 10013 Directrices para la Documentación del SGC.'
    },
    {
      id: 'r2_asi_3',
      questionNumber: 3,
      scenario: 'En la epistemología de la gestión por procesos, se distingue con rigor entre un "Proceso" y un "Procedimiento".',
      question: '¿Cuál es la distinción conceptual exacta según ISO 9000:2015?',
      options: [
        { id: 'a', text: 'El proceso es un documento y el procedimiento es una fábrica.' },
        { id: 'b', text: 'El proceso es el conjunto de actividades que transforma entradas en salidas agregando valor; el procedimiento es la forma especificada para llevar a cabo una actividad o proceso.' },
        { id: 'c', text: 'No existe ninguna diferencia; son la misma palabra traducida del inglés.' },
        { id: 'd', text: 'El procedimiento solo existe en entidades del gobierno colombiano.' }
      ],
      correctOptionId: 'b',
      explanation: 'Definición ISO 9000: Proceso = Actividades que agregan valor con recursos; Procedimiento = Especificación documentada de la secuencia de pasos.',
      competencyStandard: 'Conceptos Fundamentales de Gestión por Procesos.'
    },
    {
      id: 'r2_asi_4',
      questionNumber: 4,
      scenario: 'El requisito de "Idoneidad y adecuación de la información documentada para su uso" (7.5.3.1) implica un análisis formal de contexto.',
      question: '¿Qué principio garantiza este requisito en organizaciones modernas digitalizadas?',
      options: [
        { id: 'a', text: 'Que los registros se destruyan cada semana.' },
        { id: 'b', text: 'Que todos los documentos se impriman en papel membretado obligatoriamente.' },
        { id: 'c', text: 'Que nadie tenga acceso a los manuales excepto el gerente.' },
        { id: 'd', text: 'Que la documentación esté protegida adecuadamente (p. ej. contra pérdida de confidencialidad, uso indebido o alteración no autorizada).' }
      ],
      correctOptionId: 'd',
      explanation: 'ISO 9001:2015 enfatiza la protección, integridad y accesibilidad de la información documentada en entornos digitales.',
      competencyStandard: 'ISO 9001:2015 Numeral 7.5.3 Control de Información.'
    },
    {
      id: 'r2_asi_5',
      questionNumber: 5,
      scenario: 'Al estructurar un Sistema de Gestión Integral que combine ISO 9001 (Calidad), ISO 14001 (Ambiental) e ISO 45001 (SST), se adopta la Estructura de Alto Nivel (HLS).',
      question: '¿Cuál es el beneficio conceptual de la HLS en la planeación de documentos corporativos?',
      options: [
        { id: 'a', text: 'Exige contratar a 3 gerentes diferentes para cada norma.' },
        { id: 'b', text: 'Prohíbe que las empresas certifiquen más de una norma al tiempo.' },
        { id: 'c', text: 'Estandariza los mismos 10 capítulos y términos idénticos en todas las normas, facilitando la integración documental de políticas y procedimientos.' },
        { id: 'd', text: 'Obliga a triplicar la cantidad de carpetas y formatos.' }
      ],
      correctOptionId: 'c',
      explanation: 'La Estructura de Alto Nivel de ISO permite unificar la documentación de calidad, ambiental y seguridad en un único sistema integrado.',
      competencyStandard: 'Estructura de Alto Nivel (HLS) para Sistemas Integrados de Gestión.'
    }
  ]
};

export const RAP3_QUESTIONS: Record<KolbStyle, Question[]> = {
  Acomodador: [
    {
      id: 'r3_aco_1',
      questionNumber: 1,
      scenario: 'Durante una auditoría en la planta de manufactura, el líder de área se muestra hostil, no entrega los documentos solicitados y busca dilatar el tiempo de la auditoría.',
      question: '¿Cómo debe reaccionar el auditor con estilo acomodador para resolver la situación en sitio con asertividad?',
      options: [
        { id: 'a', text: 'Mantener la calma, recordar el objetivo constructivo de la auditoría, apegarse al plan de horarios y solicitar el apoyo del auditor líder si persiste el bloqueo.' },
        { id: 'b', text: 'Gritar al auditado e iniciar una discusión personal en frente de los operarios.' },
        { id: 'c', text: 'Suspender la auditoría e irse a casa sin emitir reporte.' },
        { id: 'd', text: 'Inventar hallazgos falsos en venganza.' }
      ],
      correctOptionId: 'a',
      explanation: 'El debido cuidado profesional y la inteligencia emocional en campo son indispensables para superar barreras interpersonales en auditoría.',
      competencyStandard: 'Manejo de Situaciones Difíciles en Auditoría (ISO 19011).'
    },
    {
      id: 'r3_aco_2',
      questionNumber: 2,
      scenario: 'En el almacén de sustancias inflamables, el auditor observa a simple vista que los extintores tienen manómetros en rojo (descargados) y la ruta de escape está bloqueada por cajas.',
      question: '¿Qué acción de seguridad inmediata debe ordenar el auditor en el momento exacto del hallazgo?',
      options: [
        { id: 'a', text: 'Encender fuego para probar si los extintores funcionan.' },
        { id: 'b', text: 'Esperar dos semanas a redactar el informe escrito.' },
        { id: 'c', text: 'Alertar inmediatamente al supervisor de seguridad para neutralizar el riesgo inminente de vida, sin esperar al informe final.' },
        { id: 'd', text: 'Hacer caso omiso porque no es auditoría de bomberos.' }
      ],
      correctOptionId: 'c',
      explanation: 'La norma ISO 19011 (numeral 6.4.3) indica que los riesgos significativos e inminentes para la seguridad deben comunicarse inmediatamente.',
      competencyStandard: 'Reporte Inmediato de Riesgos Críticos en Auditoría.'
    },
    {
      id: 'r3_aco_3',
      questionNumber: 3,
      scenario: 'El auditor dispone de solo 30 minutos para auditar un almacén con 10.000 referencias de repuestos.',
      question: '¿Qué técnica de muestreo dinámico y ágil debe aplicar para optimizar el tiempo disponible?',
      options: [
        { id: 'a', text: 'Revisar uno por uno los 10.000 repuestos.' },
        { id: 'b', text: 'Muestreo estratificado por criticidad: revisar los repuestos tipo A (los más costosos y de mayor impacto en la producción).' },
        { id: 'c', text: 'No revisar nada y firmar la lista de chequeo en blanco.' },
        { id: 'd', text: 'Preguntarle al vigilante si todo está bien.' }
      ],
      correctOptionId: 'b',
      explanation: 'El muestreo basado en riesgos (ISO 19011:2018) permite concentrar la verificación en los elementos de mayor probabilidad e impacto de fallo.',
      competencyStandard: 'Técnicas de Muestreo en Auditorías de Calidad.'
    },
    {
      id: 'r3_aco_4',
      questionNumber: 4,
      scenario: 'Al entrevistar a un operario de empaque, este manifiesta que nunca le han socializado los objetivos de calidad del proceso.',
      question: '¿Qué debe hacer el auditor para verificar si esto es un hecho aislado o una falla sistémica?',
      options: [
        { id: 'a', text: 'Despedir al gerente de calidad.' },
        { id: 'b', text: 'Creerle ciegamente y cerrar la planta de inmediato.' },
        { id: 'c', text: 'Regañar al operario por no estudiar en su casa.' },
        { id: 'd', text: 'Ampliar la muestra entrevistando a 2 o 3 operarios más del mismo turno y cotejar los registros de divulgación.' }
      ],
      correctOptionId: 'd',
      explanation: 'La evidencia de auditoría exige contraste y triangulación de fuentes (entrevista + registros + observación) antes de emitir un dictamen.',
      competencyStandard: 'Triangulación de Evidencias en Auditorías Internas.'
    },
    {
      id: 'r3_aco_5',
      questionNumber: 5,
      scenario: 'En la reunión de cierre, la dirección agradece los hallazgos y pregunta cuál es el plazo razonable para presentar el Plan de Acción Correctiva.',
      question: '¿Cuál es el plazo estándar acordado usualmente en las auditorías de gestión?',
      options: [
        { id: 'a', text: 'Diez minutos después de terminar la reunión.' },
        { id: 'b', text: 'Tres años después de la auditoría.' },
        { id: 'c', text: 'Entre 5 y 15 días hábiles contados a partir de la radicación oficial del informe final.' },
        { id: 'd', text: 'No se debe entregar ningún plan de acción.' }
      ],
      correctOptionId: 'c',
      explanation: 'El acuerdo de plazos en la reunión de cierre garantiza compromiso institucional para el análisis de causa y plan de acción oportuno.',
      competencyStandard: 'Seguimiento y Cierre de Auditorías Internas.'
    }
  ],
  Divergente: [
    {
      id: 'r3_div_1',
      questionNumber: 1,
      scenario: 'Muchos colaboradores ven la auditoría interna como un proceso "policivo" y temen que los auditores busquen culpables para despedir personal.',
      question: 'Desde un estilo divergente y humano, ¿cómo debe abrir el auditor líder la reunión de apertura?',
      options: [
        { id: 'a', text: 'Enfatizar que la auditoría evalúa procesos, no personas, y que es una oportunidad formativa de aprendizaje y mejora continua.' },
        { id: 'b', text: 'Confirmar que quien cometa errores será despedido esa misma tarde.' },
        { id: 'c', text: 'Guardar silencio y no explicar nada a los auditados.' },
        { id: 'd', text: 'Decir que la auditoría es solo un trámite inútil para la gerencia.' }
      ],
      correctOptionId: 'a',
      explanation: 'La cultura de calidad positiva se basa en la confianza psicológica: auditar para aprender y mejorar, nunca para castigar.',
      competencyStandard: 'Clima Positivo y Cultura de Calidad en Auditoría.'
    },
    {
      id: 'r3_div_2',
      questionNumber: 2,
      scenario: 'Durante la auditoría al área de diseño publicitario, el auditor nota que no hay No Conformidades, pero que los creativos usan metodologías tradicionales obsoletas.',
      question: '¿Qué tipo de hallazgo constructivo debe redactar para aportar valor estratégico?',
      options: [
        { id: 'a', text: 'Una sanción disciplinaria por trabajar despacio.' },
        { id: 'b', text: 'Una No Conformidad Mayor por falta de imaginación.' },
        { id: 'c', text: 'Una Oportunidad de Mejora recomendando explorar herramientas de diseño digital y software colaborativo en la nube.' },
        { id: 'd', text: 'No mencionar nada porque no hay incumplimiento normativo.' }
      ],
      correctOptionId: 'c',
      explanation: 'Las Oportunidades de Mejora permiten a los auditores aportar valor sin calificar de forma negativa un proceso que cumple la norma actual.',
      competencyStandard: 'Redacción de Oportunidades de Mejora (ISO 19011).'
    },
    {
      id: 'r3_div_3',
      questionNumber: 3,
      scenario: 'Al entrevistar a una líder de compras, la auditora percibe un alto nivel de estrés y sobrecarga laboral debido a la falta de personal.',
      question: '¿Cómo debe abordar el auditor esta situación con empatía profesional?',
      options: [
        { id: 'a', text: 'Burlarse de la líder y exigirle que trabaje más rápido.' },
        { id: 'b', text: 'Escuchar activamente, brindar un ambiente de serenidad, evaluar si los recursos asignados (numeral 7.1) son suficientes y registrar la observación.' },
        { id: 'c', text: 'Interrumpir groseramente la entrevista.' },
        { id: 'd', text: 'Ignorar el hecho y redactar que la líder es incompetente.' }
      ],
      correctOptionId: 'b',
      explanation: 'La asignación adecuada de recursos (7.1) incluye el talento humano suficiente; el auditor debe evaluar las condiciones sistémicas.',
      competencyStandard: 'Habilidades Blandas y Empatía del Auditor ISO 19011.'
    },
    {
      id: 'r3_div_4',
      questionNumber: 4,
      scenario: 'Un equipo de auditores novatos solo busca faltas de ortografía en los registros en vez de evaluar si los productos satisfacen a los clientes.',
      question: '¿Qué consejo pedagógico divergente debe darles el auditor líder?',
      options: [
        { id: 'a', text: 'Dejar de auditar para siempre.' },
        { id: 'b', text: 'Buscar con lupa más errores ortográficos.' },
        { id: 'c', text: 'Cobrar multas por cada punto y coma faltante.' },
        { id: 'd', text: 'Enfocar la mirada en lo sustancial: el impacto del proceso en el cliente y en los riesgos de la organización, no en minucias intrascendentes.' }
      ],
      correctOptionId: 'd',
      explanation: 'Auditar con valor agregado implica evaluar la eficacia real del sistema y no caer en la "miopía de la coma" o burocracia ciega.',
      competencyStandard: 'Auditoría con Valor Agregado vs Burocracia.'
    },
    {
      id: 'r3_div_5',
      questionNumber: 5,
      scenario: 'Al finalizar la auditoría, la dirección de la empresa agradece que el equipo auditor destacó tanto las fortalezas como las debilidades.',
      question: '¿Por qué es fundamental que el informe de auditoría reconozca también los logros y buenas prácticas?',
      options: [
        { id: 'a', text: 'Porque los auditores deben adular a los jefes.' },
        { id: 'b', text: 'Porque está prohibido reportar problemas en las empresas.' },
        { id: 'c', text: 'Porque motiva al talento humano, refuerza las conductas positivas y fortalece el compromiso hacia el mejoramiento continuo.' },
        { id: 'd', text: 'Porque así la auditoría dura menos tiempo.' }
      ],
      correctOptionId: 'c',
      explanation: 'La presentación ecuánime (ISO 19011) debe reflejar con justicia el estado global del sistema, reconociendo fortalezas y áreas de mejora.',
      competencyStandard: 'Presentación Ecuánime y Reconocimiento de Buenas Prácticas.'
    }
  ],
  Convergente: [
    {
      id: 'r3_con_1',
      questionNumber: 1,
      scenario: 'Un auditor redacta el siguiente hallazgo: "Durante la revisión de 50 órdenes de compra, se constató que la orden #OC-8491 carece de la firma de autorización del jefe de área requerida en el numeral 5.3 del PR-CMP-001".',
      question: '¿Por qué esta redacción cumple a cabalidad con la estructura técnica tripartita de un hallazgo?',
      options: [
        { id: 'a', text: 'Contiene Criterio (PR-CMP-001 num 5.3), Evidencia Objetiva (#OC-8491 sin firma) y Declaración del Hallazgo precisa y comprobable.' },
        { id: 'b', text: 'Porque contiene opiniones personales del auditor.' },
        { id: 'c', text: 'Porque acusa al culpable con nombres y apellidos.' },
        { id: 'd', text: 'Porque no menciona ningún documento técnico.' }
      ],
      correctOptionId: 'a',
      explanation: 'La estructura técnica obligatoria de toda No Conformidad se compone de: Criterio normativo + Evidencia objetiva + Declaración del hecho.',
      competencyStandard: 'Estructura Técnica de Redacción de No Conformidades.'
    },
    {
      id: 'r3_con_2',
      questionNumber: 2,
      scenario: 'En una fábrica de alimentos se detecta que no existen registros de desinfección de las líneas de leche durante todo el mes de octubre, y el producto ya fue comercializado.',
      question: '¿Bajo qué criterio lógico y de riesgo se debe clasificar este hallazgo?',
      options: [
        { id: 'a', text: 'Conformidad con felicitación por ahorro de desinfectante.' },
        { id: 'b', text: 'No Conformidad Menor porque a nadie le dio dolor de estómago todavía.' },
        { id: 'c', text: 'No Conformidad Mayor, debido a la ausencia total del control en un punto crítico con riesgo inminente de contaminación biológica.' },
        { id: 'd', text: 'Oportunidad de Mejora opcional.' }
      ],
      correctOptionId: 'c',
      explanation: 'La ausencia total de un control en un punto crítico de inocuidad alimentaria o seguridad constituye inequívocamente una NC Mayor.',
      competencyStandard: 'Gradación y Clasificación de Hallazgos Críticos.'
    },
    {
      id: 'r3_con_3',
      questionNumber: 3,
      scenario: 'Para auditar un proceso que genera 1.200 facturas al mes, el equipo auditor decide aplicar una fórmula de tamaño de muestra con 95% de confianza y 5% de margen de error.',
      question: '¿Cuál es la justificación estadística de utilizar tablas o fórmulas de muestreo en la auditoría?',
      options: [
        { id: 'a', text: 'Revisar únicamente las facturas de amigos.' },
        { id: 'b', text: 'Garantizar representatividad estadística para que las conclusiones de auditoría sean fiables y reproducibles con rigor matemático.' },
        { id: 'c', text: 'Evitar tener que auditar el proceso.' },
        { id: 'd', text: 'Complicar innecesariamente al auditado.' }
      ],
      correctOptionId: 'b',
      explanation: 'El muestreo estadístico cuantitativo asegura conclusiones sólidas respaldadas por la probabilidad matemática (ISO 19011 anexo A).',
      competencyStandard: 'Muestreo Estadístico en Auditorías ISO 19011.'
    },
    {
      id: 'r3_con_4',
      questionNumber: 4,
      scenario: 'Al cerrar una No Conformidad, el líder de proceso entrega como "Plan de Acción": "Se volvió a capacitar al empleado para que no lo vuelva a hacer".',
      question: '¿Por qué un auditor con pensamiento convergente y analítico debe rechazar este plan de acción?',
      options: [
        { id: 'a', text: 'Porque debe costar más de $100 millones de pesos obligatoriamente.' },
        { id: 'b', text: 'Porque la capacitación está prohibida en las normas ISO.' },
        { id: 'c', text: 'Porque los empleados nunca aprenden nada.' },
        { id: 'd', text: 'Porque no contiene un análisis de causa raíz metódico (Ishikawa o 5 Porqués) y la capacitación repetitiva rara vez elimina la falla del sistema.' }
      ],
      correctOptionId: 'd',
      explanation: 'Una acción correctiva debe actuar sobre la causa raíz sistémica comprobada, no ser un parche superficial de re-inducción.',
      competencyStandard: 'Validación Técnica de Planes de Acción Correctiva.'
    },
    {
      id: 'r3_con_5',
      questionNumber: 5,
      scenario: 'Un auditor calcula el índice de eficacia de las acciones correctivas del año anterior: de 20 no conformidades cerradas, 12 volvieron a ocurrir en el mismo proceso (60% de recurrencia).',
      question: '¿Qué revela cuantitativamente este dato sobre el Sistema de Gestión?',
      options: [
        { id: 'a', text: 'Que no se deben volver a registrar auditorías.' },
        { id: 'b', text: 'Que el sistema de gestión funciona a la perfección.' },
        { id: 'c', text: 'Que las acciones correctivas implementadas fueron totalmente ineficaces para eliminar la causa raíz de los problemas.' },
        { id: 'd', text: 'Que los auditores no saben sumar porcentajes.' }
      ],
      correctOptionId: 'c',
      explanation: 'La reaparición de una no conformidad demuestra que la acción no atacó la causa raíz, violando el principio de eficacia de ISO 9001:2015 (10.2).',
      competencyStandard: 'Eficacia de las Acciones Correctivas (ISO 9001:2015 numeral 10.2).'
    }
  ],
  Asimilador: [
    {
      id: 'r3_asi_1',
      questionNumber: 1,
      scenario: 'El numeral 4 de la norma ISO 19011:2018 consagra siete principios fundamentales que rigen la práctica de auditoría de los sistemas de gestión.',
      question: '¿Cuál es el principio que establece que los auditores no deben auditar su propio trabajo y deben estar libres de sesgo y conflicto de intereses?',
      options: [
        { id: 'a', text: 'Principio de Independencia.' },
        { id: 'b', text: 'Principio de Confidencialidad.' },
        { id: 'c', text: 'Principio de Enfoque basado en riesgos.' },
        { id: 'd', text: 'Principio de Presentación ecuánime.' }
      ],
      correctOptionId: 'a',
      explanation: 'La Independencia es la base de la imparcialidad y la objetividad de las conclusiones de auditoría en ISO 19011.',
      competencyStandard: 'ISO 19011:2018 Numeral 4 Principios de Auditoría.'
    },
    {
      id: 'r3_asi_2',
      questionNumber: 2,
      scenario: 'En la teoría y arquitectura de auditoría, se define con exactitud la diferencia entre el "Programa de Auditoría" y el "Plan de Auditoría".',
      question: '¿Cuál es la definición conceptual correcta según ISO 19011:2018?',
      options: [
        { id: 'a', text: 'Son exactamente lo mismo sin distinción alguna.' },
        { id: 'b', text: 'El Programa es un software y el Plan es un documento en Word.' },
        { id: 'c', text: 'El Programa es el conjunto de una o más auditorías planificadas para un periodo de tiempo determinado; el Plan es la descripción detallada de actividades y detalles para una auditoría específica.' },
        { id: 'd', text: 'El Plan lo hace el gobierno y el Programa la empresa.' }
      ],
      correctOptionId: 'c',
      explanation: 'ISO 19011 (términos 3.4 y 3.6): El programa es el marco macro anual; el plan es la agenda pormenorizada de la auditoría en sitio.',
      competencyStandard: 'Términos y Definiciones ISO 19011:2018.'
    },
    {
      id: 'r3_asi_3',
      questionNumber: 3,
      scenario: 'La versión 2018 de la norma ISO 19011 incorporó formalmente un séptimo principio: "El enfoque basado en riesgos".',
      question: '¿Cómo incide este principio conceptual en la planificación de las auditorías de calidad?',
      options: [
        { id: 'a', text: 'Exige comprar pólizas de seguro de vida para los auditores.' },
        { id: 'b', text: 'Exige que la asignación de recursos y tiempos de auditoría se enfoque prioritariamente en los procesos con mayor probabilidad o gravedad de impacto en los objetivos.' },
        { id: 'c', text: 'Prohíbe auditar procesos que tengan riesgos.' },
        { id: 'd', text: 'Elimina las listas de verificación.' }
      ],
      correctOptionId: 'b',
      explanation: 'El enfoque basado en riesgos asegura que el esfuerzo auditor se concentre en los puntos de mayor riesgo para la organización.',
      competencyStandard: 'Enfoque Basado en Riesgos en la Auditoría ISO 19011:2018.'
    },
    {
      id: 'r3_asi_4',
      questionNumber: 4,
      scenario: 'En la epistemología jurídica y normativa de los sistemas de gestión, los hallazgos se contrastan obligatoriamente contra los "Criterios de Auditoría".',
      question: '¿Qué se entiende conceptualmente por "Criterios de Auditoría"?',
      options: [
        { id: 'a', text: 'Los rumores del pasillo de la empresa.' },
        { id: 'b', text: 'El estado de ánimo del auditor ese día.' },
        { id: 'c', text: 'El salario que gana el evaluador.' },
        { id: 'd', text: 'El conjunto de requisitos usados como referencia frente a los cuales se compara la evidencia objetiva (normas, leyes, procedimientos internos y contratos).' }
      ],
      correctOptionId: 'd',
      explanation: 'Criterio de auditoría (ISO 19011 3.7): Es el estándar o requisito objetivo e invariable contra el cual se mide la realidad observada.',
      competencyStandard: 'Criterios de Auditoría y Marco Normativo.'
    },
    {
      id: 'r3_asi_5',
      questionNumber: 5,
      scenario: 'Se clasifican las auditorías según la relación entre la organización y el equipo auditor en auditorías de primera parte, segunda parte y tercera parte.',
      question: '¿Cuál es la conceptualización formal de una auditoría de "Segunda Parte"?',
      options: [
        { id: 'a', text: 'Auditoría realizada por un ente certificador acreditado (como ICONTEC o Bureau Veritas).' },
        { id: 'b', text: 'Auditoría interna realizada por la propia empresa para su propio beneficio.' },
        { id: 'c', text: 'Auditoría realizada por una organización a sus proveedores o partes interesadas externas con relación contractual.' },
        { id: 'd', text: 'Auditoría realizada a las dos de la tarde.' }
      ],
      correctOptionId: 'c',
      explanation: '1ª parte = interna; 2ª parte = a proveedores / partes interesadas; 3ª parte = certificación por organismo independiente acreditado.',
      competencyStandard: 'Clasificación de Auditorías por Partes Interesadas (ISO 19011).'
    }
  ]
};

export const RAP4_QUESTIONS: Record<KolbStyle, Question[]> = {
  Acomodador: [
    {
      id: 'r4_aco_1',
      questionNumber: 1,
      scenario: 'El tablero de control en el centro de distribución marca semáforo ROJO en el indicador de "Cumplimiento de Entregas del Día" (cayó al 62%). Hay 80 clientes esperando sus paquetes en la ciudad.',
      question: '¿Cuál es la primera acción operativa de contingencia que debe activar el líder de logística?',
      options: [
        { id: 'a', text: 'Activar el protocolo de contingencia inmediata: redistribuir las rutas más críticas con vehículos de apoyo y notificar a los clientes afectados.' },
        { id: 'b', text: 'Apagar la pantalla del indicador para que nadie se entere.' },
        { id: 'c', text: 'Irse a almorzar y esperar que mañana se solucione solo.' },
        { id: 'd', text: 'Culpar al sistema informático sin hacer nada.' }
      ],
      correctOptionId: 'a',
      explanation: 'El semáforo rojo en indicadores de operación en tiempo real exige activación inmediata de medidas de contingencia para mitigar el impacto.',
      competencyStandard: 'Gestión Reactiva y Contingencias Operativas de KPIs.'
    },
    {
      id: 'r4_aco_2',
      questionNumber: 2,
      scenario: 'Un operario de máquinas nota que los datos del indicador de merma de tela se ingresan a mano en una hoja de papel que se ensucia y extravía constantemente.',
      question: '¿Qué mejora práctica y de bajo costo debe implementarse en la estación de trabajo?',
      options: [
        { id: 'a', text: 'Contratar a 5 personas para cuidar la hoja de papel.' },
        { id: 'b', text: 'Prohibir pesar las mermas.' },
        { id: 'c', text: 'Instalar una tablet o lector de código de barras para captura digital inmediata del pesaje de retazos en la fuente.' },
        { id: 'd', text: 'No volver a medir la merma nunca más.' }
      ],
      correctOptionId: 'c',
      explanation: 'La digitalización ágil en la fuente de captura previene la pérdida de datos y agiliza el cálculo del indicador sin carga burocrática.',
      competencyStandard: 'Captura Ágil de Datos en la Fuente.'
    },
    {
      id: 'r4_aco_3',
      questionNumber: 3,
      scenario: 'Al revisar el indicador de ausentismo laboral, se evidencia que los lunes se concentra el 70% de las incapacidades cortas no justificadas.',
      question: '¿Qué intervención práctica debe liderar talento humano para revertir esta tendencia?',
      options: [
        { id: 'a', text: 'Despedir a todo el personal de la empresa.' },
        { id: 'b', text: 'Implementar un programa de bienestar, chequeos preventivos de salud y bonos de puntualidad y asistencia perfecta.' },
        { id: 'c', text: 'Eliminar los lunes del calendario laboral.' },
        { id: 'd', text: 'Prohibir que los trabajadores se enfermen.' }
      ],
      correctOptionId: 'b',
      explanation: 'Las causas de ausentismo se gestionan combinando estímulos positivos de bienestar con acompañamiento de salud ocupacional.',
      competencyStandard: 'Intervención Operativa en Indicadores de Gestión Humana.'
    },
    {
      id: 'r4_aco_4',
      questionNumber: 4,
      scenario: 'El equipo de ventas tiene la meta de 100 cierres en el mes y al día 20 apenas llevan 35. El semáforo está en zona crítica.',
      question: '¿Qué estrategia de sprint operativo debe implementar el equipo comercial?',
      options: [
        { id: 'a', text: 'Cerrar la empresa de ventas.' },
        { id: 'b', text: 'Bajar la meta a 35 para decir que cumplieron el 100%.' },
        { id: 'c', text: 'Rendirse y esperar el mes entrante.' },
        { id: 'd', text: 'Lanzar un plan de choque comercial: contactar a la base de clientes tibios con una promoción relámpago y enfocar el esfuerzo en cuentas clave.' }
      ],
      correctOptionId: 'd',
      explanation: 'El seguimiento periódico permite aplicar planes de choque antes del cierre del periodo contable para alcanzar la meta.',
      competencyStandard: 'Planes de Choque y Recuperación de KPIs.'
    },
    {
      id: 'r4_aco_5',
      questionNumber: 5,
      scenario: 'Un jefe de producción quiere saber si la máquina nueva cumplió con la meta del turno sin esperar a que contabilidad procese los datos en 3 días.',
      question: '¿Qué herramienta visual en planta le permite conocer el estado de producción al instante?',
      options: [
        { id: 'a', text: 'Esperar a que el banco envíe el extracto bancario.' },
        { id: 'b', text: 'Una carta formal enviada por correo postal.' },
        { id: 'c', text: 'Un tablero Andon o panel visual de piso que muestra piezas producidas vs piezas programadas en tiempo real.' },
        { id: 'd', text: 'Preguntarle a los clientes en la calle.' }
      ],
      correctOptionId: 'c',
      explanation: 'El control visual (Andon / Lean) provee retroalimentación inmediata para la toma de decisiones ágiles en el piso de operación.',
      competencyStandard: 'Gestión Visual de Indicadores en Planta (Andon).'
    }
  ],
  Divergente: [
    {
      id: 'r4_div_1',
      questionNumber: 1,
      scenario: 'El indicador de "Índice de Clima y Felicidad Laboral" cayó al 55% en una empresa de tecnología. La gerencia no entiende por qué los empleados se sienten insatisfechos si se les paga a tiempo.',
      question: 'Desde un estilo divergente y empático, ¿cómo debe investigarse la causa de esta métrica?',
      options: [
        { id: 'a', text: 'Realizar círculos de escucha y grupos focales (Focus Groups) cualitativos para comprender las expectativas emocionales, balance de vida y reconocimiento del personal.' },
        { id: 'b', text: 'Obligar a los empleados a sonreír en la entrada de la oficina.' },
        { id: 'c', text: 'Eliminar el indicador de felicidad por considerarlo una debilidad.' },
        { id: 'd', text: 'Descontar dinero a los empleados que respondan la encuesta con insatisfacción.' }
      ],
      correctOptionId: 'a',
      explanation: 'Los indicadores humanos requieren métodos cualitativos empáticos para descifrar las causas emocionales y culturales profundas.',
      competencyStandard: 'Medición e Interpretación de Indicadores de Clima y Cultura.'
    },
    {
      id: 'r4_div_2',
      questionNumber: 2,
      scenario: 'Para medir la lealtad y experiencia integral del usuario, el comité propone implementar el indicador Net Promoter Score (NPS) a través de la pregunta: "¿Qué tan probable es que recomiende nuestro servicio a un colega o familiar?" (Escala de 0 a 10).',
      question: 'Desde un estilo divergente y centrado en la percepción de las personas, ¿cómo se clasifican las respuestas y cómo se calcula el NPS?',
      options: [
        { id: 'a', text: 'Solo se cuentan los clientes que pusieron 0 puntos.' },
        { id: 'b', text: 'Se suman todas las respuestas y se dividen por el número de empleados.' },
        { id: 'c', text: 'Se clasifican en Promotores (9-10), Pasivos (7-8) y Detractores (0-6); NPS = % Promotores menos % Detractores.' },
        { id: 'd', text: 'El NPS solo mide el dinero gastado por cada cliente.' }
      ],
      correctOptionId: 'c',
      explanation: 'El NPS segmenta a los clientes según su entusiasmo y recomendación: Promotores (9-10), Pasivos (7-8) y Detractores (0-6). La métrica resulta de restar el % de detractores al % de promotores.',
      competencyStandard: 'Medición de la Voz del Cliente e Indicadores de Lealtad (NPS).'
    },
    {
      id: 'r4_div_3',
      questionNumber: 3,
      scenario: 'Un hospital mide el indicador de "Trato Digno y Humanizado en Urgencias". La meta numérica es 95%, pero el resultado es 78%.',
      question: '¿Cómo debe interpretarse este indicador más allá de un frío porcentaje estadístico?',
      options: [
        { id: 'a', text: 'Como un simple número sin importancia porque los pacientes de todos modos se curan.' },
        { id: 'b', text: 'Como un llamado ético a revisar los tiempos de espera, la empatía del personal médico y la contención emocional a pacientes vulnerables.' },
        { id: 'c', text: 'Como una excusa para cobrar más por la consulta.' },
        { id: 'd', text: 'Como un problema contable de costos.' }
      ],
      correctOptionId: 'b',
      explanation: 'El enfoque divergente humaniza los indicadores de servicio, reconociendo el impacto de la gestión en el bienestar y la dignidad de las personas.',
      competencyStandard: 'Humanización del Servicio y Métricas de Calidad.'
    },
    {
      id: 'r4_div_4',
      questionNumber: 4,
      scenario: 'Para presentar el tablero de indicadores a la junta directiva comunitaria, el tecnólogo quiere que todos comprendan las metas sin confundirse con fórmulas complejas.',
      question: '¿Qué recurso narrativo y visual favorece la comprensión y empatía de la comunidad?',
      options: [
        { id: 'a', text: 'No mostrar ningún dato y pedir fe ciega.' },
        { id: 'b', text: 'Entregar una hoja de cálculo con 50.000 filas de números en fuente tamaño 6.' },
        { id: 'c', text: 'Hablar únicamente en términos algebraicos abstractos.' },
        { id: 'd', text: 'Utilizar infografías coloridas con analogías claras, semáforos visuales y testimonios reales de beneficiarios del programa.' }
      ],
      correctOptionId: 'd',
      explanation: 'El storytelling con datos (Data Storytelling) permite comunicar el significado de los KPIs a diversas partes interesadas de forma accesible.',
      competencyStandard: 'Comunicación Visual y Storytelling de Indicadores.'
    },
    {
      id: 'r4_div_5',
      questionNumber: 5,
      scenario: 'Al analizar el indicador de quejas por servicio posventa, se descubre que muchas surgen por malentendidos culturales con clientes de otras regiones.',
      question: '¿Qué plan de mejora cultural debe proponerse para este indicador?',
      options: [
        { id: 'a', text: 'Obligar a los clientes a hablar como los asesores.' },
        { id: 'b', text: 'Dejar de vender en otras regiones de Colombia.' },
        { id: 'c', text: 'Capacitar al personal de atención en diversidad cultural, comunicación asertiva y adaptación de vocabulario regional.' },
        { id: 'd', text: 'Contratar robots para que nadie hable con nadie.' }
      ],
      correctOptionId: 'c',
      explanation: 'La adaptación cultural y la empatía en la atención resuelven fricciones de comunicación que afectan los indicadores de satisfacción.',
      competencyStandard: 'Competencia Intercultural en la Calidad del Servicio.'
    }
  ],
  Convergente: [
    {
      id: 'r4_con_1',
      questionNumber: 1,
      scenario: 'Una fábrica programa producir 2.000 zapatos en el mes con un presupuesto de $40.000.000. Al cierre de mes, produce 2.000 zapatos (100% de la meta), pero el gasto real fue de $48.000.000.',
      question: '¿Cuál es el cálculo exacto de la Eficacia y la Eficiencia de este proceso?',
      options: [
        { id: 'a', text: 'Eficacia = 100% (cumplió la meta de producción); Eficiencia = 83.3% (sobrecosto presupuestal: $40M / $48M).' },
        { id: 'b', text: 'Eficacia = 83.3% y Eficiencia = 100%.' },
        { id: 'c', text: 'Tanto la eficacia como la eficiencia fueron del 150%.' },
        { id: 'd', text: 'No se puede calcular porque faltan datos de mercadeo.' }
      ],
      correctOptionId: 'a',
      explanation: 'Eficacia = (Resultado alcanzado / Meta) * 100 = 100%. Eficiencia = (Costo programado / Costo real) * 100 = (40/48)*100 = 83.33%.',
      competencyStandard: 'Cálculo Matemático de Eficacia vs Eficiencia (DAFP/SENA).'
    },
    {
      id: 'r4_con_2',
      questionNumber: 2,
      scenario: 'Se define la fórmula del indicador de "Rotación de Inventarios": (Costo de ventas del año / Promedio de inventarios). Si el costo de ventas es de $600.000.000 y el inventario promedio es de $100.000.000.',
      question: '¿Cuántas veces rotó el inventario en el año y qué significa financieramente?',
      options: [
        { id: 'a', text: 'Rotó 0.16 veces al año.' },
        { id: 'b', text: 'Rotó 600 veces al año.' },
        { id: 'c', text: 'Rotó 6 veces al año; significa que el inventario se renueva completamente cada 60 días (360/6).' },
        { id: 'd', text: 'No rotó ninguna vez.' }
      ],
      correctOptionId: 'c',
      explanation: '600 / 100 = 6 veces al año. Período promedio de permanencia = 360 días / 6 rotaciones = 60 días en bodega.',
      competencyStandard: 'Cálculo e Interpretación de Indicadores de Rotación y Eficiencia.'
    },
    {
      id: 'r4_con_3',
      questionNumber: 3,
      scenario: 'El indicador de "Tasa de Desperdicio" tiene como límite superior máximo (LSC) el 2.5%. En las últimas 6 semanas las mediciones fueron: 2.1%, 2.3%, 2.6%, 2.9%, 3.2% y 3.5%.',
      question: '¿Cuál es el diagnóstico de control estadístico de este indicador?',
      options: [
        { id: 'a', text: 'Proceso en estado óptimo porque los números van subiendo.' },
        { id: 'b', text: 'Proceso fuera de control estadístico con tendencia alcista sostenida que superó el límite crítico, requiriendo acción correctiva inmediata.' },
        { id: 'c', text: 'Comportamiento aleatorio normal sin peligro.' },
        { id: 'd', text: 'El desperdicio nunca se mide con límites.' }
      ],
      correctOptionId: 'b',
      explanation: 'En gráficos de control, una racha ascendente continua que quiebra el límite superior tolerado evidencia una causa asignable fuera de control.',
      competencyStandard: 'Control Estadístico de Procesos (CEP) y Gráficos de Tendencia.'
    },
    {
      id: 'r4_con_4',
      questionNumber: 4,
      scenario: 'Una planta industrial produce 18.000 piezas metálicas en el mes utilizando 12 operarios que laboraron 150 horas cada uno (total: 1.800 horas-hombre consumidas en el proceso).',
      question: '¿Cuál es el cálculo exacto del indicador de Productividad de Mano de Obra y su interpretación técnica?',
      options: [
        { id: 'a', text: 'La productividad no se puede medir en horas trabajadas.' },
        { id: 'b', text: 'Productividad = 1.500 piezas por hora-hombre.' },
        { id: 'c', text: 'Productividad = 0.10 piezas por hora-hombre.' },
        { id: 'd', text: 'Productividad = 10.0 piezas por hora-hombre (18.000 piezas / 1.800 horas-hombre).' }
      ],
      correctOptionId: 'd',
      explanation: 'Productividad = Unidades producidas / Horas-hombre trabajadas = 18.000 / 1.800 = 10.0 piezas por cada hora-hombre invertida en la manufactura.',
      competencyStandard: 'Cálculo Matemático de Indicadores de Productividad y Rendimiento.'
    },
    {
      id: 'r4_con_5',
      questionNumber: 5,
      scenario: 'Se quiere calcular la "Efectividad Global" combinando Eficacia (90%) y Eficiencia (80%) con una ponderación del 60% para Eficacia y 40% para Eficiencia.',
      question: '¿Cuál es la calificación ponderada final de Efectividad?',
      options: [
        { id: 'a', text: '50%.' },
        { id: 'b', text: '170%.' },
        { id: 'c', text: '86% ( (90 * 0.60) + (80 * 0.40) = 54 + 32 = 86% ).' },
        { id: 'd', text: '95%.' }
      ],
      correctOptionId: 'c',
      explanation: 'La efectividad ponderada = (90 * 0.60) + (80 * 0.40) = 54 + 32 = 86%. Demuestra cumplimiento robusto de metas con uso aceptable de recursos.',
      competencyStandard: 'Cálculo de Efectividad Ponderada Multivariable.'
    }
  ],
  Asimilador: [
    {
      id: 'r4_asi_1',
      questionNumber: 1,
      scenario: 'El numeral 9.1.1 de la norma ISO 9001:2015 establece los requisitos generales para el seguimiento, la medición, el análisis y la evaluación.',
      question: '¿Cuáles son los 4 elementos conceptuales que la organización debe determinar obligatoriamente para sus indicadores?',
      options: [
        { id: 'a', text: 'Qué necesita seguimiento y medición; los métodos de medición y análisis; cuándo se deben llevar a cabo; y cuándo se deben analizar y evaluar los resultados.' },
        { id: 'b', text: 'El precio de venta, la comisión del vendedor, el color del logo y el tamaño del edificio.' },
        { id: 'c', text: 'Solo se debe determinar el valor del dólar.' },
        { id: 'd', text: 'No se requiere determinar nada previamente; se mide lo que ocurra espontáneamente.' }
      ],
      correctOptionId: 'a',
      explanation: 'El numeral 9.1.1 exige planificación previa: qué medir, con qué método, cuándo medir y cuándo analizar los resultados.',
      competencyStandard: 'ISO 9001:2015 Requisito 9.1.1 Generalidades de Medición.'
    },
    {
      id: 'r4_asi_2',
      questionNumber: 2,
      scenario: 'En la teoría de medición del desempeño (Neely et al.), los indicadores se clasifican en "Leading" (Inductores/Predictivos) y "Lagging" (De Resultado/Históricos).',
      question: '¿Cuál es la distinción conceptual entre ambos tipos de indicadores?',
      options: [
        { id: 'a', text: 'Son exactamente lo mismo sin distinción teórica.' },
        { id: 'b', text: 'Los Leading son para líderes y los Lagging para operarios.' },
        { id: 'c', text: 'Los Lagging miden resultados pasados consolidados (p. ej. ventas totales del mes); los Leading miden actividades precursoras que predicen el resultado futuro (p. ej. número de llamadas de prospección).' },
        { id: 'd', text: 'Los Lagging solo se usan en empresas quebradas.' }
      ],
      correctOptionId: 'c',
      explanation: 'Un buen tablero de control articula indicadores históricos (Lagging) con indicadores predictivos de avance (Leading) para actuar a tiempo.',
      competencyStandard: 'Tipología Teórica de Indicadores Leading vs Lagging.'
    },
    {
      id: 'r4_asi_3',
      questionNumber: 3,
      scenario: 'La Ficha Técnica de un indicador es el instrumento metodológico que formaliza su cédula de identidad en el Sistema de Gestión.',
      question: '¿Por qué la ausencia de una Ficha Técnica formal invalida la comparabilidad científica de los datos en el tiempo?',
      options: [
        { id: 'a', text: 'Porque la ficha técnica es solo un papel decorativo para las auditorías.' },
        { id: 'b', text: 'Porque sin fórmula estandarizada, fuentes fijas y definiciones unívocas, cada persona calculará las variables con criterios diferentes generando sesgos.' },
        { id: 'c', text: 'Porque las fórmulas matemáticas cambian solas todos los días.' },
        { id: 'd', text: 'Porque los datos nunca deben compararse en el tiempo.' }
      ],
      correctOptionId: 'b',
      explanation: 'La ficha técnica garantiza estandarización metrológica y metodológica, evitando que cambios de personal alteren la forma de medir.',
      competencyStandard: 'Metodología DAFP de Construcción de Fichas Técnicas de Indicadores.'
    },
    {
      id: 'r4_asi_4',
      questionNumber: 4,
      scenario: 'Al parametrizar la semaforización de un indicador, se establecen los umbrales de tolerancia estadística.',
      question: '¿Cuál es el postulado conceptual que determina que no todos los indicadores tienen la misma meta de 100%?',
      options: [
        { id: 'a', text: 'Los indicadores inversos están prohibidos en Colombia.' },
        { id: 'b', text: 'La ley exige que todos los indicadores de todas las empresas midan 100% obligatoriamente.' },
        { id: 'c', text: 'Las metas las asigna una lotería nacional.' },
        { id: 'd', text: 'La naturaleza del fenómeno: en indicadores de fallo, accidentalidad o merma, la meta es 0% y el semáforo se invierte (valores bajos son verdes y altos son rojos).' }
      ],
      correctOptionId: 'd',
      explanation: 'Existen indicadores de impacto positivo (a mayor valor, mejor) e indicadores de impacto negativo o riesgo (a menor valor, mejor).',
      competencyStandard: 'Parametrización y Sentido de los Indicadores (Directos vs Inversos).'
    },
    {
      id: 'r4_asi_5',
      questionNumber: 5,
      scenario: 'El modelo de Cuadro de Mando Integral (Balanced Scorecard de Kaplan y Norton) estructura los indicadores de gestión de la organización en cuatro perspectivas equilibradas interconectadas.',
      question: '¿Cuáles son las 4 perspectivas sistémicas fundamentales que articulan los indicadores en el Balanced Scorecard?',
      options: [
        { id: 'a', text: 'Perspectiva de Compras, Ventas, Impuestos y Vacaciones del Personal.' },
        { id: 'b', text: 'Perspectiva del Dólar, Perspectiva del Edificio, Perspectiva del Vehículo y Perspectiva del Clima.' },
        { id: 'c', text: 'Perspectiva Financiera, Perspectiva del Cliente, Perspectiva de los Procesos Internos, y Perspectiva de Aprendizaje y Crecimiento.' },
        { id: 'd', text: 'Perspectiva Política, Económica, Social y Ecológica (PESTEL).' }
      ],
      correctOptionId: 'c',
      explanation: 'El Balanced Scorecard trasciende los indicadores contables tradicionales vinculando la estrategia a 4 perspectivas: Financiera, Clientes, Procesos Internos y Aprendizaje/Crecimiento (Talento e Innovación).',
      competencyStandard: 'Modelo Teórico de Cuadro de Mando Integral (Balanced Scorecard).'
    }
  ]
};

export function getDifferentiatedQuestions(rapId: RAPId, style: KolbStyle): Question[] {
  if (rapId === 'rap1') return RAP1_QUESTIONS[style];
  if (rapId === 'rap2') return RAP2_QUESTIONS[style];
  if (rapId === 'rap3') return RAP3_QUESTIONS[style];
  if (rapId === 'rap4') return RAP4_QUESTIONS[style];
  return RAP1_QUESTIONS[style];
}
