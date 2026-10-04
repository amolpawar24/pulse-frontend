import { createAsyncThunk } from "@reduxjs/toolkit";

import { authService } from "../services/auth/authService";

import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "../../types/auth.type";

// Show the backend's message (FastAPI sends it in "detail") if there is one
const apiMessage = (error: unknown, fallback: string): string => {
  const detail = (error as { response?: { data?: { detail?: unknown } } })?.response?.data?.detail;

  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((d) => d.msg).join(", ");

  return fallback;
};

// Register user
export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/registerUser", async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.register(payload);
    return response.data;
  } catch (error) {
    return rejectWithValue(apiMessage(error, "Registration failed"));
  }
});

// Login user
export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.login(payload);
    return response.data;
  } catch (error) {
    return rejectWithValue(apiMessage(error, "Login failed"));
  }
});

// Get current authenticated user
export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await authService.getCurrentUser();
    return response.data;
  } catch (error) {
    return rejectWithValue(apiMessage(error, "Failed to fetch current user"));
  }
});