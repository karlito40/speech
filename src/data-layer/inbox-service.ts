import { from, Observable } from 'rxjs'
import { InboxService, InternalLayerDeps } from './types'

export default ({}: InternalLayerDeps): InboxService => ({
  getMessages ({ userId }) {
    // We dont use rxjs.from as we want to keep
    // alive the observable to simulate a watchQuery (apollo)
    return new Observable((subscriber) => {
      const messages = Array.from({ length: 12 }, (v, index) => ({
        id: '4f-' + index,
        roomId: '666',
        content: `L'amour est il aveugle ? J'en sais rien. L'amour rend t’il aveugle ? Si c'est le cas j’aimerais bien le devenir pour ne plus avoir à supporter vos messages à longueur de journées. Oh regardez moi, un cerveau de la capacité d’une planète et on me demande de vous guider vers la page de profile. L'épanouissement professionnel, tu parles.`,
        authorId: '1e-' + index,
        author: {
          id: '1e-' + index,
          pseudo: 'Marvin Droid',
          avatarUrl: '/imgs/placeholders/marvin-chibi-2.png'
        }
      }))
      subscriber.next(messages)
    })
  }
})