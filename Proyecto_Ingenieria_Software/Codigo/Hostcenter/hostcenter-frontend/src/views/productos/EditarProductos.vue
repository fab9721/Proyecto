<template>
    <v-container>
        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold-mb-3">Edicion de productos</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <form v-on:submit.prevent="guardarProducto()">
                    <v-text-field 
                        v-model="articulo.codigo"
                        label="Codigo"
                        outlined
                        required
                    >
                    </v-text-field>
                    <v-text-field 
                        v-model="articulo.descripcion"
                        label="Descripcion"
                        outlined
                        required
                    >
                    </v-text-field>
                    <v-select
                        v-model="articulo.categoria_id"
                        item-value="categoria_id"
                        item-text="descripcion"
                        :items = "categoria"
                        label="Categoria"
                        required
                    >
                    </v-select>
                    <v-text-field 
                        v-model="articulo.stock"
                        label="Stock"
                        outlined
                        type="number"
                        required
                    >
                    </v-text-field>
                    <v-text-field 
                        v-model="articulo.precio_unitario"
                        label="Precio"
                        outlined
                        type="number"
                        prefix="$"
                        required
                    >
                    </v-text-field>
                    <v-radio-group label="Graba Iva?"
                        v-model="articulo.graba_iva"
                    >     
                        <v-radio name="iva" label="NO" :value="0"></v-radio>
                        <v-radio name="iva" label="SI" :value="1"></v-radio>
                    </v-radio-group>
                    <v-text-field 
                        v-model="articulo.porcentaje_descuento"
                        label="% Descuento"
                        outlined
                        type="number"
                        prefix="%"
                    >
                    </v-text-field>
                    <v-card-actions>
                        <v-btn to="/productos" color="blue-grey" class="mr-4">Cancelar</v-btn>
                        <v-btn type="submit" color="indigo" class="mr-4">Guardar</v-btn>
                    </v-card-actions>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
let url = 'http://localhost:3000/productos/'
let urlCategoria = 'http://localhost:3000/categorias/all/'
import axios from 'axios';
export default {
    name:'EditarProducto',
    mounted(){
        //OBTENGO LAS CATEGORIAS
        this.obtenerCategorias();

        //OBTENGO TODOS LOS DATOS
        this.producto_id=this.$route.params.id
        //console.log(this.producto_id);
        axios.get(url+this.producto_id)
        .then(response=>{
            this.articulo=response.data.producto[0]
            //console.log("Datos")
            //console.log(response.data.data[0]);
        }).catch((error)=>{
            console.log("El error de la peticion"+error);
        });
        
        
    },
    data(){
        return{
            producto_id:null,
            articulo:{
                categoria_id:null,
                codigo:'',
                descripcion:'',
                stock:0,
                precio_unitario:0,
                graba_iva:null,
                porcentaje_descuento:null
            },
            categoria:[]
        }
    },
    methods:{
        guardarProducto(){
            let router = this.$router;
            let params = this.articulo;
            axios.put(url+this.producto_id,params)
            .then(()=>{
                router.push('/productos');
            })
            .catch((error)=>{
                console.log(error);
            });
        },
        obtenerCategorias(){
            axios.get(urlCategoria)
            .then(response=>{
                this.categoria = response.data.data;
                console.log(this.categoria);
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
}
</script>