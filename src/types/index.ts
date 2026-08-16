export type DiseaseCategory = 
  | 'Thyroid & Endocrine'
  | 'Joints & Musculoskeletal'
  | 'Gastrointestinal & Liver'
  | 'Neurological & Neuromuscular'
  | 'Dermatological & Connective'
  | 'Systemic & Vascular';

export interface Biomarker {
  name: string;
  fullName: string;
  purpose: string;
  normalRange?: string;
  significance: string;
}

export interface Disease {
  id: string;
  name: string;
  shortName: string;
  category: DiseaseCategory;
  tagline: string;
  overview: string;
  prevalence: string;
  primaryOrgans: string[];
  hallmarkSymptoms: string[];
  diagnosticTests: Biomarker[];
  treatmentClasses: {
    name: string;
    description: string;
    examples: string[];
  }[];
  commonTriggers: string[];
  evidenceBasedLifestyle: {
    diet: string;
    exercise: string;
    stressPacing: string;
    supplementsToDiscuss: string[];
  };
  flareWarningSigns: string[];
  questionsForDoctor: string[];
}

export interface SymptomLogEntry {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  overallEnergy: number; // 1-10 (10 = highest)
  painLevel: number; // 1-10 (10 = severe)
  fatigueLevel: number; // 1-10
  brainFogLevel: number; // 1-10
  jointStiffnessLevel: number; // 1-10
  gutDistressLevel: number; // 1-10
  sleepHours: number;
  sleepQuality: 'Poor' | 'Fair' | 'Good' | 'Restful';
  mood: 'Struggling' | 'Low' | 'Stable' | 'Good' | 'Energized';
  activeSymptoms: string[];
  identifiedTriggers: string[];
  medications: {
    name: string;
    dose: string;
    taken: boolean;
  }[];
  spoonsUsedToday?: number;
  spoonsBudget?: number;
  notes: string;
  flareUpActive: boolean;
}

export type ForumCategory =
  | 'All Channels'
  | 'Newly Diagnosed'
  | 'Flare SOS & Coping'
  | 'Medications & Biologics'
  | 'Diet, Gut & AIP'
  | 'Mental Health & Spoonies'
  | 'Wins & Milestones';

export interface ForumComment {
  id: string;
  postId: string;
  authorName: string;
  authorHandle: string;
  isAnonymous: boolean;
  conditionTag?: string;
  timestamp: number;
  content: string;
  likes: number;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: ForumCategory;
  authorName: string;
  authorHandle: string;
  authorCondition?: string;
  isAnonymous: boolean;
  timestamp: number;
  tags: string[];
  reactions: {
    strength: number; // 💜
    spoons: number;   // 🥄
    helpful: number;  // 💡
    hug: number;      // 🫂
  };
  userReactions?: {
    strength?: boolean;
    spoons?: boolean;
    helpful?: boolean;
    hug?: boolean;
  };
  comments: ForumComment[];
  isPinned?: boolean;
  isBookmarked?: boolean;
}

export interface SpoonActivity {
  id: string;
  name: string;
  cost: number;
  category: 'Self Care' | 'Work / Study' | 'Household' | 'Social' | 'Exercise';
  icon: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: number;
  suggestedPrompts?: string[];
  isAnalyzing?: boolean;
}
