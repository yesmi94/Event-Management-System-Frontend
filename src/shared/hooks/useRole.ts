// hooks/useRole.ts
import { useKeycloak } from "@/shared/hooks/useKeycloak";

export function useRole() {
  const { user } = useKeycloak();

  // Adjust this if your roles come from a different field
  const roles = user?.realm_access?.roles || [];

  const hasRole = (required: string | string[]) => {
    if (!roles) return false;
    if (Array.isArray(required)) {
      return required.some((role) => roles.includes(role));
    }
    return roles.includes(required);
  };

  return { roles, hasRole };
}
