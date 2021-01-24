<template>
  <div class="MainFrame py-20 px-6">
    <nav class="top-bar">
      <ul class="flex items-center">
        <li>
          <Button type="icon">
            <Icon name="arrowLeft" class="w-7"/>
          </Button>
        </li>
        <li class="flex-1"></li>
        <li>
          <router-link :to="{ name: 'discover' }" class="nav-link">
            <Icon name="newspaper" class="w-7"/>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'inbox' }" class="nav-link" >
            <Icon name="annotation" class="w-7"/>
          </router-link>
        </li>
        <li>
          <router-link to="/" class="nav-link">
            <Avatar src="https://placekitten.com/28/28"/>
          </router-link>
        </li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<style scoped>
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  @apply bg-white text-gray-900;
  @apply px-4 py-2;
}

li { @apply mr-2; }
li:last-child { margin-right: 0 !important; }

.nav-link {
  display: block;
  border: 0;
  @apply p-2;
}
</style>