<template>
  <SectionPage title="Messages" class="Inbox">
    <div v-if="state.matches('messages_datasource.observe.loading')">TODO: loading messages...</div>
    <template v-else-if="state.matches('messages_datasource.observe.watching')">
      <router-link 
        v-for="message in state.context.messages"
        :key="message.id"
        :to="{ name: 'room', params: { roomId: 'myTestId' } }"
        class="block border-0"
      >
        <InboxMessage :message="message" class="mb-6" />
      </router-link>
    </template>
    <div v-else>
      TODO: inbox must implement this state {{ state.value }}
    </div>
  </SectionPage>
</template>

<script lang="ts">
import { useMachine } from "@xstate/vue"
import { defineComponent, provide } from "vue"
import { useLogicLayer } from "../../../hooks"
import InboxMessage from './components/InboxMessage.vue'

export default defineComponent({
  components: { InboxMessage },
  
  setup () {
    const { InboxPage } = useLogicLayer()
    const page = useMachine(InboxPage, { 
      devTools: true,
      context: {
        userId: 'TODO: userId'
      }
    })
    provide('InboxPage', page)

    return { 
      state: page.state,
      send: page.send
    }
  }
})
</script>
