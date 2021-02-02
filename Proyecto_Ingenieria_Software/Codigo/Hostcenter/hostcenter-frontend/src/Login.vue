<template>
    <v-content>
        <form v-on:submit.prevent="iniciarSesion()">
            <v-card width="500" class="mx-auto mt-9">
                <v-card-title>Inicio de Sesion</v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model="user.usuario"
                        label="Usuario" 
                        prepend-icon="mdi-account" required 
                    />
                    <v-text-field 
                        v-model="user.clave"
                        required 
                        label="Password " 
                        :type="showPassword?'text':'password' " 
                        prepend-icon="mdi-lock" 
                        :append-icon="showPassword?'mdi-eye':'mdi-eye-off'"
                        @click:append="showPassword =!showPassword " 
                    />
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="sucess">Registrate</v-btn>
                    <v-btn color="info" type="submit">Login</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-content>
    
</template>

<script>
let url = 'http://localhost:3000/user/login/'    
//import axios from "axios"    
export default {    
    name:"Login",
    mounted(){
        this.iniciarSesion();
    },
    data(){
        return{
            user:{
                usuario:'',
                clave:''
            },
            showPassword:false
        }
    },
    methods:{
       async iniciarSesion(){
            //let router=this.$router;
            let params = this.user;
            console.log(url);
            console.log(params);

            //router.push('/Home')

            // await axios.post(url,params)
            // .then(response=>{
            //     console.log(response.data);
            //     alert("Acceso correcto")
            //     //REDI
            //     router.push('d')
            // })
            // .catch(error=>{
            //     console.log(error.data);
            //     // if(!response.data.result){
            //     //     alert(response.data.mensaje);
            //     // }
            //     // console.log(error.response.data);
            // })
        }
    }
}
</script>