import { createRouter ,/* createWebHistory*/ createWebHashHistory  } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// const currentURL =  window.location.href;
// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path:  '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'ProjectInfo',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'readAlignment',
        name:'ReadAlignment',
        component: () => import('@/views/ReadPage.vue')
      },
      {
        path: 'visualization',
        name:'Visualization',
        component: () => import('@/views/VisualizationPage.vue')
      },
      {
        path: 'differenceExpression',
        name:'DifferenceExpression',
        component: () => import('@/views/DisserenceExpression.vue')
      }
    ],
  },
]
const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history:createWebHashHistory(),
  // createWebHashHistory
  base: process.env.BASE_URL,
  routes
})

export default router
