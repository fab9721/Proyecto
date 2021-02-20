<template>
    <v-data-table
          :headers="headers"
          :items="usuarios"
          sort-by="nombres"
          class="elevation-1"
        >
        <template v-slot:top>
        <v-toolbar
          flat
        >
        <v-toolbar-title>Listado de Usuarios</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              to="/usuarios/crear"
            >
              Nuevo
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedUsuario.usuario_id"
                      label="ID"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedUsuario.tipo_usuario"
                      label="Tipo Usuario"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedUsuario.codigo"
                      label="Codigo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedUsuario.usuario"
                      label="Usuario"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedUsuario.nombres"
                      label="Nombres"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Esta seguro de eliminar este registro?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteUsuarioConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        color="blue darken-1"
        class="mr-2"
        @click="editUsuario(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        color="blue darken-1"
        @click="deleteUsuario(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reiniciar
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
let url = 'http://localhost:3000/user/'
//let articulos;
import axios from 'axios';
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'usuario_id',
        },
        { text: 'Tipo Usuario', value: 'tipo_usuario' },
        { text: 'Codigo', value: 'codigo' },
        { text: 'Usuario', value: 'usuario' },
        { text: 'Nombres', value: 'nombres' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      usuarios: [],
      editedIndex: -1,
      editedUsuario: {
        usuario_id:0,
        tipo_usuario:'',
        codigo: '',
        usuario:'',
        nombres: ''
      },
      defaultUsuario: {
        usuario_id:0,
        tipo_usuario:'',
        codigo: '',
        usuario:'',
        nombres: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        axios
            .get(url)
            .then(response=>{
              this.usuarios = response.data.usuario;
              console.log(this.usuarios);
            }).catch((error)=>{
                console.log(error);
            })
      },

      editUsuario (usuario) {
        this.editedIndex = this.usuarios.indexOf(usuario)
        this.editedUsuario = Object.assign({}, usuario)
        this.$router.push({name: 'EditarUsuarios',params:{id:usuario.usuario_id}})
        //this.dialog = true
      },

      deleteUsuario (usuario) {
        this.editedIndex = this.usuarios.indexOf(usuario)
        this.editedUsuario = Object.assign({}, usuario)
        this.dialogDelete = true
      },

      deleteUsuarioConfirm () {
        let id = this.usuarios[this.editedIndex].usuario_id;
        this.usuarios.splice(this.editedIndex, 1)
        axios.delete(url+id)
        .then(()=>{
          this.initialize()
        })
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedUsuario = Object.assign({}, this.defaultUsuario)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedUsuario = Object.assign({}, this.defaultUsuario)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.usuarios[this.editedIndex], this.editedUsuario)
        } else {
          this.usuarios.push(this.editedUsuario)
        }
        this.close()
      },
    },
  }
</script>