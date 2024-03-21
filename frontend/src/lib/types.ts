export type Suggestion = {
  message: string;
  category: string;
  location: [number, number];
  suggestion: string[];
};

export type SuggestionResponse = [
  {
    message: string;
    category: string;
    location: [number, number];
    suggestion: string[];
  },
  number,
];

export type Rubric = {
  name: string;
  grade: number;
  feedback: string;
};

export type RubricResponse = {
  rubrics: Rubric[];
  total: number;
  feedback: string;
  suggestions: string[];
};

export type Readability = {
  smog: number;
  coleman_liau: number;
  flesch_kincaid: number;
  gunning_fog: number;
  readability_level: string;
};

export type EssayStats = {
  total_characters: number;
  alphanumeric_characters: number;
  total_words: number;
  total_sentences: number;
};
