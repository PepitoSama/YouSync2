<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card>
          <v-toolbar color="grey darken-2" dark>

            <v-toolbar-title>Vos playlists</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon disabled>
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list subheader>
            <v-subheader inset>{{ nbPlaylistMsg }}</v-subheader>

            <v-list-tile
              v-for="item in items"
              :key="item.title"
            >
              <v-list-tile-avatar>
                <v-icon color="red darken-4"> video_library </v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title
                  @click="goToPath('playlist/' + item.id)"
                  class="playlist"
                >
                  {{ item.title }}
                </v-list-tile-title>
                <v-list-tile-sub-title>TODO videos</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                  icon
                  ripple
                  @click="deletePlaylist(item.id)"
                >
                  <v-icon color="red">remove_circle</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
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
            @click="goTo('playlistcreation')"
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
      nbPlaylistMsg: 'You have ' + this.nbPlaylist + ' playlist',
      items: []
    }
  },
  methods: {
    goTo (name) {
      this.$router.push({
        name: name
      })
    },
    goToPath (path) {
      this.$router.push({
        path: path
      })
    },
    async deletePlaylist (playlistId) {
      try {
        await PlaylistService.delete(playlistId)
        .then(res => {
          this.items = []
          this.getPlaylists()
        })
      } catch (error) {
        this.nbPlaylistMsg = 'You dont have any playlist yet, create one !'
        this.nbPlaylist = 0
      }
    },
    async getPaylists () {
      try {
        await PlaylistService.get()
        .then(res => {
          this.nbPlaylist = res.data.result.length
          if (this.nbPlaylist == 1) {
            this.nbPlaylistMsg = 'You have 1 playlist'
          } else {
            this.nbPlaylistMsg = 'You have ' + this.nbPlaylist + ' playlists'
          }
          for (var i = 0; i < res.data.result.length; i++){
            const item = {
              title: res.data.result[i].playlistName,
              id: res.data.result[i].playlistId,
            }
            this.items.push(item)
          }
        })
      } catch (error) {
        this.nbPlaylistMsg = 'You dont have any playlist yet, create one !'
        this.nbPlaylist = 0
      }
    }
  },
  created () {
    this.getPaylists()
  }
}
</script>

<style>

.playlist:hover {
  color: #708090;
}
</style>
