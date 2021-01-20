<template>
  <Teleport to="#modal-cluster">
    <div class="Modal fullscreen">
      <div ref="mask" class="Modal__mask scene bg-gray-900"></div>
      <div ref="body" class="Modal__body scene bg-white flex flex-col">
        <header
          ref="header" 
          class="Modal__header access-control"
          tabindex="0"
          @click="closing = true"
        >
          <Icon name="x" class="inline-block w-6 mr-2"/>
          {{ title }}
        </header>
        <div ref="content" class="Modal__content flex-1 px-8 pb-8 overflow-auto">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import gsap from 'gsap'

export default defineComponent({
  emits: ['closing', 'closed'],
  props: {
    title: {
      type: String,
      required: true
    }
  },

  setup (props, { emit }) {
    const closing = ref(false)
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

    watch(closing, () => {
      emit('closing')

      tl.reverse()
      tl.eventCallback('onReverseComplete', () => {
        emit('closed')
      })
    })

    onUnmounted(() => tl.kill())

    return { mask, body, header, content, closing }
  }
})
</script>

<style scoped>
.Modal {
  overflow: visible;
  transform: translateY(100%);
}

.Modal__header, .Modal__content { opacity: 0; }
.Modal__header {
  @apply outline-none;
  @apply flex items-center font-sans-serif font-semibold p-8 text-lg;
}
</style>