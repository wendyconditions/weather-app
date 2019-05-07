const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forcast')

const app = express()
const port = process.env.PORT || 3000 //heroku port, local host

// path set up to be exposed to the web browser
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicPath))

//setting up handlebars
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Wendy Maldonado'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecasetData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecasetData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "must provide search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Wendy Maldonado'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'helpful text',
        title: 'Help',
        name: 'Wendy Maldonado'
    })
})


// configure rouing
app.get('', (req, res) => {
    res.send('hi');
})
app.get('/help', (req, res) => {
    res.send({ name: 'wendy', age: 50 });
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})