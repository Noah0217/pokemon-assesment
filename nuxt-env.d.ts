import { NuxtConfig, NuxtOptionsRouter } from 'nuxt3';

declare module 'nuxt3' {
  interface NuxtConfig extends NuxtOptionsRouter {
    router: {
      extendRoutes(routes: Array<any>, resolve: Function): void;
    };
  }
}
