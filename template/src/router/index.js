import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/{{ root_path }}',
      redirect: '/{{ root_path }}/search',
      component: () => import('@/views/index'),
      children: [
        {
          path: 'search',
          name: 'search',
          component: () => import('@/views/search'),
        },
        {
          path: 'analysis',
          name: 'analysis',
          component: () => import('@/views/analysis'),
        },
      ],
    },
  ],
});
