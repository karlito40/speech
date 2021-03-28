<template>
  <div class="Onboarding fullscreen">
    <h1 class="font-logo font-bold text-5xl mb-6">Speech</h1>
    <Carousel class="-mx-8">
      <CarouselItem class="px-8">
        <img src="/imgs/cartoon-go-muscu.jpg" alt="">
        <div class="font-semibold mb-2 text-lg">L'aventure commence</div>
        <div>
          Oubliez les masques, les faux semblants et les préjugés. 
          Votre arme pour séduire ? Vous.
        </div>
      </CarouselItem>
      <CarouselItem class="px-8">
        <img src="/imgs/cartoon-orange-writer.jpg" alt="">
        <div class="font-semibold mb-2 text-lg">L'aventure commence</div>
        <div>
          Oubliez les masques, les faux semblants et les préjugés. 
          Votre arme pour séduire ? Vous.
        </div>
      </CarouselItem>
      <CarouselItem class="px-8">
        <img src="/imgs/cartoon-orange-letter.jpg" alt="">
        <div class="font-semibold mb-2 text-lg">L'aventure commence</div>
        <div>
          Oubliez les masques, les faux semblants et les préjugés. 
          Votre arme pour séduire ? Vous.
        </div>
      </CarouselItem>
      <CarouselItem class="px-8">
        <img src="/imgs/cartoon-orange-match.jpg" alt="">
        <div class="font-semibold mb-2 text-lg">L'aventure commence</div>
        <div>
          Oubliez les masques, les faux semblants et les préjugés. 
          Votre arme pour séduire ? Vous.
        </div>
      </CarouselItem>
    </Carousel>
    <div class="flex flex-col">
      <Button 
        class="mb-4"
        @click="showModal = 'signup'"
      >
        Inscription
      </Button>
      <Button 
        type="secondary"
        @click="showModal = 'signin'"
      >
        Connexion
      </Button>
    </div>

    <Modal 
      v-if="showModal === 'signup'" 
      title="L'aventure commence"
      @closed="showModal = null"
    >
      <Signup/>
    </Modal>
    <Modal 
      v-else-if="showModal === 'signin'" 
      title="L'aventure continue"
      @closed="showModal = null"
    >
      <SignUp/>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// TODO:  This should not be there. We should use a router-view
import Signup from './SignUp.vue'
import SignUp from './SignIn.vue'

export default defineComponent({
  components: { Signup, SignUp },

  data: () => ({
    showModal: null
  })
})
</script>

<style scoped>
.ViewOnboarding {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  opacity: 0;
  animation: 0.8s -slide-in-y 0.2s forwards;
  @apply px-8 py-4;
}

img {
  width: 16rem;
  height: 13rem;
  margin: 0 auto;
}
</style>
