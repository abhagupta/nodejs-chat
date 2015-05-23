
let App = require('./app/app')
let requireDir = require('require-dir')
let config = requireDir('./config', {recurse: true})
let routes = require('./app/routes.js')
 let port = process.env.PORT || 8000

let app = new App(config)

    app.initialize(port)
      .then(()=> console.log(`Listening @ http://127.0.0.1:${port}`))
      // ALWAYS REMEMBER TO CATCH!
      .catch(e => console.log("reached in catch" + e.stack ? e.stack : e))

