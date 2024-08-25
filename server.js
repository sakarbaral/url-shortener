const express = require('express')
const app=express()
const mongoose=require('mongoose')
app.set('view engine','ejs')
const ShortenURL=require('./models/shortUrl.js')
app.use(express.urlencoded({extended:false}))

mongoose.connect("mongodb://localhost/urlShortener"),{
    useNewUrlParser:true,
    useUnifiedTopology:true
}

app.get('/',async(req,res)=>{
    const shortUrls=await ShortenURL.find()
    res.render('index',{shortUrls:shortUrls})
})

app.post('/shorten',async (req,res)=>{
    await ShortenURL.create({
        url:req.body.URL,
    })
    res.redirect('/')
})

app.get('/:shortUrl',async(req,res)=>{
    const shortUrl=await ShortenURL.findOne({shortUrl:req.params.shortUrl})
    if(shortUrl==null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()


    res.redirect(shortUrl.url)


})
app.listen(process.env.PORT||5000)