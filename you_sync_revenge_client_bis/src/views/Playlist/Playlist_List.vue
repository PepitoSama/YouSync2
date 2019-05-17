<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="grey darken-2">
              <v-toolbar-title>Create a playlist</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="library_add" name="name" :label="label" v-model="name" id="name" type="text"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                dark
                color="deep-orange"
                @click="createPlaylist()"
              >
                Create
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import PlaylistService from '@/services/PlaylistService'
export default {
  data: () => ({
    name: '',
    label: 'Playlist name'
  }),
  methods: {
    async createPlaylist () {
      if(this.name !== '') {
        try {
          await PlaylistService.create(this.name)
          .then(res => {
            this.goTo('playlist')
          })
        } catch (err) {
          this.label = 'Please enter a playlist name ...'
        }
      }
    },
    goTo (whereToGo) {
      this.$router.push({
        name: whereToGo
      })
    }
  }
}

</script>
