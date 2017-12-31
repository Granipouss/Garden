<template>
  <div>
    <h5 class="title is-5">Information</h5>
    <ul>
      <li><b>Path:</b> {{ path }}</li>
      <li><b>Route Name:</b> {{ name }}</li>
      <li><b>Vue.js:</b> {{ vue }}</li>
      <li><b>Electron:</b> {{ electron }}</li>
      <li><b>Node:</b> {{ node }}</li>
      <li><b>Platform:</b> {{ platform }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        electron: process.versions['atom-shell'],
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version
      }
    }
  }
</script>
