import type { User } from "../types/user";
export function useUsers() {
  const { $api } = useNuxtApp();

  const {
    data: users,
    pending,
    error,
    refresh,
  } = useLazyAsyncData<User[]>("users:list", () => $api<User[]>("/api/users"), {
    server: true,
    default: () => [],
    deep: false,
  });

  const hasError = computed(() => !!error.value);
  const isEmpty = computed(
    () => !pending.value && !error.value && (users.value?.length ?? 0) === 0
  );

  return { users, pending, hasError, error, isEmpty, refresh };
}
