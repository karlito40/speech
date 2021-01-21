<template>
  <div class="MainFrame py-5 px-6">
    <nav class="top-bar -mx-2 text-gray-900 mb-12">
      <ul class="flex items-center">
        <li>
          <Button type="transparent">
            <Icon name="arrowLeft" class="w-7"/>
          </Button>
        </li>
        <li class="flex-1"></li>
        <li>
          <Button type="transparent">
            <Icon name="home" class="w-7"/>
          </Button>
        </li>
        <li>
          <Button type="transparent" >
            <Icon name="annotation" class="w-7"/>
          </Button>
        </li>
        <li>
          <Button type="transparent">
            <Avatar src="https://placekitten.com/28/28"/>
          </Button>
        </li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<style scoped>
li {
  @apply mr-2;
}

li:last-child { margin-right: 0 !important; }
/* .Icon :deep(path) {
  stroke-width: 1;
}  */
</style>