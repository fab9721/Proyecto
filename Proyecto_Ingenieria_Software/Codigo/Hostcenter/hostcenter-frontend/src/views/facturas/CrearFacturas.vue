<template>
    <v-container>
        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold-mb-3">Ingreso de Facturas</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <form v-on:submit.prevent="guardarFactura()">
                    <v-select
                        v-model="factura.persona_id"
                        item-value="persona_id"
                        item-text="nombres"
                        :items = "persona"
                        label="Cliente"
                        required
                        :rules="rules.select"
                    >
                    </v-select>
                    <v-select
                        v-model="factura.vendedor_id"
                        item-value="persona_id"
                        item-text="nombres"
                        :items = "vendedor"
                        label="Vendedor"
                        required
                        :rules="rules.select"
                    >
                    </v-select>
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="factura.fecha"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="factura.fecha"
                            label="Fecha Factura"
                            append-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="factura.fecha"
                        no-title
                        scrollable
                        >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(factura.fecha)"
                        >
                            OK
                        </v-btn>
                        </v-date-picker>
                    </v-menu>
                    <!-- DETALLE DE LA FACTURA -->
                    <v-data-table
                        :headers="headers"
                        :items="factura.detalle"
                        class="elevation-1"
                    >
                        <template v-slot:top>
                        <v-toolbar
                            flat
                        >
                            <v-toolbar-title>Detalle</v-toolbar-title>
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
                                >
                                Agregar
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
                                        <v-select
                                            v-model="editedItem"
                                            item-value="producto_id"
                                            item-text="descripcion"
                                            :items = "item"
                                            :hint="`${editedItem.producto_id}, ${editedItem.descripcion}`"
                                            label="Producto"
                                            required
                                            :rules="rules.select"
                                            return-object
                                        >
                                        </v-select>
                                    </v-col>
                                    <!-- <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                        v-model="editedItem.descripcion"
                                        readonly
                                        label="Producto"
                            
                                        ></v-text-field>
                                    </v-col> -->
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                        v-model="editedItem.cantidad"
                                        label="Cantidad"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                        v-model="editedItem.precio_unitario"
                                        label="Precio Unitario"
                                        readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                        v-model="editedItem.subtotal"
                                        label="Subtotal"
                                        readonly
                                        :value="subtotal"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                        v-model="editedItem.valor_descuento"
                                        label="Descuento"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                        v-model="editedItem.valor_iva"
                                        label="Iva"
                                        readonly
                                        :value="iva"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                        v-model="editedItem.valor_total"
                                        label="Valor Total"
                                        readonly
                                        :value="val_total"
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
                                    Cancel
                                </v-btn>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="save"
                                >
                                    Save
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
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
                            class="mr-2"
                            @click="editItem(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                            small
                            @click="deleteItem(item)"
                        >
                            mdi-delete
                        </v-icon>
                        </template>
                        <template v-slot:no-data>
                        </template>
                    </v-data-table>
                    <v-card-actions>
                        <v-btn to="/facturas" color="secondary" dark class="mr-4">Cancelar</v-btn>
                        <v-btn type="submit" color="primary" dark class="mr-4">Guardar</v-btn>
                    </v-card-actions>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
