let express = require('express')
let morgan = require('morgan')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let session = require('express-session')
let MongoStore = require('connect-mongo')(session)
let mongoose = require('mongoose')
let requireDir = require('require-dir')
let flash = require('connect-flash')
let routes = require('./routes')
let browserify = require('browserify-middleware')
let Server = require('http').Server
let io = require('socket.io')


// var http = require('http').Server(app);
// var io = require('socket.io')(http);

require('songbird')


module.exports = class App {
    constructor(config) {
        console.log("reached")
        let app = this.app = express()
        this.port = process.env.PORT || 8000
        app.use(morgan('dev'))
        app.use(cookieParser('ilovethenodejs'))
        app.use(session({
            secret: 'ssshhhhh'
        }));
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({
            extended: true
        }))
        routes(this.app)

         browserify.settings({transform: ['babelify']})
        app.use('/js/index.js', browserify('./public/js/index.js'))

        this.server = Server(app)

        this.io = io(this.server)

        console.log("IO : " + this.io)
        
            // this.io.on('connection', function(socket) {
            //     console.log('a user connected');

            // });
        

        this.io.on('connection', socket => {
        	console.log("I am getting displayed")
        	console.log('a user connected')
        	socket.on('disconnect' , () => console.log('user disconnected'))
        	socket.emit("hi there")

        	socket.on('im', msg => {
                // im received
                console.log(msg)
                // echo im back
                this.io.emit('im', msg)
            })
        })
    }

    async initialize(port) {
        await this.server.promise.listen(port)
            //this.app.listen(port)
            // Return this to allow chaining
        return this
    }
}
