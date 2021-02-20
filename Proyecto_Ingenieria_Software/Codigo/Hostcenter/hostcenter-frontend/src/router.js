import Vue from 'vue'
import VueRouter from 'vue-router'

import ListarProducto from './views/productos/ListarProductos.vue'
import EditarProducto from './views/productos/EditarProductos.vue'
import CrearProducto from './views/productos/CrearProductos.vue'

import ListarPersonas from './views/personas/ListarPersonas.vue'
import EditarPersonas from './views/personas/EditarPersonas.vue'
import CrearPersonas from './views/personas/CrearPersonas.vue'

import ListarBodegas from './views/bodegas/ListarBodegas.vue'
import EditarBodegas from './views/bodegas/EditarBodegas.vue'
import CrearBodegas from './views/bodegas/CrearBodegas.vue'

import ListarCategorias from './views/categorias/ListarCategorias.vue'
import EditarCategorias from './views/categorias/EditarCategorias.vue'
import CrearCategorias from './views/categorias/CrearCategorias.vue'

import ListarUsuarios from './views/usuarios/ListarUsuarios.vue'
import EditarUsuarios from './views/usuarios/EditarUsuarios.vue'
import CrearUsuarios from './views/usuarios/CrearUsuarios.vue'


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Login',
  //   component: Login
  // },
  // {
  //   path: '/Home',
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
    name: 'CrearProductos',
    component: CrearProducto
  },
  {
    path: '/personas',
    name: 'ListarPersonas',
    component: ListarPersonas
  },
  {
    path: '/personas/editar/:id',
    name: 'EditarPersonas',
    component: EditarPersonas
  },
  {
    path: '/personas/crear/',
    name: 'CrearPersonas',
    component: CrearPersonas
  },
  {
    path: '/bodegas',
    name: 'ListarBodegas',
    component: ListarBodegas
  },
  {
    path: '/bodegas/editar/:id',
    name: 'EditarBodegas',
    component: EditarBodegas
  },
  {
    path: '/bodegas/crear/',
    name: 'CrearBodegas',
    component: CrearBodegas
  },
  {
    path: '/categorias',
    name: 'ListarCategorias',
    component: ListarCategorias
  },
  {
    path: '/categorias/editar/:id',
    name: 'EditarCategorias',
    component: EditarCategorias
  },
  {
    path: '/categorias/crear/',
    name: 'CrearCategorias',
    component: CrearCategorias
  },
  {
    path: '/usuarios',
    name: 'ListarUsuarios',
    component: ListarUsuarios
  },
  {
    path: '/usuarios/editar/:id',
    name: 'EditarUsuarios',
    component: EditarUsuarios
  },
  {
    path: '/usuarios/crear/',
    name: 'CrearUsuarios',
    component: CrearUsuarios
  },
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

