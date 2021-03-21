import { defineAsyncComponent, defineComponent, h, resolveComponent } from 'vue'

export class PageController {
  static readonly route: {
    name: string;
    path: string;
  }
  roothPath = '../../renderer-layer/pages'

  render (pathFromRoot: string, props: any) {
    return defineComponent({
      components: {
        // TODO: add loadingComponent and errorComponent
        Component: defineAsyncComponent(() => import(`${this.roothPath}/${pathFromRoot}.vue`)),
      },
      render () {
        return h(resolveComponent('Component'), props)
      }
    })
  }
}

export function Route(name: string, path: string) {
  return function (constructor: Function) {
    (constructor as any).route = {
      name,
      path
    }
  }
}