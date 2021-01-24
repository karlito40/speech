<template>
  <div :class="`Avatar w-9 h-9 bg-gray-100 rounded-full overflow-hidden`">
    <img :src="src" class="object-cover w-full h-full">
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true
    },
    /* size: {
      type: String,
      default: '6'
    } */
  }
})
</script>