<template>
  <div class="page">
    <header class="head">
      <h1>Users Example</h1>
      <div class="actions">
        <button @click="() => refresh()" :disabled="pending">Refresh</button>
        <button @click="logout">Logout</button>
      </div>
    </header>

    <section v-if="pending" class="state">Loading users…</section>
    <section v-else-if="hasError" class="state error">
      Failed to load.
      <button @click="() => refresh()">Try again</button>
    </section>
    <section v-else-if="isEmpty" class="state">No users</section>

    <section v-else class="grid">
      <UserCard v-for="u in users" :key="u.id" :user="u" />
    </section>
  </div>
</template>

<script setup lang="ts">

const UserCard = defineAsyncComponent(() => import('../components/UserCard.vue'))

useHead({ title: 'Users Example' })

definePageMeta({ middleware: 'auth' })

const auth = useAuthStore()
const { users, pending, hasError, isEmpty, refresh } = useUsers()

const logout = () => auth.logout()
</script>

<style scoped>
.page {
  max-width: 860px;
  margin: 32px auto;
  padding: 16px;
  display: grid;
  gap: 16px;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.actions {
  display: flex;
  gap: 8px;
}

button {
  background: #111827;
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 8px 12px;
}

button[disabled] {
  opacity: .6;
}

.state {
  padding: 16px;
  background: #f3f4f6;
  border-radius: 8px;
}

.state.error {
  background: #fef2f2;
  color: #991b1b;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}
</style>
