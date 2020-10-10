<template>
  <Teleport to="#modal-cluster">
    <div class="modal fullscreen">
      <div ref="mask" class="modal__mask scene bg-gray-900"></div>
      <div ref="body" class="modal__body scene bg-white flex flex-col">
        <header
          ref="header" 
          class="modal__header font-sans-serif font-semibold text-xl p-8"
          @click="$emit('close')"
        >
          <i class="icon-cross">X</i>
          {{ title }}
        </header>
        <div ref="content" class="modal__content flex-1 px-8 pb-8 overflow-auto">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    }
  },

  setup () {
    const mask = ref<HTMLElement>()
    const body = ref<HTMLElement>()
    const header = ref<HTMLElement>()
    const content = ref<HTMLElement>()
    const tl = gsap.timeline()

    onMounted(() => {
      // enforce by some typescript bullshitery
      mask.value && tl.fromTo(
        mask.value,
        { y: 0 },
        { y: '-100%', duration: 0.9 },
        0
      )
      body.value && tl.fromTo(
        body.value, 
        { y: 0 },
        { y: '-100%', duration: 0.7 },
        0.2
      )
      tl.fromTo(
        [header.value, content.value],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0 },
        '-=0.3'  
      )
    })

    onUnmounted(() => tl.kill())

    return { mask, body, header, content }
  }
})
</script>

<style scoped>
.modal {
  overflow: visible;
  transform: translateY(100%);
}

.modal__header, .modal__content { opacity: 0; }
</style>