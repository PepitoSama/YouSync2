<template>
  <v-card
    color="red lighten-4"
    flat
    height="50"
    tile
  >
    <v-toolbar dense color="red darken-4" dark fixed>

      <v-toolbar-side-icon
        @click="drawer = !drawer"
      ></v-toolbar-side-icon>

      <v-toolbar-title @click="goTo('playlist')">YouSync</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="isLogged" class="hidden-sm-and-down">
        <v-btn
          icon
          @click="goTo(item.goTo)"
          v-for="item in itemsConnected"
          :key="item.title"
          :title="item.title"
          :alt="item.title"
        >
          <v-icon dark >{{ item.icon }}</v-icon>
        </v-btn>
      </div>

      <div v-else>
        <v-btn
          icon
          @click="goTo(item.goTo)"
          v-for="item in itemsDisconnected"
          :key="item.title"
          :title="item.title"
          :alt="item.title"
        >
          <v-icon dark >{{ item.icon }}</v-icon>
        </v-btn>
      </div>
    </v-toolbar>

    <v-navigation-drawer
      class="red darken-4"
      dark
      v-model="drawer"
      app
    >
    <v-list v-if="isLogged">
      <v-list-tile @click="drawer = false">
        <v-list-tile-action>
          <v-icon>arrow_back_ios</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Close</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile
        v-for="item in itemsConnected"
        :key="item.title"
        @click="goTo(item.goTo)"
        :alt="item.title"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-list v-else>
      <v-list-tile @click="drawer = false">
        <v-list-tile-action>
          <v-icon>arrow_back_ios</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Close</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-for="item in itemsDisconnected"
        :key="item.title"
        @click="goTo(item.goTo)"
        :alt="item.title"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </v-navigation-drawer>

  </v-card>
</template>

<script>
import AuthentificationService from '@/services/AuthenticationService'
export default {
  data() {
    return {
      drawer: false,
      itemsConnected: [
        {
          title: 'Listen',
          icon: 'cloud_download',
          goTo: 'download',
        },
        {
          title: 'Playlists',
          goTo: 'playlist',
          icon: 'playlist_play',
        },
        {
          title: 'Account',
          goTo: 'user',
          icon: 'account_circle',
        },
        {
          title: 'Logout',
          goTo: 'logout',
          icon: 'cancel',
        }
      ],
      itemsDisconnected: [
        {
          title: 'Download',
          goTo: 'download',
          icon: 'cloud_download',
        },
        {
          title: 'Login',
          goTo: 'login',
          icon: 'account_circle',
        }
      ]
    }
  },
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
        this.goTo('login')
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    goTo: function (whereToGo) {
      if (whereToGo == 'logout') {
        this.logout()
      } else {
        this.$router.push({
          name: whereToGo
        })
      }
    }
  }
}
</script>
