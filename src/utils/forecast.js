const request = require('request')

const forecast = (latitude,longtitude,callback) => {

    const url = 'https://api.darksky.net/forecast/ad02c80a43f45b6fce2799ce21d16076/' + latitude + ',' + longtitude


    request({url, json: true},(error,{body}) => {
        if(error)
        {
            callback('Unable to connect to Weather Service!',undefined)
        }else if(body.code == 400){
            callback(body.error,undefined)
        }
        else{
            const curr_weather = body.currently      
            callback(undefined, "Temperature between " + body.daily.data[0].temperatureHigh + " to " + body.daily.data[0].temperatureLow + " . " + body.daily.data[0].summary + " it is currently " + curr_weather.temperature + " degrees out. There is " + curr_weather.precipProbability + "% chance of rain.")
        }
    })
   
}


module.exports = forecast