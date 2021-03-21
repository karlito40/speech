<template>
  <div class="Test">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus doloremque porro deserunt a, corrupti cum explicabo ea itaque! Quisquam facere asperiores culpa magni velit omnis suscipit magnam eligendi repellendus assumenda.

    <pre>$props: {{ $props }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    doSomething: String,
    roomId: String
  }
})
</script>
