// just guessing around my api design

@Route('guessing-around', { accessControl: 'goto_signin_if_not_authenticated' })
export class GuessingAroundController {
  action () {
    const guessingMachine = createMachine({
      id: 'toggle',
      initial: 'inactive',
      states: {
        inactive: { on: { TOGGLE: 'active' } },
        active: {
          invoke: {
            src: 'callSomething'
          },
          on: { TOGGLE: 'inactive' }
        }
      }
    });

    return this.render('test/GuessingAround', {
      machine: guessingMachine
    })
  }
}