import store from "<%= storeDir %>";

declare module "vue/types/vue" {
  interface Vue {
    $accessor: typeof store;
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $accessor: typeof store;
  }

  interface Context {
    $accessor: typeof store;
  }
}
