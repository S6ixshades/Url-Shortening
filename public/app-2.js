console.log('hello world');
let multiLink=document.querySelector('.hidden-result');
function createLinks(){

    multiLink.innerHTML=""
    let response=localStorage.getItem('data');
    let data=JSON.parse(response)||[];
    
    data.forEach((item)=>{
        let template=`<div class="allLink">
        <div class ="container" id="link1">
        <h2>${item.originalURL}</h2>
        <h2>${item.shortURL}</h2>
        <button type ="button class="btn btn-lg btn-primary copy">copy</button>
        </div>
        </div>`
        multiLink.innerHTML+=template;
    })
}


createLinks()
let linkForm=document.getElementById('linkShorten');
linkForm.addEventListener('submit',async(e)=>{
    e.preventDefault()

    let link={
        linkShorten: document.querySelector('.url-input gray-p').value
    }
    console.log(link);
    let response =await fetch ('/short',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(link)
    });
    let data=await response.json();
    console.log(data);

    let links=JSON.parse(localStorage.getItem('data'))||[]
    links.push(data);
    localStorage.setItem('data',JSON.stringify(links));
    createLinks()
})
multiLink.addEventListener('click',async(e)=>{
    if(e.target.classList.contains('copy')){
        console.log(e.target)
        await navigator.clipboard.writeText(e.target.previousElementSibling.textContent)
    }
})