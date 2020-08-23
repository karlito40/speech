<template>
  <div class="OnboardingView fullscreen font-sans-serif">
    <div class="font-logo font-bold text-4xl mb-6">Speech</div>
    <Carousel carouselClass="-mx-8">
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
      <button 
        class="bg-gray-900 text-white font-bold rounded-lg p-2 mb-4"
        @click="showModal = true"
      >
        Inscription
      </button>
      <button 
        class="bg-gray-100 text-gray-900 font-bold rounded-lg p-2"
        @click="addStuff = true"
      >
        Connexion
      </button>
    </div>

    <Modal 
      v-if="showModal" 
      title="Inscription"
      @close="showModal = false"
    >
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus qui corrupti error ullam excepturi alias ad natus pariatur voluptates, sapiente at cupiditate eaque accusamus aperiam, eum totam recusandae deleniti! Ipsum.</p>
      <p>Ipsum, inventore iusto non soluta delectus tempora quas nostrum, debitis voluptatem quo itaque labore obcaecati, modi asperiores vero accusamus suscipit omnis aliquid. Accusantium nostrum, blanditiis nisi accusamus eius voluptate? Voluptas?</p>
      <p>Ipsum, inventore iusto non soluta delectus tempora quas nostrum, debitis voluptatem quo itaque labore obcaecati, modi asperiores vero accusamus suscipit omnis aliquid. Accusantium nostrum, blanditiis nisi accusamus eius voluptate? Voluptas?</p>
      <p>Ipsum, inventore iusto non soluta delectus tempora quas nostrum, debitis voluptatem quo itaque labore obcaecati, modi asperiores vero accusamus suscipit omnis aliquid. Accusantium nostrum, blanditiis nisi accusamus eius voluptate? Voluptas?</p>
      <p>Ipsum, inventore iusto non soluta delectus tempora quas nostrum, debitis voluptatem quo itaque labore obcaecati, modi asperiores vero accusamus suscipit omnis aliquid. Accusantium nostrum, blanditiis nisi accusamus eius voluptate? Voluptas?</p>
      <p>Ipsum, inventore iusto non soluta delectus tempora quas nostrum, debitis voluptatem quo itaque labore obcaecati, modi asperiores vero accusamus suscipit omnis aliquid. Accusantium nostrum, blanditiis nisi accusamus eius voluptate? Voluptas?</p>
      <p>Ipsum, inventore iusto non soluta delectus tempora quas nostrum, debitis voluptatem quo itaque labore obcaecati, modi asperiores vero accusamus suscipit omnis aliquid. Accusantium nostrum, blanditiis nisi accusamus eius voluptate? Voluptas?</p>
      <p>Ipsum, inventore iusto non soluta delectus tempora quas nostrum, debitis voluptatem quo itaque labore obcaecati, modi asperiores vero accusamus suscipit omnis aliquid. Accusantium nostrum, blanditiis nisi accusamus eius voluptate? Voluptas?</p>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Modal from '../components/Modal.vue'
import Carousel, { CarouselItem } from '../components/Carousel.vue'

export default defineComponent({
  components: { Modal, Carousel, CarouselItem },

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
</style>
