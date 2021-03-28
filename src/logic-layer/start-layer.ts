import { DataLayer } from '../data-layer/types'
import { InternalLayerDeps, LogicLayer } from './types'
import InboxPage from './machines/inbox-page'
import RoomPage from './machines/room-page'
import SignupPage from './machines/signup-page'
import AuthCallbackPage from './machines/auth-callback-page'
import Authentication from './machines/authentication'

export default function startLayer ({ dataLayer }: { dataLayer: DataLayer }): LogicLayer {
  const internalDeps: InternalLayerDeps = { dataLayer }

  return {
    InboxPage: InboxPage(internalDeps),
    RoomPage: RoomPage(internalDeps),
    SignUpPage: SignupPage(internalDeps),
    AuthCallbackPage: AuthCallbackPage(internalDeps),
    Authentication: Authentication(internalDeps)
  }
}