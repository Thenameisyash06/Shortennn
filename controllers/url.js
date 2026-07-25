const URL = require("../models/url");
const { nanoid,customAlphabet } = require('nanoid');
const {getUser} = require("../services/auth")


async function handleGenrateShortUrl(req,res){
    const body = req.body;

    const s_ltr = 'qwertyuiopasdfghjklzxcvbnm';
    const c_ltr = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    const num = '1234567890';
    const smbl = '!@#$%^&*()_?<>'
    let content = '';
    if(body.small)
        content += s_ltr;
    if(body.captial)
        content += c_ltr;
    if(body.numbers)
        content += num
    if(body.symbols)
        content += smbl

    var shortUrl = '';
    const size = Number(body.length);
    console.log(body);
    console.log(content);
    

    if(!body.url) return res.status(400).json({error: "Url is reqired"});
    if(content && size){
        const id = customAlphabet(content,size);
        shortUrl = id();
    }
    else if(content){
        const id = customAlphabet(content,10);
        shortUrl = id();
    }
    else if(size){
        shortUrl = nanoid(size)
    }
    else
        shortUrl = nanoid(10);
    await URL.create({
        shortedUrl: shortUrl,
        requiredUrl:body.url,
        visitedUrl:[],
        createdBy: req.user._id,
    });
    return res.render("index",{
        id:shortUrl,
    })
    return res.json({id:shortUrl})
}

async function handleGetAnalytics(req,res){
    const sessionId = req.cookie?.uid
    const User = req.user
    // console.log(User);
    const UserId = User._id
    const urls = await URL.find({createdBy:UserId})
    return res.render("analytics",{
        urls
    })
    return res.json({urls});
}

async function handleGetUrlAnalytics(req,res){
    const url = await URL.findById(req.params.id);
    console.log(url);
    res.render("analyze",{url});
}

module.exports = {
    handleGenrateShortUrl,handleGetAnalytics,handleGetUrlAnalytics
}