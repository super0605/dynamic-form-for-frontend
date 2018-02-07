<template>
  <div>
    <v-card>
      <v-card-text>
        <v-layout row v-for='form in forms' :key="form['.key']">
          <v-flex xs12>
            <router-link :to="`forms/${form['.key']}`">{{form.meta.title}}</router-link>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'

export default {
  computed: {
    ...mapGetters({
      'user': 'user'
    })
  },
  firebase: function () {
    return {
      forms: {
        source: db.ref(`forms`)
      }
    }
  }
}
</script>
