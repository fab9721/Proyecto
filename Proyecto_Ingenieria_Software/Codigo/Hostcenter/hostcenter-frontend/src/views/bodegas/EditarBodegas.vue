<template>
    <v-container>
        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold-mb-3">Edicion de bodegas</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <form v-on:submit.prevent="guardarBodega()">
                    <v-text-field 
                        v-model="bodega.codigo"
                        label="Codigo"
                        outlined
                        readonly
                    >
                    </v-text-field>
                    <v-text-field 
                        v-model="bodega.descripcion"
                        label="Descripcion"
                        outlined
                        required
                    >
                    </v-text-field>
                    <v-card-actions>
                        <v-btn to="/bodegas" color="blue-grey" class="mr-4">Cancelar</v-btn>
                        <v-btn type="submit" color="indigo" class="mr-4">Guardar</v-btn>
                    </v-card-actions>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
let url = 'http://localhost:3000/bodegas/'
import axios from 'axios';
export default {
    name:'EditarBodega',
    mounted(){
        //OBTENGO TODOS LOS DATOS
        this.bodega_id=this.$route.params.id
        //console.log(this.producto_id);
        axios.get(url+this.bodega_id)
        .then(response=>{
            this.bodega=response.data.bodega[0]
        }).catch((error)=>{
            console.log("El error de la peticion"+error);
        });
    },
    data(){
        return{
            bodega_id:null,
            bodega:{
                codigo:'',
                descripcion:''
            }
        }
    },
    methods:{
        guardarBodega(){
            let router = this.$router;
            let params = this.bodega;
            axios.put(url+this.bodega_id,params)
            .then(()=>{
                router.push('/bodegas');
            })
            .catch((error)=>{
                console.log(error);
            });
        }
    }
}
</script>