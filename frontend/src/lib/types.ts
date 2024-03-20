// [
//     [
//       {
//         "message": "Three successive sentences begin with the same word. Consider rewording the sentence or use a thesaurus to find a synonym.",
//         "category": "ENGLISH_WORD_REPEAT_BEGINNING_RULE",
//         "location": [
//           344,
//           346
//         ],
//         "suggestion": [
//           "Furthermore, it",
//           "Likewise, it",
//           "Not only that, but it"
//         ]
//       },
//       {
//         "message": "Three successive sentences begin with the same word. Consider rewording the sentence or use a thesaurus to find a synonym.",
//         "category": "ENGLISH_WORD_REPEAT_BEGINNING_RULE",
//         "location": [
//           415,
//           417
//         ],
//         "suggestion": [
//           "Furthermore, it",
//           "Likewise, it",
//           "Not only that, but it"
//         ]
//       }
//     ],
//     99.0521327014218
//   ]
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
