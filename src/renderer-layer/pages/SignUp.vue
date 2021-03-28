<template>
  <SignLayout class="SignUp">
    <form @submit.prevent="send('SUBMIT')">
      <Input 
        :model-value="v$.pseudo.$model"
        :has-error="v$.pseudo.$error"
        type="text" 
        name="pseudo"
        placeholder="Alter ego"
        icon="fingerprint"
        error-message="Un héro ne part jamais sans son masque."
        @update:modelValue="changeInput('pseudo', $event)"
      />
      <Input
        :model-value="v$.email.$model"
        :has-error="v$.email.$error"
        type="email"
        name="email"
        placeholder="batman@gotham.city"
        icon="mail"
        error-message="Ehh cet email semble erroné."
        @update:modelValue="changeInput('email', $event)"
      />

      <Input 
        :model-value="v$.password.$model"
        :has-error="v$.password.$error"
        type="password"
        name="password"
        placeholder="Mot de passe"
        icon="key"
        error-message="Ehh j'ai besoin d'un mot de passe."
        @update:modelValue="changeInput('password', $event)"
      />

      <Button class="w-full">Inscription</Button>
    </form>
  </SignLayout>
</template>

<script lang="ts">
import { useVuelidate } from "@vuelidate/core"
import { required, email } from "@vuelidate/validators"
import { defineComponent, ref } from "vue"
import { useRouter } from "vue-router"
import { useLogicLayer } from "../hooks"
import SignLayout from "../components/auth/SignLayout.vue"
import { useMachine } from "@xstate/vue"

export default defineComponent({
  components: { SignLayout },
  setup () {
    const router = useRouter()
    const { SignUpPage } = useLogicLayer()
    
    const { state, send } = useMachine(SignUpPage, { 
      devTools: true,
      guards: {
        hasValidForm: () => {
          v$.value.$touch()
          return !v$.value.$error
        }
      },
      actions: {
        redirectToInbox: () => router.push({ name: 'inbox' })
      }
    })

    // TODO: remove useVuelidate and validate the form 
    // directly from xstate
    const v$ = useVuelidate({
      pseudo: { required },
      email: { email, required },
      password: { required }
    }, {
      pseudo: ref(state.value.context.form.pseudo),
      email: ref(state.value.context.form.email),
      password: ref(state.value.context.form.password)
    })

    // TODO: remove useVuelidate and delete this code
    const changeInput = (name: string, value: any) => {
      v$.value[name].$model = value
      send(`CHANGE_${name.toUpperCase()}`, { input: value })
    }

    return { v$, send, changeInput }
  }
})
</script>

