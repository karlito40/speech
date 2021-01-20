<template>
  <div class="SignUpView">
    <h2 class="font-serif font-bold text-2xl text-center mb-16 mt-20">L'aventure commence</h2>

    <form @submit.prevent="submit">
      <Input 
        v-model="form.pseudo.$model"
        :has-error="form.pseudo.$error"
        type="text" 
        name="pseudo"
        placeholder="Alter ego"
        icon="fingerprint"
        error-message="Un héro ne part jamais sans son masque."
      />
      <Input 
        v-model="form.email.$model"
        :has-error="form.email.$error"
        type="email"
        name="email"
        placeholder="batman@gotham.city"
        icon="mail"
        error-message="Ehh cet email semble erroné."
      />

      <Input 
        v-model="form.password.$model"
        :has-error="form.password.$error"
        type="password"
        name="password"
        placeholder="Mot de passe"
        icon="key"
        error-message="Ehh tu parts sans ta clé."
      />

      <Button class="w-full">Valider</Button>
    </form>
  </div>
</template>

<script lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { ref } from "vue";

export default {
  setup () {
    const rules = {
      pseudo: { required },
      email: { email, required },
      password: { required }
    }

    const form = useVuelidate(rules, {
      pseudo: ref(''),
      email: ref(''),
      password: ref('')
    })

    const submit = () => {
      form.value.$touch()
      console.log('submit !!!');

      if (form.value.$error) {
        console.log('il reste des erreurs :(')
      } else {
        console.log("let's go")
      }
    }

    return { form, submit }
  }
}
</script>

<style scoped>
.Input {
  @apply mb-6;
}
</style>
