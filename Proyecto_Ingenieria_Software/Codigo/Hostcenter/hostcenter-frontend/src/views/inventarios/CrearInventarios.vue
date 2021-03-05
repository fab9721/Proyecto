<template>
    <v-container>
        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold-mb-3">Ingreso de Movimientos de Inventarios</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <form v-on:submit.prevent="guardarInventario()">
                    <v-select
                        v-model="inventario.tipo"
                        :items="tipo"
                        item-value="value"
                        item-text="text"
                        label="Tipo"
                    ></v-select>
                    <v-select
                        v-model="inventario.bodega_id"
                        item-value="bodega_id"
                        item-text="descripcion"
                        :items = "bodega"
                        label="Bodega"
                        required
                        :rules="rules.select"
                    >
                    </v-select>
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="inventario.fecha"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="inventario.fecha"
                            label="Fecha"
                            append-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="inventario.fecha"
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
                            @click="$refs.menu.save(inventario.fecha)"
                        >
                            OK
                        </v-btn>
                        </v-date-picker>
                    </v-menu>
                    <!-- DETALLE DEL MOVIMIENTO -->
                    <v-data-table
                        :headers="headers"
                        :items="inventario.detalle"
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
                                        v-model="editedItem.total"
                                        label="Total"
                                        readonly
                                        :value="total"
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
                        <v-btn to="/inventarios" color="secondary" dark class="mr-4">Cancelar</v-btn>
                        <v-btn type="submit" color="primary" dark class="mr-4">Guardar</v-btn>
                    </v-card-actions>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
let url = 'http://localhost:3000/inventarios/'
import axios from 'axios';
export default {
    name:'CrearInventario',
    created(){
        this.obtenerItems();
        this.obtenerBodegas();
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
                { text: 'Total', value: 'total' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            //desserts: [],
            editedIndex: -1,
            editedItem: {
                producto_id:0,
                descripcion: '',
                cantidad: 0,
                precio_unitario: 0.0,
                total: 0.0,
            },
            defaultItem: {
                producto_id:0,
                descripcion: '',
                cantidad: 0,
                precio_unitario: 0.0,
                total: 0.0,
            },
            inventario:{
                tipo:'',
                bodega_id:'',
                fecha:new Date().toISOString().substr(0, 10),
                detalle:[
                    {
                        movimiento_inventario_id:null,
                        producto_id:null,
                        descripcion:null,
                        cantidad:null,
                        precio_unitario:null,
                        total:null
                    }
                ]
            },
            tipo:[
                {text:'Ingreso',value:'I'},
                {text:'Egreso',value:'E'}
            ],
            item:[],
            bodega: [],
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
      total: function(){
          let total=0;
          if(this.editedItem.cantidad>0){
            total = this.editedItem.cantidad*this.editedItem.precio_unitario
            
          }
          this.editedItem.total = total;
          return total;
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
        this.inventario.detalle.splice(this.inventario.detalle.indexOf(0), 1)
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
        obtenerBodegas(){
            axios.get('http://localhost:3000/bodega/all/')
            .then(response=>{
                console.log(this.bodega);
                this.bodega = response.data.data;
                console.log(this.bodega.descripcion);
            }).catch((error)=>{
                console.log(error);
            })
        },
        guardarInventario(){
            let router=this.$router;
            let params = this.inventario;
            console.log(this.inventario);
            axios.post(url,params)
            .then(()=>{
                router.push('/inventarios');
            })
            .catch(error=>{
                console.log(error.response.data);
            })
        },
        editItem (item) {
            this.editedIndex = this.inventario.detalle.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.inventario.detalle.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.inventario.detalle.splice(this.editedIndex, 1)
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
            Object.assign(this.inventario.detalle[this.editedIndex], this.editedItem)
            } else {
            this.inventario.detalle.push(this.editedItem)
            }
            //console.log(factura);
            this.close()
        },
    }
}
</script>