<template>
    <v-data-table
          :headers="headers"
          :items="categorias"
          sort-by="descripcion"
          class="elevation-1"
        >
        <template v-slot:top>
        <v-toolbar
          flat
        >
        <v-toolbar-title>Listado de Categorias</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              to="/categorias/crear"
            >
              Nuevo
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedCategoria.categoria_id"
                      label="ID"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedCategoria.codigo"
                      label="Codigo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedCategoria.descripcion"
                      label="Descripcion"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Esta seguro de eliminar este registro?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteCategoriaConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        color="blue darken-1"
        class="mr-2"
        @click="editCategoria(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        color="blue darken-1"
        @click="deleteCategoria(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reiniciar
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
let url = 'http://localhost:3000/categorias/'
//let articulos;
import axios from 'axios';
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'categoria_id',
        },
        { text: 'Codigo', value: 'codigo' },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      categorias: [],
      editedIndex: -1,
      editedCategoria: {
        categoria_id:0,
        codigo: '',
        descripcion: ''
      },
      defaultCategoria: {
        categoria_id:0,
        codigo: '',
        descripcion: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Categoria' : 'Editar Categoria'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        axios
            .get(url)
            .then(response=>{
              this.categorias = response.data.categoria;
              console.log(this.categorias);
            }).catch((error)=>{
                console.log(error);
            })
      },

      editCategoria (categoria) {
        this.editedIndex = this.categorias.indexOf(categoria)
        this.editedCategoria = Object.assign({}, categoria)
        this.$router.push({name: 'EditarCategorias',params:{id:categoria.categoria_id}})
        //this.dialog = true
      },

      deleteCategoria (categoria) {
        this.editedIndex = this.categorias.indexOf(categoria)
        this.editedCategoria = Object.assign({}, categoria)
        this.dialogDelete = true
      },

      deleteCategoriaConfirm () {
        let id = this.categorias[this.editedIndex].categoria_id;
        this.categorias.splice(this.editedIndex, 1)
        axios.delete(url+id)
        .then(()=>{
          this.initialize()
        })
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedCategoria = Object.assign({}, this.defaultCategoria)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedCategoria = Object.assign({}, this.defaultCategoria)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.categorias[this.editedIndex], this.editedCategoria)
        } else {
          this.categorias.push(this.editedCategoria)
        }
        this.close()
      },
    },
  }
</script>