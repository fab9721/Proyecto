<template>
    <v-data-table
          :headers="headers"
          :items="bodegas"
          sort-by="descripcion"
          class="elevation-1"
        >
        <template v-slot:top>
        <v-toolbar
          flat
        >
        <v-toolbar-title>Listado de Bodegas</v-toolbar-title>
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
              to="/bodegas/crear"
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
                      v-model="editedBodega.bodega_id"
                      label="ID"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedBodega.codigo"
                      label="Codigo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedBodega.descripcion"
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
              <v-btn color="blue darken-1" text @click="deleteBodegaConfirm">OK</v-btn>
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
        @click="editBodega(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        color="blue darken-1"
        @click="deleteBodega(item)"
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
let url = 'http://localhost:3000/bodegas/'
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
          value: 'bodega_id',
        },
        { text: 'Codigo', value: 'codigo' },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      bodegas: [],
      editedIndex: -1,
      editedBodega: {
        bodega_id:0,
        codigo: '',
        descripcion: ''
      },
      defaultBodega: {
        bodega_id:0,
        codigo: '',
        descripcion: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Bodega' : 'Editar Bodega'
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
              this.bodegas = response.data.bodega;
              console.log(this.bodegas);
            }).catch((error)=>{
                console.log(error);
            })
      },

      editBodega (bodega) {
        this.editedIndex = this.bodegas.indexOf(bodega)
        this.editedBodega = Object.assign({}, bodega)
        this.$router.push({name: 'EditarBodegas',params:{id:bodega.bodega_id}})
        //this.dialog = true
      },

      deleteBodega (bodega) {
        this.editedIndex = this.bodegas.indexOf(bodega)
        this.editedBodega = Object.assign({}, bodega)
        this.dialogDelete = true
      },

      deleteBodegaConfirm () {
        this.bodegas.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedBodega = Object.assign({}, this.defaultBodega)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedBodega = Object.assign({}, this.defaultBodega)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.bodegas[this.editedIndex], this.editedBodega)
        } else {
          this.bodegas.push(this.editedBodega)
        }
        this.close()
      },
    },
  }
</script>