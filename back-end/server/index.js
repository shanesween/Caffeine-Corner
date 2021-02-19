const path = require('path')
const express = require('express')
const app = express()
const db = require('../db/index.js'); 
const PORT = process.env.PORT || 8080


const createApp = () => {
  //--------------------->Body parser <---------------------//
  const bodyParser = require('body-parser')
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
    )
    
    //--------------------->Loggin middleware morgan https://github.com/expressjs/morgan  <---------------------//
    const morgan = require('morgan')
    app.use(morgan('dev'))
    
    //--------------------->Serving javascript files, css files, and images from public folder<---------------------//
    //https://expressjs.com/en/starter/static-files.html
    
    // static file-serving middleware
    app.use(express.static(path.join(__dirname, '.', 'public')))
    
    // API routes are prefixed with /api/ -
    // this is purely done to namespace them away from your "front-end routes" (such as those created by react-router).
    app.use('/api', require('../api')) // matches all requests to /api
    
    app.get('*', function(req, res, next) {
      res.sendFile(path.join(__dirname, '../public/index.html'))
    })
    app.use(function(err, req, res, next) {
      console.error(err)
      console.error(err.stack)
      res.status(err.status || 500).send(err.message || 'Internal server error.')
    })
  }
    
//--------------------->Starting server<--------------------- //
const startServer = () => {
  app.listen(process.env.PORT || PORT, () => 
  console.log(`Listening on ${PORT}`)
  )
}

const syncDb = () => db.sync();
    
const bootApp = async () => {
  await syncDb();
  await createApp();
  await startServer()
} 

bootApp() 