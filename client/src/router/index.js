import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Login',
    component: () => import( /* webpackChunkName: "Login" */ '../views/Login.vue'),
    meta: { title: 'Skills - MyApp' },
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
    path: '/Overview',
    name: 'Overview',
    component: () => import( /* webpackChunkName: "Overview" */ '../views/Overview.vue'),
    // component: require('../views/Overview.vue').default,
  },
  {
    path: '/CreateGame',
    name: 'CreateGame',
    component: () => import( /* webpackChunkName: "Overview" */ '../views/CreateGame.vue'),
  },
  {
    path: '/History',
    name: 'History',
    component: () => import( /* webpackChunkName: "Overview" */ '../views/History.vue'),
  }, {
    path: '/Game/:id',
    component: () => import( /* webpackChunkName: "Overview" */ '../views/Game.vue'),
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
