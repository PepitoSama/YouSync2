<template>
  <v-card
    color="red lighten-4"
    flat
    height="50"
    tile
  >
    <v-toolbar dense color="red accent-4" dark fixed>

      <v-toolbar-title @click="goTo('playlist')">YouSync</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon dark @click="goTo('download')">cloud_download</v-icon>
      </v-btn>

      <div v-if="this.$store.isLogged">
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

      <div v-else>
        <v-btn icon>
          <v-icon dark @click="goTo('login')">account_circle</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    connected: false
  }),
  methods: {
    logout: function () {
      // TODO
    },
    goTo: function (whereToGo) {
      this.$router.push({
        name: whereToGo
      })
    }
  },
  created: function () {
    console.log(this.$store)
    if (window.$cookies.get('token') === null) {
      console.log("Not connected :")
      this.connected = false
    } else {
      console.log("Connected !")
      this.connected = true
    }
  }
}
</script>
