<template>
  <div>
    <v-tabs v-if="user && user.isAuth">
      <v-tabs-bar>
        <v-tabs-item v-for="tab in tabs"
          router
          ripple
          :key="tab.id"
          :to="tab.href"
          :active="tab.active">
          {{ tab.name }}
        </v-tabs-item>
        <v-tabs-slider class="blue darken-4"></v-tabs-slider>
      </v-tabs-bar>
    </v-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        'user': 'user'
      }),
      tabs: function () {
        if (this.user) {
          const filteredTabs = this.tabData.filter(tab => {
            return tab.roles.indexOf(this.user.role) !== -1
          })
          this.active = (filteredTabs.length > 0) ? filteredTabs[0].id : ''
          return filteredTabs
        }
        return []
      }
    },
    data () {
      return {
        active: '',
        tabData: [
          {
            id: 'welcome',
            name: 'Welcome',
            href: '/welcome',
            roles: ['data_owner', 'data_processor'],
            template: 'welcome'
          },
          {
            id: 'forms',
            name: 'Forms',
            href: '/forms',
            roles: ['data_owner', 'data_processor'],
            // template: 'simple-form'
            template: 'forms'
          }
        ]
      }
    }
  }
</script>
