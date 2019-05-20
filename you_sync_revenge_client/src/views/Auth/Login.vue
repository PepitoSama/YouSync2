<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class="elevation-12">
            <v-toolbar dark color="grey darken-2">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                required
                prepend-icon="person"
                name="login"
                label="username"
                v-model="username"
                id="username"
                type="text"></v-text-field>
              <v-text-field
                required
                prepend-icon="lock"
                name="password"
                label="password"
                v-model="password"
                id="password"
                type="password"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                dark
                color="blue-grey darken-4"
                v-on:click="goTo('register')"
              >
                Register
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                dark
                color="deep-orange"
                v-on:click="login()"
              >
                Login
              </v-btn>
            </v-card-actions>
            <v-footer v-if="error" class="pa-3 error">
              <v-text>{{ error }}</v-text>
            </v-footer>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import AuthentificationService from '@/services/AuthenticationService'
export default {
  data: () => ({
    valid: true,
    username: '',
    password: '',
    error: null,
    registerMsg: '',
    alert: false
  }),
  methods: {
    async login () {
      if (this.username !== '' && this.password !== '') {
        try {
          await AuthentificationService.login({
            username: this.username,
            password: this.password
          }).then(res => {
            window.$cookies.set('token',res.data.token)
            this.$store.dispatch('setToken', res.data.token)
            this.$store.dispatch('setUser', res.data.username)
            this.connected = true
          })
          this.$router.push({
            name: 'playlist'
          })
        } catch (error) {
          this.error = error.response.data.error
        }
      } else if (this.username === '' && this.password === '') {
        this.error = 'The username and password must be typed'
      } else if (this.username === '') {
        this.error = 'The username must be typed'
      } else if (this.password === '') {
        this.error = 'The password must be typed'
      }
    },
    goTo: function (whereToGo) {
      this.$router.push({
        name: whereToGo
      })
    }
  }
}
</script>
