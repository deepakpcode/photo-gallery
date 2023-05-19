let textValue = location.search.split('=').pop();

const url = 'https://images.unsplash.com/photo-1681986296223-a0aeb3080e70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDczNTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODQ0OTgwNzN8&ixlib=rb-4.0.3&q=80&w=1080'
const access_key = "VbuqsF9MCf2Fp7WBMoxLuwIVkQjYlzhbQd7GFXebaVU";


const random_photo_url = `https://api.unsplash.com/photos/random/?client_id=${access_key}&count=30`;
const search_photo_url = `https://api.unsplash.com/search/photos/?client_id=${access_key}&per_page=100&query=${textValue}`;
const gallery = document.querySelector('.gallery');

const lightBox = document.querySelector('.light-box');
const downloadImg = document.querySelector('.download-img');
const lightBoxImg = document.querySelector('.lightbox_img');
const closeLightBox = document.querySelector('.close_lightbox');

let currentImg = 0;
let allImages;
let dn;

const getImages = () => {
     fetch(random_photo_url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            allImages = data;
            makeImages(allImages)
        })
}

const searchImages = () => {
    fetch(search_photo_url)
        .then(res => res.json())
        .then(data => {
            allImages = data.results;
            makeImages(allImages)
        })
}

const makeImages = (data) => {
    data.forEach((element, index) => {
        console.log(element)
        let img = document.createElement('img')
        img.src= element.urls.regular;
        img.className= 'gallery-img';
        gallery.appendChild(img)

        img.addEventListener("click", ()=>{
        currentImg = index
        popupImg (element)
        })
    });

}

//Light Box
const popupImg = (element)=>{

    lightBox.style.display='flex';
    lightBoxImg.src = element.urls.regular;
    dn =lightBoxImg.src;
    console.log(dn)
    
}

closeLightBox.addEventListener('click', ()=>{
    lightBox.style.display = 'none'
})

if(textValue == ''){
    getImages();
}else{
    searchImages();
}
    
  //Download Images
  downloadImg.addEventListener('click', (e)=>{
    e.preventDefault();
    dwnimage(dn);
    
  }   )

  function dwnimage(dn){
    fetch( dn).then(res => res.blob()).then(blob => {
        let anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(blob);
        anchor.download = new Date().getTime();
        anchor.click();
    })
  }


//control

const preBtn= document.querySelector('.pre');
const nextBtn= document.querySelector('.next');

preBtn.addEventListener('click', ()=>{
if(currentImg > 0){
    currentImg--;
    popupImg (allImages[currentImg])
}
})

nextBtn.addEventListener('click', ()=>{
    if(currentImg < allImages.length - 1){
        currentImg++;
        popupImg (allImages[currentImg])
    }
    })
    


