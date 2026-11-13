export type RAPId = 'rap1' | 'rap2' | 'rap3' | 'rap4';

export type KolbStyle = 'Acomodador' | 'Divergente' | 'Convergente' | 'Asimilador';

export interface KolbResult {
  style: KolbStyle;
  tagline: string;
  description: string;
  characteristics: string[];
  recommendedStrategies: string[];
  completedAt: string;
}

export interface ApprenticeInfo {
  fullName: string;
  docType: 'C.C.' | 'T.I.' | 'C.E.' | 'P.P.T.';
  docNumber: string;
  ficha: string;
  center: string;
  regional: string;
  kolbResult?: KolbResult | null;
}

export interface ApprenticeRecord extends ApprenticeInfo {
  id: string; // Unique identifier (usually docNumber)
  registeredAt: string;
  attemptsCountByRap?: Record<RAPId, number>;
  totalAttempts?: number;
  lastResult?: EvaluationResult | null;
  rapsProgress?: Record<RAPId, RapProgress>;
  updatedAt?: string;
}

export interface InstructorRecord {
  id: string;
  fullName: string;
  docNumber: string;
  username: string; // Email or username
  password: string;
  fichas: string[]; // List of assigned fichas
  registeredAt: string;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  questionNumber: number;
  scenario?: string;
  question: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
  competencyStandard: string;
}

export interface StudyTopic {
  id: string;
  title: string;
  subtitle: string;
  keyConcept: string;
  content: string[];
  normativeReference?: string;
  practicalExample?: {
    title: string;
    description: string;
  };
  tips?: string[];
}

export interface RAPDefinition {
  id: RAPId;
  code: string;
  shortName: string;
  title: string;
  learningOutcome: string;
  durationHours: number;
  accentColor: string;
  topics: StudyTopic[];
  questions: Question[];
  differentiatedQuestions: Record<KolbStyle, Question[]>;
}

export interface QuestionResult {
  questionNumber: number;
  questionText: string;
  scenario?: string;
  selectedOptionId: string;
  selectedOptionText: string;
  correctOptionId: string;
  correctOptionText: string;
  isCorrect: boolean;
  explanation: string;
  competencyStandard: string;
}

export interface EvaluationResult {
  certificateId: string;
  rapId: RAPId;
  rapTitle: string;
  rapCode: string;
  evaluatedStyle: KolbStyle;
  evaluatedStyleTag: string;
  evaluationTechnique?: string;
  evaluationInstrument?: string;
  evidenceType?: string;
  apprentice: ApprenticeInfo;
  completedAt: string;
  score: number;
  maxScore: number;
  percentage: number;
  concept: 'APROBADO' | 'NO APROBADO';
  isApproved: boolean;
  questionResults: QuestionResult[];
}

export interface RapProgress {
  rapId: RAPId;
  isApproved: boolean;
  approvedByStyle?: KolbStyle;
  bestPercentage: number;
  attemptsByStyle: Partial<Record<KolbStyle, { percentage: number; isApproved: boolean; completedAt: string }>>;
}
