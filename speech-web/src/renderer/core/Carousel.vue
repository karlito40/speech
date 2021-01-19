<template>
  <div class="Carousel">
    <div 
      ref="scrollable"
      class="Carousel__scroll"
      @scroll="onScroll"

    >
      <slot></slot>
    </div>
    <div class="flex justify-center mt-8 mb-12">
      <div 
        v-for="i in slideCount" 
        :key="i"
        :data-state="dot === i - 1 ? 'active' : 'idle'"
        class="dot"
      ></div>
    </div>
  </div>  
</template>

<script lang="ts">
import { defineComponent, ref, onUpdated, onMounted, h } from 'vue'
import { debounce } from 'lodash-es'

export const CarouselItem = defineComponent({
  render () {
    return h('div', {
      ...this.$attrs,
      class: `CarouselItem ${this.$attrs.class}` 
    }, this.$slots?.default?.())
  }
})

export default defineComponent({
  setup () {
    const scrollable = ref<HTMLElement>()
    const dot = ref(0)
    const slideCount = ref(0)

    const getSlideNodes = () => {
      return scrollable.value ? Array.from(scrollable.value?.querySelectorAll('.CarouselItem')) : []
    }

    const updateSlideCount = () => slideCount.value = getSlideNodes().length
    
    const onScroll = function ({ target }: { target: HTMLElement }) {
      const slideWidth = scrollable.value?.offsetWidth ?? 0
      dot.value = Math.floor(target.scrollLeft / slideWidth)
    }

    onMounted(updateSlideCount)
    onUpdated(updateSlideCount) // meh

    return {
      scrollable,
      dot,
      slideCount,
      onScroll: debounce(onScroll, 5)
    }
  }
})
</script>

<style scoped>
.Carousel__scroll {
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  display: flex;
  ms-overflow-style: none;  /* IE and Edge */
}

.Carousel__scroll::-webkit-scrollbar { /* Chrome */
  display: none;
}

:deep(.CarouselItem) {
  scroll-snap-align: center;
  flex: 0 0 100%;
}

.dot {
  @apply rounded-full h-2 w-2 bg-gray-300;
  margin: 0 0.3rem;
  transition: 0.2s background-color;
}

.dot[data-state="active"] {
  @apply bg-gray-900;
}
</style>