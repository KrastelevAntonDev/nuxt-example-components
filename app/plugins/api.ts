export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      const auth = useAuthStore()
      const token = auth.token
      const headers = new Headers(options.headers)
      if (token) headers.set('Authorization', `Bearer ${token}`)
      headers.set('Accept', 'application/json')
      if (!headers.has('Content-Type') && shouldSendJson(options)) {
        headers.set('Content-Type', 'application/json')
      }
      options.headers = headers
    },
    onResponse() {
    },
    onResponseError({ response }) {
      const status = response?.status
      if (status === 401) {
        try { useAuthStore().logout() } catch {}
      }
      throw createError({
        statusCode: status || 500,
        statusMessage: response?._data?.message || 'API Error',
        fatal: false,
      })
    },
  })

  return {
    provide: {
      api,
    },
  }
})

function shouldSendJson(options: any) {
  const method = (options.method || 'GET').toUpperCase()
  if (method === 'GET' || method === 'HEAD') return false
  return typeof options.body === 'object' && options.body !== null
}
