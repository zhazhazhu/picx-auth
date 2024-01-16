const BASE_AUTHORIZE = 'https://github.com/login/oauth/access_token'

export interface ConfigSuccess {
  access_token: string
  scope: string
  token_type: string
}

export interface ConfigError {
  error: string
  error_description: string
  error_uri: string
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  if (!query.code)
    return
  const { public: { client_id, client_secret, redirect_uri } } = useRuntimeConfig(event)
  const config = await $fetch(BASE_AUTHORIZE, { method: 'POST', headers: {
    Accept: 'application/json',
  }, params: {
    code: query.code,
    state: query.state,
    client_id,
    client_secret,
    redirect_uri,
  } }) as ConfigSuccess | ConfigError

  return config
})
