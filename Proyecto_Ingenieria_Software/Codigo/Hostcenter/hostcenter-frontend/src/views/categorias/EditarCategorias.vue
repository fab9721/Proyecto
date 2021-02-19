<template>
    <v-container>
        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold-mb-3">Edicion de Categorias</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <form v-on:submit.prevent="guardarCategoria()">
                    <v-text-field 
                        v-model="categoria.codigo"
                        label="Codigo"
                        outlined
                        readonly
                    >
                    </v-text-field>
                    <v-text-field 
                        v-model="categoria.descripcion"
                        label="Descripcion"
                        outlined
                        required
                    >
                    </v-text-field>
                    <v-card-actions>
                        <v-btn to="/categorias" color="blue-grey" class="mr-4">Cancelar</v-btn>
                        <v-btn type="submit" color="indigo" class="mr-4">Guardar</v-btn>
                    </v-card-actions>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
let url = 'http://localhost:3000/categorias/'
import axios from 'axios';
export default {
    name:'EditarCategoria',
    mounted(){
        //OBTENGO TODOS LOS DATOS
        this.categoria_id=this.$route.params.id
        //console.log(this.producto_id);
        axios.get(url+this.categoria_id)
        .then(response=>{
            this.categoria=response.data.categoria[0]
        }).catch((error)=>{
            console.log("El error de la peticion"+error);
        });
    },
    data(){
        return{
            categoria_id:null,
            categoria:{
                codigo:'',
                descripcion:''
            }
        }
    },
    methods:{
        
        guardarCategoria(){
            let router = this.$router;
            let params = this.categoria;
            axios.put(url+this.categoria_id,params)
            .then(()=>{
                router.push('/categorias');
            })
            .catch((error)=>{
                console.log(error);
            });
        }
    }
}
</script>