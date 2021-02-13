import { ComputedRef, Ref } from "vue"
import Firebase from "firebase/app";
import "firebase/auth";

type ReactiveUser = Ref<Firebase.User | null | undefined>
export type AuthService = {
  user: ReactiveUser;
  isAuthenticated: ComputedRef<boolean>;

  authenticate(): { user: ReactiveUser; loading: Ref<boolean>; isAuthenticated: ComputedRef<boolean>; };
  signUp({ email, password }: { email: string, password: string }): Promise<Firebase.auth.UserCredential>;
  verifyEmail(actionCode: string): void;
}

export type DataLayer = {
  auth: AuthService;
}