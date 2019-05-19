<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
          <v-card class="elevation-12">
            <v-toolbar dark color="grey darken-2">
              <v-toolbar-title>Download a video</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="link" name="videoUrl" :label="videoMsg" v-model="videoUrl" id="videoUrl" type="text"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                dark
                color="deep-orange"
                v-on:click="playMusic()"
              >
                Download
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="elevation-12">
            <v-card-text>
              <div class="text-xs-center" v-if="audioLink !== null">
                <vue-audio :file="audioLink" autoPlay/>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import VueAudio from 'vue-audio';
import VideoService from '@/services/VideoService'
import getUrlParameter from 'get-url-parameter'

export default {
  data () {
    return {
      videoUrl: null,
      videoId: null,
      audioLink: null,
      videoMsg: 'Video URL'
    }
  },
  components: {
    'vue-audio': VueAudio
  },
  methods: {
    async playMusic () {
      await this.getVideoId()
      await this.getAudioLink(this.videoId)
    },
    async getAudioLink (videoUrl) {
      try {
        await VideoService.getAudioLink(videoUrl)
        .then(res => {
          this.audioLink = res.data.audioLink
        })
      } catch (err) {
        this.videoMsg = 'Failed to get audioLink'
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
      }
    }
  }
}
</script>
