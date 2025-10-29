import type { User } from "~/types/user";

export const useAuthStore = defineStore("auth", () => {
  const user = shallowRef<User | null>(null);
  const token = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value && !!user.value);

  if (import.meta.client) {
    try {
      const raw = localStorage.getItem("auth");
      if (raw) {
        const parsed = JSON.parse(raw);
        user.value = parsed.user ?? null;
        token.value = parsed.token ?? null;
      }
    } catch {
      localStorage.removeItem("auth");
    }

    watch(
      [user, token],
      () => {
        try {
          localStorage.setItem(
            "auth",
            JSON.stringify({ user: user.value, token: token.value })
          );
        } catch {}
      },
      { deep: false }
    );
  }

  async function login(username: string) {
    const { $api } = useNuxtApp();

    const users = await $api<User[]>(`/api/users`);
    const found = users.find(
      (u: User) => u.username.toLowerCase() === username.toLowerCase()
    );
    if (!found) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid credentials",
        fatal: false,
      });
    }
    user.value = found;
    token.value = `demo-${found.id}-${Date.now()}`;
  }

  function logout() {
    user.value = null;
    token.value = null;
    if (import.meta.client) localStorage.removeItem("auth");
  }

  return { user, token, isAuthenticated, login, logout };
});
