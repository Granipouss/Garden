import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const files = require.context('@/pages/', false, /^\.\/.*\.vue$/)
const filenames = files.keys()

let routes = []

// =============================================================================
//  ~ Function from Nuxt.js
// =============================================================================
filenames.forEach((filename) => {
  let keys = filename.replace(/^pages/, '').replace(/\.vue$/, '').replace(/\/{2,}/g, '/').split('/').slice(1)
  let route = { name: '', path: '', component: files(filename).default }
  let parent = routes
  keys.forEach((key, i) => {
    route.name = route.name ? route.name + '-' + key.replace('_', '') : key.replace('_', '')
    route.name += (key === '_') ? 'all' : ''
    let child = parent.find(p => p.name === route.name)
    if (child) {
      if (!child.children) child.children = []
      parent = child.children
      route.path = ''
    } else {
      if (key === 'index' && (i + 1) === keys.length) {
        route.path += (i > 0 ? '' : '/')
      } else {
        route.path += '/' + (key === '_' ? '*' : key.replace('_', ':'))
        if (key !== '_' && key.indexOf('_') !== -1) {
          route.path += '?'
        }
      }
    }
  })
  // Order Routes path
  parent.push(route)
  parent.sort((a, b) => {
    if (!a.path.length || a.path === '/') return -1
    if (!b.path.length || b.path === '/') return 1
    let res = 0
    let _a = a.path.split('/')
    let _b = b.path.split('/')
    for (let i = 0; i < _a.length; i++) {
      if (res !== 0) break
      let y = (_a[i].indexOf('*') > -1) ? 2 : (_a[i].indexOf(':') > -1 ? 1 : 0)
      let z = (_b[i].indexOf('*') > -1) ? 2 : (_b[i].indexOf(':') > -1 ? 1 : 0)
      res = y - z
      if (i === _b.length - 1 && res === 0) res = 1
    }
    return res === 0 ? -1 : res
  })
})

// =============================================================================
//  ~ Function from Nuxt.js
// =============================================================================
function cleanChildrenRoutes (routes, isChild = false) {
  let start = -1
  let routesIndex = []
  routes.forEach((route) => {
    if (/-index$/.test(route.name) || route.name === 'index') {
      // Save indexOf 'index' key in name
      let res = route.name.split('-')
      let s = res.indexOf('index')
      start = (start === -1 || s < start) ? s : start
      routesIndex.push(res)
    }
  })
  routes.forEach((route) => {
    route.path = (isChild) ? route.path.replace('/', '') : route.path
    if (route.path.indexOf('?') > -1) {
      let names = route.name.split('-')
      let paths = route.path.split('/')
      if (!isChild) paths.shift() // clean first / for parents
      routesIndex.forEach((r) => {
        let i = r.indexOf('index') - start //  children names
        if (i < paths.length) {
          for (let a = 0; a <= i; a++) {
            if (a === i) paths[a] = paths[a].replace('?', '')
            if (a < i && names[a] !== r[a]) break
          }
        }
      })
      route.path = (isChild ? '' : '/') + paths.join('/')
    }
    route.name = route.name.replace(/-index$/, '')
    if (route.children) {
      if (route.children.find((child) => child.path === '')) {
        delete route.name
      }
      route.children = cleanChildrenRoutes(route.children, true)
    }
  })
  return routes
}

// WildCard
routes = cleanChildrenRoutes(routes)
routes.push({ path: '*', redirect: '/' })

export default new Router({ routes })
