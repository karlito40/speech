<template>
  <div class="OnboardingView fullscreen font-sans-serif">
    <div class="font-logo font-bold text-4xl mb-6">Speech</div>
    <div 
      class="carousel -mx-8"
      @scroll="onScroll"
    >
      <div class="slide px-8">
        <img src="imgs/cartoon-go-muscu.jpg" alt="">
        <div class="font-semibold mb-2">L'aventure commence</div>
        <div class="leading-relaxed text-sm">
          Oubliez les masques, les faux semblants et les préjugés. 
          Votre arme pour séduire ? Vous.
        </div>
      </div>
      <div class="slide px-8">
        <img src="imgs/cartoon-orange-writer.jpg" alt="">
        <div class="font-semibold mb-2">L'aventure commence</div>
        <div class="leading-relaxed text-sm">
          Oubliez les masques, les faux semblants et les préjugés. 
          Votre arme pour séduire ? Vous.
        </div>
      </div>
      <div class="slide px-8">
        <img src="imgs/cartoon-orange-letter.jpg" alt="">
        <div class="font-semibold mb-2">L'aventure commence</div>
        <div class="leading-relaxed text-sm">
          Oubliez les masques, les faux semblants et les préjugés. 
          Votre arme pour séduire ? Vous.
        </div>
      </div>
      <div class="slide px-8">
        <img src="imgs/cartoon-orange-match.jpg" alt="">
        <div class="font-semibold mb-2">L'aventure commence</div>
        <div class="leading-relaxed text-sm">
          Oubliez les masques, les faux semblants et les préjugés. 
          Votre arme pour séduire ? Vous.
        </div>
      </div>
    </div>
    <div class="selectors flex justify-center mt-8 mb-12 cursor-pointer">
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        :data-state="dot === index ? 'active' : 'idle'"
        class="dot"
      ></div>
    </div>
    <button class="bg-gray-900 text-white font-bold rounded-lg p-2 mb-4">Inscription</button>
    <button class="bg-gray-100 text-gray-900 font-bold rounded-lg p-2">Connexion</button>
  </div>
</template>

<script lang="ts">
import { debounce } from 'lodash-es'
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    dot: 0,
    slides: ['todo', 'todo', 'todo', 'todo']
  }),

  methods: {
    // todo: debounce
    onScroll: debounce (function onScroll({ target }: { target: HTMLElement }) {
      const slideWidth = this.$el.querySelector('.slide').offsetWidth
      this.dot = Math.floor(target.scrollLeft / slideWidth)
    }, 5)
  }
})
</script>

<style scoped>
.OnboardingView {
  @apply flex flex-col text-center justify-center px-8 py-4;
}

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

.carousel .slide {
  scroll-snap-align: center;
  flex: 0 0 100%;
}

.slide img {
  @apply px-8;
  width: 100%;
  max-width: 20rem;
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
