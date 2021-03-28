import { DataLayer } from "../data-layer/types";

export type InternalLayerDeps = {
  dataLayer: DataLayer;
}

export type LogicLayer = {
  InboxPage: any;
  RoomPage: any;
  SignUpPage: any;
  AuthCallbackPage: any;
  Authentication: any;
}