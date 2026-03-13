import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import type { AuthResponse } from "@/types/auth";
import { AxiosError } from "axios";

type AuthError = { error: string };

export function useLoginMutation() {
    return useMutation<AuthResponse, AxiosError<AuthError>, { email: string; password: string }>(
        ({ email, password }) => authService.login(email, password)
    );
}

export function useRegisterMutation() {
    return useMutation<AuthResponse, AxiosError<AuthError>, { name: string; email: string; password: string }>(
        ({ name, email, password }) => authService.register(name, email, password)
    );
}
