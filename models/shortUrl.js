const mongoose=require('mongoose')
const shortID=require('short-unique-id')


const uid = new shortID()



const shortUrlSchema= new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        default:uid.rnd(8)
    },
    clicks:{
        type:Number,
        required:true,
        default:0
    }
})


module.exports=mongoose.model('ShortUrl',shortUrlSchema)