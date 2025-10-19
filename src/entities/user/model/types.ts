export interface User {
  id: string;
  email: string;
  nickname: string;
  createdAt: Date;
}

export interface AuthUser extends User {
  token: string;
}