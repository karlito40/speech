<template>
  <SectionPage :title="pretender.pseudo" class="RoomView">
    <template #header:prepend>
      <Avatar :src="pretender.avatarUrl"/>
    </template>
    <template #header:append>
      <Button type="icon">
        <Icon name="dotsVertical" class="w-5"/>
      </Button>
    </template>

    <div class="chat">
      <div 
        v-for="message in messages"
        :key="message.id"
        class="message" 
        :data-from="message.authorId === pretender.id ? 'pretender' : 'me'"
      >
        <div class="message__content">
          {{ message.content }}
        </div>
        <div class="message__footer">
          10 min ago
        </div>
      </div>

      <Button type="subtle">
        Je tombe le masque
      </Button>

      <form class="message-form" @submit.prevent="">
        <Input 
          type="text" 
          name="content" 
          placeholder="Hey, i like your..."
          class="flex-1 mr-2"
        />
        <Button type="icon">
          <Icon name="paperAirplane" class="w-7 transform rotate-90"/>
        </Button>
      </form>
    </div>
  </SectionPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    roomId: {
      type: String,
      required: true
    }
  },
  setup ({ roomId }) {
    // on recuperera seulement les messages recents
    // (les plus anciens seront recupérés au scroll si besoin)
    const messages = [
      {
        id: '1',
        content: `L'amour est il aveugle ? J'en sais rien. L'amour rend t’il aveugle ? Si c'est le cas j’aimerais bien le devenir pour ne plus avoir à supporter vos messages à longueur de journées. Oh regardez moi, un cerveau de la capacité d’une planète et on me demande de vous guider vers la page de profile. L'épanouissement professionnel, tu parles.`,
        createdAt: new Date(),
        authorId: '77'
      },
      {
        id: '2',
        content: `Go fuck yourself, fucking bot. Go fuck yourself, fucking botGo fuck yourself, fucking botGo fuck yourself, fucking bot`,
        createdAt: new Date(),
        authorId: '1c'
      }, 
      {
        id: '3',
        content: `oh dear :(`,
        createdAt: new Date(),
        authorId: '77'
      }
    ];

    const pretender = {
      id: '77',
      pseudo: 'Marvin Droid',
      avatarUrl: '/imgs/placeholders/marvin-chibi-2.png'
    }

    return { messages, pretender }
  }
})
</script>

<style scoped>
.chat {
   @apply flex flex-col;
}

.message {
  @apply font-serif;
  @apply mb-6;
  max-width: 80%;
}

.message__content {
  @apply mb-1;
}

.message__footer {
  @apply text-gray-600;
  @apply text-sm;
}

.message[data-from="me"] { @apply self-end; }
.message[data-from="me"] .message__footer { text-align: right; }


.message-form {
  @apply fixed bottom-0 left-0 right-0;
  @apply flex;
  @apply py-4 px-6;
  @apply bg-white;
}
</style>