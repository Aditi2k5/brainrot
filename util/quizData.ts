export interface Question {
    id: number;
    text: string;
    answers: {
      left: string;
      right: string;
    };
    emojis: {
      left: string;
      right: string;
    };
    scores: {
      left: number;
      right: number;
    };
  }
  
  export const questions: Question[] = [
    {
      id: 1,
      text: "Thank you _",
      answers: {
        left: "Beyonce",
        right: "Beyonce",
      },
      emojis: {
        left: "👑",
        right: "🎤",
      },
      scores: {
        left: 20,
        right: 20,
      },
    },
    {
      id: 2,
      text: "We need to escape the _",
      answers: {
        left: "Matrix",
        right: "Net",
      },
      emojis: {
        left: "💻",
        right: "🌐",
      },
      scores: {
        left: 20,
        right: 0,
      },
    },
    {
      id: 3,
      text: "Fill in the blank: Ain't nothing like a _ party",
      answers: {
        left: "Diddy",
        right: "House",
      },
      emojis: {
        left: "🎉",
        right: "🏠",
      },
      scores: {
        left: 20,
        right: 0,
      },
    },
    {
      id: 4,
      text: "Fill in the blank: Red is acting _",
      answers: {
        left: "Sus",
        right: "Perfectly normal",
      },
      emojis: {
        left: "🕵️",
        right: "😌",
      },
      scores: {
        left: 20,
        right: 0,
      },
    },
    {
      id: 5,
      text: "Fill in the blank: Sticking out your _ for the rizzler",
      answers: {
        left: "Skibidi",
        right: "Gyatt",
      },
      emojis: {
        left: "🤪",
        right: "💁‍♀️",
      },
      scores: {
        left: 0,
        right: 20,
      },
    
   
    }
  ];
  
  export function calculateGenZScore(scores: number[]): string {
    const totalScore = scores.reduce((a, b) => a + b, 0);
    const maxScore = questions.length * 10;
    const percentage = (totalScore / maxScore) * 100;
    if(percentage >= 100) return "Edge Lord";
    if (percentage >= 80) return "Ultimate Gen Z";
    if (percentage >= 60) return "Gen Z Vibing";
    if (percentage >= 40) return "Gen Z in Training";
    if (percentage >= 20) return "Millennial at Heart";
    return "OK, Boomer";
  }