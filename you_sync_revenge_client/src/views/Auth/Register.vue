<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class="elevation-12">
            <v-toolbar dark color="grey darken-2">
              <v-icon>person_add</v-icon>
              <v-toolbar-title>Register</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="person"
                  name="username"
                  label="username"
                  v-model="username"
                  :rules="usernameRules"
                  :counter="32"
                  id="username"
                  type="text"></v-text-field>
                <v-text-field
                  prepend-icon="email"
                  name="email"
                  label="email"
                  v-model="email"
                  :rules="emailRules"
                  id="email"
                  type="email"></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="password"
                  v-model="password"
                  :rules="passwordRules"
                  id="password"
                  type="password"></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="passwordConfirm"
                  label="password Confirmation"
                  v-model="passwordConfirm"
                  :rules="passwordConfirmRules"
                  id="passwordConfirm"
                  type="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                dark
                color="blue-grey darken-4"
                v-on:tap="goTo('login')"
              >
                Back
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                dark
                color="deep-orange"
                v-on:tap="register()"
              >
                Register
              </v-btn>
            </v-card-actions>
            <v-layout
              justify-center
              wrap
            >
              <v-flex
                xs12
                md11
              >
                <v-card>
                  <p error class="error">{{ this.error }}</p>
                </v-card>
              </v-flex>
            </v-layout>
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
    usernameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 32) || 'Name must be less than 32 characters',
      v => /^([a-zA-Z0-9-_]{2,32})$/.test(v) || 'No special character allowed'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length > 6) || 'Password length minimum : 6',
      v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{8,32}$/.test(v) || 'You must have lower, Upper, digit and special charactere'
    ],
    passwordConfirm: '',
    passwordConfirmRules: [
      v => !!v || 'Password confirmation is required',
    ]

  }),
  methods: {
    async register () {
      if (this.password !== this.passwordConfirm) {
        return this.error = 'Password confirmation must be equal to password'
      }
      try {
        const response = await AuthentificationService.register({
          username: this.username,
          email: this.email,
          password: this.password,
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'login'
        })
      } catch (error) {
        this.error = error.response.data.error
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

<style scoped>
</style>
