<template>
  <div class="SignUpView">
    <h2 class="font-serif font-bold text-2xl text-center mb-16 mt-20">L'aventure commence</h2>

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

      <Button class="w-full">Valider</Button>
    </form>
  </div>
</template>

<style scoped>
.Input {
  @apply mb-6;
}
</style>
