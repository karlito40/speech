<template>
  <div class="Input font-serif">
    <div class="Input__group flex items-center relative bg-gray-100 rounded-lg">
      <input 
        :type="type" 
        :placeholder="placeholder"
        class="Input__field flex-1 px-4 py-2 pr-11 rounded-lg"
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
.Input__field {
  @apply outline-none;
  background: transparent;
  transition: 0.2s all;
}

.Input__group.error .Icon {
  color: red;
}
</style>
