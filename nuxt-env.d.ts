// nuxt-env.d.ts
import { Configuration } from 'nuxt';

declare module 'nuxt/types' {
  interface NuxtConfig extends Configuration {
    // Add custom configurations if needed
  }
}
