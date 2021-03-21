import { ComputedRef, Ref, ToRefs } from "vue"
import Firebase from "firebase/app";
import "firebase/auth";

// ------ Auth Service ------------------- //
export type AuthServiceState = {
  me: Firebase.User | null | undefined;
}

export type AuthServiceGetters = {
  isAuthenticated: ComputedRef<boolean>;
}

export type AuthServiceActions = {
  authenticate(): { 
    me: Ref<AuthServiceState['me']>, 
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



// ------ Room Service ------------------- //
export type Message = {
  authorId: string;
  author?: any; // TODO: TS | Create a User type
  content: string;
}

export type Room = {
  userIds: string[];
  messages: Message[];
  createdAt: string; // TODO: TS | Convert into a Date
}

export type RoomService = {
  watchRoom ({ roomId }: { roomId: string; }): ToRefs<{ 
    loading: boolean; 
    error: Error | null;
    data: Room | null;
  }>;
  // subscribeToChat ({ roomId }: { roomId: string; }): Message[];
  addMessage ({ roomId, content }: { roomId: string; content: string; authorId: string; }): void;
}

// ------ Layer export ------------------- //
export type DataLayer = {
  Auth: AuthService;
  Room: RoomService;
}
