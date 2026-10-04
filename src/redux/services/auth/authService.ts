import http from "../axios/axios";

import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "../../../types/auth.type";

// Register user
const register = (payload: RegisterPayload) =>
  http.post<AuthResponse>("/api/auth/register", payload);

// Login user
const login = (payload: LoginPayload) =>
  http.post<AuthResponse>("/api/auth/login", payload);

// Get current authenticated user
const getCurrentUser = () =>
  http.get<User>("/api/users/me");

export const authService = {
  register,
  login,
  getCurrentUser,
};