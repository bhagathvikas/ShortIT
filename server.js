const { response } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrls')
const dotenv = require('dotenv')
const app = express()
dotenv.config({path:__dirname+'/.env'});
mongoose.connect(process.env.CONNECTION_URL,{
    useNewUrlParser: true, useUnifiedTopology: true,
})
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.get('/', async(req,res)=>{
    const shortUrls = await ShortUrl.find().sort({_id:-1}) 
res.render('index',{shortUrls: shortUrls})
})

app.post('/shortUrls', async (req,res)=>{
await ShortUrl.create({fullUrls:req.body.fullUrls})
res.redirect('/')
})

app.get('/:shortUrl',async (req,res)=>{
const shortUrl = await ShortUrl.findOne({shortUrl:req.params.shortUrl})
 if(shortUrl == null ) return res.sendStatus(404);
 shortUrl.clicks++
 shortUrl.save()
 res.redirect(shortUrl.fullUrls)
 })

app.listen(process.env.PORT || 5000)


