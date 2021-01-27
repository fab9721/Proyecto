import Vue from 'vue'
import VueRouter from 'vue-router'

import ListarProducto from './views/productos/ListarProductos.vue'
import EditarProducto from './views/productos/EditarProductos.vue'
import CrearProducto from './views/productos/CrearProductos.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/productos',
    name: 'ListarProductos',
    component: ListarProducto
  },
  {
    path: '/productos/editar/:id',
    name: 'EditarProductos',
    component: EditarProducto
  },
  {
    path: '/productos/crear/',
    name: 'EditarProductos',
    component: CrearProducto
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
