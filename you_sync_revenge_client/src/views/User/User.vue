  <template>
    <v-container
      fill-height
      fluid
      grid-list-xl>
      <v-layout
        justify-center
        wrap
      >
        <v-flex
          xs12
          md8
        >
          <v-card
            color="grey lighten-4"
            flat
            height="200px"
            tile
          >
            <v-toolbar
              dense
              color="grey darken-2"
              dark
            >
              <v-icon>person</v-icon>
              <v-toolbar-title>Your Infos</v-toolbar-title>
            </v-toolbar>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="username"
                :counter="32"
                :rules="usernameRules"
                label="Name"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-layout
                justify-center
                wrap
              >
                <v-flex
                  xs12
                  md11
                >
                  <div class="text-xs-center">
                    <v-btn
                      round
                      color="success"
                      dark
                      :disabled="!valid"
                      @click="updateUser"
                    >
                      <v-icon>edit</v-icon>
                      Edit
                    </v-btn>
                  </div>
                </v-flex>
              </v-layout>

            </v-form>
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
  </template>z
<script>
import UserService from '@/services/UserService'

export default {
  data () {
    return {
      valid: true,
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
      userId: null,
      error: null
    }
  },
  methods: {
    async updateUser () {
      try {
        const updateStruct = {
          username: this.username,
          email: this.email
        }
        this.userId = ''
        this.username = ''
        this.email = ''
        await UserService.update(updateStruct)
        .then( () => {
          this.getUser()
        })
      } catch (err) {
        this.error = err.message
      }
    },
    async getUser () {
      try {
        await UserService.get()
        .then(res => {
          this.userId = res.data.result[0].userId
          this.username = res.data.result[0].userUsername
          this.email = res.data.result[0].userEmail
        })
      } catch (error) {
        this.error = 'GET user failed'
      }
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    }
  },
  created () {
    this.getUser()
  }
}
</script>
