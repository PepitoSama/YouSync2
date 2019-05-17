<template>
  <v-card
    color="red lighten-4"
    flat
    height="50"
    tile
  >
    <v-toolbar dense color="red darken-4" dark fixed>

      <v-toolbar-title @click="goTo('playlist')">YouSync</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon dark @click="goTo('download')">cloud_download</v-icon>
      </v-btn>

      <div v-show="isLogged">
        <v-btn icon>
          <v-icon dark @click="goTo('playlist')">playlist_play</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon dark @click="goTo('user')">account_circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon dark @click="logout()">cancel</v-icon>
        </v-btn>
      </div>

      <div v-show="!isLogged">
        <v-btn icon>
          <v-icon dark @click="goTo('login')">account_circle</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
  </v-card>
</template>

<script>
import AuthentificationService from '@/services/AuthenticationService'
export default {
  computed : {
    isLogged : function(){
      return this.$store.getters.isLogged
    }
  },
  methods: {
    async logout () {
      try {
        await AuthentificationService.logout().then( res => {
          window.$cookies.set('token',res.data.token)
          this.$store.dispatch('setToken', res.data.token)
          this.$store.dispatch('setUser', res.data.username)
        })
        // TODO ajouter store
        this.connected = true
        this.goTo('/')
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    goTo: function (whereToGo) {
      this.$router.push({
        name: whereToGo
      })
    }
  }
}
</script>
