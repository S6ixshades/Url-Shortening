console.log('hello world');
let multiLink=document.querySelector('.hidden-result');
function createLinks(){
    console.log('hello')
    multiLink.innerHTML=""
    let response=localStorage.getItem('data');
    let data=JSON.parse(response)||[];
    console.log(data);
    data.forEach((item)=>{
        let template = `              <div class="results">
        <p class="original_url"> ${item.originalURL}</p>
        <p class="short-code">${item.shortURL}</p>
        <button class="copy-btn">Copy</button>
      </div>`
        multiLink.innerHTML+=template;
    })
}

multiLink.addEventListener('click', (e)=>{
    if(e.target.classList.contains('copy-btn')){
        let text = e.target.previousElementSibling.textContent
        console.log(text);
        navigator.clipboard.writeText(text).then(
            ()=>{
                e.target.textContent = 'copiend!'
            }
        ).catch((e)=>{
            console.log(error)
        })
    }
})

createLinks()
let linkForm=document.getElementById('linkShorten');
linkForm.addEventListener('submit',async(e)=>{
    e.preventDefault()

    let link={
        linkShorten: document.querySelector('.url-input').value
    }
    console.log(link);
    let response =await fetch ('/url',{
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