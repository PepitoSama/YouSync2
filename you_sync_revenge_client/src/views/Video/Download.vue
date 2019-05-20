<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
          <v-card class="elevation-12">

            <v-toolbar dark color="grey darken-2">
              <v-toolbar-title>Listen a YouTube Video</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="link" name="videoUrl" :label="videoMsg" v-model="videoUrl" id="videoUrl" type="text" alt="Video Url"></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                dark
                color="deep-orange"
                v-on:click="playMusic()"
                alt="Listen to the link you filled"
              >
                Listen
              </v-btn>
            </v-card-actions>

            <v-layout v-if="loading">
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

            <v-layout v-if="audioLink !== null">
              <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4>
                <div class="text-xs-center">
                  <vuetify-audio :file="audioLink"></vuetify-audio>
                </div>
              </v-flex>
            </v-layout>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import VideoService from '@/services/VideoService'
import getUrlParameter from 'get-url-parameter'
import VuetifyAudio from 'vuetify-audio';

export default {
  data () {
    return {
      videoUrl: null,
      videoId: null,
      audioLink: null,
      videoMsg: 'Video URL',
      loading: false
    }
  },
  components: {
    'vuetify-audio': VuetifyAudio
  },
  methods: {
    async playMusic () {
      this.loading = true
      this.audioLink = null
      await this.getVideoId()
      await this.getAudioLink(this.videoId)
      this.loading = false
    },
    async getAudioLink (videoUrl) {
      try {
        await VideoService.getAudioLink(videoUrl)
        .then(res => {
          this.audioLink = res.data.audioLink
        })
      } catch (err) {
        this.videoMsg = 'Failed to get audioLink'
        this.loading = false
      }
    },
    async getVideoId () {
      if (this.videoUrl != null) {
        const arr = this.videoUrl.split("/")
        for(var i = 0; i< arr.length; i++) {
          if (arr[i] === 'www.youtube.com') {
            this.videoId = getUrlParameter(this.videoUrl, 'v')
          } if (arr[i] === 'youtu.be') {
            this.videoId = arr[i+1]
          }
        }
      } else {
        this.videoMsg = 'Enter a valid Url please'
        this.loading = false
      }
    }
  }
}
</script>
