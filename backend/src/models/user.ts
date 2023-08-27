import { Request } from "express";
interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  role: "USER" | "MODERATOR" | "ADMIN";
  emailConfirmed: Boolean;
}

export default User;
