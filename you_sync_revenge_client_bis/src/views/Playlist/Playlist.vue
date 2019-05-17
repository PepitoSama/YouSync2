<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
          <v-toolbar color="grey darken-2" dark>

            <v-toolbar-title>Vos playlists</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon disabled>
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list two-line subheader>

            <v-list-tile
              v-for="item in items"
              :key="item.id"
              avatar
              @click="goTo('/playlist/' + item.id )"
            >
              <v-list-tile-avatar>
                <v-icon color="red darken-4"> video_library </v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon to='Playlist'>
                <v-menu
                  :close-on-content-click="false"
                  :nudge-width="300"
                  offset-x
                >
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on" dark>settings</v-icon>
                  </template>
                  <v-toolbar dense>
                    <v-toolbar-title>Playlist : {{ item.title }}</v-toolbar-title>
                  </v-toolbar>
                  <v-card>
                    <v-list>
                      <v-list-tile>
                          <v-text-field
                            label="Rename you playlist"
                          ></v-text-field>
                      </v-list-tile>
                      <v-btn round dark>Rename</v-btn>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list>
                      <v-list-tile>
                        <v-btn
                          round
                          dark
                          color="error"
                          v-on:click=getDeleteUri(item.id)
                        >
                          Remove Playlist
                        </v-btn>
                      </v-list-tile>
                    </v-list>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn flat @click="menu = false">Cancel</v-btn>
                      <v-btn color="primary" flat @click="menu = false">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
        <v-card-text class = "mt-5" style="height: 100px; position: relative">
          <v-fab-transition>
            <v-btn
              color="pink"
              dark
              absolute
              top
              right
              fab
              v-on:click="goTo('playlistcreation')"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-text>
    </v-flex>
  </v-layout>
</template>

<script>
import PlaylistService from '@/services/PlaylistService'

export default {
  data () {
    return {
      nbPlaylist: 0,
      nbPlaylistMsg: '',
      items: [],
      downlink: null
    }
  },
  methods: {
    goTo (whereToGo) {
      this.$router.push({
        name: whereToGo
      })
    },
    getDeleteUri (itemId) {
      console.log('DELETE' + itemId)
    }
  },
  mounted: async function () {
    try {
      await PlaylistService.get()
      .then(res => {
        this.nbPlaylist = res.data.result.length
        this.nbPlaylistMsg = 'You have ' + this.nbPlaylist + ' playlist'
        for (var i = 0; i < res.data.result.length; i++){
          const item = {
            title: res.data.result[i].playlistName,
            id: i,
          }
          this.items.push(item)
        }
      })
    } catch (error) {
      this.nbPlaylistMsg = 'You dont have any playlist yet, create one !'
      this.nbPlaylist = 0
    }
  }
}
</script>
