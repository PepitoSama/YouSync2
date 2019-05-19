<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
          <v-toolbar color="grey darken-2" dark>

            <v-toolbar-title>Playlists #{{ idPlaylist }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon disabled>
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>


          <v-list two-line subheader>

            <v-subheader>{{ nbVideoMsg }}</v-subheader>
            <div
              v-for="item in items"
              :key="item.id"
            >
              <v-list-tile
              >
                <v-list-tile-action>
                  <v-img :src="item.thumbnailUrl">
                    <v-layout pa-3 column fill-height>
                      <v-flex shrink>
                        <v-icon
                          color="black"
                          class="play_icon"
                          @click="playing = (playing == item.id ? -1 : item.id)"
                        >
                          play_circle_filled
                        </v-icon>
                      </v-flex>
                    </v-layout>
                  </v-img>
                </v-list-tile-action>
                <v-list-tile-content class="pa-3">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn
                    icon
                    ripple
                    @click="deleteVideo(item.id)"
                  >
                    <v-icon color="red">remove_circle</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile v-show="playing == item.id">
                <v-list-tile-action>
                  <audio controls preload="none">
                    <source :src="item.audioLink">
                    Your browser does not support the audio element.
                  </audio>
                </v-list-tile-action>
              </v-list-tile>
            </div>
          </v-list>
        </v-card>

        <div class="text-xs-center" v-show="!hidden">
          <v-text-field
            :label="urlLabel"
            prepend-inner-icon="add_circle"
            v-model="videoUrl"
          ></v-text-field>
          <v-btn
            round
            color="primary"
            dark
            @click="createVideo"
          >
            Add
            <v-icon right dark>add</v-icon>
          </v-btn>
        </div>

        <v-card-text class = "mt-5" style="height: 100px; position: relative">
          <v-fab-transition>
            <v-btn
              color="pink"
              dark
              absolute
              top
              right
              fab
              @click="hidden = !hidden"
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
import VideoService from '@/services/VideoService'
import getUrlParameter from 'get-url-parameter'

export default {
  data () {
    return {
      nbVideo: 0,
      nbVideoMsg: '',
      idPlaylist: 0,
      items: [],
      hidden: true,
      videoUrl: '',
      play_icon_color: 'grey',
      urlLabel: 'Youtube video URL',
      playing: -1
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
    async deleteVideo (videoId) {
      try {
        await VideoService.delete(videoId)
        .then(res => {
          this.items = []
          this.getVideos()
        })
      } catch (err) {
        this.urlLabel = err.message
      }
    },
    async createVideo () {
      if(this.videoUrl !== '') {
        try {
          const cleanUrl = 'https://www.youtube.com/watch?v=' + getUrlParameter(this.videoUrl, 'v')
          if (this.videoUrl != '') {
            await VideoService.create(this.videoUrl, this.idPlaylist)
            .then(res => {
              this.items = []
              this.getVideos()
            })
          } else {
            throw new Error('Not a valid url')
          }

        } catch (err) {
          this.urlLabel = err.message
        }
      }
    },
    async getVideos () {
      try {
        this.idPlaylist = this.$route.params.idPlaylist
        await PlaylistService.getVideos(this.$route.params.idPlaylist)
        .then(res => {
          this.nbVideo = res.data.result.length
          this.nbVideoMsg = 'You have ' + this.nbVideo + ' video'
          for (var i = 0; i < res.data.result.length; i++){
            const item = {
              title: res.data.result[i].videoName,
              youTubeId: res.data.result[i].videoYoutubeId,
              thumbnailUrl: res.data.result[i].videoThumbnail,
              uploaderUrl: res.data.result[i].videoUploaderUrl,
              audioLink: res.data.result[i].videoAudioLink,
              id: res.data.result[i].videoId
            }
            this.items.push(item)
          }
        })
      } catch (error) {
        this.nbVideoMsg = 'You dont have any video yet, add one !'
      }
    }
  },
  created () {
    this.getVideos()
  }
}
</script>

<style>
.play_icon {
  cursor: pointer;
}

.play_icon:hover {
  color: red;
}
</style>
