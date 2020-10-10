<template>
  <div ref="root" class="LandingView text-lg">
    <section class="fullscreen bg-gray-900 z-50" data-scene="intro">
      <header class="p-8">
        <h1 class="text-4xl text-white uppercase">
          L'amour<br>est il<br>aveugle ?
        </h1>
      </header>
      <div class="content">
        <p>Découvrons le.</p>
      </div>
    </section>
    <section class="fullscreen z-40" data-scene="label">
      <p>Ici pas de chichi.</p>
    </section>
    <section class="fullscreen z-30" data-scene="label">
      <p>Oublie les masques...</p>
    </section>
    <section class="fullscreen z-20" data-scene="label">
      <p>les faux semblants...</p>
    </section>
    <section class="fullscreen z-10" data-scene="label">
      <p>Soit toi même.</p>
    </section>
  </div>
</template>

<script lang="ts">
import { gsap } from 'gsap'
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router';

function animateIntro (tl: gsap.core.Timeline, $scene: Element) {
  const $contentContainer = $scene.querySelector('.content')
  const $titleText = $scene.querySelector('h1');
  const $contentText = $contentContainer?.querySelector('p')

  tl.fromTo($contentContainer, { y: '100%' }, { y: 0, duration: 0.7 })
  tl.fromTo([$titleText, $contentText], { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, stagger: 0.6 }, '-=0.1')

  tl.addLabel('leave', '+=1')
  
  tl.to($titleText, { y: -window.innerHeight * 0.6, duration: 1, ease: 'power2.in' }, 'leave')
  tl.to($scene, { y: '-100%', duration: 1.2, ease: 'power2.in' }, 'leave')
}

function animateLabels (tl: gsap.core.Timeline, $scenes: Element[]) {
  $scenes.forEach(($scene) => {
    tl.fromTo($scene, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 },)
    tl.to($scene, { y: -20, opacity: 0, duration: 0.2, ease: 'power2.in' }, '+=1')
  })
}

export default defineComponent({
  setup () {
    const router = useRouter()
    const root = ref<HTMLElement>()
    const tl = gsap.timeline()

    onMounted(() => {
      const $intro = root.value?.querySelector('[data-scene="intro"]')
      const $labels = root.value && Array.from(root.value.querySelectorAll('[data-scene="label"]'))

      $intro && animateIntro(tl, $intro)
      $labels && animateLabels(tl, $labels)
    
      tl.then(() => router.push('/onboard'))
    });

    onUnmounted(() => tl.kill())

    return { root }
  }
})
</script>

<style scoped>
.fullscreen {
  overflow: hidden;
}

[data-scene="label"] {
  @apply flex items-center justify-center;
  opacity: 0; /* prevent glitches */
}

[data-scene="intro"] header { min-height: 60vh; }
[data-scene="intro"] .content {
  @apply text-right px-8 pb-8 bg-white;
  padding-top: 25vh;
  height: 40vh;
}
</style>
