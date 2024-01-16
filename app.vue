<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <UContainer>
    <div class="flex py-4">
      <div flex-1>
        <div class="flex items-center">
          <span class="ml-2 text-1.6rem">Picx</span>
        </div>
      </div>
      <div class="float-end">
        <ClientOnly>
          <UButton
            :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
          />

          <template #fallback>
            <div class="h-8 w-8" />
          </template>
        </ClientOnly>
      </div>
    </div>

    <NuxtPage />
  </UContainer>
</template>

<style>
body {
  background-color: #fff;
  color: rgba(0,0,0,0.8);
}
.dark body {
  background-color: #091a28;
  color: #ebf4f1;
}
</style>
