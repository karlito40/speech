<template>
  <div class="SignUpView">
    <h2 class="font-serif font-bold text-xl text-center mb-12 mt-8">L'aventure commence</h2>

    <form>
      <Input 
        type="text" 
        placeholder="Pseudonyme"
        icon="fingerprint"
      />
      <Input 
        type="email" 
        placeholder="Email"
        icon="mail"
      />
      <Input 
        type="password" 
        placeholder="Mot de passe"
        icon="key"
      />

      <Button class="w-full mt-6">Inscription</Button>
    </form>
  </div>
</template>

<style scoped>
.Input {
  @apply mb-6;
}
</style>
