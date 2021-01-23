<template>
  <button
    :class="classesConfig"
    class="font-sans-serif rounded-lg font-bold p-2 focus:outline-none access-control"
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
  icon: 'bg-transparent'
};

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
button {
  -webkit-tap-highlight-color: transparent;
}
</style>
