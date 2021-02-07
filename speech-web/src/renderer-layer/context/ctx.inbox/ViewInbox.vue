<template>
  <SectionPage title="Messages" class="InboxView">
    <router-link 
      v-for="message in messages"
      :key="message.id"
      :to="{ name: 'room', params: { roomId: message.roomId } }"
      class="block border-0"
    >
      <MessageInbox :message="message" class="mb-6" />
    </router-link>
  </SectionPage>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import MessageInbox from './MessageInbox.vue'

export default defineComponent({
  components: { MessageInbox },
  
  setup () {
    const messages = Array.from({ length: 12 }, (k, v) => ({
      id: '4f-' + k,
      roomId: '666',
      content: `L'amour est il aveugle ? J'en sais rien. L'amour rend t’il aveugle ? Si c'est le cas j’aimerais bien le devenir pour ne plus avoir à supporter vos messages à longueur de journées. Oh regardez moi, un cerveau de la capacité d’une planète et on me demande de vous guider vers la page de profile. L'épanouissement professionnel, tu parles.`,
      author: {
        id: '1e-' + k,
        pseudo: 'Marvin Droid',
        avatarUrl: '/imgs/placeholders/marvin-chibi-2.png'
      }
    }))

    return { messages }
  }
})
</script>
