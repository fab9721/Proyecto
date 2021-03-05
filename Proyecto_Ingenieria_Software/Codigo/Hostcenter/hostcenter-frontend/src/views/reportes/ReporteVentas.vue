<template>
    <v-container>
        <v-row>
            <v-col>
                <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="fecha_hasta"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="fecha_desde"
                                label="Fecha Desde"
                                append-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="fecha_desde"
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
                                @click="$refs.menu.save(fecha_desde)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                </v-menu>
            </v-col>
            <v-col>
                <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :return-value.sync="fecha_hasta"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="fecha_hasta"
                                label="Fecha Hasta"
                                append-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="fecha_hasta"
                            no-title
                            scrollable
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu2 = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu2.save(fecha_hasta)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                </v-menu>
            </v-col>
            <v-col>
                <v-card-actions>
                        <v-btn  color="primary" class="mr-4" @click="buscar">Buscar</v-btn>
                </v-card-actions>
            </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-row>
            <v-col class="mb-4">
                <v-data-table
                    :headers="headers"
                    :items="ventas"
                    :search="search"
                ></v-data-table>
            </v-col>
            
        </v-row>
    </v-container>
</template>

<script>
let url = 'http://localhost:3000/reporteventas/'
import axios from 'axios';
export default {
    name:'CrearPersona',
    data(){
        return{
            fecha_desde: new Date().toISOString().substr(0, 10),
            fecha_hasta: new Date().toISOString().substr(0, 10),
            menu: false,
            menu2:false,
            search: '',
            headers: [
                { text: 'Cliente', value: 'cliente' },
                { text: 'Cantidad', value: 'cantidad' },
                { text: 'Total', value: 'total' },
            ],
            ventas:[],
            //modal: false,
            search:''
        }
    },
    methods:{
        buscar(){
            axios
            .get(url+this.fecha_desde+'/'+this.fecha_hasta)
            .then(response=>{
              this.ventas = response.data.reporte;
              console.log(response.data.reporte);
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
}
</script>