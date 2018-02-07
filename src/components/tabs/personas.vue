<template>
  <div>
    <v-card>
      <v-card-text>
        <h2>Personas View</h2>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      'user': 'user'
    })
  }
}
</script>
