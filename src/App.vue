<template>
  <v-app>
    <v-toolbar app dark class="red darken-4" style="position:sticky;top:0px;z-index:999">
      <v-toolbar-title>
        <v-btn to='/' flat active-class><img src="/static/lccc-logo.png" style="height:100%;" /></v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <h2 v-if="user && user.isAuth" class='title'>{{role}}</h2>
      <v-toolbar-items class="hidden-xs-only">
        <template v-if="user && user.isAuth">
          <v-btn flat><v-icon left>supervisor_account</v-icon>{{user.email}}</v-btn>
          <v-btn @click='logout' flat><v-icon left>exit_to_app</v-icon>Logout</v-btn>
        </template>
        <template v-else>
          <v-btn to='/login' flat><v-icon left>supervisor_account</v-icon>Login</v-btn>
          <v-btn @click='register' flat><v-icon left>supervisor_account</v-icon>Register</v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <tabs></tabs>
      </v-container>
    </v-content>
    <v-footer app class="blue darken-4" style="justify-content: flex-end;">
      <h4 class="white--text caption">Magicbox DataVault&reg; - Version: {{version}}</h4>
    </v-footer>
  </v-app>
</template>

<script>
  import { logout } from '@/firebase'
  import tabs from '@/components/tabs/tabs.vue'
  import changeCase from 'change-case'
  import pkg from '../package.json'

  export default {
    components: {
      'tabs': tabs
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      role () {
        return changeCase.title(this.$store.state.user.role)
      }
    },
    data () {
      return {
        version: pkg.version
      }
    },
    methods: {
      logout: function () {
        logout()
        this.$router.push('/welcome')
      },
      register: function () {
        if (this.$route.query.redirectUrl) {
          this.$router.push(`/register?redirectUrl=${this.$route.query.redirectUrl}`)
        } else {
          this.$router.push(`/register`)
        }
      }
    }
  }
</script>
