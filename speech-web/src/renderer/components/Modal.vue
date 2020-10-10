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
import { defineComponent } from 'vue'
import gsap from 'gsap'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    }
  },

  mounted () {
    this.tl = gsap.timeline();

    this.tl.fromTo(
      this.$refs.mask, 
      { y: 0 },
      { y: '-100%', duration: 0.9 },
      0
    )
    this.tl.fromTo(
      this.$refs.body, 
      { y: 0 },
      { y: '-100%', duration: 0.7 },
      0.2
    )
    this.tl.fromTo(
      [this.$refs.header, this.$refs.content],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0 },
      '-=0.3'  
    )
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