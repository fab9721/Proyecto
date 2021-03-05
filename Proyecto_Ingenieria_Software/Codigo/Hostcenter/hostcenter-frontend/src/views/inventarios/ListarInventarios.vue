<template>
    <v-data-table
          :headers="headers"
          :items="inventarios"
          sort-by="fecha"
          class="elevation-1"
        >
        <template v-slot:top>
        <v-toolbar
          flat
        >
        <v-toolbar-title>Listado de Movimientos de Inventario</v-toolbar-title>
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
              to="/inventarios/crear"
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
                      v-model="editedItem.movimiento_inventario_id"
                      label="ID"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.fecha"
                      label="Fecha"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.bodega"
                      label="Bodega"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.tipo"
                      label="Tipo"
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
              <v-btn color="blue darken-1" text @click="closeDelete">Regresar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
        @click="editItem(item)"
      >
        mdi-eye
      </v-icon>
      <v-icon
        small
        color="blue darken-1"
        @click="deleteItem(item)"
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
let url = 'http://localhost:3000/inventarios/'
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
          value: 'movimiento_inventario_id',
        },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Bodega', value: 'bodega' },
        { text: 'Tipo', value: 'tipo' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      inventarios: [],
      editedIndex: -1,
      editedItem: {
        movimiento_inventario_id:0,
        fecha: '',
        bodega: '',
        tipo: '',
      },
      defaultItem: {
        movimiento_inventario_id:0,
        fecha: '',
        bodega: '',
        tipo: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Inventario' : 'Editar Inventario'
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
              this.inventarios = response.data.inventario;
              console.log(this.inventarios);
            }).catch((error)=>{
                console.log(error);
            })
      },

      editItem (item) {
        this.editedIndex = this.inventarios.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.$router.push({name: 'VerInventarios',params:{id:item.movimiento_inventario_id}})
        //this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.inventarios.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        let id = this.inventarios[this.editedIndex].movimiento_inventario_id;
        this.inventarios.splice(this.editedIndex, 1)
        axios.delete(url+id)
        .then(()=>{
          this.initialize()
        })
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.inventarios[this.editedIndex], this.editedItem)
        } else {
          this.inventarios.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>