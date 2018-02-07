<template>
    <v-checkbox v-if="field.inputType === 'checkbox'"
      persistent-hint
      disabled
      :label="field.label"
      :required="field.required"
      :readonly="field.readonly"
      :placeholder="field.placeholder"
      :counter="field.counter"
      :hint="field.description">
    </v-checkbox>
    <v-select v-else-if="field.inputType === 'select'"
      persistent-hint
      disabled
      :label="field.label"
      :required="field.required"
      :readonly="field.readonly"
      :placeholder="field.placeholder"
      :counter="field.counter"
      :hint="field.description">
    </v-select>
      <v-text-field v-else
        persistent-hint
        disabled
        :label="field.label"
        :required="field.required"
        :readonly="field.readonly"
        :placeholder="field.placeholder"
        :counter="field.counter"
        :hint="field.description">
      </v-text-field>
</template>

<script>
export default {
  name: 'v-form-generator-field',
  props: {
    field: Object
  },
  methods: {
    onBlur: function () {
      this.$emit('blur')
    },
    onChange: function () {
      this.$emit('change')
    },
    onFocus: function () {
      this.$emit('focus')
    },
    onInput: function () {
      this.$emit('input')
    }
  }
}
</script>
