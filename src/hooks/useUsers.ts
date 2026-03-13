import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import type { User } from "@/types/auth";

export function useUsers(enabled = true) {
    return useQuery<User[]>({
        queryKey: ["admin", "users"],
        queryFn: authService.getUsers,
        enabled,
    });
}
