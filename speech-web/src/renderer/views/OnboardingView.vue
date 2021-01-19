<template>
  <div class="OnboardingView fullscreen">
    <div class="font-logo font-bold text-4xl mb-6">Speech</div>
    <Carousel class="-mx-8">
      <CarouselItem class="px-8">
        <img src="imgs/cartoon-go-muscu.jpg" alt="">
        <div class="font-semibold mb-2">L'aventure commence</div>
        <div class="leading-relaxed text-sm">
          Oubliez les masques, les faux semblants et les préjugés. 
          Votre arme pour séduire ? Vous.
        </div>
      </CarouselItem>
      <CarouselItem class="px-8">
        <img src="imgs/cartoon-orange-writer.jpg" alt="">
        <div class="font-semibold mb-2">L'aventure commence</div>
        <div class="leading-relaxed text-sm">
          Oubliez les masques, les faux semblants et les préjugés. 
          Votre arme pour séduire ? Vous.
        </div>
      </CarouselItem>
      <CarouselItem class="px-8">
        <img src="imgs/cartoon-orange-letter.jpg" alt="">
        <div class="font-semibold mb-2">L'aventure commence</div>
        <div class="leading-relaxed text-sm">
          Oubliez les masques, les faux semblants et les préjugés. 
          Votre arme pour séduire ? Vous.
        </div>
      </CarouselItem>
      <CarouselItem class="px-8">
        <img src="imgs/cartoon-orange-match.jpg" alt="">
        <div class="font-semibold mb-2">L'aventure commence</div>
        <div class="leading-relaxed text-sm">
          Oubliez les masques, les faux semblants et les préjugés. 
          Votre arme pour séduire ? Vous.
        </div>
      </CarouselItem>
    </Carousel>
    <div class="flex flex-col">
      <Button 
        class="mb-4"
        @click="showModal = true"
      >
        Inscription
      </Button>
      <Button type="secondary">
        Connexion
      </Button>
    </div>

    <Modal 
      v-if="showModal" 
      title="Inscription"
      @closed="showModal = false"
    >
      <SignUpView/>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SignUpView from './SignUpView.vue'

export default defineComponent({
  components: { SignUpView },

  data: () => ({
    showModal: false,
  })
})
</script>

<style scoped>
.OnboardingView {
  @apply flex flex-col text-center justify-center px-8 py-4;
  opacity: 0;
  animation: 0.8s -slide-in-y 0.2s forwards;
}

img {
  width: 16rem;
  height: 13rem;
  margin: 0 auto;
}
</style>
