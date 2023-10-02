({
  router: {
    extendRoutes(routes: any[], resolve: any) {
      routes.push({
        name: 'pokemon-detail',
        path: '/pokemon/:id',
        component: resolve(__dirname, 'path/to/[id].vue'),
      });
    },
  },
  build: {
    typescript: true,
  },
});