let url = 'http://localhost:3000/facturas/'
let urlPersona = 'http://localhost:3000/persona/all/'
let urlVendedor = 'http://localhost:3000/vendedor/all/'
import axios from 'axios';
export default {
    name:'CrearFactura',
    created(){
        this.obtenerPersonas();
        this.obtenerVendedores();
        this.obtenerItems();
    },
    data(){
        return{
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: 'Producto ID',
                    align: 'start',
                    sortable: false,
                    value: 'producto_id',
                },
                { text: 'Producto', value: 'descripcion' },
                { text: 'Cantidad', value: 'cantidad' },
                { text: 'Precio', value: 'precio_unitario' },
                { text: 'Subtotal', value: 'subtotal' },
                { text: 'Descuento', value: 'valor_descuento' },
                { text: 'Iva', value: 'valor_iva' },
                { text: 'Total', value: 'valor_total' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            //desserts: [],
            editedIndex: -1,
            editedItem: {
                producto_id:0,
                descripcion: '',
                cantidad: 0,
                precio_unitario: 0.0,
                subtotal: 0.0,
                valor_descuento:0.0,
                valor_iva: 0.0,
                valor_total:0.0,
                graba_iva:0
            },
            defaultItem: {
                producto_id:0,
                descripcion: '',
                cantidad: 0,
                precio_unitario: 0.0,
                subtotal: 0.0,
                valor_descuento:0.0,
                valor_iva: 0.0,
                valor_total:0.0,
                graba_iva:0
            },
            factura:{
                persona_id:'',
                vendedor_id:'',
                fecha:new Date().toISOString().substr(0, 10),
                cantidad_total:0,
                total_iva:0,
                total_descuento:0,
                valor_total:0,
                detalle:[
                    {
                        factura_id:null,
                        producto_id:null,
                        descripcion:null,
                        cantidad:0,
                        precio_unitario:0,
                        subtotal:0,
                        valor_descuento:0,
                        valor_iva:0,
                        valor_total:0
                    }
                ]
            },
            persona: [],
            vendedor:[],
            item:[],
            rules: {
                select: [(v) => !!v || "Item is required"],
                select2: [(v) =>  v.length>0 || "Item is required in select 2"],
            },
            menu: false,
        }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Articulo' : 'Editar Articulo'
      },
      subtotal: function(){
          let subtotal=0;
          if(this.editedItem.cantidad>0){
            subtotal = this.editedItem.cantidad*this.editedItem.precio_unitario
            
          }
          this.editedItem.subtotal = subtotal;
          this.editedItem.valor_descuento = 0;
          return subtotal;
      },
      iva:function(){
          let iva=0;
          console.log(this.editedItem.graba_iva);
          if(this.editedItem.graba_iva==1){
              let descuento = 0;
              descuento =  this.editedItem.valor_descuento>0?this.editedItem.valor_descuento:0;
              if(this.editedItem.cantidad>0){
                  iva = ((this.editedItem.cantidad*this.editedItem.precio_unitario)-descuento)*0.12
              }
              
          }
          this.editedItem.valor_iva = iva;
          return iva;
      },
      val_total:function(){
          let val_total = 0;
          if(this.editedItem.cantidad>0){
              let subtotal = this.editedItem.cantidad*this.editedItem.precio_unitario
              let descuento = this.editedItem.valor_descuento>0?this.editedItem.valor_descuento:0;
              let iva = ((this.editedItem.cantidad*this.editedItem.precio_unitario)-descuento)*0.12;

              val_total = (subtotal - descuento) + iva;
              
          }
          this.editedItem.valor_total = val_total;
          return val_total;
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
    mounted() {
        this.factura.detalle.splice(this.factura.detalle.indexOf(0), 1)
    },
    methods:{
        obtenerPersonas(){
            axios.get(urlPersona)
            .then(response=>{
                this.persona = response.data.data;
                console.log(this.persona);
            }).catch((error)=>{
                console.log(error);
            })
        },
        obtenerVendedores(){
            axios.get(urlVendedor)
            .then(response=>{
                this.vendedor = response.data.data;
                console.log(this.vendedor);
            }).catch((error)=>{
                console.log(error);
            })
        },
        obtenerItems(){
            axios.get('http://localhost:3000/items/all/')
            .then(response=>{
                console.log(this.item);
                this.item = response.data.data;
                console.log(this.item.descripcion);
            }).catch((error)=>{
                console.log(error);
            })
        },
        guardarFactura(){
            let router=this.$router;
            let params = this.factura;
            console.log(this.factura);
            axios.post(url,params)
            .then(()=>{
                router.push('/facturas');
            })
            .catch(error=>{
                console.log(error.response.data);
            })
        },
        editItem (item) {
            this.editedIndex = this.factura.detalle.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.factura.detalle.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.factura.detalle.splice(this.editedIndex, 1)
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
        // changeRoute(a) {
        //     //this.editedItem.producto=a.text
        //     //console.log(this.editedItem.producto)
        // },
        save () {
            if (this.editedIndex > -1) {
            Object.assign(this.factura.detalle[this.editedIndex], this.editedItem)
            } else {
            this.factura.detalle.push(this.editedItem)
            }
            //console.log(factura);
            this.close()
        },
    }
}
</script>