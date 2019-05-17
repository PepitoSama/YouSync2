<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="grey darken-2" dark>
          <v-toolbar-title>Playlists</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field prepend-icon="link" name="downlink" label="Add one existing !" v-model="downlink" id="downlink" type="text" disabled></v-text-field>
          </v-form>
        </v-card-text>
        <v-list>
          <v-list-tile
            v-for="item in items"
            :key="item.title"
            avatar
          >
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
            <v-btn icon to='Playlist'>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="300"
                offset-x
              >
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" dark>settings_applications</v-icon>
                </template>
                <v-card>
                  <v-list>
                    <v-list-tile>
                        <v-text-field
                          label="Playlist name"
                          :value="item.title"
                        ></v-text-field>
                    </v-list-tile>
                    <v-btn round dark>Rename</v-btn>
                  </v-list>

                  <v-divider></v-divider>

                  <v-list>
                    <v-list-tile>
                      <v-btn
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
          </v-list-tile>
        </v-list>
        <v-card-text class = "mt-5" style="height: 100px; position: relative">
          <v-fab-transition>
            <v-btn
              v-show="!hidden"
              color="pink"
              dark
              absolute
              top
              right
              fab
              v-on:click="createPlaylist"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Playlist 1', id: 1 },
        { title: 'Playlist 2', id: 2 },
        { title: 'Playlist 3', id: 3 },
        { title: 'Playlist 4', id: 4 }
      ]
    }
  },
  methods: {
    async createPlaylist () {
      console.log('Hi')
      this.$router.push({
        name: 'playlistcreate'
      })
    }
  }
}
</script>
