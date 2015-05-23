module.exports = (app) => {

  app.get('/', (req, res) => res.render('index.ejs'))
  //app.get('/', (req, res) => res.send(' a simple response'))
  app.post('/', (req, res) => {
            // TODO: Save username to req.session.username
            let sess = req.session
            console.log(sess)
            sess.username = req.body.username
            res.redirect('/chat')
        })
     
	app.get('/chat', (req, res) => {
            let username = req.session.username
            console.log("Username :" + username)
            let state = JSON.stringify({username})
            res.render('chat.ejs', {username, state})
        })
}

