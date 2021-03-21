<template>
  <SignLayout class="SignIn">
    <form @submit.prevent="submit">
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
        error-message="Ehh j'ai besoin d'un mot de passe."
      />
      <Button class="w-full">Connexion</Button>
    </form>
    <div class="text-center text-sm">
      <router-link to="/recovery">Mot de passe oubliée ?</router-link>
    </div>
  </SignLayout>
</template>

<script lang="ts">
import { useVuelidate } from "@vuelidate/core"
import { required, email } from "@vuelidate/validators"
import { defineComponent, ref } from "vue"
import SignLayout from './components/SignLayout.vue'

export default defineComponent({
  components: { SignLayout },
  setup () {
    const rules = {
      email: { email, required },
      password: { required }
    }

    const form = useVuelidate(rules, {
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
})
</script>

