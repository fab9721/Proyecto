<template>
    <v-container>
        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold-mb-3">Edicion de Usuarios</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <form v-on:submit.prevent="guardarUsuario()">
                    <v-text-field 
                        v-model="usuario.codigo"
                        label="Codigo"
                        outlined
                        readonly
                    >
                    </v-text-field>
                    <v-select
                        v-model="usuario.tipo_usuario_id"
                        item-value="tipo_usuario_id"
                        item-text="descripcion"
                        :items = "tipousuario"
                        label="Tipo Usuario"
                        required
                    >
                    </v-select> 
                    <v-text-field 
                        v-model="usuario.nombres"
                        label="Nombres"
                        outlined
                        required
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="usuario.clave"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Clave"
                        hint="Minimo 8 caracteres"
                        counter
                        @click:append="show1 = !show1"
                    ></v-text-field>
                    <v-card-actions>
                        <v-btn to="/usuarios" color="blue-grey" class="mr-4">Cancelar</v-btn>
                        <v-btn type="submit" color="indigo" class="mr-4">Guardar</v-btn>
                    </v-card-actions>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
let url = 'http://localhost:3000/user/'
let urlTipoUsuario = 'http://localhost:3000/tipousuario/all/'
import axios from 'axios';
export default {
    name:'EditarUsuario',
    mounted(){

         //OBTENGO LOS TIPOS DE USUARIOS
        this.obtenerTiposUsuarios();

        //OBTENGO TODOS LOS DATOS
        this.usuario_id=this.$route.params.id
        //console.log(this.producto_id);
        axios.get(url+this.usuario_id)
        .then(response=>{
            this.usuario=response.data.usuario[0]
        }).catch((error)=>{
            console.log("El error de la peticion"+error);
        });
    },
    data(){
        return{
            show1: false,
            rules: {
                required: value => !!value || 'Requerido.',
                min: v => v.length >= 8 || 'Minimo 8 caracteres',
            },
            usuario_id:null,
            usuario:{
                tipo_usuario_id:0,
                nombres:'',
                clave: ''
            },
            tipousuario:[],
        }
    },
    methods:{
        obtenerTiposUsuarios(){
            axios.get(urlTipoUsuario)
            .then(response=>{
                this.tipousuario = response.data.data;
                console.log(this.tipousuario);
            }).catch((error)=>{
                console.log(error);
            })
        },
        guardarUsuario(){
            let router = this.$router;
            let params = this.usuario;
            axios.put(url+this.usuario_id,params)
            .then(()=>{
                router.push('/usuarios');
            })
            .catch((error)=>{
                console.log(error);
            });
        }
    }
}
</script>