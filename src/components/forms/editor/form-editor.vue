<template>
  <div>
    <v-card>
      <v-card-text>
        {{status}}
        <!--
        <v-alert :type="(status === 'submitted') ? 'success' : 'info'" v-model="status">
          {{title}} : {{(status === 'submitted') ? 'Submitted' : 'Ready to submit'}}
        </v-alert> -->
        <!-- <v-alert v-if="status === 'new'" type="in" v-model="status">
          {{title}} : Enter data
        </v-alert> -->
        <v-form>
          <v-footer>
            <v-btn @click="submit()" :disabled="status === 'submitted' || status === 'invalid'">{{(status === 'submitted') ? 'Submitted' : 'Submit'}}</v-btn>
          </v-footer>
          <div v-for="(schemaItem, schemaItemIndex) in schema">
            <div v-if="schemaItemIndex == 'fields'">
              <div v-for="field in schemaItem">

                <v-form-generator-field
                  data-vv-value-path="localValue"
                  :field="field"
                  :value="model[field.model]"
                  @invalidStatus="onInvalidStatus"
                  @input="onInput">
                </v-form-generator-field>

              </div>
            </div>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'
import field from '@/components/forms/editor/form-field.vue'

export default {
  components: {
    'v-form-generator-field': field
  },
  computed: {
    ...mapGetters({
      'user': 'user'
    })
  },
  provide: {
    $validator: this.$validator,
    $errors: this.errors
  },
  data () {
    return {
      model: {},
      status: String,
      title: String
    }
  },
  firebase: function () {
    return {
      schema: {
        source: db.ref(`forms/${this.$route.params.id}`),
        asObject: true,
        readyCallback: function (snapshot) {
          const data = snapshot.val()
          this.title = data.meta.title
          this.schema = data.schema
        }
      },
      model: {
        source: db.ref(`users/${this.user.uid}/forms/${this.$route.params.id}`),
        asObject: true,
        readyCallback: function (snapshot) {
          const data = snapshot.val()
          this.model = data || {}
          this.status = data ? data.status : 'new'
        }
      }
    }
  },
  methods: {
    submit () {
      this.$validator.validateAll()
        .then((result) => {
          console.log(`Validation Result: ${result}`)
        })

      // if (this.status === 'new') {
        // this.status = 'invalid'
        // this.$validator.validateAll()
        //   .then(isValid => {
        //     console.log(isValid)
        //     if (isValid) {
        //       console.log('ok', isValid)
        //     } else {
        //       console.log('!ok', isValid)
        //       this.status = 'invalid'
        //     }
        //   }).catch((err) => {
        //     console.log(err)
        //   })
      // }
      // // data_owner
      // this.status = 'submitted'
      // this.$firebaseRefs.model.update({
      //   'status': 'submitted'
      // })

      // // data_processor
      // const that = this
      // const userModel = db.ref(`users/${this.user.uid}/forms/${this.$route.params.id}`).once('value')
      // userModel.then(snap => {
      //   var result = snap.val()
      //   db.ref('users').orderByChild('role').equalTo('data_processor').once('value')
      //     .then(snap => {
      //       snap.forEach(function (item) {
      //         db.ref(`users/${item.key}/forms/${that.$route.params.id}/instances/${that.user.uid}`).set(result)
      //         db.ref(`users/${item.key}/forms/${that.$route.params.id}/instances/${that.user.uid}/status`).set('modified')
      //       })
      //     })
      // })
    },
    onInput (data) {
    },
    onInvalidStatus () {
      // this.status = 'invalid'
    }
    // onFieldChange (data) {
      // console.log(this.$validator.errors.any(), data)

      // console.log(this.$validator.errors.all())
        // .then(isValid => {
        //   console.log(isValid)
        //   if (isValid === true) {
        //     this.status = 'modified'
        //     console.log('bob')
        //   }
        // }).catch((err) => {
        //   console.log(err)
        // })

      // if (data.value.length > 0) {
      //   console.log('fc ok', data.value)
      // } else {
      //   console.log('fc !ok', data.value)
      //   this.status = 'invalid'
      // }

      // console.log('onFieldChange', this.$validator.errors)

      // this.$validator.validateAll()
      //   .then(() => {
      //     console.log('ok')
      //   }).catch((err) => {
      //     console.log(err)
      //   })
      // if (data.error) {
      //   this.status = 'invalid'
      // } else {
      //   this.status = 'modified'
      //   db.ref(`users/${this.user.uid}/forms/${this.$route.params.id}/${data.field.model}`).set(data.value)
      //   db.ref(`users/${this.user.uid}/forms/${this.$route.params.id}/status`).set('modified')
      // }
    // }
  }
}
</script>
