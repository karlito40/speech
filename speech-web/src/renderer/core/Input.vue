<template>
  <div class="Input">
    <div class="flex items-center relative bg-gray-100 rounded-lg">
      <input 
        :type="type" 
        :placeholder="placeholder"
        class="flex-1 px-4 py-2 pr-11 rounded-lg focus:outline-none focus:shadow"
      >
      <Icon 
        v-if="icon"
        :name="icon" 
        class="absolute w-4 right-4"
      />
    </div>
    <p v-if="tips" class="text-sm pl-2 mt-2">{{ tips }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { IconName } from './Icon'

export default defineComponent({
  props: {
    type: {
      type: String,
      required: true
    },
    placeholder: String,
    tips: String,
    icon: String as PropType<IconName>
  }
})
</script>

<style scoped>
input {
  background: transparent;
}
</style>
