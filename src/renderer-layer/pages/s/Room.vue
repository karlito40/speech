<template>
  <div v-if="state.matches('room_datasource.observe.loading')">loading anim state...</div>
  <SectionPage 
    v-else-if="state.matches('room_datasource.observe.watching')"
    :title="pretender.pseudo" 
    class="Room"
  >
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
        v-for="message in state.context.room.messages"
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

      <form class="overlapse-bottom-form" @submit.prevent="send('SUBMIT_MESSAGE')">
        <Input 
          :model-value="v$.content.$model"
          :has-error="v$.content.$error"
          type="text"
          placeholder="Hey, i like your..."
          class="flex-1 mr-2"
          error-message="fuck you"
          @update:modelValue="changeInput('content', $event)"
        />
        <Button type="icon">
          <Icon name="paperAirplane" class="w-7 tranrsform rotate-90"/>
        </Button>
      </form>
    </div>
  </SectionPage>
  <div v-else>
    {{ state.value }} must be implemented
  </div>
</template>

<script lang="ts">
import useVuelidate from '@vuelidate/core';
import { computed, defineComponent, inject, provide, ref } from 'vue'
import { required } from "@vuelidate/validators"
import { useLogicLayer } from '../../hooks';
import { useMachine } from '@xstate/vue';

export default defineComponent({
  props: {
    roomId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { RoomPage } = useLogicLayer()
    const me = inject('me') as any
    // todo: ....
    const page = useMachine<any, any, any>(RoomPage, {
      devTools: true,
      context: {
        roomId: props.roomId,
        userId: me.value.uid
      }
    })

    const { state, send } = page
    const pretender = computed(() => state.value.context.pretender)

    const v$ = useVuelidate({
      content: { required },
    }, {
      content: ref(state.value.context.form.content),
    })

    // TODO: remove useVuelidate and delete this code
    const changeInput = (name: string, value: any) => {
      v$.value[name].$model = value 
      send(`CHANGE_${name.toUpperCase()}`, { input: value })
    }

    return { 
      state,
      send,
      pretender,
      v$,
      changeInput
    }
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