<template>
  <div class="Input font-serif">
    <div
      :class="{ error: hasError }" 
      class="Input__group flex items-center relative bg-gray-100 rounded-lg"
    >
      <input
        :type="type" 
        :placeholder="placeholder"
        :value="modelValue"
        class="Input__field flex-1 px-4 py-2 pr-11 rounded-lg"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event.target.value)"
      >
      <Icon 
        v-if="icon"
        :name="icon" 
        class="absolute w-4 right-4"
      />
    </div>
    <p v-if="hasError && errorMessage" class="Input__explain">{{ errorMessage }}</p>
    <p v-if="tips" class="Input__explain">{{ tips }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { IconName } from './Icon'

export default defineComponent({
  emits: ['update:modelValue', 'blur'],
  props: {
    modelValue: String,
    type: {
      type: String,
      required: true
    },
    placeholder: String,
    tips: String,
    icon: String as PropType<IconName>,
    hasError: Boolean,
    errorMessage: String
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

.Input__explain {
  @apply text-sm pl-2 mt-2;
}
</style>
