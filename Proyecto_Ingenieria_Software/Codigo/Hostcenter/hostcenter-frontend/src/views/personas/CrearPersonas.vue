<template>
    <v-container>
        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold-mb-3">Ingreso de personas</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <form v-on:submit.prevent="guardarPersona()">
                    <v-select
                        v-model="persona.tipo_identificacion"
                        :items="tipo"
                        item-value="value"
                        item-text="text"
                        label="Tipo"
                    ></v-select>
                    <v-text-field 
                        v-model="persona.identificacion"
                        label="Identificacion"
                        outlined
                        required
                    >
                    </v-text-field>
                    <v-text-field 
                        v-model="persona.nombres"
                        label="Nombres"
                        outlined
                        required
                    >
                    </v-text-field>
                    <v-text-field 
                        v-model="persona.apellidos"
                        label="Apellidos"
                        outlined
                        required
                    >
                    </v-text-field>
                    <v-text-field 
                        v-model="persona.direccion"
                        label="Direccion"
                        outlined
                        required
                    ></v-text-field>
                    <v-text-field 
                        v-model="persona.telefono"
                        label="Telefono"
                        outlined
                        type="number"
                        required
                    >
                    </v-text-field>
                    <v-text-field 
                        v-model="persona.email"
                        label="Email"
                        outlined
                        required
                    >
                    </v-text-field>
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="persona.fecha_nacimiento"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="persona.fecha_nacimiento"
                            label="Fecha Nacimiento"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="persona.fecha_nacimiento"
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
                            @click="$refs.menu.save(persona.fecha_nacimiento)"
                        >
                            OK
                        </v-btn>
                        </v-date-picker>
                    </v-menu>
                    <v-checkbox
                        v-model="persona.esCliente"
                        label="Es Cliente"
                    ></v-checkbox>
                    <v-checkbox
                        v-model="persona.esProveedor"
                        label="Es Proveedor"
                    ></v-checkbox>
                    <v-card-actions>
                        <v-btn to="/personas" color="blue-grey" class="mr-4">Cancelar</v-btn>
                        <v-btn type="submit" color="indigo" class="mr-4">Guardar</v-btn>
                    </v-card-actions>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
let url = 'http://localhost:3000/personas/'
import axios from 'axios';
export default {
    name:'CrearPersona',
    data(){
        return{
            //date: new Date().toISOString().substr(0, 10),
            persona:{
                tipo_identificacion:'',
                identificacion:'',
                nombres:'',
                apellidos:'',
                direccion:'',
                telefono:'',
                email:'',
                fecha_nacimiento: new Date().toISOString().substr(0, 10),
                esCliente:0,
                esProveedor:0,
                estado:'A'
            },
            tipo:[
                {text:'Cedula',value:'C'},
                {text:'Ruc',value:'R'}
            ],
            menu: false,
            //modal: false,
        }
    },
    methods:{
        guardarPersona(){
            let router=this.$router;
            console.log(router);
            let params = this.persona;
            console.log(params);
            console.log(url)
            axios.post(url,params)
            .then(()=>{
                router.push('/personas');
            })
            .catch(error=>{
                console.log(error.response.data);
            })
        }
    }
}
</script>