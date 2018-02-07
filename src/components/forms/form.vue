<template>
  <div>
    <h1>{{title}}</h1>
    <form-editor v-if="user.role === 'data_owner'"></form-editor>
    <form-report v-if="user.role === 'data_processor'"></form-report>
  </div>
</template>

<script>
// TODO: DELETE THIS COMPONENT
import { mapGetters } from 'vuex'
import { db } from '@/firebase'
import formEditor from '@/components/forms/editor/form-editor.vue'
import formReport from '@/components/forms/report/form-report.vue'

export default {
  components: {
    'form-editor': formEditor,
    'form-report': formReport
  },
  computed: {
    ...mapGetters({
      'user': 'user'
    })
  },
  data () {
    return {
      title: ''
    }
  },
  firebase: function () {
    return {
      form: {
        // source: db.ref(`users/${this.user.uid}/forms/${this.$route.params.id}`),
        source: db.ref(`forms/${this.$route.params.id}`),
        asObject: true,
        readyCallback: function () {
          this.title = this.form.meta.title
        }
      }
    }
  }
}
</script>
