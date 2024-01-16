<script lang='ts' setup>
const route = useRoute()
const code = route.query.code as string
const action = route.query.action as string
const runtimeConfig = useRuntimeConfig()
const error = ref<any>()
const { public: { state, scope, client_id, client_secret, redirect_uri } } = useRuntimeConfig()

const login_uri = `https://github.com/login/oauth/authorize?${new URLSearchParams({
  state,
  scope,
  client_id,
  client_secret,
  redirect_uri,
}).toString()}`

async function auth() {
  if (!code) {
    return error.value = {
      error: 'code error',
      error_description: 'code undefine',
      error_uri: location.href,
    }
  }

  const token = await $fetch('/api/auth', { params: { code } })
  const payload = `?${new URLSearchParams(token).toString()}`
  if ('error' in token)
    return error.value = token

  return location.href = runtimeConfig.public.app_redirect_uri + payload
}

function install() {
  location.href = runtimeConfig.public.install_uri
}
function tryLogin() {
  location.href = login_uri
}

onMounted(() => {
  if (action && action === 'install')
    return install()

  auth()
})
</script>

<template>
  <div class="h[calc(100vh-150px)] flex flex-col items-center justify-center">
    <template v-if="!error">
      <div i-ep-success-filled class="text-3.5rem color-green" />
      <div class="py-5 text-2.4rem">
        Github Authorize Success
      </div>
      <div>
        About to redirect...
      </div>
    </template>
    <template v-else>
      <div i-material-symbols-error-circle-rounded class="text-3.5rem color-red" />
      <div class="py-5 text-2.4rem">
        Github Authorize Error
      </div>
      <div class="text-center color-gray-6">
        {{ error }}
      </div>
      <UButton size="lg" class="mt-10px" variant="outline" @click="tryLogin">
        Try again
      </UButton>
    </template>
  </div>
</template>
