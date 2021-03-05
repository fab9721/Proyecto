import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './Login.vue'

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

import ListarFacturas from './views/facturas/ListarFacturas.vue'
import CrearFacturas from './views/facturas/CrearFacturas.vue'
import VerFacturas from './views/facturas/VerFacturas.vue'

import ListarInventarios from './views/inventarios/ListarInventarios.vue'
import VerInventarios from './views/inventarios/VerInventarios.vue'
import CrearInventarios from './views/inventarios/CrearInventarios.vue'

import ReporteVentas from './views/reportes/ReporteVentas.vue'
// import Login from './Login.vue'
import Home from './Home.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Login',
  //   component: Login
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
  {
    path: '/facturas',
    name: 'ListarFacturas',
    component: ListarFacturas
  },
  {
    path: '/facturas/crear/',
    name: 'CrearFacturas',
    component: CrearFacturas
  },
  {
    path: '/facturas/ver/',
    name: 'VerFacturas',
    component: VerFacturas
  },
  {
    path: '/inventarios',
    name: 'ListarInventarios',
    component: ListarInventarios
  },
  {
    path: '/inventarios/crear/',
    name: 'CrearInventarios',
    component: CrearInventarios
  },
  {
    path: '/inventarios/ver/',
    name: 'VerInventarios',
    component: VerInventarios
  },
  {
    path: '/reporte',
    name: 'ReporteVentas',
    component: ReporteVentas
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
