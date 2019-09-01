const request = require('request')


const geoCode = (adress,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiZGFuZHNmZGEiLCJhIjoiY2p6a2w1NTJwMDR4YjNsa3g4OTdjMHM3MSJ9.wRemvJJqTsw9zvQXXZPWqw&limit=1'

    request({url:url, json:true },(error,response)=> {
        if(error)
        {
            callback('Unable to Connect to Location Service!',undefined) // second input is undefined
        }else if(response.body.features.length === 0)
        {
            callback('Unable to find Location - try another search', undefined)
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longtitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports = geoCode
