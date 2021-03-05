<template>
    <v-data-table
          :headers="headers"
          :items="facturas"
          sort-by="nombres"
          class="elevation-1"
        >
        <template v-slot:top>
        <v-toolbar
          flat
        >
        <v-toolbar-title>Listado de Facturas</v-toolbar-title>
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
              to="/facturas/crear"
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
                      v-model="editedFactura.factura_id"
                      label="ID"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedFactura.cliente"
                      label="Cliente"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedFactura.vendedor"
                      label="Vendedor"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedFactura.fecha"
                      label="Fecha"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedFactura.cantidad_total"
                      label="Cant. Total"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedFactura.total_iva"
                      label="Tot. Iva"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedFactura.total_descuento"
                      label="Tot. Descuento"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedFactura.valor_total"
                      label="Total"
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
              <v-btn color="blue darken-1" text @click="deleteFacturaConfirm">OK</v-btn>
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
        @click="editFactura(item)"
      >
        mdi-eye
      </v-icon>
      <v-icon
        small
        color="blue darken-1"
        @click="deleteFactura(item)"
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
let url = 'http://localhost:3000/facturas/'
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
          value: 'factura_id',
        },
        { text: 'Cliente', value: 'cliente' },
        { text: 'Vendedor', value: 'vendedor' },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Cant. Total', value: 'cantidad_total' },
        { text: 'Tot. Iva', value: 'total_iva' },
        { text: 'Tot. Descuento', value: 'total_descuento' },
        { text: 'Total', value: 'valor_total' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      facturas: [],
      editedIndex: -1,
      editedFactura: {
        factura_id:0,
        cliente:'',
        vendedor:'',
        fecha:'',
        cantidad_total:0,
        total_iva:0,
        total_descuento:0,
        valor_total:0
      },
      defaultFactura: {
        factura_id:0,
        cliente:'',
        vendedor:'',
        fecha:'',
        cantidad_total:0,
        total_iva:0,
        total_descuento:0,
        valor_total:0
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Factura' : 'Editar Factura'
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
              this.facturas = response.data.factura;
              console.log(this.facturas);
            }).catch((error)=>{
                console.log(error);
            })
      },

      editFactura(factura) {
        this.editedIndex = this.facturas.indexOf(factura)
        this.editedFactura = Object.assign({}, factura)
        this.$router.push({name: 'VerFacturas',params:{id:factura.factura_id}})
        //this.dialog = true
      },

      deleteFactura (factura) {
        this.editedIndex = this.facturas.indexOf(factura)
        this.editedFactura = Object.assign({}, factura)
        this.dialogDelete = true
      },

      deleteFacturaConfirm () {
        let id = this.facturas[this.editedIndex].factura_id;
        this.facturas.splice(this.editedIndex, 1)
        axios.delete(url+id)
        .then(()=>{
          this.initialize()
        })
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedFactura = Object.assign({}, this.defaulFactura)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedFactura = Object.assign({}, this.defaultFactura)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.facturas[this.editedIndex], this.editedFactura)
        } else {
          this.facturas.push(this.editedFactura)
        }
        this.close()
      },
    },
  }
</script>