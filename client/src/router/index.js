import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Login',
    component: () => import( /* webpackChunkName: "Login" */ '../views/Login.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/overview',
    name: 'Overview',
    component: () => import( /* webpackChunkName: "Overview" */ '../views/Overview.vue'),
    // component: require('../views/Overview.vue').default,
  },
  {
    path: '/createGame',
    name: 'CreateGame',
    component: () => import( /* webpackChunkName: "Overview" */ '../views/CreateGame.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
