import { ComputedRef, Ref, ToRefs } from "vue"
import Firebase from "firebase/app";
import "firebase/auth";

export type AuthServiceState = {
  user: Firebase.User | null | undefined;
}

export type AuthServiceGetters = {
  isAuthenticated: ComputedRef<boolean>;
}

export type AuthServiceActions = {
  authenticate(): { 
    user: Ref<AuthServiceState['user']>, 
    loading: Ref<boolean>; 
    isAuthenticated: ComputedRef<boolean> 
  };
  signUp({ email, password }: { email: string, password: string }): Promise<Firebase.auth.UserCredential>;
  verifyEmail(actionCode: string): void;
}

export type AuthService = 
  ToRefs<AuthServiceState> 
  & AuthServiceGetters
  & AuthServiceActions

export type DataLayer = {
  auth: AuthService;
}