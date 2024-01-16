<script lang='ts' setup>
const route = useRoute()
const code = route.query.code as string
const action = route.query.action as string
const runtimeConfig = useRuntimeConfig()
const error = ref<any>()

async function auth() {
  if (!code) {
    error.value = {
      error: 'code error',
      error_description: 'code undefine',
      error_uri: location.href,
    }
    return location.href = runtimeConfig.public.app_redirect_uri + new URLSearchParams(error.value as any).toString()
  }

  const token = await $fetch('/api/auth', { params: { code } })
  const payload = `?${new URLSearchParams(token).toString()}`
  if ('error' in token)
    error.value = token

  return location.href = runtimeConfig.public.app_redirect_uri + payload
}

function install() {
  location.href = runtimeConfig.public.install_uri
}

onMounted(() => {
  if (action && action === 'install')
    return install()

  auth()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-10">
    <template v-if="!error">
      <div i-ep-success-filled class="text-2rem color-green" />
      <div class="py-5 text-2xl">
        Github Authorize Success
      </div>
      <div>
        About to redirect...
      </div>
    </template>
    <template v-else>
      <div i-material-symbols-error-circle-rounded class="text-2rem color-red" />
      <div class="py-5 text-2xl">
        Github Authorize Error
      </div>
      <div class="text-center color-gray-6">
        {{ error }}
      </div>
    </template>
  </div>
</template>
