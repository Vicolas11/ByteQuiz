import { CompetitionResp } from "./response.interface";

export interface InputValue {
  [key: string]: string;
}

export interface ActionType {
  [key: string]: {
    isSave: boolean;
    isEdit: boolean;
  };
}

export interface MultiInputValType {
  [key: string]: {
    _id: string;
    id: string;
    question: string;
    time: number;
    score: number;
    point: number;
    isAnswered: boolean;
    isCompleted: boolean;
    options: {
      id: string;
      value: string;
      label: string;
      isCorrect: boolean;
      isSelected: boolean;
    }[];
  };
}

export interface QuestionList {
  _id: string;
  question: string;
  time: number;
  score: number;
  options: {
    opt: string;
    name: string;
    value: string;
    isCorrect: boolean;
    selected: boolean;
  }[];
}
[];

export interface ImageFileType {
  file: File | null;
  image: string;
}

export type Role = "Male" | "Female";

export interface InputValueType {
  [key: string]: string;
}

export interface InputIsValidType {
  [key: string]: boolean;
}

export interface QueryParams {
  perPage: number;
  currentPage: number;
}

export interface UpdCreateQuestLst extends CreateQuestList {
  id: string;
}

export interface CreateQuestList {
  _id: string;
  question: string;
  score: number;
  time: number;
  point: number;
  isAnswered: boolean;
  isCompleted: boolean;
  options: {
    value: string;
    label: string;
    isCorrect: boolean;
    isSelected: boolean;
  }[];
}

export interface CreateMultiInputValue {
  [id: string]: CreateQuestList;
}

export type OmitCreateQuestion = Omit<CreateQuestList, "_id">;

export interface QuestDetailModalProps {
  isUpdate?: boolean;
  competeData?: CompetitionResp;
  data: OmitCreateQuestion[];
}

export interface CreateCompetition {
  id?: string;
  title: string;
  subtitle: string;
  price: number;
  questionData: OmitCreateQuestion[];
}

export interface SelectOptType {
  [key: string]: string | null;
}
