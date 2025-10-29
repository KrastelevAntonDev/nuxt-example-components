<template>
  <div class="page">
    <h1>Login</h1>
    <p>Please enter username to login. For demo, use <code>Bret</code> or any username from JSONPlaceholder.</p>

    <form @submit.prevent="onSubmit" class="form">
      <label>
        Username
        <input v-model.trim="username" placeholder="Bret" />
      </label>
      <button :disabled="pending || !username" type="submit">
        {{ pending ? 'Logging in...' : 'Login' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">

definePageMeta({ layout: false })
const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const username = ref('Bret')
const pending = ref(false)
const error = ref<string | null>(null)

async function onSubmit() {
  pending.value = true
  error.value = null
  try {
    await auth.login(username.value)
    const redirect = (route.query.redirect as string) || '/example'
    router.replace(redirect)
  } catch (e: any) {
    error.value = e?.statusMessage || 'Login failed'
  } finally {
    pending.value = false
  }
}
</script>

<style scoped>
.page {
  max-width: 520px;
  margin: 40px auto;
  padding: 24px;
}

h1 {
  font-size: 24px;
  margin-bottom: 12px;
}

.form {
  display: grid;
  gap: 12px;
}

input {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 10px;
  width: 100%;
}

button {
  background: #111827;
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
}

button[disabled] {
  opacity: .6;
}

.error {
  color: #b91c1c;
}
</style>
