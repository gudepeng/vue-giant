<template>
  <div @click="test">111</div>
</template>

<script>
export default {
  name: 'Page1',
  methods: {
    test() {
      this.$axios.get('/demo')
    }
  }
}
</script>
