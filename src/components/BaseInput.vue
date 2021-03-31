<template>
  <div>
    <label v-if="label"> {{ label }} </label>
    <input type="text" :value="value" v-bind="$attrs" v-on="listeners">
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
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
      // when input typing something, it call updataValue methods, send payload (event.target.value)
      //  to event name input
      // v-model have event listening emit like @input. And it set payload to event.title
      //
    }
  }
</script>

<style lang="scss" scoped>

</style>