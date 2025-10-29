<template>
  <article class="user-card">
    <header>
      <strong>{{ user.name }}</strong>
      <small>@{{ user.username }}</small>
    </header>
    <p>
      <a :href="`mailto:${user.email}`">{{ user.email }}</a>
    </p>
  </article>
</template>

<script setup lang="ts">
import type { User } from '../types/user'

const props = defineProps<{ user: User }>()

const user = computed(() => props.user)
</script>

<style scoped>
.user-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 14px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  display: grid;
  gap: 6px;
}

header {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

strong {
  font-weight: 600;
}

small {
  color: #6b7280;
}

a {
  color: #2563eb;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
