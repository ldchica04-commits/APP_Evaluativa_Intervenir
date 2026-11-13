import { KolbStyle, KolbResult } from '../types';

export interface KolbQuestion {
  id: number;
  situation: string;
  options: {
    text: string;
    dimension: 'EC' | 'OR' | 'CA' | 'EA';
    tag: string;
  }[];
}

export const KOLB_QUESTIONS: KolbQuestion[] = [
  {
    id: 1,
    situation: "Cuando me enfrento a un nuevo tema de gestión empresarial (por ejemplo, auditorías o diagnóstico organizacional), yo prefiero:",
    options: [
      {
        text: "Involucrarme directamente en una simulación o caso práctico para aprender sobre la marcha.",
        dimension: 'EA',
        tag: 'Experimentación Activa'
      },
      {
        text: "Observar detenidamente cómo lo hace el instructor o mis compañeros y reflexionar sobre ello.",
        dimension: 'OR',
        tag: 'Observación Reflexiva'
      },
      {
        text: "Leer los manuales, normas técnicas (como ISO 9001) y estructurar un esquema teórico lógico.",
        dimension: 'CA',
        tag: 'Conceptualización Abstracta'
      },
      {
        text: "Conectar con las personas involucradas, escuchar sus experiencias y sensaciones reales en la empresa.",
        dimension: 'EC',
        tag: 'Experiencia Concreta'
      }
    ]
  },
  {
    id: 2,
    situation: "Al momento de resolver un problema o cuello de botella en un proceso operativo:",
    options: [
      {
        text: "Pruebo diferentes soluciones de inmediato hasta ver cuál funciona en la práctica.",
        dimension: 'EA',
        tag: 'Experimentación Activa'
      },
      {
        text: "Analizo datos fríos, estadísticas, fórmulas de indicadores y causas raíz antes de decidir.",
        dimension: 'CA',
        tag: 'Conceptualización Abstracta'
      },
      {
        text: "Hago una lluvia de ideas abierta explorando múltiples puntos de vista sin juzgar al inicio.",
        dimension: 'EC',
        tag: 'Experiencia Concreta'
      },
      {
        text: "Examino con calma los antecedentes históricos del proceso para entender por qué ocurrió.",
        dimension: 'OR',
        tag: 'Observación Reflexiva'
      }
    ]
  },
  {
    id: 3,
    situation: "El tipo de actividades de aprendizaje en las que mejor retengo conocimientos y desarrollo competencias es:",
    options: [
      {
        text: "Talleres prácticos vivenciales, juegos de roles de auditoría y simuladores interactivos.",
        dimension: 'EA',
        tag: 'Experimentación Activa'
      },
      {
        text: "Estudios comparativos de normativas, creación de mapas conceptuales y modelos jerárquicos.",
        dimension: 'CA',
        tag: 'Conceptualización Abstracta'
      },
      {
        text: "Debates guiados, observación de videos de casos reales y retroalimentaciones grupales.",
        dimension: 'OR',
        tag: 'Observación Reflexiva'
      },
      {
        text: "Proyectos colaborativos que impliquen trato directo con clientes y operarios de la empresa.",
        dimension: 'EC',
        tag: 'Experiencia Concreta'
      }
    ]
  },
  {
    id: 4,
    situation: "Durante una sesión de formulación de la matriz DOFA o análisis de indicadores, mi mayor fortaleza es:",
    options: [
      {
        text: "Mi agilidad para poner en marcha planes de acción y ejecutar tareas concretas rápidamente.",
        dimension: 'EA',
        tag: 'Experimentación Activa'
      },
      {
        text: "Mi creatividad para imaginar oportunidades y visualizar escenarios futuros no evidentes.",
        dimension: 'EC',
        tag: 'Experiencia Concreta'
      },
      {
        text: "Mi rigor para verificar que cada conclusión esté sustentada en cálculos y normativas vigentes.",
        dimension: 'CA',
        tag: 'Conceptualización Abstracta'
      },
      {
        text: "Mi paciencia para escuchar a todas las partes y asegurar que no pasemos por alto ningún detalle.",
        dimension: 'OR',
        tag: 'Observación Reflexiva'
      }
    ]
  },
  {
    id: 5,
    situation: "Cuando cometo un error en una evaluación o en la entrega de un entregable formativo:",
    options: [
      {
        text: "Busco de inmediato la forma práctica de corregirlo y volver a presentar una versión mejorada.",
        dimension: 'EA',
        tag: 'Experimentación Activa'
      },
      {
        text: "Analizo conceptualmente qué principio o regla no interpreté bien para ajustar mi modelo mental.",
        dimension: 'CA',
        tag: 'Conceptualización Abstracta'
      },
      {
        text: "Reflexiono a solas sobre el resultado y medito sobre qué factores influyeron en mi desempeño.",
        dimension: 'OR',
        tag: 'Observación Reflexiva'
      },
      {
        text: "Hablo con el evaluador para comprender sus expectativas y percibir cómo mejorar mi empatía.",
        dimension: 'EC',
        tag: 'Experiencia Concreta'
      }
    ]
  }
];

