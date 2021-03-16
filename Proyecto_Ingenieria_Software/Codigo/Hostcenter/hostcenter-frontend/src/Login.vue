<template>
    <v-container>
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
                    <v-btn color="info" type="submit" @click="iniciarSesion">Aceptar</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-container>
    
</template>

<script>
let url = 'http://localhost:3000/user/login/'    
import axios from "axios"    
export default {    
    // name:"Login",
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
            await axios.post(url,params)
            .then(async response=>{
                //console.log(response.data);

                if(await response.data.result=="ok"){
                    //alert("Acceso correcto")
                    this.$router.replace({name:'home'})
                }
                else{
                    alert("El usuario o la contraseña no son correctos");
                }
                
            })
            .catch(error=>{
                console.log(error);
                //alert("Error");
                alert("El usuario o la contraseña no son correctos");
                // if(!response.data.result){
                //     alert(response.data.mensaje);
                // }
                // console.log(error.response.data);
            })
        }
    }
}
</script>