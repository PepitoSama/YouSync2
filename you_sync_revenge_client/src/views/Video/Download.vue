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
                <v-text-field prepend-icon="link" name="downlink" label="downlink" v-model="downlink" id="downlink" type="text"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-switch
                v-model="switchVideo"
                label="Download video"
                color="red"
                hide-details
                disabled
              ></v-switch>
              <v-spacer></v-spacer>
              <v-btn
                dark
                color="deep-orange"
                v-on:click="login()"
              >
                Download
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
