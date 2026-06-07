export interface MCQ {
  id: number;
  question: string;
  options: string[];
  answer: number; // index of correct option
  explanation: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  description: string;
  constraints?: string[];
  examples?: { input: string; output: string; explanation?: string }[];
  intuition: string;
  approach: {
    name: string;
    steps: string[];
  };
  code: {
    language: string;
    solution: string;
  };
  mcqs: MCQ[];
}

export interface ProblemMeta {
  filename: string;
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
