<template>
  <div>
    <div v-for="(schemaItem, schemaItemIndex) in schema">
      <div v-if="schemaItemIndex == 'fields'">
        <div v-for="field in schemaItem">
          <v-form-generator-field :field="field" disabled />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import field from '@/components/forms/report/form-field.vue'

  export default {
    name: 'v-form-generator',
    props: {
      'schema': Object
    },
    components: {
      'v-form-generator-field': field
    }
  }
</script>
