<template>
  <div class="Input font-serif">
    <div
      :class="{ error: hasError }" 
      class="input-group"
    >
      <input
        :type="type" 
        :placeholder="placeholder"
        :value="modelValue"
        class="input-group__field"
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
.input-group {
  display: flex;
  align-items: center;
  position: relative;
  @apply bg-gray-100;
  @apply rounded-lg;
}

.input-group__field {
  flex: 1;
  @apply outline-none;
  @apply px-4 py-2 pr-11;
  @apply rounded-lg;
  background: transparent;
  transition: 0.2s all;
}


.input-group.error .Icon {
  color: red;
}

.Input__explain {
  @apply text-sm;
  @apply pl-2 mt-2;
}
</style>
