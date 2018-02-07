<template>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field label='Email' v-model='email' required></v-text-field>
              <v-text-field
                name="input-10-1"
                label="Enter your password"
                hint="At least 8 characters"
                v-model="password"
                min="8"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                counter></v-text-field>
              <v-alert v-if="error" color="error" icon="warning" value="true" transition="fade-transition">{{error}}</v-alert>
              <v-flex>
                <div class="g-recaptcha" data-sitekey="6LcFp0IUAAAAAEzGSbhbj7hFnua3JAzP5fzdWUfN"></div>
                <v-btn @click='login'>Login</v-btn>
              </v-flex>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { login } from '@/firebase'

  export default {
    computed: {
      ...mapGetters({
        'user': 'user'
      })
    },
    data () {
      return {
        email: '',
        password: '',
        e1: true,
        error: ''
      }
    },
    methods: {
      login: function () {
        login({
          email: this.email,
          password: this.password
        })
        .then(user => {
          if (user && user.emailVerified) {
            this.$router.push('/forms')
          } else {
            this.$router.push('/login')
          }
        }, (err) => {
          this.error = err.message
        })
      }
    }
  }
</script>
