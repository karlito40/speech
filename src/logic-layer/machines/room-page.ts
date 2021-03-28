import { assign, createMachine } from "xstate"
import { map } from "rxjs/operators"
import { InternalLayerDeps } from "../types"
import { Message } from "../../data-layer/types"

export default ({ dataLayer }: InternalLayerDeps) =>  {
  const { Room } = dataLayer

  return createMachine<any, any, any>({
    id: 'room-page',
    type: 'parallel',
    context: {
      userId: undefined,
      roomId: undefined,
      room: undefined,
      // todo: state
      pretender: {
        id: '77',
        pseudo: 'Marvin Droid',
        avatarUrl: '/imgs/placeholders/marvin-chibi-2.png'
      },
      form: {
        content: undefined
      },
      error: undefined
    },

    states: {
      room_datasource: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              '': 'observe'
            }
          },
          observe: {
            invoke: {
              src: 'getRoom',
              onDone: 'stopped',
              onError: {
                target: 'failure',
                actions: 'setError'
              }
            },
            on: {
              FETCH_ROOM: 'observe'
            },

            // Sub loading state
            initial: 'loading',
            states: {
              loading: {
                on: {
                  ROOM_DATASOURCE_INIT: {
                    target: 'watching',
                    actions: ['setRoom', 'formatMessages']
                  }
                }
              },
              watching: {
                on: {
                  ROOM_DATASOURCE_CHANGE: {
                    actions: ['setRoom', 'formatMessages']
                  }
                }
              }
            }
          },
          failure: {
            on: {
              FETCH_ROOM: 'observe'
            }
          },
          stopped: {
            on: {
              FETCH_ROOM: 'observe'
            }
          }
        }
      },
      
      form: {
        initial: 'editing',
        states: {
          editing: {
            on: {
              SUBMIT_MESSAGE: 'submit'
            } 
          },
          
          submit: {
            invoke: {
              src: 'createMessage',
              onDone: 'editing',
              onError: 'failure'
            }
          },

          failure: {
            on: {
              SUBMIT_MESSAGE: 'submit'
            }
          }
        },

        on: {
          CHANGE_CONTENT: {
            actions: 'setContent'
          }
        }
      }
    }
  }, {
    services: {
      getRoom: (context, event: any) => Room
        .getRoom({ roomId: context.roomId })
        .pipe(
          map((value, index) => ({ type: index ? 'ROOM_DATASOURCE_CHANGE' : 'ROOM_DATASOURCE_INIT', result: value }))
        ),
      
      createMessage: (context, event: any) => Room.addMessage({
        roomId: context.roomId,
        authorId: context.userId,
        ...context.form
      })
    },

    actions: {
      setRoom: assign({
				room: (context, event: any) => event.result
			}),
      
      formatMessages: assign({
				room: (context, event: any) => {
          if (!context.room) return context.room;

          const formattedMessages = context.room.messages.map((message: Message) => {
            const paragraphs = message.content.replace(/\r\n?/g, "\n").split("\n")
            return {
              ...message,
              paragraphs
            }
          })

          return {
            ...context.room,
            messages: formattedMessages
          }
        }
      }),

      setContent: assign({
        form: (context, event: any) => ({ ...context.form, content: event.input })
      }),

      setError: assign({
				error: (context, event: any) => event.data
			}),
    }
  })
}