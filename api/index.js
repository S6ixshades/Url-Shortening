const express=require ('express');
const generateSlug=require('../middlewares/generateSlug');
const path= require('path');
const app=express()

let data = [];

app.use(express.urlencoded({extended:true}));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname,"index.html"))
});

app.get('/:slug', async(req,res)=>{
  //let slugLinks//
  // read from the data.json file using the fs libraray

  let match=data.find((items)=>{
    return items.slug===req.params.slug
  });
  if(match){
    return res.redirect(match.originalURL)
  }
  res.status(404).send();

});
app.post('/url', generateSlug,async(req,res)=>{
  let link ={
    originalURL:req.body.linkShorten,
    slug:req.slug,
    shortURL:`${req.protocol}://${req.get('host')}/${req.slug}`
  }
  data.push(link);
  console.log(req.body);
  console.log(req.slug);
  res.status(200).json(link)
})

module.exports=app;
