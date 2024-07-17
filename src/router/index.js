import { createRouter ,/* createWebHistory*/ createWebHashHistory  } from 'vue-router';
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'ProjectInfo',
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
        component: () => import('@/views/DifferenceExpression.vue')
      },{
        path:'workflowInfo',
        name:'workflowInfo',
        component: () => import('@/views/WorkflowInfo.vue')
      },{
        path:'/:catchAll(.*)',
        name:'notfound',
        component:()=>import('@/views/Notfound.vue')
      },
      {
        path:'/functionEnrichment',
        name:'FunctionEnrichment',
        component: () => import('@/views/functionEnrich/FunctionalEnrichment.vue')
      },
      {
        path:'/fe_kegg',
        name:'FunctionEnrichmentKEGG',
        component: () => import('@/views/functionEnrich/Fun_Enrich_KEGG.vue')
      },
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
