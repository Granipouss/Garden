<template>
  <div class="tile is-ancestor is-vertical container">
    <div class="tile is-child logo">
      <img class="image" src="~@/assets/logo.png" alt="electron-vue">
    </div>

    <div class="tile is-parent">
      <div class="tile is-child">
        <h4 class="title is-4">Welcome to your new project!</h4>
        <system-information/>
      </div>

      <div class="tile is-child">
        <h5 class="title is-5 has-text-centered">Getting Started</h5>
        <p class="content">electron-vue comes packed with detailed documentation that covers everything from
        internal configurations, using the project structure, building your application,
        and so much more.</p>
        <div class="buttons is-centered">
          <a class="button" @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')">Read the Docs</a>
        </div>

        <h5 class="title is-5 has-text-centered">Other Documentation</h5>
        <div class="buttons is-centered">
          <a class="button" @click="open('https://electron.atom.io/docs/')">Electron</a>
          <a class="button" @click="open('https://vuejs.org/v2/guide/')">Vue.js</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SystemInformation from '@/components/SystemInformation'

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style lang="sass" scoped>
.image
  max-width: 80%

.logo
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
</style>
