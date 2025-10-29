type ApiClient = {
  <T = unknown>(url: string, opts?: any): Promise<T>;
};

declare module "#app" {
  interface NuxtApp {
    $api: ApiClient;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $api: ApiClient;
  }
}

export {};
