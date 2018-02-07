<template>
    <div>

    <v-expansion-panel>
      <v-expansion-panel-content>
          <h1 slot="header" class="headline">Form Fields</h1>
          <v-card>
              <v-divider></v-divider>
            <v-card-text>
              <v-form-generator :schema="schema" />
              <v-footer><v-btn @click="editform" style="margin-left:auto;">Edit Form</v-btn></v-footer>
            </v-card-text>
          </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <br />

    <v-card>
      <v-card-title>
          <h1 class="headline">Form Status</h1>
        </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-alert type="info" v-model="modified" transition="fade-transition">
            {{(this.modified > 0) ? `You have ${this.modified} new form/s ready to review` : 'You have no new forms to review'}}
        </v-alert>
        <bar-chart :chart-data="datacollection"></bar-chart>
      </v-card-text>
    </v-card>

    <br />
    <v-card>
      <v-card-title>
        <h1 class="headline">Incomplete</h1>
      </v-card-title>
      <v-divider></v-divider>

      <v-expansion-panel popout disabled>
          <v-expansion-panel-content v-for='item in this.incomplete' :key="item['.key']" dis>
              <div slot="header">
              <v-icon color="red">highlight_off</v-icon>
              {{item.val().email}}
              </div>
          </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>

    <br />
    <v-card>
      <v-card-title>
        <h1 class="headline">Completed</h1>
      </v-card-title>
      <v-divider></v-divider>

      <v-expansion-panel popout>

        <v-expansion-panel-content v-for='instance in instances' :key="instance['.key']" v-if="users">
          <div slot="header" style="display: flex;align-items: center;">
              <v-icon v-if="instance.status === 'accepted'" color="success">assignment_turned_in</v-icon>
              <v-icon v-if="instance.status === 'modified'">assignment</v-icon>
              <span>{{instance['firstName']}}, {{instance['lastName']}} ({{users[instance['.key']].email}})</span>
              <v-btn @click="accept(instance['.key'])" style="margin-left:auto;" :disabled="instance.status === 'accepted'">{{(instance.status === 'accepted') ? 'Accepted' : 'Accept'}}</v-btn>
          </div>
          <v-card>
            <v-divider></v-divider>
            <v-card-text class="grey lighten-5">
              <v-list two-line dense subheader class="grey lighten-5">
                <v-list-tile v-for="field in schema.fields" :key="schema.fields['.key']" v-if="instance[field.model]">
                  <v-list-tile-content>
                    <v-list-tile-title v-html="field.label"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="instance[field.model]"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                </v-list>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>

      </v-expansion-panel>

      <v-footer class="grey lighten-2">
        <v-btn @click="exportdata" :disabled="accepted === 0" style="margin-left:auto;">Export Accepted Forms</v-btn>
      </v-footer>

      </v-card-text>
    </v-card>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'
import generator from '@/components/forms/report/form-generator'

import json2csv from 'json2csv'
import BarChart from '@/components/charts/bar.vue'

export default {
  components: {
    'v-form-generator': generator,
    BarChart
  },
  computed: {
    ...mapGetters({
      'user': 'user'
    })
  },
  data () {
    return {
      title: String,
      schema: Object,
      csv: '',
      accepted: Number,
      modified: Number,
      submitted: Number,
      incomplete: [],
      datacollection: null,
      users: null
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
      instances: {
        source: db.ref(`users/${this.user.uid}/forms/${this.$route.params.id}/instances`),
        readyCallback: function (data) {
          var snap = data.val()

          this.accepted = 0
          if (!snap) return
          this.modified = 0

          snap = Array.isArray(snap) ? snap : [snap]

          snap.forEach(item => {
            var keys = Object.keys(item)
            keys.forEach(key => {
              if (item[key].status === 'accepted') {
                this.accepted++
              } else {
                this.modified++
              }
            })
          })

          db.ref('users').orderByChild('role').equalTo('data_owner').once('value')
          .then(snap => {
            this.users = snap.val()
            snap.forEach(user => {
              if (this.instances.map(instance => instance['.key']).findIndex(key => key === user.key) === -1) {
                this.incomplete.push(user)
              }
            })

            this.datacollection = {
              labels: ['Accepted', 'Modified', 'Incomplete'],
              datasets: [
                {
                  backgroundColor: ['#4caf50', '#ccc', '#f44336'],
                  data: [this.accepted, this.modified, this.incomplete.length]
                }
              ]
            }
          })
        }
      }
    }
  },
  methods: {
    accept (key) {
      db.ref(`users/${this.user.uid}/forms/${this.$route.params.id}/instances/${key}/status`).set('accepted')

      this.accepted++
      this.modified--
      this.datacollection = {
        labels: ['Accepted', 'Modified', 'Incomplete'],
        datasets: [
          {
            backgroundColor: ['#4caf50', '#ccc', '#f44336'],
            data: [this.accepted, this.modified, this.incomplete.length]
          }
        ]
      }
    },
    review () {

    },
    exportdata () {
      const SAGE_MAPPINGS = {
        'firstName': 'Forename',
        'lastName': 'Surname',
        'otherName': 'Initial',
        'email': 'E-mail Address',
        'sex': 'Gender',
        'birthDate': 'Date of Birth',
        'streetAddress1': 'Address 1',
        'town': 'Address 2',
        'county': 'Address 3',
        'postalCode': 'Post Code',
        'country': 'Country',
        'taxID': 'NI Number',
        'startDate': 'Work Start Date'
      }
      let data = []
      const fields = this.schema.fields
      for (let i = 0; i < this.instances.length; i++) {
        let instance = this.instances[i]
        let entry = {}
        for (let j = 0; j < fields.length; j++) {
          let exportField = SAGE_MAPPINGS[fields[j].model] || fields[j].model
          let field = fields[j].model
          entry[exportField] = instance[field] || ''
        }
        data.push(entry)
      }

      let fieldset = []
      for (let i = 0; i < fields.length; i++) {
        let exportField = SAGE_MAPPINGS[fields[i].model] || fields[i].model
        fieldset.push(exportField)
      }

      let csv = json2csv({
        fields: fieldset,
        data: data
      })
      window.location = 'data:text/csv;charset=utf-8,' + csv
    },
    editform () {

    }
  }
}
</script>
