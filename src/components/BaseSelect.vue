<template>
  <div>
    <label v-if="label"> {{ label }} </label>
    <select type="text" :value="value" v-on="listeners" v-bind="$attrs" >
        <option v-for="option in options" :key="option.id" :value="option" :selected="option === value">{{ option }} </option>
    </select>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      options:{
        type: Array,
        required: true
      },
      label: {
        type: String,
        default: ''
      },
      value: [String, Number]
    },
    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: this.updateValue
        }
      }
    },
    methods: {
      updateValue (event) {
        this.$emit('input', event.target.value)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>