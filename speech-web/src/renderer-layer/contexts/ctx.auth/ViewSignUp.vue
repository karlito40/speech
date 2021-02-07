<template>
  <LayoutSignStyle class="ViewSignUp">
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
        error-message="Ehh j'ai besoin d'un mot de passe."
      />

      <Button class="w-full">Inscription</Button>
    </form>
  </LayoutSignStyle>
</template>

<script lang="ts">
import { useVuelidate } from "@vuelidate/core"
import { required, email } from "@vuelidate/validators"
import { defineComponent, inject, ref } from "vue"
import { useRouter } from "vue-router"
import { DATA_LAYER } from "../../__di__"
import LayoutSignStyle from "./LayoutSignStyle.vue"

export default defineComponent({
  components: { LayoutSignStyle },
  setup () {
    const { auth } = inject(DATA_LAYER)
    const router = useRouter()

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

    const submit = async () => {
      form.value.$touch()

      // we don't care atm 
      if (form.value.$error) {
        console.log('il reste des erreurs :(')
      } else {
        console.log("let's go")
 
        await auth.signUp({
          email: form.value.email.$model,
          password: form.value.password.$model,
        });
        
        router.push({ name: 'inbox' });
      } 
    }

    return { form, submit }
  }
})
</script>

