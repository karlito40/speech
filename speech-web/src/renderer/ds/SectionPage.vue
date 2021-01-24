<template>
  <section class="SectionPage">
    <div 
      class="flex items-center mb-10"
      data-man="SectionPage__header"
    >
      <slot name="header:prepend"/>
      <h1
        :class="{ 'ml-5' : $slots['header:prepend'] }" 
        class="font-serif font-semibold text-3xl"
       >
        {{ title }}
      </h1>
      <div v-if="$slots['header:append']" class="flex-1"></div>
      <slot name="header:append"/>
    </div>
    <div data-man="SectionPage__content">
      <slot/>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

