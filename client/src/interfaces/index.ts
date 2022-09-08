export interface IPost {
  title: string;
  textBody?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  id?: number;
}

export interface IUser {
  username: string;
  password: string;
  aboutMe?: string;
  sessionId?: string;
  id?: number;
}
