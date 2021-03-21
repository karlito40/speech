<template>
  <SectionPage :title="pretender.pseudo" class="ViewChatRoom">
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
        v-for="message in formatedMessages"
        :key="message.id"
        class="message" 
        :data-from="message.authorId === pretender.id ? 'pretender' : 'me'"
      >
        <div class="message__content">
          <p v-for="(paragraph, index) in message.paragraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>
        <div class="message__footer">
          10 min ago
        </div>
      </div>

      <Button type="subtle">
        Je tombe le masque
      </Button>

      <form class="overlapse-bottom-form" @submit.prevent="sendMessage">
        <Input 
          v-model="form.content.$model"
          :has-error="form.content.$error"
          type="text"
          name="content" 
          placeholder="Hey, i like your..."
          class="flex-1 mr-2"
          error-message="fuck you"
        />
        <Button type="icon">
          <Icon name="paperAirplane" class="w-7 transform rotate-90"/>
        </Button>
      </form>
    </div>
  </SectionPage>
</template>

<script lang="ts">
import useVuelidate from '@vuelidate/core';
import { computed, defineComponent, reactive, ref } from 'vue'
import useDataLayer from '../../hooks/use-data-layer';
import { required } from "@vuelidate/validators"

export default defineComponent({
  props: {
    roomId: {
      type: String,
      required: true
    }
  },
  setup () {
    // TODO: TS | "fix" the useDataLayer to return the correct type (it returns a conditional type atm)
    const { Auth, Room } = useDataLayer()
    const { me } = Auth;

    const pretender = {
      id: '77',
      pseudo: 'Marvin Droid',
      avatarUrl: '/imgs/placeholders/marvin-chibi-2.png'
    }

    const rules = {
      content: { required },
    }

    const form = useVuelidate(rules, {
      content: ref(''),
    })

    const sendMessage = () => {
      form.value.$touch()
      if (form.value.$error) {
        // TODO: Form | handle that error
        return console.log('todo: il reste des erreurs :(')
      }
      console.log("let's go")

      // TODO: TS | useDataLayer is not able to infer the type of the targetd service
      Room.addMessage({
        roomId: 'myTestId',
        authorId: me.value.uid,
        content: form.value.content.$model,
      })
    }

    const { loading, result, error } = Room.watchRoom({ roomId: 'myTestId' })

    const formatedMessages = computed(() => {
      if (!result.value) return null

      return result.value.messages.map((message) => {
        const paragraphs = message.content.replace(/\r\n?/g, "\n").split("\n")
        return {
          ...message,
          paragraphs
        }
      })
    })

    return { formatedMessages, loading, error, pretender, form, sendMessage }
  }
})
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
}

.message {
  @apply font-serif;
  @apply mb-10;
  max-width: 80%;
}

.message[data-from="me"] { align-self: flex-end; }

.message__content {
  @apply mb-1;
}

.message__content p {
  @apply mb-5;
  overflow-wrap: anywhere;
}

.message__content p:last-child {
  @apply mb-0;
}


.message__footer {
  @apply text-sm text-gray-600;
}

.message[data-from="me"] .message__footer { text-align: right; }
</style>