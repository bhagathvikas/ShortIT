const mongoose = require('mongoose')
const shortUrl = require('shortid')

const shortUrlsSchema = new mongoose.Schema({
    fullUrls:{
        type: String,
        required: true
    },
    shortUrl:{
        type:String,
        required: true,
        default: shortUrl.generate
    },
    clicks:{
        type: Number,
        required:true,
        default:0
    }
})

module.exports = mongoose.model('ShortUrl',shortUrlsSchema)