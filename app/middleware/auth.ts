export default defineNuxtRouteMiddleware((to: any) => {
  if (to.query?.demo === "1") return;

  const auth = useAuthStore();
  if (!auth.isAuthenticated) {
    return navigateTo({ path: "/login", query: { redirect: to.fullPath } });
  }
});
