import _ from 'lodash'
import config from '@/config'
import mongoose from 'mongoose'

const db = {
  _ready: false,
  get $ready () { return db._ready },
  async $init (cb = () => {}) {
    mongoose.Promise = Promise
    try {
      let uri = 'mongodb://localhost:' + config.db.port + '/' + config.db.name
      await mongoose.connect(uri, { useMongoClient: true })
      db._ready = true
    } catch (e) {
      console.log(e)
    }
    const files = require.context('@/models', false, /\.js$/)
    files.keys().forEach(key => {
      let name = _.capitalize(key.replace(/(\.\/|\.js)/g, ''))
      db[name] = files(key).default
    })
  }
}

export default db
