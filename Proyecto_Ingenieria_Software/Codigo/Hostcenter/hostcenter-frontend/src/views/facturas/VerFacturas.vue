<template>
    <v-container>
        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold-mb-3">Factura</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <form>
                    <v-text-field 
                        v-model="factura.cliente"
                        label="Cliente"
                        outlined
                        readonly
                    >
                    </v-text-field>
                    <v-text-field 
                        v-model="factura.vendedor"
                        label="Vendedor"
                        outlined
                        readonly
                    >
                    </v-text-field>
                    <v-text-field 
                        v-model="factura.fecha"
                        label="Fecha"
                        outlined
                        readonly
                    >
                    </v-text-field>
                </form>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="mb-4">
                <v-card>
                <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="factura.detalle"
                    :search="search"
                ></v-data-table>
            </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="mb-4">
                <v-text-field 
                        v-model="factura.cantidad_total"
                        label="Cantidad"
                        outlined
                        readonly
                >
                </v-text-field>
            </v-col>
            <v-col class="mb-4">
                <v-text-field 
                        v-model="factura.total_descuento"
                        label="Descuento"
                        outlined
                        readonly
                >
                </v-text-field>
            </v-col>
            <v-col class="mb-4">
                <v-text-field 
                        v-model="factura.total_iva"
                        label="Iva"
                        outlined
                        readonly
                >
                </v-text-field>
            </v-col>
            <v-col class="mb-4">
                <v-text-field 
                        v-model="factura.valor_total"
                        label="Total"
                        outlined
                        readonly
                >
                </v-text-field>
            </v-col>
        </v-row>
        <v-card-actions>
                        <v-btn to="/facturas" color="primary" class="mr-4">Cancelar</v-btn>
                        <!-- <v-btn type="submit" color="indigo" class="mr-4">Guardar</v-btn> -->
        </v-card-actions>
    </v-container>
</template>
<script>
let url = 'http://localhost:3000/facturas/'
import axios from 'axios';
export default {
    name:'VerFactura',
    mounted(){
        //OBTENGO TODOS LOS DATOS
        this.factura_id=this.$route.params.id
        //console.log(this.producto_id);
        axios.get(url+this.factura_id)
        .then(response=>{
            this.factura=response.data[0]
            console.log(this.factura);
        }).catch((error)=>{
            console.log("El error de la peticion"+error);
        });
    },
    data(){
        return{
            factura_id:null,
            search:'',
            headers: [
            { text: 'Producto', value: 'descripcion' },
            { text: 'Cantidad', value: 'cantidad' },
            { text: 'Precio', value: 'precio_unitario' },
            { text: 'Subtotal', value: 'subtotal' },
            { text: 'Descuento', value: 'valor_descuento' },
            { text: 'Iva', value: 'valor_iva' },
            { text: 'Total', value: 'valor_total' },
            ],
            factura:{
                cliente:'',
                vendedor:'',
                fecha:new Date().toISOString().substr(0, 10),
                cantidad_total:0,
                total_iva:0,
                total_descuento:0,
                valor_total:0,
                detalle:[
                    {
                        descripcion:null,
                        cantidad:null,
                        precio_unitario:null,
                        subtotal:null,
                        valor_descuento:null,
                        valor_iva:null,
                        valor_total:null
                    }
                ]
            },
            
        }
    },
    methods:{
    }
}
</script>