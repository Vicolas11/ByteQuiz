export type Gender = "Male" | "Female";
export type Role = "admin" | "user";

export interface DecodedUserType {
  id: string;
  role: Role;
}

export interface UserProfile {
  email: string;
  avatar: string;
  gender: Gender;
  username: string;
  createAt: string;
  highScore: number;
  isFirstTime: boolean;
  role: Role | undefined;
  achievement: {
    title: string;
    medalImg: string;
  }[];
}

export type UserProfileType = UserProfile | undefined | null;

export interface UserData {
  userId: string;
}
