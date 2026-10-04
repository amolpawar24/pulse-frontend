import http from "../axios/axios";
import type { User } from "../../../types/auth.type";

// Get all users except the current one
const getUsers = () => http.get<User[]>("/api/users");

export const usersService = {
  getUsers,
};