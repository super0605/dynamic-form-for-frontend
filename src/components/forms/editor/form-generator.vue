<template>
  <div>
    <div v-for="(schemaItem, schemaItemIndex) in schema">
      <div v-if="schemaItemIndex == 'fields'">
        <div v-for="field in schemaItem">
          {{model[field.model]}}
          <v-form-generator-field :field="field" :value="model[field.model]" v-on:fieldChange="onFieldChange"></v-form-generator-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import field from '@/components/forms/editor/form-field.vue'

  export default{
    name: 'v-form-generator',
    props: ['model', 'schema'],
    // inject: ['$validator'],
    components: {
      'v-form-generator-field': field
    },
    methods: {
      onFieldChange: function (data) {
        this.$emit('fieldChange', data)
      }
    }
  }
</script>
