<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list
        nav
        dense
      >
      <template>
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>
                Catalogos
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{name:'ListarProductos'}">
            <v-list-item-action>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Productos
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{name:'ListarPersonas'}">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Personas
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{name:'ListarCategorias'}">
            <v-list-item-action>
              <v-icon>mdi-cards-variant</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Categorias
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{name:'ListarBodegas'}">
            <v-list-item-action>
              <v-icon>mdi-store</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Bodegas
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{name:'ListarUsuarios'}">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Usuarios
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>
                Ventas
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{name:''}">
            <v-list-item-action>
              <v-icon>mdi-file-chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Facturas
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>
                Inventario
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{name:''}">
            <v-list-item-action>
              <v-icon>mdi-redo</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Ingreso de Bodega
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{name:''}">
            <v-list-item-action>
              <v-icon>mdi-undo</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Egreso de Bodega
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>
                Reportes
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{name:''}">
            <v-list-item-action>
              <v-icon>mdi-chart-line</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Reporte de Ventas
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          


          <!-- <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Productos</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Personas</v-list-item-title>
          </v-list-item> -->
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Software de Ventas e Inventario</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app>
    <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ drawer: false,group: null, }),
  }
</script>