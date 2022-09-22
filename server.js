const express=require ('express');
const generateSlug=require('./middlewares/generateSlug');
const path= require('path');
const port = 5000;
const app=express()
const fs = require('fs/promises')

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname,"index.html"))
});

app.get('/:slug', async(req,res)=>{
  //let slugLinks//
  // read from the data.json file using the fs libraray
  let datae;
  try {
    datae = await fs.readFile(path.resolve("data.json"), 'utf-8');
    // convert the read data from string to array using JSON.parse
    datae = JSON.parse(datae);
    
  } catch (error) {
    datae = [];
  }

  let match=datae.find((items)=>{
    return items.slug===req.params.slug
  });
  if(match){
    return res.redirect(match.originalURL)
  }
  res.status(404).send();

});
app.post('/url', generateSlug,async(req,res)=>{
  console.log(req.body);
  let data;
  try{
    let data = await fs.readFile(path.resolve('data.json'), 'r', 'utf8');
    data = JSON.parse(data);
  }catch(error){
    data = [];
  }
  let link ={
    originalURL:req.body.linkShorten,
    slug:req.slug,
    shortURL:`${req.protocol}://${req.get('host')}/${req.slug}`
  }
  data.push(link);
  await fs.writeFile(path.resolve('data.json'), JSON.stringify(data), 'utf8')
  console.log(req.body);
  console.log(req.slug);
  res.status(200).json(link)
})
app.listen(port, ()=>{
  console.log(`server is running on http://localhost:${port}`)
});

module.export=app;
