import Firebase from "firebase/app";
import { ToRefs } from "vue"
import "firebase/auth";
import { Observable } from "rxjs";

export type InternalLayerDeps = {
  firebase: Firebase.app.App;
  db: Firebase.firestore.Firestore;
}

// ------ Models ------------------- //
export type User = {
  id: string;
  pseudo: string;
  avatarUrl: string;
}

export type Message = {
  id: string;
  roomId: string;
  authorId: string;
  author?: User; 
  content: string;
}

export type Room = {
  userIds: string[];
  messages: Message[];
  createdAt: string; // TODO: TS | Convert into a Date
}

// ------ Services ------------------- //

export type InboxService = {
  getMessages({ userId }: { userId: string }): Observable<Message[]>;
}

export type AuthService = {
  authenticate(): Observable<Firebase.User | null>;
  signUp({ email, password }: { email: string, password: string }): Promise<Firebase.auth.UserCredential>;
  verifyEmail(actionCode: string): Promise<void>;
}

export type RoomService = {
  getRoom ({ roomId }: { roomId: string; }): Observable<Room | null>;
  // subscribeToChat ({ roomId }: { roomId: string; }): Message[];
  addMessage ({ roomId, content }: { roomId: string; content: string; authorId: string; }): Promise<void>;
}

// ------ Layer export ------------------- //
export type DataLayer = {
  Auth: AuthService;
  Room: RoomService;
  Inbox: InboxService;
}
