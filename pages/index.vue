<script lang='ts' setup>
const { public: { state, scope, client_id, client_secret, redirect_uri } } = useRuntimeConfig()

const login_uri = `https://github.com/login/oauth/authorize?${new URLSearchParams({
  state,
  scope,
  client_id,
  client_secret,
  redirect_uri,
}).toString()}`

onMounted(() => {
  setTimeout(() => {
    location.href = login_uri
  }, 500)
})
</script>

<template>
  <div class="h[calc(100vh-150px)] flex flex-col items-center justify-center tracking-wider">
    <div i-line-md-loading-twotone-loop class="text-3.5rem" />
    <div class="py-10 text-2.4rem">
      Connect To Github...
    </div>
  </div>
</template>
