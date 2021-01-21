<template>
  <div class="InboxView">
    <h1 class="font-serif font-semibold text-3xl mb-14">
      Messages
    </h1>
    <div>
      <InboxMessage :message="message" class="mb-6"/>
      <InboxMessage :message="message" class="mb-6"/>
      <InboxMessage :message="message" class="mb-6"/>
      <InboxMessage :message="message" class="mb-6"/>
      <InboxMessage :message="message" class="mb-6"/>
      <InboxMessage :message="message" class="mb-6"/>
      <InboxMessage :message="message" class="mb-6"/>
      <InboxMessage :message="message" class="mb-6"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import InboxMessage from '../../components/InboxMessage.vue'

export default defineComponent({
  components: { InboxMessage },
  
  setup () {
    const message = {
      content: `L'amour est il aveugle ? J'en sais rien. L'amour rend t’il aveugle ? Si c'est le cas j’aimerais bien le devenir pour ne plus avoir à supporter vos messages à longueur de journées. Oh regardez moi, un cerveau de la capacité d’une planète et on me demande de vous guider vers la page de profile. L'épanouissement professionnel, tu parles.`,
      user: {
        id: '1',
        pseudo: 'Marvin Droid',
        avatarUrl: '/imgs/placeholders/marvin-chibi-2.png'
      }
    }

    return { message }
  }
})
</script>
