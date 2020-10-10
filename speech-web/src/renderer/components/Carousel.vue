<template>
  <div 
    ref="carousel"
    :class="['carousel', carouselClass]"
    @scroll="onScroll"
  >
    <slot></slot>
  </div>  
  <div class="carousel-selector flex justify-center mt-8 mb-12 cursor-pointer">
    <div 
      v-for="i in slideCount" 
      :key="i"
      :data-state="dot === i - 1 ? 'active' : 'idle'"
      class="dot"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUpdated, onMounted, h } from 'vue'
import { debounce } from 'lodash-es'

export const CarouselItem = defineComponent({
  render () {
    return h('div', {
      ...this.$attrs,
      class: `carousel-item ${this.$attrs.class}` 
    }, this.$slots?.default?.())
  }
})

export default defineComponent({
  props: ['carouselClass'],

  setup () {
    const carousel = ref<HTMLElement>()
    const dot = ref(0)
    const slideCount = ref(0)

    const getSlideNodes = () => {
      return carousel.value ? Array.from(carousel.value?.querySelectorAll('.carousel-item')) : []
    }

    const updateSlideCount = () => slideCount.value = getSlideNodes().length
    
    const onScroll = function ({ target }: { target: HTMLElement }) {
      const slideWidth = carousel.value?.offsetWidth ?? 0
      dot.value = Math.floor(target.scrollLeft / slideWidth)
    }

    onMounted(updateSlideCount)
    onUpdated(updateSlideCount) // meh

    return {
      carousel,
      dot,
      slideCount,
      onScroll: debounce(onScroll, 5)
    }
  }
})
</script>

<style scoped>
.carousel {
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  display: flex;
  ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.carousel::-webkit-scrollbar { /* Chrome */
  display: none;
}

.carousel >>> .carousel-item {
  scroll-snap-align: center;
  flex: 0 0 100%;
}

.carousel >>> .carousel-item img {
  width: 16rem;
  height: 13rem;
  margin: 0 auto;
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