export const KOLB_PROFILES: Record<KolbStyle, {
  tagline: string;
  description: string;
  characteristics: string[];
  recommendedStrategies: string[];
  accentColor: string;
}> = {
  Acomodador: {
    tagline: "Aprende haciendo y sintiendo · Práctico, intuitivo y dinámico",
    description: "Tu estilo de aprendizaje combina la Experiencia Concreta y la Experimentación Activa. Te destacas por adaptarte velozmente a situaciones cambiantes, tomar iniciativas prácticas y asumir retos. Prefieres aprender haciendo antes que memorizar largos tratados teóricos.",
    characteristics: [
      "Alta capacidad de liderazgo y orientación a resultados prácticos.",
      "Excelente desempeño en simuladores interactivos y resolución de problemas sobre la marcha.",
      "Facilidad para asumir riesgos calculados y motivar a equipos de trabajo.",
      "Aprende mejor mediante ensayos, error constructivo y retroalimentación inmediata."
    ],
    recommendedStrategies: [
      "Inicia tu estudio con los Simuladores Prácticos (DOFA, SIPOC, Hallazgos y KPIs) de cada RAP.",
      "Prueba la evaluación diagnóstica desde el inicio para identificar tus brechas y luego estudiar puntualmente.",
      "Aplica los conceptos a tu entorno laboral real o al proyecto formativo de tu centro."
    ],
    accentColor: "#39A900"
  },
  Divergente: {
    tagline: "Aprende sintiendo y observando · Creativo, empático y reflexivo",
    description: "Tu estilo de aprendizaje combina la Experiencia Concreta con la Observación Reflexiva. Tienes una enorme habilidad para contemplar situaciones organizacionales desde múltiples perspectivas, identificar matices humanos y generar propuestas innovadoras.",
    characteristics: [
      "Gran imaginación y creatividad para generar ideas en diagnósticos empresariales.",
      "Sensibilidad hacia los aspectos humanos, el clima laboral y el servicio al cliente.",
      "Capacidad de síntesis a partir de la observación atenta de comportamientos y procesos.",
      "Disfruta explorar casos de estudio reales y analizar causas complejas."
    ],
    recommendedStrategies: [
      "Lee primero los Casos Prácticos y ejemplos de empresas reales que se ofrecen en cada tema.",
      "Visualiza el mapa general de procesos y analiza cómo interactúan los clientes y proveedores en el SIPOC.",
      "Aprovecha las retroalimentaciones pedagógicas detalladas de cada pregunta para enriquecer tu visión."
    ],
    accentColor: "#0284C7"
  },
  Convergente: {
    tagline: "Aprende pensando y haciendo · Lógico, analítico y resolutivo",
    description: "Tu estilo de aprendizaje combina la Conceptualización Abstracta con la Experimentación Activa. Eres altamente eficaz para aplicar teorías y normas técnicas en la resolución de problemas específicos y en la toma de decisiones basada en datos cuantitativos.",
    characteristics: [
      "Habilidad sobresaliente para el cálculo e interpretación de indicadores (KPIs).",
      "Enfoque pragmático: te interesa que las normas sirvan para solucionar fallas operativas.",
      "Facilidad para el razonamiento deductivo y la estructuración de planes de acción 5W2H.",
      "Toma de decisiones objetiva, minimizando la ambigüedad y el sesgo emocional."
    ],
    recommendedStrategies: [
      "Comienza revisando las fórmulas matemáticas, fichas técnicas y árboles de causas (Ishikawa / 5 Porqués).",
      "Interactúa con la Calculadora de Indicadores para calibrar tus rangos de tolerancia y semaforización.",
      "Enfócate en la relación causa-efecto entre los hallazgos de auditoría y las acciones correctivas."
    ],
    accentColor: "#007832"
  },
  Asimilador: {
    tagline: "Aprende pensando y observando · Estructurado, riguroso y conceptual",
    description: "Tu estilo de aprendizaje combina la Conceptualización Abstracta con la Observación Reflexiva. Tu mayor fortaleza radica en tu capacidad para integrar observaciones dispersas en marcos teóricos sólidos y comprender a fondo normativas de calidad como ISO 9001 e ISO 19011.",
    characteristics: [
      "Excelente comprensión de sistemas jerárquicos documentales y políticas organizacionales.",
      "Preferencia por la lógica, la consistencia conceptual y la precisión terminológica.",
      "Capacidad de análisis profundo y riguroso antes de emitir un juicio de auditoría.",
      "Interés por los principios fundamentales y el ciclo PHVA de mejoramiento continuo."
    ],
    recommendedStrategies: [
      "Dedica tiempo a estudiar las unidades teóricas y las Referencias Normativas oficiales de cada RAP.",
      "Analiza la pirámide documental y la simbología técnica ANSI/ISO antes de pasar a los flujogramas.",
      "Revisa las justificaciones técnicas de cada pregunta de la evaluación para consolidar los criterios normativos."
    ],
    accentColor: "#00324D"
  }
};

export function calculateKolbStyle(answers: Record<number, 'EC' | 'OR' | 'CA' | 'EA'>): KolbResult {
  let ec = 0;
  let or = 0;
  let ca = 0;
  let ea = 0;

  Object.values(answers).forEach((dim) => {
    if (dim === 'EC') ec += 1;
    if (dim === 'OR') or += 1;
    if (dim === 'CA') ca += 1;
    if (dim === 'EA') ea += 1;
  });

  const processingAxis = ea - or; // Doing vs Watching
  const perceptionAxis = ca - ec; // Thinking vs Feeling

  let style: KolbStyle = 'Convergente';

  if (processingAxis >= 0 && perceptionAxis < 0) {
    style = 'Acomodador';
  } else if (processingAxis < 0 && perceptionAxis < 0) {
    style = 'Divergente';
  } else if (processingAxis >= 0 && perceptionAxis >= 0) {
    style = 'Convergente';
  } else {
    style = 'Asimilador';
  }

  const profile = KOLB_PROFILES[style];

  return {
    style,
    tagline: profile.tagline,
    description: profile.description,
    characteristics: profile.characteristics,
    recommendedStrategies: profile.recommendedStrategies,
    completedAt: new Date().toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
}
