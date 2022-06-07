 const imageContainer = document.getElementById('image-container');
 const loader = document.getElementById('loader');

 let photosArray = [];
 let ready = false;
 let imagesLoaded = 0;
 let totalImages = 0;
 
 
 //Unsplash API
 const count=30;
 const apiKey='hleyLidfuuJnSg9cCyKeMuCwr-I781kYi0vI6kpcwug';
 const apiUrl='https://api.unsplash.com/photos/random?client_id='+apiKey+'&count='+count;

 //Check if all images were loaded
 function imageLoaded(){
     imagesLoaded++;
     if(imagesLoaded === totalImages){
         ready = true;
         loader.hidden = true;
         console.log ('ready = ', ready) 
     }
 }

 //Helper Function to set attributes on DOM Elements
 function setAttributes(element, attributes){
     for(const key in attributes ){
         element.setAttribute(key,attributes[key]);
     }
 }
 
 // Create elements for links and photos
 function displayPhotos(){
     imagesLoaded = 0;
     totalImages = photosArray.length;
     //run function for each object in photosArray
     photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        //Put <img> inside <a>, then put both inside imageContainer
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
     })
 }
 
 //Get photos from Unsplash API
 async function getPhotos(){
     try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
     }catch(error){
        
     }
    }
     //Check to see if scroll is near bottom
     window.addEventListener('scroll', () => {
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
            ready = false;
            getPhotos();
        }
     });
    

     // On Load
     getPhotos();
 