import { assign, createMachine } from "xstate"
import { map } from "rxjs/operators"
import { InternalLayerDeps } from "../types"

export default ({ dataLayer }: InternalLayerDeps) =>  {
  const { Inbox } = dataLayer

  return createMachine<any, any, any>({
    id: 'inbox-page',
    type: 'parallel',
    context: {
      userId: undefined,
      messages: undefined,
      error: undefined
    },

    states: {
      messages_datasource: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              '': 'observe'
            }
          },
          observe: {
            invoke: {
              src: 'getMessages',
              onDone: 'stopped',
              onError: {
                target: 'failure',
                actions: 'setError'
              }
            },
            on: {
              FETCH_MESSAGES: 'observe'
            },

            // Sub loading state
            initial: 'loading',
            states: {
              loading: {
                on: {
                  MESSAGES_DATASOURCE_INIT: {
                    target: 'watching',
                    actions: 'setMessages'
                  }
                }
              },
              watching: {
                on: {
                  MESSAGES_DATASOURCE_CHANGE: {
                    actions: 'setMessages'
                  }
                }
              }
            }
          },
          failure: {
            on: {
              FETCH_MESSAGES: 'observe'
            }
          },
          stopped: {
            on: {
              FETCH_MESSAGES: 'observe'
            }
          }
        }
      },
      
      ui: {}
    }
  }, {
    services: {
      getMessages: (context, event: any) => Inbox
        .getMessages({ userId: context.userId })
        .pipe(
          map((value, index) => ({ type: index ? 'MESSAGES_DATASOURCE_CHANGE' : 'MESSAGES_DATASOURCE_INIT', result: value }))
        )
    },

    actions: {
      setMessages: assign({
				messages: (context, event: any) => event.result
			}),

      setError: assign({
				error: (context, event: any) => event.data
			}),
    }
  })
}