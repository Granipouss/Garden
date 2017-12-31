<template>
  <div id="app" class="window">
    <header class="toolbar toolbar-header">
      <h4 class="title is-4">
        <span class="icon"><i class="fa fa-leaf"></i></span>
        {{ name }}
      </h4>
    </header>

    <div class="traffic-light pull-right has-shadow">
      <div id="win-expand" @click="expand"></div>
      <div id="win-minimize" @click="minimize"></div>
      <div id="win-close" @click="close"></div>
    </div>

    <div class="window-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import electron from 'electron'
const win = electron.remote.getCurrentWindow()

export default {
  name: '{{ name }}',
  methods: {
    expand () { win.isMaximized() ? win.unmaximize() : win.maximize() },
    minimize () { win.isMinimized() ? win.unminimize() : win.minimize() },
    close () { window.close() }
  }
}
</script>

<style lang="sass">
@import "~bulma-ph"
// @import "~font-awesome/scss/font-awesome"

.container
  padding: 2rem
</style>
