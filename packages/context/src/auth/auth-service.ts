import { AuthPrincipal } from "./auth-principal";

export interface AuthService<Principal extends AuthPrincipal = AuthPrincipal> {
  verify(encodedToken: string): Promise<Principal>
}