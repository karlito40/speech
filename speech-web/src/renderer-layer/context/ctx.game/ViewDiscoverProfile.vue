<template>
  <div class="ViewDiscoverProfile">
    <Spinner v-if="loading"/>
    <SectionPage
      v-else 
      :title="letter.author.pseudo" 
      class="ViewDiscoverProfile"
    >
      <div class="mb-6" data-man="ViewDiscoverProfile__content">
        {{ letter.content }}
      </div>
      <div class="text-sm text-gray-600 text-right italic" data-man="ViewDiscoverProfile__footer">
        <p>{{ letter.author.pseudo }}, 99 ans</p>
        <p>{{ letter.author.city }}</p>
      </div>

      <div class="overlapse-bottom-form">
        <div class="flex-1"></div>
        <Button type="icon" class="text-pink-900">
          <Icon name="heart" class="w-7"/>
        </Button>
        <div class="flex-1 text-right">
          <Button type="icon">
            <Icon name="arrowRight" class="w-7"/>
          </Button>
        </div>
      </div>
    </SectionPage>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  setup () {
    const loading = ref(false)

    const letter = {
      id: '1',
      content: `
        Doggo ipsum vvv puggorino he made many woofs the neighborhood pupper doggo fat boi what a nice floof, fluffer blep corgo boof. The neighborhood pupper doggo corgo most angery pupper I have ever seen long bois, vvv borking doggo. Borkdrive the neighborhood pupper maximum borkdrive you are doin me a concern ruff doggo, mlem tungg the neighborhood pupper.

        Heckin angery woofer the neighborhood pupper blop borkdrive maximum borkdrive, waggy wags shooberino maximum borkdrive. Doge you are doin me a concern the neighborhood pupper I am bekom fat h*ck fluffer, waggy wags ur givin me a spook thicc lotsa pats puggo, smol borking doggo with a long snoot for pats mlem bork yapper. very taste wow wrinkler big ol. 
      `,
      author: {
        pseudo: 'Batman Wayne',
        city: 'Nantes',
        birthDateAt: new Date()
      }
    }

    return {
      loading,
      letter
    }
  }
})
</script>
