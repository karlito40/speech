import { assign, createMachine } from "xstate"
import { map } from "rxjs/operators"
import { InternalLayerDeps } from "../types"

export default ({ dataLayer }: InternalLayerDeps) =>  {
  const { Auth } = dataLayer

  return createMachine<any, any, any>({
    id: 'authentication',
    type: 'parallel',
    context: {
      me: undefined,
      error: undefined
    },

    states: {
      authenticate_datasource: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              '': 'observe'
            }
          },
          observe: {
            invoke: {
              src: 'authenticate',
              onDone: 'stopped',
              onError: {
                target: 'failure',
                actions: 'setError'
              }
            },
            on: {
              AUTHENTICATE: 'observe'
            },

            // Sub loading state
            initial: 'loading',
            states: {
              loading: {
                on: {
                  AUTHENTICATE_DATASOURCE_INIT: [
                    { cond: 'hasUser', target: ['#authenticated', 'watching'] },
                    { target: ['#unauthenticated', 'watching'] },
                  ]
                }
              },
              watching: {
                on: {
                  AUTHENTICATE_DATASOURCE_CHANGE: [
                    { cond: 'hasUser', target: '#authenticated' },
                    { target: ['#unauthenticated', 'watching'] },
                  ]
                }
              }
            }
          },
          failure: {
            on: {
              AUTHENTICATE: 'observe'
            }
          },
          stopped: {
            on: {
              AUTHENTICATE: 'observe'
            }
          }
        }
      },

      identity: {
        initial: 'unknown',
        states: {
          unknown: {},
          authenticated: { 
            id: 'authenticated',
            entry: 'setMe'
          },
          unauthenticated: {
            id: 'unauthenticated',
            entry: 'setMe'
          }
        }
      }
    }
  }, {
    services: {
      authenticate: (context, event: any) => Auth
        .authenticate()
        .pipe(
          map((value, index) => ({ type: index ? 'AUTHENTICATE_DATASOURCE_CHANGE' : 'AUTHENTICATE_DATASOURCE_INIT', result: value }))
        )
    },

    guards: {
      hasUser: (context, event) => Boolean(event.result)
    },

    actions: {
      setMe: assign({
				me: (context, event: any) => event.result
			}),

      setError: assign({
				error: (context, event: any) => event.data
			}),
    }
  })
}