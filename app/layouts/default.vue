<template>
  <div>
    <nav class="nav">
      <NuxtLink to="/example">Example</NuxtLink>
      <NuxtLink to="/login">Login</NuxtLink>
      <NuxtLink to="/">Home</NuxtLink>
    </nav>
    <main class="container">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.container {
  padding: 16px;
}
</style>
