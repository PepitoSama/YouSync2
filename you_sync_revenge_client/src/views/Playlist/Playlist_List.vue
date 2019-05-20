<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="grey darken-2" dark>

          <v-toolbar-title>Playlists #{{ idPlaylist }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon title="Soon !">
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list two-line subheader>
          <v-subheader>{{ videoMsg }}</v-subheader>
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
                        class="clickable"
                        @click="item = playMusic(item)"
                        title="Play"
                        alt="Play this music"
                      >
                        play_circle_filled
                      </v-icon>
                    </v-flex>
                  </v-layout>
                </v-img>
              </v-list-tile-action>
              <v-list-tile-content class="pa-3 clickable">
                <v-list-tile-title @click="item = playMusic(item)">
                  {{ item.title }}
                </v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn
                  icon
                  ripple
                  @click="deleteVideo(item.id)"
                  title="Remove"
                  alt="Remove this video from you playlist"
                >
                  <v-icon color="red">remove_circle</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-if="loading === item.id">
              <v-layout>
                <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4>
                  <div class="text-xs-center">
                    <v-progress-circular
                      indeterminate
                      :size="70"
                      :width="7"
                      color="red"
                    >
                    </v-progress-circular>
                  </div>
                </v-flex>
              </v-layout>
            </v-list-tile>
            <v-layout v-if="playing === item.id">
              <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4>
                <div class="text-xs-center" v-if="audioLink !== null">
                  <vuetify-audio :file="item.audioLink"></vuetify-audio>
                </div>
              </v-flex>
            </v-layout>
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
        <v-progress-circular
          indeterminate
          color="red"
          v-if="adding"
        >
        </v-progress-circular>
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
import VuetifyAudio from 'vuetify-audio'

export default {
  data () {
    return {
      nbVideo: 0,
      videoMsg: '',
      idPlaylist: 0,
      items: [],
      hidden: true,
      videoUrl: '',
      urlLabel: 'Youtube video URL',
      playing: null,
      loading: true,
      adding: false
    }
  },
  components: {
    'vuetify-audio': VuetifyAudio
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
        .then( () => {
          this.items = []
          this.getVideos()
        })
      } catch (err) {
        this.urlLabel = err.message
      }
    },
    async createVideo () {
      try {
        await this.getVideoId()
        this.videoUrl = 'https://www.youtube.com/watch?v=' + this.videoId
        if (this.videoUrl != '' && this.videoUrl != null) {
          this.adding = true
          await VideoService.create(this.videoUrl, this.idPlaylist)
          .then( () => {
            this.hidden = true
            this.videoUrl = ''
            this.items = []
            this.getVideos()
            this.adding = false
          })
        } else {
          throw new Error('Not a valid url')
        }

      } catch (err) {
        this.urlLabel = 'Invalid link'
        this.adding = false
      }
    },
    async getVideos () {
      try {
        this.idPlaylist = this.$route.params.idPlaylist
        await PlaylistService.getVideos(this.$route.params.idPlaylist)
        .then(res => {
          this.nbVideo = res.data.result.length
          this.videoMsg = 'You have ' + this.nbVideo + ' video'
          for (var i = 0; i < res.data.result.length; i++){
            const item = {
              title: res.data.result[i].videoName,
              youTubeId: res.data.result[i].videoYoutubeId,
              thumbnailUrl: res.data.result[i].videoThumbnail,
              uploaderUrl: res.data.result[i].videoUploaderUrl,
              audioLink: null,
              id: res.data.result[i].videoId
            }
            this.items.push(item)
          }
        })
      } catch (error) {
        if (error.response.status === 401) {
          this.videoMsg = '401 Unauthorized : This is not your playlist ಠ_ಠ'
        } else {
          this.videoMsg = 'You dont have any video yet, add one !'
        }
      }
    },
    async playMusic (item) {
      this.loading = item.id
      if (this.playing === item.id) {
        item.audioLink = null
        this.playing = null
      } else {
        this.playing = null
        await this.getAudioLink(item)
        this.playing = item.id
      }
      return this.loading = null
    },
    async getAudioLink (item) {
      try {
        await VideoService.getAudioLink(item.youTubeId)
        .then(res => {
          item.audioLink = res.data.audioLink
        })
      } catch (err) {
        this.videoMsg = 'Failed to get audioLink'
      }
    },
    async getVideoId () {
      if (this.videoUrl != null) {
        const arr = await this.videoUrl.split("/")
        for(var i = 0; i< arr.length; i++) {
          if (arr[i] === 'www.youtube.com') {
            this.videoId = getUrlParameter(this.videoUrl, 'v')
          } if (arr[i] === 'youtu.be') {
            this.videoId = arr[i+1]
          }
        }
        this.videoUrl = null
        this.videoMsg = 'Invalid Url'
      } else {
        this.videoMsg = 'You must enter an URL'
      }
    }
  },
  created () {
    this.getVideos()
  }
}
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
