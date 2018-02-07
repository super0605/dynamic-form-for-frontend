<template>
  <v-text-field
    color="blue darken-1"
    persistent-hint
    prepend-icon="label_outline"
    v-model="localValue"
    v-validate="localField.rules || ''"
    data-vv-delay="500"
    :rules="[()=>checkValidate() || 'max length must be less than ' + maxLength]"
    :data-vv-as="localField.label"
    :data-vv-name="localField.model"
    :placeholder="localField.placeholder"
    :label="localField.label"
    :hint="localField.description"
    :readonly="localField.readonly"
    :disabled="localField.disabled"
    :counter="localField.counter"
    @blur="onBlur"
    @input="onChange"
  ></v-text-field>
</template>

<script>
export default {
  name: 'v-form-generator-field',
  props: [
    'field',
    'value'
  ],
  inject: ['$validator'],
  data () {
    return {
      localValue: '',
      maxLength: 30
    }
  },
  watch: {
    localValue (val) {
      this.$emit('input', val)
    }
  },
  computed: {
    localField: function () {
      return this.field
    }
  },
  methods: {
    formatDate (date) {
      if (!date) {
        return null
      }

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) {
        return null
      }

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    checkValidate: function () {
      if (this.localValue.length <= this.maxLength) {
        return true
      }
      this.$emit('invalidStatus')
    },
    onBlur: function (val) {
    //   // this.$emit('fieldChange', {
    //   //   'field': this.field,
    //   //   'value': this.localValue
    //   // })
    },
    onChange: function () {
      // console.log('change', this.$validator.errors.all())
      // this.$emit('change')
      // if (this.field.inputType === 'checkbox') {
      //   this.$emit('fieldChange', {
      //     'field': this.field,
      //     'value': this.localValue
      //     // ,
      //     // 'error': this.$validator.errors.any()
      //   })
      // }
    }
    // onFocus: function () {
    //   // console.log('focus')
    //   // this.$emit('focus')
    // },
    // onInput: function (val) {
    //   // console.log('input')
    //   // // console.log('input', this.$validator.errors.count(), this.$validator.errors.all())
    //   // // // // console.log('onInput', this.$validator.errors)
    //   // this.$emit('fieldChange', {
    //   //   'field': this.field,
    //   //   'value': this.localValue
    //   // // //   // ,
    //   // // //   // 'error': this.$validator.errors.any()
    //   // })
    // }
  }
}
</script>
