import { PageController, Route } from "./core/page-controller";

@Route('test', '/test/:roomId')
// @Guard('goto_signin_if_not_authenticated')
export default class TestController extends PageController {

  action ({ roomId }: any) {
    return this.render('Test', {
      doSomething: 'lalla',
      roomId
    })
  }
  
}