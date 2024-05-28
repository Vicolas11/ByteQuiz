import {
  AllCompetitionsResp,
  CompetitionResp,
  GetQuizResp,
  JoinedResp,
  LeaderboardResp,
  QuestionResp,
} from "./response.interface";
import { UserProfileType } from "./userData.interface";
import { Dispatch, ReactElement, SetStateAction } from "react";

export interface SearchParams {
  searchParams: Record<string, string> | null | undefined
}

export type TSearchParams = {
  competitionId?: string;
  quizId?: string;
  questions?: QuestionResp[];
  searchParams: Record<string, string> | null | undefined;
};

export interface UpdCompetition {
  data: CompetitionResp;
  searchParams: Record<string, string> | null | undefined;
}

export interface Params {
  params: {
    id: string;
  };
  searchParams: Record<string, string> | null | undefined;
}

export interface IOpt {
  label: string | null | undefined;
  value: string | null | undefined;
}

export interface ICustomSelect {
  options: IOpt[];
  placeholder?: string;
  dropDownColor?: string;
  onSelect: (val: IOpt, name?: string) => void;
  prefillId?: string | number | undefined | null;
  isAsync?: boolean;
  inProgress?: boolean;
  isError?: boolean;
  showBtn?: boolean;
  loadMore?: Dispatch<SetStateAction<number>>;
  name?: string;
}

export interface NavbarProps {
  token?: string | undefined;
  data?: UserProfileType;
  isHome?: boolean;
}

export interface ProfileProps {
  data?: UserProfileType;
  width: number;
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

export interface UserProfileProps {
  userData: UserProfileType;
  scroll?: string;
}

export interface CompetitionCardProps {
  id: string;
  imgSrc: string;
  title: string;
  subTitle: string;
  numOfCompetitors: number;
  price: number;
  dateCreated: string;
}

export interface PaginateProps {
  currentPg: number;
  perPage: number;
  totalResults: number;
  maxVisiblePages: number;
}

export interface PaginationProps {
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages: number;
}

export interface ContinueBtnProps {
  id: string;
  userId: string | undefined;
  createdUserId: string;
  hasSubmitted: boolean;
}

export interface ActionBtnProps {
  id: string;
  showBtnEdit: boolean;
}

export interface CustomRadioProps {
  onSelectOpt: (selectOpt: string | null, isCorrect: boolean) => void;
  selectedOption: any;
  options: {
    id: string;
    value: string;
    label: string;
    isCorrect: boolean;
    isSelected: boolean;
  }[];
}

export interface WelldoneProps {
  ansQuestData: QuestionResp[];
  questData: QuestionResp[];
  competitionId?: string;
  quizId?: string;
  showModal?: string;
  idx: number;
}

export type dataType = any;

export type Trow = {
  [key: string]: dataType;
};

export interface TableProps {
  isCustomTr?: boolean;
  tableDataElem?: (
    id: dataType,
    row: dataType[],
    data: dataType,
    colIndex: number,
    rowIndex: number
  ) => ReactElement<HTMLTableCellElement>;
  theadData: string[];
  tbodyData: Trow[];
  totalResults: number;
  resultsPerPage: number;
  maxVisiblePages: number;
  xtraStyle?: string;
  handlePageChange: (page: number) => void;
  emptyText: string;
  showLoader?: boolean;
  isError?: boolean;
  errMsg?: string;
  getUniqIdCallback?: (id: dataType) => void;
  keysToRemove?: string[];
}

export interface LeaderboardProps {
  title?: string;
  currentPg: number;
  perPage: number;
  totalCount: number;
  leaderboard?: LeaderboardResp[];
  competition?: AllCompetitionsResp[];
  joinedCompetition?: JoinedResp[];
  quiz?: GetQuizResp[];
  isError?: boolean;
}
