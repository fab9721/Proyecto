<template>
    <v-container>
        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold-mb-3">Ingreso de bodegas</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <form v-on:submit.prevent="guardarBodega()">
                    <v-text-field 
                        v-model="bodega.codigo"
                        label="Codigo"
                        outlined
                        required
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
    name:'CrearBodega',
    data(){
        return{
            bodega:{
                codigo:'',
                descripcion:''
            }
        }
    },
    methods:{
        guardarBodega(){
            let router=this.$router;
            let params = this.bodega;
            axios.post(url,params)
            .then(()=>{
                router.push('/bodegas');
            })
            .catch(error=>{
                console.log(error.response.data);
            })
        }
    }
}
</script>