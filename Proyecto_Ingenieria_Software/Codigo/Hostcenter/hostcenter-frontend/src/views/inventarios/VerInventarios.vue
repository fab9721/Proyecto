<template>
    <v-container>
        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold-mb-3">Movimiento de Inventario</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <form>
                    <v-text-field 
                        v-model="inventario.fecha"
                        label="Fecha"
                        outlined
                        readonly
                    >
                    </v-text-field>
                    <v-text-field 
                        v-model="inventario.tipo"
                        label="Tipo"
                        outlined
                        readonly
                    >
                    </v-text-field>
                    <v-text-field 
                        v-model="inventario.bodega"
                        label="Bodega"
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
                    :items="inventario.detalle"
                    :search="search"
                ></v-data-table>
            </v-card>
            </v-col>
        </v-row>
        <v-card-actions>
                        <v-btn to="/inventarios" color="primary" class="mr-4">Cancelar</v-btn>
                        <!-- <v-btn type="submit" color="indigo" class="mr-4">Guardar</v-btn> -->
        </v-card-actions>
    </v-container>
</template>
<script>
let url = 'http://localhost:3000/inventarios/'
import axios from 'axios';
export default {
    name:'VerInventario',
    mounted(){
        //OBTENGO TODOS LOS DATOS
        this.movimiento_inventario_id=this.$route.params.id
        //console.log(this.producto_id);
        axios.get(url+this.movimiento_inventario_id)
        .then(response=>{
            this.inventario=response.data[0]
            console.log(this.inventario);
        }).catch((error)=>{
            console.log("El error de la peticion"+error);
        });
    },
    data(){
        return{
            movimiento_inventario_id:null,
            search:'',
            headers: [
            { text: 'Producto', value: 'descripcion' },
            { text: 'Cantidad', value: 'cantidad' },
            { text: 'Precio', value: 'precio_unitario' },
            { text: 'Total', value: 'total' },
            ],
            inventario:{
                fecha:new Date().toISOString().substr(0, 10),
                tipo:'',
                bodega:'',
                detalle:[
                    {
                        descripcion:null,
                        cantidad:null,
                        precio_unitario:null,
                        total:null
                    }
                ]
            },
            
        }
    },
    methods:{
    }
}
</script>