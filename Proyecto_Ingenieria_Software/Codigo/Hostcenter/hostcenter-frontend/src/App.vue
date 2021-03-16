<template>
  <v-app id="inspire">
    <!-- <v-router-link v-if="authenticated" to="/login"></v-router-link> -->
    <router-view ></router-view>
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    data() {
            return {
                authenticated: false,
                // mockAccount: { 
                //     username: "admin",
                //     password: "admin"
                // }
            }
    },
        // mounted() {
        //     if(!this.authenticated) {
        //         this.$router.replace({ name: "login" });
        //     }
        // },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
                this.authenticated = false;
            }
        }

  }
</script>