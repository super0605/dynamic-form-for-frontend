<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <v-form>
            <v-text-field label='Email' v-model='email' required></v-text-field>
            <v-text-field name="input-10-1" label="Enter your password" hint="At least 8 characters" v-model="password" min="8" :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" counter></v-text-field>
            <v-alert v-if="success" color="success" icon="done" value="true" transition="fade-transition">{{success}}</v-alert>
            <v-alert v-if="error" color="error" icon="warning" value="true" transition="fade-transition">{{error}}</v-alert>
            <v-flex>
              <div v-if="success !== 'success'" class="g-recaptcha" data-sitekey="6LcFp0IUAAAAAEzGSbhbj7hFnua3JAzP5fzdWUfN"></div>
              <v-btn @click="register()" :disabled="submitted === true">{{(submitted === 'true') ? 'Submitted' : 'Register'}}</v-btn>
            </v-flex>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { register } from '@/firebase'

  export default {
    data () {
      return {
        email: '',
        password: '',
        e1: true,
        error: '',
        success: '',
        submitted: false
      }
    },
    methods: {
      register: function () {
        if (this.email.match(/.*@magicbox.technology$/)) {
          this.error = ''
          this.submitted = true
          register({
            email: this.email,
            password: this.password,
            role: 'data_owner'
          })
          .then(success => {
            this.success = success
          }, (err) => {
            this.submitted = false
            this.error = err.message
          })
        } else {
          this.error = 'Must register with @magicbox.technology domain'
        }
      }
    }
  }
</script>
