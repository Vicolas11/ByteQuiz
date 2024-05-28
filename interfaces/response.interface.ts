export interface AllCompetitionsResp {
  id: string;
  title: string;
  subtitle: string;
  imgCover: string;
  price: number;
  overallPoint: number;
  createdAt: string;
  hasStarted: boolean;
  createdUserId: string;
  createdBy: {
    id: string;
    username: string;
    email: string;
    avatar: string;
  };
  joinedUsers: {
    userId: string;
  }[];
}

export interface OptionResp {
  id: string;
  questionId?: string;
  value: string;
  label: string;
  isCorrect: boolean;
  isSelected: boolean;
}

export interface QuestionResp {
  id: string;
  competitionId?: string | null;
  quizId?: string;
  userId?: string | null;
  createdAt?: string,
  question: string;
  score: number;
  time: number;
  point: number;
  isAnswered: boolean;
  isCompleted: boolean;
  options: OptionResp[];
}

export interface CompetitionResp {
  id: string;
  title: string;
  subtitle: string;
  imgCover: string;
  price: number;
  overallPoint: number;
  createdAt: string;
  hasStarted: boolean;
  hasJoined: boolean;
  hasSubmitted: boolean;
  createdUserId: string;
  questions: QuestionResp[];
}

export interface LeaderboardResp {
  index: number;
  user: {
    id: string;
    username: string;
    email: string;
    avatar: string;
    gender: string;
  };
  point: number;
  position: string;
  joinedDate: string;
  isUser: boolean;
}

export interface QuizResp {
  id: string;
  totalPoint: number;
  overallPoint: number;
  createdAt: string;
  userId: string;
  hasSubmitted: boolean;
  questions: {
    id: string;
    question: string;
    score: number;
    time: number;
    point: number;
    isAnswered: boolean;
    isCompleted: boolean;
    competitionId: string | null;
    quizId: string;
    createdAt: string;
    userId: string | null;
    options: {
      id: string;
      value: string;
      label: string;
      isCorrect: boolean;
      isSelected: boolean;
      questionId: string;
    }[];
  }[];
}

export interface SubmitQuizResp {
  status: boolean;
  code: number;
  message: string;
  data: {
    id: string;
    totalPoint: number;
    overallPoint: number;
    createdAt: string;
    userId: string;
  };
  other: {
    hasAchieved: boolean;
    highScore: number;
    achievement: {
      id: string;
      title: string;
      medalImg: string;
      userId: string;
      createdAt: string;
    }[];
  };
}

export interface JoinedResp {
  id: string;
  title: string;
  createdAt: string;
  overallPoint: number;
  authorUsername: string;
  authorEmail: string;
  joinedDate: string;
  point: number;
  remark: string;
  position: string;
}

export interface GetQuizResp {
  id: string;
  title: string;
  createdAt: string;
  overallPoint: number;
  authorUsername: string;
  authorEmail: string;
  point: number;
  remark: string;
}

export interface GetStatsResp {
  users: number;
  competitions: number;
  questions: number;
}
