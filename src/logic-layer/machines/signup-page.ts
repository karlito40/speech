import { assign, createMachine } from "xstate"
import { InternalLayerDeps } from "../types"

export default ({ dataLayer }: InternalLayerDeps) =>  {
  const { Auth } = dataLayer

  return createMachine<any, any, any>({
    id: 'signup-page',
    initial: 'editing',
    context: {
      form: {
        pseudo: undefined,
        email: undefined,
        password: undefined
      },
      error: undefined
    },

    states: {
      editing: {
        entry: 'focusPseudo',
        on: {
          CHANGE_PSEUDO: {
            actions: 'setPseudo'
          },
          CHANGE_EMAIL: {
            actions: 'setEmail'
          },
          CHANGE_PASSWORD: {
            actions: 'setPassword'
          },
          SUBMIT: [
            {
              cond: 'hasValidForm',
              target: 'submit' 
            },
            { 
              actions: ['highlightInvalidFields', 'focusFirstError'] 
            }
          ]
        } 
      },
      
      submit: {
        invoke: {
          src: 'signUp',
          onDone: {
            target: 'success',
            actions: 'redirectToInbox',
          },
          onError: {
            target: 'editing',
            actions: 'setError'
          }
        }
      },
      success: {},
    }
  }, {
    services: {
      signUp: (context, event: any) => Auth.signUp(context.form)
    },

    actions: {
      setPseudo: assign({
        form: (context, event: any) => ({ ...context.form, pseudo: event.input })
      }),

      setEmail: assign({
        form: (context, event: any) => ({ ...context.form, email: event.input })
      }),
      
      setPassword: assign({
        form: (context, event: any) => ({ ...context.form, password: event.input })
      }),

      setError: assign({
        error: (context, event: any) => event.data
      })
    }
  })
}