<template>
  <div class="MessageItem flex items-center">
    <div class="flex-shrink-0 mr-8">
      <img 
        :src="message.user.avatarUrl" 
        class="object-cover h-8 w-8"
      >
    </div>

    <div class="flex-1 overflow-hidden ">
      <div class="font-bold text-lg font-serif">
        {{ message.user.pseudo }}
      </div>
      <div class="ellipsis text-sm">
        {{ message.content }}
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue'

type User = {
  id: string;
  pseudo: string;
  avatarUrl: string;
}

type Message = {
  user: User;
  content: string;
}

export default defineComponent({
  props: {
    message: {
      type: Object as PropType<Message>,
      required: true
    }
  }
});
</script>