const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000  //if exsist. or 3000 if heroku does not exist - so 3000 is localy 


console.log(__dirname)
console.log(path.join(__dirname,'../public'))

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//setup handlesbars engine and views location
app.set('views', viewsPath)
app.set('view engine','hbs') //set to hbs - for use dynamic templates
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))





app.get('', (req,res) => {
    res.render('index',{
        title: 'Weathertitle',
        name: 'Dan Nechushtan'
    })
})



app.get('/weather', (req,res) => {

    if(!req.query.adress)
    {
        return res.send({
            error: 'Please provide adress term!'
        })
    }
        
    geoCode(req.query.adress,(error,{latitude,longtitude,location} = {})=>{
    
        if(error)
        {
            return res.send({error})
        }
        
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error)
            {
                return res.send({error})
            }
            //run if everything went well
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.adress
            })
        })
    })
   
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Dan Nechushtan'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpTemplate: 'This is a help Message',
        name: "Dan Nechushtan"
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search)
    {
        return res.send(
            {
                error: 'You must provide a search term'
            }
        )
    }
    
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        errorMessage: "Help article -not found!"
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        errorMessage: "Page not found!"
    })

})



app.listen(port, () => {
    console.log("Server is up! - //port 3000")
})