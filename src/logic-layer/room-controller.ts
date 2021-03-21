import { createMachine } from "xstate";
import { PageController, Route } from "./core/page-controller";

@Route('room', 'room/:roomId')
// @Guard('goto_signin_if_not_authenticated')
export default class TestController extends PageController {

  // TODO: add type di
  // constructor(dataLayer: DataLayer)

  action ({ roomId }: any) {
    // TODO
    const machine = createMachine({
      
    })
    
    return this.render('restricted/Room', {
      machine
    })
  }

}