import { RAPDefinition } from '../types';
import { RAP1_QUESTIONS, RAP2_QUESTIONS, RAP3_QUESTIONS, RAP4_QUESTIONS } from './differentiatedQuestions';

export const COMPETENCY_INFO = {
  code: "210601003",
  name: "INTERVENIR EN EL DESARROLLO DE LOS PROGRAMAS DE MEJORAMIENTO ORGANIZACIONAL QUE SE DERIVEN DE LA FUNCIÓN ADMINISTRATIVA",
  program: "Tecnólogo en Gestión Empresarial",
  programCode: "621201",
  level: "Tecnólogo",
  institution: "SERVICIO NACIONAL DE APRENDIZAJE - SENA",
  passingScorePercentage: 70,
};

export const DEFAULT_APPRENTICE = {
  fullName: "",
  docType: "C.C." as const,
  docNumber: "",
  ficha: "",
  center: "Centro de Servicios y Gestión Empresarial",
  regional: "Regional Antioquia",
};

export const RAPS_DATA: RAPDefinition[] = [
  {
    id: 'rap1',
    code: 'RAP 01',
    shortName: 'Diagnóstico Empresarial',
    title: 'RAP 1: Diagnóstico Empresarial',
    learningOutcome: 'Diagnosticar el estado actual de la organización mediante la aplicación de metodologías e instrumentos administrativos para fundamentar las propuestas de mejoramiento continuo.',
    durationHours: 48,
    accentColor: '#39A900',
    topics: [
      {
        id: 't1_1',
        title: '1. Fundamentos del Diagnóstico y Ciclo PHVA',
        subtitle: 'Enfoque sistémico del mejoramiento continuo',
        keyConcept: 'El diagnóstico organizacional es el punto de partida del ciclo PHVA (Planear, Hacer, Verificar, Actuar) para identificar brechas entre el desempeño actual y los estándares esperados.',
        content: [
          'El diagnóstico empresarial es una investigación analítica y sistemática que permite conocer la situación real de una empresa en un momento determinado para identificar debilidades, fortalezas, riesgos y oportunidades.',
          'En el marco del Ciclo PHVA de Deming, el diagnóstico se ubica en la fase del PLANEAR (Plan), permitiendo establecer objetivos basados en datos reales y formular planes de acción pertinentes.',
          'Un diagnóstico riguroso combina fuentes primarias (entrevistas a directivos, encuestas de clima, observación de procesos) con fuentes secundarias (estados financieros, informes de ventas, quejas de clientes y auditorías previas).'
        ],
        normativeReference: 'Guía Técnica Colombiana GTC 100 / ISO 9004:2018 (Gestión para el éxito sostenido).',
        practicalExample: {
          title: 'Caso Empresa Textil SAS',
          description: 'Tras detectar una caída del 18% en ventas, el equipo de gestión levantó un diagnóstico integral determinando que el 65% de las devoluciones se debían a descalibración en la tintorería, no a fallas comerciales.'
        },
        tips: [
          'Nunca formule propuestas de solución sin haber validado el diagnóstico con datos cuantitativos.',
          'Involucre a los líderes de proceso operativos para evitar sesgos gerenciales.'
        ]
      },
      {
        id: 't1_2',
        title: '2. Análisis del Macroentorno (PESTEL)',
        subtitle: 'Monitoreo de factores externos no controlables',
        keyConcept: 'La matriz PESTEL analiza los factores Políticos, Económicos, Sociales, Tecnológicos, Ecológicos y Legales que impactan el desempeño organizacional.',
        content: [
          'Factores Políticos: Políticas gubernamentales, estabilidad institucional, tratados de libre comercio y reformas tributarias en curso.',
          'Factores Económicos: Tasas de interés, inflación, tipo de cambio (TRM), poder adquisitivo y tasas de desempleo.',
          'Factores Sociales: Cambios demográficos, hábitos de consumo, nivel educativo y tendencias socioculturales.',
          'Factores Tecnológicos: Automatización, digitalización en la nube, inteligencia artificial e infraestructura de telecomunicaciones.',
          'Factores Ecológicos/Ambientales: Cambio climático, regulaciones de huella de carbono, economía circular y gestión de residuos.',
          'Factores Legales: Normatividad laboral (Código Sustantivo del Trabajo), normatividad comercial, leyes de protección al consumidor y ley de datos personales (Habeas Data).'
        ],
        normativeReference: 'ISO 9001:2015 Numeral 4.1 - Comprensión de la organización y de su contexto.',
        practicalExample: {
          title: 'Aplicación PESTEL en Empresa de Alimentos',
          description: 'Identificación de la nueva ley de etiquetado frontal de advertencia (Legal/Social) y aumento del costo de materias primas por fluctuación de la TRM (Económico).'
        },
        tips: [
          'Clasifique cada variable identificada según su impacto: Alto, Medio o Bajo y su tendencia de ocurrencia.'
        ]
      },
      {
        id: 't1_3',
        title: '3. Análisis del Microentorno (5 Fuerzas de Porter)',
        subtitle: 'Estructura competitiva del sector',
        keyConcept: 'El modelo de Michael Porter evalúa el nivel de competencia y rentabilidad dentro de la industria en la que opera la organización.',
        content: [
          '1. Rivalidad entre competidores existentes: Número de competidores, crecimiento del sector y diferenciación del producto.',
          '2. Amenaza de nuevos entrantes: Existencia de barreras de entrada como economías de escala, altos requerimientos de capital y patentes.',
          '3. Poder de negociación de los proveedores: Concentración de proveedores, costo de cambio de proveedor y disponibilidad de insumos sustitutos.',
          '4. Poder de negociación de los clientes: Sensibilidad al precio, volumen de compra y facilidad de encontrar alternativas.',
          '5. Amenaza de productos o servicios sustitutos: Soluciones innovadoras externas que satisfacen la misma necesidad a menor costo o con mayor conveniencia.'
        ],
        normativeReference: 'Estrategia Competitiva (Michael E. Porter).',
        tips: [
          'El análisis de Porter no es estático; debe actualizarse ante cambios tecnológicos o regulatorios significativos.'
        ]
      },
      {
        id: 't1_4',
        title: '4. Matriz DOFA y Cruces Estratégicos',
        subtitle: 'Articulación del diagnóstico interno y externo',
        keyConcept: 'La matriz DOFA articula Fortalezas (F) y Debilidades (D) internas con Oportunidades (O) y Amenazas (A) externas para formular estrategias de mejoramiento.',
        content: [
          'Estrategias FO (Maxi - Maxi): Utilizan las fortalezas internas para aprovechar al máximo las oportunidades externas de mercado.',
          'Estrategias DO (Mini - Maxi): Superan las debilidades internas aprovechando las oportunidades externas (p. ej. capacitar personal con apoyos gubernamentales).',
          'Estrategias FA (Maxi - Mini): Aprovechan las fortalezas internas para minimizar el impacto de las amenazas externas del entorno.',
          'Estrategias DA (Mini - Mini): Estrategias defensivas para reducir debilidades internas y neutralizar amenazas críticas que pongan en riesgo la continuidad del negocio.'
        ],
        normativeReference: 'Metodología de Planeación Estratégica SENA.',
        practicalExample: {
          title: 'Cruce Estratégico Real',
          description: 'Fortaleza: Certificación de calidad ISO 9001 + Oportunidad: Licitaciones públicas para proveedores calificados = Estrategia FO: Participar en licitaciones estatales de gran envergadura.'
        }
      }
    ],
    differentiatedQuestions: RAP1_QUESTIONS,
    questions: [
      {
        id: 'q1_1',
        questionNumber: 1,
        scenario: 'Una empresa manufacturera de calzado en Bucaramanga realiza su diagnóstico organizacional previo al plan de mejoramiento del año en curso. Durante el análisis, el equipo documenta que el gobierno nacional acaba de aprobar una reforma arancelaria que reduce los impuestos a la importación de insumos de cuero sintético.',
        question: '¿En qué cuadrante de la matriz DOFA debe ubicarse este hecho y a qué categoría de la herramienta PESTEL corresponde?',
        options: [
          { id: 'a', text: 'En Debilidades (Interno), categoría Económica.' },
          { id: 'b', text: 'En Oportunidades (Externo), categorías Política y Legal.' },
          { id: 'c', text: 'En Fortalezas (Interno), categoría Tecnológica.' },
          { id: 'd', text: 'En Amenazas (Externo), categoría Ecológica.' }
        ],
        correctOptionId: 'b',
        explanation: 'Las reformas arancelarias provienen del entorno político y legal del Estado (PESTEL) y representan un factor no controlable favorable para abaratar insumos, por lo que constituye una Oportunidad externa en la DOFA.',
        competencyStandard: 'ISO 9001:2015 Numeral 4.1 y Metodología DOFA-PESTEL SENA.'
      },
      {
        id: 'q1_2',
        questionNumber: 2,
        scenario: 'El tecnólogo en gestión empresarial identifica que la empresa depende de un único proveedor de microchips electrónicos a nivel internacional, el cual puede fijar precios y plazos de entrega unilateralmente.',
        question: 'Según el modelo de las Cinco Fuerzas de Porter, ¿cuál fuerza competitiva está afectando críticamente a la organización?',
        options: [
          { id: 'a', text: 'Poder de negociación de los clientes.' },
          { id: 'b', text: 'Amenaza de productos sustitutos.' },
          { id: 'c', text: 'Poder de negociación de los proveedores.' },
          { id: 'd', text: 'Rivalidad entre los competidores existentes.' }
        ],
        correctOptionId: 'c',
        explanation: 'Al existir un único proveedor sin sustitutos inmediatos y con alta concentración de mercado, la fuerza dominante con alto poder de negociación es la de los proveedores.',
        competencyStandard: 'Modelo de Estructura Competitiva Industrial (M. Porter).'
      },
      {
        id: 'q1_3',
        questionNumber: 3,
        scenario: 'En una sesión de cruce de la matriz DOFA, el equipo formula la siguiente directriz: "Aprovechar la alta liquidez financiera de la empresa (F) para adquirir maquinaria automatizada y neutralizar la entrada inminente de un competidor asiático con precios bajos (A)".',
        question: '¿Qué tipo de estrategia del cruce DOFA se ha formulado?',
        options: [
          { id: 'a', text: 'Estrategia FO (Fortaleza - Oportunidad).' },
          { id: 'b', text: 'Estrategia DO (Debilidad - Oportunidad).' },
          { id: 'c', text: 'Estrategia FA (Fortaleza - Amenaza).' },
          { id: 'd', text: 'Estrategia DA (Debilidad - Amenaza).' }
        ],
        correctOptionId: 'c',
        explanation: 'Se utiliza una fortaleza interna comprobada (alta liquidez) para mitigar o contrarrestar una amenaza externa real (competidor asiático agresivo), lo que define con exactitud una estrategia FA (Maxi-Mini).',
        competencyStandard: 'Metodología de Matrices Estratégicas SENA.'
      },
      {
        id: 'q1_4',
        questionNumber: 4,
        scenario: 'En el ciclo de mejoramiento continuo PHVA (Deming), la gerencia propone implementar un software ERP inmediatamente sin haber medido previamente los tiempos de ciclo ni haber consultado los cuellos de botella con los operarios.',
        question: '¿Qué principio fundamental del diagnóstico organizacional y del ciclo PHVA se está violando?',
        options: [
          { id: 'a', text: 'Saltar directamente a la fase "Hacer" sin haber culminado la fase "Planear" sustentada en datos del diagnóstico.' },
          { id: 'b', text: 'Omitir la fase "Actuar" de consolidación de estándares.' },
          { id: 'c', text: 'Aplicar benchmarking funcional sin permiso de la competencia.' },
          { id: 'd', text: 'Exceder el presupuesto de la fase "Verificar".' }
        ],
        correctOptionId: 'a',
        explanation: 'El ciclo PHVA exige que las acciones (Hacer) se deriven de un diagnóstico y planeación rigurosa basada en evidencias y hechos (Planear). Implementar soluciones apresuradas sin diagnóstico conduce a fracasos en proyectos de mejora.',
        competencyStandard: 'Principios de Gestión de Calidad - Ciclo PHVA / ISO 9001:2015.'
      },
      {
        id: 'q1_5',
        questionNumber: 5,
        scenario: 'Al elaborar la matriz MEFI (Evaluación de Factores Internos) de una distribuidora comercial, se evalúan aspectos clave de la cadena de valor: logística interna, operaciones, mercadeo y servicio al cliente.',
        question: '¿Cuál de los siguientes elementos corresponde estrictamente a un factor interno evaluable en esta matriz?',
        options: [
          { id: 'a', text: 'Incremento del IPC (Índice de Precios al Consumidor) nacional en un 8%.' },
          { id: 'b', text: 'Inexistencia de manuales de funciones y procedimientos documentados en bodega.' },
          { id: 'c', text: 'Llegada de una multinacional competidora a la misma ciudad.' },
          { id: 'd', text: 'Nueva exención tributaria para compras por comercio electrónico.' }
        ],
        correctOptionId: 'b',
        explanation: 'La falta de manuales de funciones y procedimientos es una debilidad interna propia y controlable de la gestión de la empresa. El IPC, los competidores y las exenciones son factores externos del macro o microentorno.',
        competencyStandard: 'Cadena de Valor y Factores Internos de Gestión Empresarial.'
      }
    ]
  },
  {
    id: 'rap2',
    code: 'RAP 02',
    shortName: 'Planeación de Documentos',
    title: 'RAP 2: Planeación de Documentos',
    learningOutcome: 'Diseñar y estandarizar la estructura documental de los procesos organizacionales según los lineamientos de la norma ISO 9001 y las necesidades del sistema de gestión.',
    durationHours: 48,
    accentColor: '#007832',
    topics: [
      {
        id: 't2_1',
        title: '1. Información Documentada e ISO 9001:2015',
        subtitle: 'Estandarización y control de la información',
        keyConcept: 'El numeral 7.5 de ISO 9001:2015 establece los requisitos para crear, actualizar y controlar la información documentada necesaria para la eficacia del sistema de gestión.',
        content: [
          'La información documentada es la información que una organización tiene que controlar y mantener, y el medio que la contiene (digital o físico).',
          'Objetivos de la documentación: Proporcionar directrices claras de operación, garantizar repetibilidad y calidad, facilitar la inducción del talento humano y servir como evidencia objetiva para auditorías.',
          'Requisitos de control: Disponibilidad e idoneidad para su uso donde y cuando se necesite; protección adecuada (contra pérdida de confidencialidad, uso indebido o alteración no autorizada); distribución, acceso, recuperación y preservación de la legibilidad.'
        ],
        normativeReference: 'ISO 9001:2015 Numeral 7.5 - Información Documentada.',
        practicalExample: {
          title: 'Importancia del Control de Versiones',
          description: 'Un operario de producción utilizó un plano obsoleto versión 2 mientras el área de ingeniería ya había liberado la versión 5, generando un lote defectuoso de $45 millones de pesos.'
        }
      },
      {
        id: 't2_2',
        title: '2. Pirámide Jerárquica Documental',
        subtitle: 'Niveles de documentación organizacional',
        keyConcept: 'La estructura documental se organiza jerárquicamente desde el nivel estratégico (políticas y objetivos) hasta el nivel operativo (registros y formatos).',
        content: [
          'Nivel 1 - Estratégico: Política de Calidad, Objetivos de Calidad, Manual del Sistema de Gestión y Mapa de Procesos.',
          'Nivel 2 - Táctico / Procesos: Caracterización de procesos (SIPOC) y Manual de Organización y Funciones (MOF).',
          'Nivel 3 - Operativo: Procedimientos documentados (¿quién hace qué, cuándo y cómo?) e Instructivos de trabajo paso a paso para tareas críticas.',
          'Nivel 4 - Evidencia / Registro: Formatos, listas de chequeo, bitácoras y registros diligenciados que demuestran la conformidad de la actividad realizada.'
        ],
        normativeReference: 'ISO/TR 10013 - Directrices para la documentación de sistemas de gestión de la calidad.',
        tips: [
          'Un formato en blanco es un documento; cuando se llena con datos reales se convierte en un registro no modificable.'
        ]
      },
      {
        id: 't2_3',
        title: '3. Caracterización de Procesos (SIPOC)',
        subtitle: 'Mapeo detallado de interacciones',
        keyConcept: 'La caracterización describe la cédula de identidad del proceso: Proveedor (Supplier), Entrada (Input), Proceso (Process), Salida (Output) y Cliente (Customer).',
        content: [
          'Proveedor: Quien suministra insumos, materias primas o información (interno o externo).',
          'Entrada: Bienes, materiales o datos que ingresan para ser transformados.',
          'Proceso / Actividades: Secuencia lógica y ordenada de tareas bajo el ciclo PHVA con responsable asignado.',
          'Salida: Producto, servicio o documento resultante con valor agregado.',
          'Cliente: Quien recibe y evalúa la salida (cliente interno u usuario final externo).',
          'Criterios adicionales: Objetivo del proceso, alcance, líder de proceso, recursos necesarios, requisitos legales y riesgos asociados.'
        ],
        practicalExample: {
          title: 'SIPOC Proceso de Compras',
          description: 'Proveedor: Áreas solicitantes | Entrada: Requisición de compra | Actividades: Cotizar, seleccionar proveedor, emitir orden | Salida: Orden de compra aprobada | Cliente: Proveedor seleccionado y Contabilidad.'
        }
      },
      {
        id: 't2_4',
        title: '4. Flujogramas y Simbología Técnica',
        subtitle: 'Norma ANSI / ISO 5807 para diagramación',
        keyConcept: 'Los diagramas de flujo representan gráficamente los pasos sucesivos de un procedimiento facilitando su comprensión visual.',
        content: [
          'Óvalo / Terminal: Indica el inicio o el fin del procedimiento o proceso.',
          'Rectángulo: Representa una actividad, tarea u operación concreta.',
          'Rombo: Punto de decisión que bifurca el flujo (Sí / No) con criterios claros.',
          'Documento (Rectángulo con base ondulada): Generación, consulta o archivo de un documento físico o digital.',
          'Flechas de flujo: Indican la dirección y secuencia obligatoria del proceso.',
          'Círculo pequeño: Conector dentro de la misma página o entre páginas.'
        ],
        normativeReference: 'Norma ANSI X3.5 / ISO 5807.',
        tips: [
          'Todo rombo de decisión debe tener al menos dos salidas claramente rotuladas: Sí y No.'
        ]
      }
    ],
    differentiatedQuestions: RAP2_QUESTIONS,
    questions: [
      {
        id: 'q2_1',
        questionNumber: 1,
        scenario: 'El comité de calidad de una empresa de servicios de salud está reestructurando su sistema documental. Un analista propone eliminar los instructivos de trabajo porque considera que con el mapa de procesos general es suficiente.',
        question: '¿Por qué la afirmación del analista es técnicamente incorrecta en la pirámide documental?',
        options: [
          { id: 'a', text: 'Porque el mapa de procesos es de nivel estratégico y no detalla el paso a paso operativo de actividades técnicas críticas.' },
          { id: 'b', text: 'Porque la norma prohíbe tener mapas de procesos sin certificación previa.' },
          { id: 'c', text: 'Porque los instructivos solo aplican a empresas del sector primario o minero.' },
          { id: 'd', text: 'Porque el mapa de procesos reemplaza automáticamente a las políticas de calidad.' }
        ],
        correctOptionId: 'a',
        explanation: 'El mapa de procesos es una visión macro y estratégica de alto nivel. Los instructivos de trabajo (Nivel 3) son necesarios para especificar la ejecución técnica detallada paso a paso y evitar errores operativos humanos.',
        competencyStandard: 'ISO/TR 10013 e ISO 9001:2015 Numeral 7.5.'
      },
      {
        id: 'q2_2',
        questionNumber: 2,
        scenario: 'Al elaborar la caracterización (SIPOC) del proceso de "Gestión de Talento Humano", se define el elemento "Candidato seleccionado con informe psicotécnico favorable".',
        question: '¿A cuál de los componentes de la caracterización corresponde este elemento?',
        options: [
          { id: 'a', text: 'Proveedor.' },
          { id: 'b', text: 'Entrada.' },
          { id: 'c', text: 'Salida del proceso.' },
          { id: 'd', text: 'Indicador de eficacia.' }
        ],
        correctOptionId: 'c',
        explanation: 'El candidato seleccionado evaluado es el resultado directo (Output / Salida) generado por las actividades del subproceso de reclutamiento y selección para ser entregado al cliente interno (área solicitante).',
        competencyStandard: 'Metodología SIPOC para Caracterización de Procesos SENA.'
      },
      {
        id: 'q2_3',
        questionNumber: 3,
        scenario: 'En la diagramación de un flujograma de compras, un aprendiz necesita representar el momento en que el jefe de compras revisa una cotización y define si supera o no los $10.000.000 para solicitar autorización de gerencia.',
        question: '¿Qué figura geométrica estandarizada bajo norma ANSI/ISO debe emplear para este paso?',
        options: [
          { id: 'a', text: 'Un rectángulo simple.' },
          { id: 'b', text: 'Un óvalo o terminal alargado.' },
          { id: 'c', text: 'Un rombo con dos salidas alternativas (Sí / No).' },
          { id: 'd', text: 'Un círculo conector de página.' }
        ],
        correctOptionId: 'c',
        explanation: 'El rombo es el símbolo universal para representar tomas de decisiones o bifurcaciones condicionales que evalúan una condición y ofrecen rutas distintas según la respuesta.',
        competencyStandard: 'Norma ANSI X3.5 / ISO 5807 Diagramación de Procesos.'
      },
      {
        id: 'q2_4',
        questionNumber: 4,
        scenario: 'Una auditora interna revisa el formato de control de calidad en la línea de ensamble y encuentra que los operarios están diligenciando la versión 01 de una plantilla que fue actualizada a versión 03 hace seis meses por cambio de normativa.',
        question: '¿Cuál mecanismo de control documental falló en esta situación?',
        options: [
          { id: 'a', text: 'La definición de la misión de la empresa.' },
          { id: 'b', text: 'La lista maestra de documentos y el retiro oportuno de información documentada obsoleta en los puntos de uso.' },
          { id: 'c', text: 'El cálculo de las 5 fuerzas de Porter.' },
          { id: 'd', text: 'La semaforización del indicador de ausentismo laboral.' }
        ],
        correctOptionId: 'b',
        explanation: 'La norma ISO 9001:2015 (7.5.3) exige asegurar que las versiones pertinentes de los documentos aplicables estén disponibles en los puntos de uso y que se prevenga el uso no intencionado de documentos obsoletos.',
        competencyStandard: 'ISO 9001:2015 Numeral 7.5.3 Control de la Información Documentada.'
      },
      {
        id: 'q2_5',
        questionNumber: 5,
        scenario: 'El aprendiz de Gestión Empresarial propone codificar los documentos organizacionales para su fácil identificación. Formula la siguiente estructura: "PR-TH-001 V.02".',
        question: '¿Qué significa técnicamente cada parte de dicha codificación?',
        options: [
          { id: 'a', text: 'Procedimiento - Talento Humano - Consecutivo 001 - Versión 02.' },
          { id: 'b', text: 'Programa - Tecnología - Indicador 001 - Valor 02.' },
          { id: 'c', text: 'Política - Riesgo - Auditoría 001 - Vencimiento 02.' },
          { id: 'd', text: 'Presupuesto - Tesorería - Cuenta 001 - Variación 02.' }
        ],
        correctOptionId: 'a',
        explanation: 'En los manuales de calidad de gestión documental, la sigla PR corresponde al tipo de documento (Procedimiento), TH al macroproceso o área (Talento Humano), 001 al número consecutivo y V.02 a la versión vigente tras su primer cambio.',
        competencyStandard: 'Buenas Prácticas de Gestión Documental y Codificación SENA.'
      }
    ]
  },
  {
    id: 'rap3',
    code: 'RAP 03',
    shortName: 'Auditorías Internas',
    title: 'RAP 3: Auditorías Internas',
    learningOutcome: 'Planear, ejecutar y documentar auditorías internas de calidad conforme a la norma ISO 19011 para verificar el cumplimiento de los programas de mejoramiento organizacional.',
    durationHours: 48,
    accentColor: '#00324D',
    topics: [
      {
        id: 't3_1',
        title: '1. Fundamentos y Principios (ISO 19011:2018)',
        subtitle: 'Directrices para la auditoría de los sistemas de gestión',
        keyConcept: 'La auditoría es un proceso sistemático, independiente y documentado para obtener evidencias y evaluarlas de manera objetiva con el fin de determinar el grado de cumplimiento de los criterios.',
        content: [
          'Principios clave de la auditoría según ISO 19011:2018:',
          '1. Integridad: Base del profesionalismo; auditores honestos y responsables.',
          '2. Presentación ecuánime: Obligación de informar con veracidad y exactitud los hallazgos y conclusiones.',
          '3. Debido cuidado profesional: Aplicación de diligencia y juicio juicioso al auditar.',
          '4. Confidencialidad: Seguridad estricta de la información examinada.',
          '5. Independencia: Los auditores deben ser independientes de la actividad que se audita y estar libres de conflicto de intereses (nadie debe auditar su propio trabajo).',
          '6. Enfoque basado en evidencia: El método racional para alcanzar conclusiones fiables y reproducibles.',
          '7. Enfoque basado en riesgos: Planificación de la auditoría considerando los riesgos del proceso.'
        ],
        normativeReference: 'ISO 19011:2018 - Directrices para la auditoría de los sistemas de gestión.',
        tips: [
          'Un auditor interno nunca audita su propia área de trabajo para garantizar total imparcialidad e independencia.'
        ]
      },
      {
        id: 't3_2',
        title: '2. Etapas del Proceso de Auditoría',
        subtitle: 'Del programa anual al informe final',
        keyConcept: 'El ciclo de auditoría comprende: Programa de auditoría, Plan de auditoría, Reunión de apertura, Trabajo de campo, Reunión de cierre e Informe final con seguimiento.',
        content: [
          'Programa de Auditoría: Conjunto de una o más auditorías planificadas para un marco temporal determinado (p. ej. cronograma anual de la empresa).',
          'Plan de Auditoría: Descripción pormenorizada de las actividades y horarios para una auditoría específica (objetivo, alcance, criterios, fechas, equipo auditor y procesos a auditar).',
          'Listas de Verificación (Checklists): Herramienta de trabajo del auditor para no omitir puntos normativos clave durante las entrevistas y muestreo.',
          'Reunión de Apertura: Presentación oficial del equipo auditor, confirmación de horarios, métodos y canales de comunicación con los auditados.',
          'Reunión de Cierre: Presentación verbal de los hallazgos encontrados a la alta dirección y líderes de proceso antes de radicar el informe final escrito.'
        ],
        normativeReference: 'ISO 19011:2018 Capítulo 6 - Realización de una auditoría.',
        practicalExample: {
          title: 'Plan vs Programa',
          description: 'El Programa es el calendario que dice que en Mayo se audita Ventas y en Octubre Producción; el Plan es la agenda exacta del 14 de Mayo indicando qué auditor entrevista al Director de Ventas de 8:00 a 10:00 am.'
        }
      },
      {
        id: 't3_3',
        title: '3. Redacción y Clasificación de Hallazgos',
        subtitle: 'Conformidades, No Conformidades y Oportunidades',
        keyConcept: 'Un hallazgo de auditoría es el resultado de contrastar la evidencia objetiva recopilada contra el criterio de auditoría establecido.',
        content: [
          'Estructura técnica de una No Conformidad: Debe contener CRITERIO (requisito incumplido: norma o procedimiento), EVIDENCIA OBJETIVA (hecho comprobable: registro, código, fecha) y DECLARACIÓN DEL HALLAZGO (el incumplimiento preciso).',
          'Clasificación oficial:',
          '• Conformidad: Cumplimiento satisfactorio del requisito normativo o del procedimiento.',
          '• No Conformidad Menor (NC Menor): Incumplimiento puntual, aislado o esporádico que no compromete de manera crítica la calidad final del producto ni el sistema de gestión.',
          '• No Conformidad Mayor (NC Mayor): Ausencia total de un requisito obligatorio, incumplimiento sistemático generalizado o falla grave que compromete directamente la calidad, la legalidad o la satisfacción del cliente.',
          '• Oportunidad de Mejora / Observación: Situación en la que no se incumple un requisito actual, pero se identifica una debilidad potencial que podría devenir en fallo futuro.'
        ],
        normativeReference: 'ISO 9000:2015 e ISO 19011:2018 Términos y Definiciones.'
      }
    ],
    differentiatedQuestions: RAP3_QUESTIONS,
    questions: [
      {
        id: 'q3_1',
        questionNumber: 1,
        scenario: 'Durante la auditoría interna al proceso de Almacén, el auditor asignado es el coordinador de compras y logística, quien a su vez fue el autor intelectual de los instructivos de despacho que se están revisando.',
        question: '¿Qué principio de auditoría según la norma ISO 19011:2018 se está vulnerando?',
        options: [
          { id: 'a', text: 'Presentación ecuánime.' },
          { id: 'b', text: 'Independencia e imparcialidad del auditor.' },
          { id: 'c', text: 'Debido cuidado profesional.' },
          { id: 'd', text: 'Enfoque basado en riesgos financieros.' }
        ],
        correctOptionId: 'b',
        explanation: 'El principio de Independencia estipula que los auditores deben ser ajenos a la actividad que auditan, actuar sin sesgos ni conflictos de intereses y no auditar su propio trabajo ni sus propios diseños operativos.',
        competencyStandard: 'ISO 19011:2018 Numeral 4 - Principios de Auditoría.'
      },
      {
        id: 'q3_2',
        questionNumber: 2,
        scenario: 'Un auditor solicita al líder de mantenimiento los registros de calibración de las 12 balanzas de precisión del laboratorio farmacéutico. El líder manifiesta que hace 14 meses no se calibran porque "no hubo presupuesto", y no existe ninguna evidencia documental de verificación metrológica.',
        question: '¿Cómo debe clasificar y tipificar técnicamente el equipo auditor este hallazgo?',
        options: [
          { id: 'a', text: 'Como una Oportunidad de Mejora sin plazo de respuesta.' },
          { id: 'b', text: 'Como una No Conformidad Mayor, dado que es un incumplimiento total de un requisito crítico que afecta directamente la calidad del producto.' },
          { id: 'c', text: 'Como una Conformidad con observación verbal amigable.' },
          { id: 'd', text: 'Como una felicitación por ahorro de costos en mantenimiento.' }
        ],
        correctOptionId: 'b',
        explanation: 'La falta total de calibración durante más de un año en equipos de medición de laboratorio afecta directamente la calidad, la inocuidad y la validez técnica de los productos, configurando una No Conformidad Mayor.',
        competencyStandard: 'ISO 9001:2015 Numeral 7.1.5 e ISO 19011:2018.'
      },
      {
        id: 'q3_3',
        questionNumber: 3,
        scenario: 'Un aprendiz redacta el siguiente texto en el informe de auditoría: "Los empleados de servicio al cliente parecen desmotivados y creo que no atienden con amabilidad a las personas".',
        question: '¿Por qué esta redacción NO cumple con los estándares técnicos de un hallazgo de auditoría?',
        options: [
          { id: 'a', text: 'Porque está basada en opiniones y percepciones subjetivas, careciendo de evidencia objetiva comprobable y criterio normativo.' },
          { id: 'b', text: 'Porque el servicio al cliente nunca es auditable bajo normas ISO.' },
          { id: 'c', text: 'Porque los hallazgos deben escribirse exclusivamente en idioma inglés.' },
          { id: 'd', text: 'Porque no menciona el número de cédula de los trabajadores.' }
        ],
        correctOptionId: 'a',
        explanation: 'Todo hallazgo de auditoría debe fundamentarse en el principio del Enfoque Basado en Evidencia: debe sustentarse en hechos verificables (registros, datos, mediciones) comparados contra un criterio normativo expreso, nunca en suposiciones o impresiones personales.',
        competencyStandard: 'ISO 19011:2018 Numeral 6.4.7 Generación de Hallazgos.'
      },
      {
        id: 'q3_4',
        questionNumber: 4,
        scenario: 'En una empresa de confecciones con 50 operarios en planta, se revisan 35 fichas de entrega de dotación de seguridad industrial. Se encuentra que únicamente en 1 ficha faltó la firma del trabajador por encontrarse en incapacidad médica ese día, estando firmadas las 34 restantes.',
        question: '¿Cuál es la clasificación técnica más adecuada para este hallazgo?',
        options: [
          { id: 'a', text: 'No Conformidad Menor (hallazgo aislado que no refleja una falla sistémica del proceso).' },
          { id: 'b', text: 'No Conformidad Mayor con clausura inmediata de la planta.' },
          { id: 'c', text: 'Fraude administrativo de nivel penal.' },
          { id: 'd', text: 'Cierre definitivo del Sistema de Gestión de Calidad.' }
        ],
        correctOptionId: 'a',
        explanation: 'Se trata de un evento esporádico y aislado (1 de 35) justificado por una incapacidad, que no rompe la disciplina general del sistema de gestión ni pone en peligro masivo la operación. Se tipifica como No Conformidad Menor u observación.',
        competencyStandard: 'Criterios de Ponderación de Hallazgos ISO 19011.'
      },
      {
        id: 'q3_5',
        questionNumber: 5,
        scenario: 'Al finalizar la jornada de auditoría en sitio, antes de emitir el informe final por escrito, el auditor líder convoca a la gerencia y a los dueños de los procesos evaluados.',
        question: '¿Cuál es el propósito principal de esta "Reunión de Cierre"?',
        options: [
          { id: 'a', text: 'Sancionar económicamente a los trabajadores que cometieron errores.' },
          { id: 'b', text: 'Presentar los hallazgos y conclusiones de la auditoría para asegurar que el auditado los comprende y admite las evidencias recolectadas.' },
          { id: 'c', text: 'Redactar por primera vez las preguntas de la lista de verificación.' },
          { id: 'd', text: 'Elegir al nuevo gerente de calidad de la organización.' }
        ],
        correctOptionId: 'b',
        explanation: 'La Reunión de Cierre (ISO 19011:2018 Numeral 6.4.9) tiene por objeto exponer las conclusiones, presentar los hallazgos de forma clara y transparente, aclarar posibles discrepancias y acordar los plazos para la presentación de los planes de acción correctiva.',
        competencyStandard: 'ISO 19011:2018 Numeral 6.4.9 Reunión de Cierre.'
      }
    ]
  },
  {
    id: 'rap4',
    code: 'RAP 04',
    shortName: 'Creación y Análisis de Indicadores',
    title: 'RAP 4: Creación y Análisis de Indicadores',
    learningOutcome: 'Construir, calcular e interpretar indicadores de gestión organizacional aplicando herramientas estadísticas y análisis de causa raíz para implementar planes de mejoramiento continuo.',
    durationHours: 48,
    accentColor: '#39A900',
    topics: [
      {
        id: 't4_1',
        title: '1. Tipología de Indicadores de Gestión',
        subtitle: 'Eficacia, Eficiencia y Efectividad',
        keyConcept: 'Los indicadores son expresiones cuantitativas del comportamiento y desempeño de un proceso, cuya magnitud permite tomar decisiones correctivas oportunas.',
        content: [
          '• Eficacia: Mide el grado de consecución de los objetivos y metas planificadas, sin considerar los recursos utilizados. Fórmula: (Resultados alcanzados / Resultados previstos) * 100.',
          '• Eficiencia: Mide la relación entre los resultados alcanzados y los recursos (tiempo, dinero, materiales, personas) utilizados para alcanzarlos. Fórmula: (Recursos reales utilizados / Recursos programados) * 100 o unidades producidas por hora/hombre.',
          '• Efectividad: Mide el impacto global de la gestión, combinando el logro de metas (eficacia) con el uso racional de los recursos (eficiencia). Fórmula ponderada: (Eficacia + Eficiencia) / 2 o cálculo multidimensional.',
          '• Productividad: Relación entre la producción obtenida y los factores productivos empleados.'
        ],
        normativeReference: 'Guía DAFP para la construcción e interpretación de indicadores de gestión.',
        practicalExample: {
          title: 'Ejemplo Práctico en Despachos',
          description: 'Meta: Entregar 100 pedidos a tiempo con 2 camiones. Resultado: Entregó los 100 pedidos (100% Eficaz), pero utilizó 4 camiones contratados a última hora (Baja Eficiencia de costos).'
        }
      },
      {
        id: 't4_2',
        title: '2. Ficha Técnica y Estructura del Indicador',
        subtitle: 'Cédula de parametrización del KPI',
        keyConcept: 'Toda métrica debe estar documentada en una Ficha Técnica formal para garantizar que su medición sea consistente y comparable en el tiempo.',
        content: [
          'Componentes indispensables de la Ficha Técnica:',
          '1. Nombre del indicador: Claro, conciso y autoexplicativo (ej. "Índice de Entregas Perfectas a Clientes").',
          '2. Objetivo del indicador: ¿Para qué se mide y qué decisión apoya?',
          '3. Fórmula de cálculo: Expresión matemática exacta con variables definidas.',
          '4. Unidad de medida: Porcentaje (%), horas, días, número de casos, pesos ($).',
          '5. Meta institucional: Valor cuantitativo esperado (ej. ">= 95%").',
          '6. Periodicidad de medición: Mensual, trimestral, semestral o anual.',
          '7. Fuente de información: Sistema ERP, libro de quejas, facturación.',
          '8. Responsable del cálculo y responsable del análisis de los resultados.'
        ],
        normativeReference: 'ISO 9001:2015 Numeral 9.1 - Seguimiento, medición, análisis y evaluación.',
        tips: [
          'Evite fórmulas ambiguas; defina con exactitud qué compone el numerador y el denominador.'
        ]
      },
      {
        id: 't4_3',
        title: '3. Semaforización de Control y Rangos de Tolerancia',
        subtitle: 'Lectura visual instantánea del desempeño',
        keyConcept: 'La semaforización clasifica el comportamiento del indicador en rangos de color para priorizar la asignación de recursos y planes de acción.',
        content: [
          '• Rango Verde (Zona Óptima / Cumplimiento): Desempeño igual o superior a la meta establecida (típicamente >= 90% o >= 95%). El proceso está bajo control; se documentan buenas prácticas.',
          '• Rango Amarillo (Zona de Alerta / Preventiva): Desempeño cercano a la meta pero con desviación tolerable (p. ej. entre 75% y 89%). Requiere análisis preventivo para evitar caída a zona crítica.',
          '• Rango Rojo (Zona Crítica / No Cumplimiento): Desempeño insatisfactorio por debajo del umbral mínimo permitido (< 75%). Obliga a la apertura inmediata de una acción correctiva formal.',
          'Importante: En indicadores inversos (como accidentalidad laboral o porcentaje de merma), los valores bajos son verdes y los valores altos son rojos.'
        ]
      },
      {
        id: 't4_4',
        title: '4. Cuadro de Mando Integral (Balanced Scorecard) y Tableros de Control',
        subtitle: 'Articulación estratégica de métricas y toma de decisiones',
        keyConcept: 'El Balanced Scorecard de Kaplan y Norton estructura los indicadores de gestión en cuatro perspectivas equilibradas e interconectadas para evaluar el desempeño organizacional.',
        content: [
          '• Perspectiva Financiera: Evalúa el desempeño económico y el valor para los accionistas (márgenes de rentabilidad, ROI, rotación de inventarios y flujo de caja).',
          '• Perspectiva de Clientes: Mide la propuesta de valor percibida por el mercado (satisfacción, retención, Net Promoter Score - NPS y cumplimiento de promesas).',
          '• Perspectiva de Procesos Internos: Monitorea la excelencia operativa, tiempos de ciclo, tasa de defectos y el índice de entregas perfectas (OTIF).',
          '• Perspectiva de Aprendizaje y Crecimiento: Desarrolla el capital intangible (capacitación del talento, clima laboral, cultura de mejora y adopción tecnológica).',
          '• Indicadores Leading (Inductores/Predictivos) vs Lagging (Históricos/Resultados): Un tablero integral combina métricas precursoras con resultados consolidados para tomar decisiones proactivas en tiempo real (Dashboards / Andon).'
        ],
        normativeReference: 'Cuadro de Mando Integral (R. Kaplan y D. Norton) e ISO 9001:2015 Numeral 9.1.',
        practicalExample: {
          title: 'Alineación Estratégica con Balanced Scorecard',
          description: 'Una empresa conecta la capacitación del personal (Aprendizaje) con la reducción del tiempo de ensamble (Procesos), lo que eleva el cumplimiento de entregas (Clientes) y maximiza las utilidades operativas (Financiera).'
        }
      }
    ],
    differentiatedQuestions: RAP4_QUESTIONS,
    questions: [
      {
        id: 'q4_1',
        questionNumber: 1,
        scenario: 'El área de servicio al cliente tenía la meta de atender 500 solicitudes de usuarios en el mes de marzo con un presupuesto asignado de $5.000.000. Al finalizar el mes, lograron atender 500 solicitudes con éxito, pero gastaron $7.800.000 debido a horas extras no controladas.',
        question: '¿Cómo evalúa el desempeño de este proceso en términos de eficacia y eficiencia?',
        options: [
          { id: 'a', text: 'Fue 100% eficaz (cumplió la meta de atención), pero ineficiente en el uso de los recursos presupuestales.' },
          { id: 'b', text: 'Fue eficiente pero totalmente ineficaz.' },
          { id: 'c', text: 'Fue tanto eficaz como eficiente al 100%.' },
          { id: 'd', text: 'No se puede medir porque no existe indicador de efectividad.' }
        ],
        correctOptionId: 'a',
        explanation: 'La eficacia mide el logro de metas (atendió las 500 solicitudes = 100% eficaz). La eficiencia evalúa el gasto de recursos (superó el presupuesto en más del 50%, lo que evidencia ineficiencia en el gasto).',
        competencyStandard: 'Medición de Gestión: Conceptos de Eficacia vs Eficiencia (DAFP / SENA).'
      },
      {
        id: 'q4_2',
        questionNumber: 2,
        scenario: 'Una empresa establece la siguiente fórmula para su indicador de accidentalidad: (Número de accidentes laborales en el mes / Total de trabajadores en nómina) * 100. La gerencia fija como meta máxima aceptable el 1%. Durante el mes se obtiene un resultado de 3.8%.',
        question: 'Bajo el criterio de semaforización para indicadores de impacto negativo o riesgo, ¿en qué color se ubica este resultado y qué acción corresponde?',
        options: [
          { id: 'a', text: 'Verde (óptimo), felicitación a los operarios.' },
          { id: 'b', text: 'Amarillo (preventivo), se archiva el registro.' },
          { id: 'c', text: 'Rojo (crítico), requiere formulación inmediata de análisis de causa raíz y plan de acción correctivo.' },
          { id: 'd', text: 'Azul (neutro), no requiere intervención.' }
        ],
        correctOptionId: 'c',
        explanation: 'En métricas de riesgo o accidentes, un valor por encima del límite máximo fijado (3.8% frente a 1.0% de meta) representa un resultado grave y desfavorable, por lo que entra directamente en Semáforo Rojo y exige plan de acción.',
        competencyStandard: 'Gestión de Indicadores de Seguridad y Salud en el Trabajo / ISO 45001.'
      },
      {
        id: 'q4_3',
        questionNumber: 3,
        scenario: 'Una empresa de alimentos establece el indicador de "Índice de Entregas Perfectas (OTIF - On Time In Full)": (Pedidos entregados a tiempo y completos / Total de pedidos despachados) * 100. En el mes se despacharon 800 pedidos, de los cuales 744 llegaron a tiempo y con todas las especificaciones sin reclamo.',
        question: '¿Cuál es el resultado porcentual del indicador y cómo se evalúa frente a una meta estándar del 90%?',
        options: [
          { id: 'a', text: '93% ( (744 / 800) * 100 = 93% ), ubicándose en rango de semáforo verde por encima de la meta.' },
          { id: 'b', text: '74.4% y se ubica en semáforo rojo crítico.' },
          { id: 'c', text: '107% y sobrepasó el límite superior tolerado.' },
          { id: 'd', text: '50% porque no se cuentan los pedidos de fin de semana.' }
        ],
        correctOptionId: 'a',
        explanation: 'OTIF = (744 / 800) * 100 = 93%. Al superar la meta del 90%, el indicador se ubica en rango de semáforo verde de cumplimiento satisfactorio.',
        competencyStandard: 'Medición de Indicadores de Calidad de Servicio y Despacho (OTIF).'
      },
      {
        id: 'q4_4',
        questionNumber: 4,
        scenario: 'Al diseñar la Ficha Técnica de un indicador, el responsable redacta la fórmula: "Ventas / Clientes".',
        question: '¿Por qué esta fórmula carece de rigor técnico para la gestión empresarial?',
        options: [
          { id: 'a', text: 'Porque no define si ventas son en pesos o unidades, no acota el periodo de tiempo ni especifica si clientes son activos, nuevos o totales.' },
          { id: 'b', text: 'Porque las ventas nunca pueden dividirse por personas.' },
          { id: 'c', text: 'Porque la norma ISO prohíbe calcular promedios de compra.' },
          { id: 'd', text: 'Porque debe ser obligatoriamente una raíz cuadrada.' }
        ],
        correctOptionId: 'a',
        explanation: 'Una fórmula técnica debe ser precisa e inequívoca: debe definir claramente la unidad monetaria o de volumen del numerador, el tipo exacto de clientes del denominador y el horizonte de tiempo (ej. mensual, acumulado anual).',
        competencyStandard: 'Norma Técnica de Calidad para Fichas de Indicadores de Proceso.'
      },
      {
        id: 'q4_5',
        questionNumber: 5,
        scenario: 'La gerencia implementa un Cuadro de Mando Integral (Balanced Scorecard) para hacer seguimiento a la estrategia corporativa. Un directivo propone incluir únicamente indicadores de ventas y rentabilidad financiera.',
        question: '¿Por qué esta propuesta desvirtúa el modelo conceptual del Balanced Scorecard de Kaplan y Norton?',
        options: [
          { id: 'a', text: 'Porque el modelo exige un equilibrio sistémico entre cuatro perspectivas: Financiera, Clientes, Procesos Internos, y Aprendizaje y Crecimiento.' },
          { id: 'b', text: 'Porque los indicadores financieros están prohibidos en el Balanced Scorecard.' },
          { id: 'c', text: 'Porque solo se deben medir las quejas de los clientes.' },
          { id: 'd', text: 'Porque el Balanced Scorecard solo aplica para entidades públicas.' }
        ],
        correctOptionId: 'a',
        explanation: 'El Balanced Scorecard fue creado precisamente para balancear los indicadores financieros (históricos) con impulsores del desempeño futuro: Clientes, Procesos Internos y Aprendizaje/Crecimiento organizacional.',
        competencyStandard: 'Metodología de Cuadro de Mando Integral (Balanced Scorecard).'
      }
    ]
  }
];
