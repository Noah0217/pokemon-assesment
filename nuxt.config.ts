// nuxt.config.js
export default {
  // ... other configurations

  // Define custom routes
  generate: {
    routes: function () {
      const routes = [];
      for (let i = 1; i <= 63; i++) {
        routes.push(`/pokemon/${i}`);
      }
      return routes;
    },
  },

  // ... other configurations
};
