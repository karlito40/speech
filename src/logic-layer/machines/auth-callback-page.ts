import { assign, createMachine } from "xstate"
import { InternalLayerDeps } from "../types"

export default ({ dataLayer }: InternalLayerDeps) =>  {
  const { Auth } = dataLayer

  return createMachine<any, any, any>({
    id: 'auth-callback-page',
    initial: 'idle',
    context: {
      query: undefined,
      message: '',
    },

    states: {
      idle: {},

      verifyingEmail: {
        entry: assign({
          message: (context, event) => 'Processing...'
        }),
        invoke: {
          src: 'verifyEmail',
          onDone: {
            target: 'success',
            actions: 'redirectToInbox'
          },
          onError: {
            target: 'failure',
            actions: [
              'setError',
              assign({
                message: (context, event) => `
                  Une erreur s'est produite lors de la verification de ton email.
                  (reason: ${event.data.message} [${event.data.code}])
                `
              })
            ]
          }
        }
      },

      success: {},
      failure: {}
    },

    on: {
      VERIFY_EMAIL: ' verifyingEmail'
    }
  }, {
    services: {
      verifyEmail: (context, event) => Auth.verifyEmail(context.query.oobCode)
    },

    guards: {
      hasUser: (context, event) => Boolean(event.result)
    },

    actions: {
      setError: assign({
				error: (context, event: any) => event.data
			}),
    }
  })
}