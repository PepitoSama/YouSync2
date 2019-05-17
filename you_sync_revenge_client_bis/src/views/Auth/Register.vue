<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class="elevation-12">
            <v-toolbar dark color="grey darken-2">
              <v-toolbar-title>Register</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="person" name="login" label="username" v-model="username" id="username" type="text"></v-text-field>
                <v-text-field prepend-icon="email" name="email" label="email" v-model="email" id="email" type="email"></v-text-field>
                <v-text-field prepend-icon="lock" name="password" label="password" v-model="password" id="password" type="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                dark
                color="blue-grey darken-4"
                v-on:click="goTo('login')"
              >
                Back
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                dark
                color="deep-orange"
                v-on:click="register()"
              >
                Register
              </v-btn>
            </v-card-actions>
            <span>
              <p error class="error">{{ this.error }}</p>
            </span>
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
    error: null,
    username: '',
    email: '',
    password: ''
  }),
  methods: {
    async register () {
      console.log(this)
      // try {
      //   const response = await AuthentificationService.register({
      //     username: this.username,
      //     email: this.email,
      //     password: this.password
      //   })
      //   this.$store.dispatch('setToken', response.data.token)
      //   this.$store.dispatch('setUser', response.data.user)
      //   this.$router.push({
      //     name: 'login',
      //     params: { registered: response.data.user }
      //   })
      // } catch (error) {
      //   this.error = error.response.data.error
      // }
    },
    goTo: function (whereToGo) {
      this.$router.push({
        name: whereToGo
      })
    }
  }
}
</script>

<style scoped>
</style>
