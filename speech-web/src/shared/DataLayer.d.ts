import { Ref } from "vue"
import Firebase from "firebase/app";
import "firebase/auth";

export type AuthService = {
  isAuthenticated: Ref<boolean>;
  authenticate(): void;
  // We should not rely on firebase on a "real world" scenario
  signUp(): Promise<Firebase.auth.UserCredential>;
  verifyEmail(): void;
}

export type DataLayer = {
  auth: AuthService;
}