<template>
  <button
    :class="classesConfig"
    class="Button"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"

const configs = {
  primary: 'bg-gray-900 text-white',
  secondary: 'bg-gray-100 text-gray-900',
  subtle: 'bg-pink-100 text-pink-900',
  icon: 'bg-transparent',
}

type ButtonType = keyof typeof configs;

export default defineComponent({
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: 'primary'
    }
  },

  setup (props) {
    return {
      classesConfig: configs[props.type]
    }
  }
})
</script>


<style scoped>
.Button {
  @apply access-control;
  @apply font-sans-serif font-bold;
  @apply rounded-lg;
  @apply p-2;
}

.Button:focus { @apply outline-none; }
</style>
