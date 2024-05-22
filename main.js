
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}
let productData
function Fetchdata(){
    const store=fetch("https://backend-data-2ujr.onrender.com/pitches")
    .then((res)=>res.json())
    .then((data)=>{
     cardList(data)
     productData=data
    })
    .catch((err)=>console.log(err));
    }
Fetchdata()
      
function cardList(data){
    const store=data.map((el)=>card(el.id,el.image,el.title,el.price,el.founder,el.category,el.description))
   mainSection.innerHTML=store
}

function card(id,image,title,price,founder,category,description){
  
    let singlecard=`
    <a href="page2.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&price=${encodeURIComponent(price)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&id=${id}&description=${encodeURIComponent(description)}"
    <div class="card" data-id=${id}>
    <div class="card-img">
     <img src="${image}" alt="">
    <div class="card-body">
     <h4 class="card-title">${title}</h4>
     <p class="card-founder">${founder}</p> 
     <p class="card-price">${price}</p>
     <p class="card-category">${category}</p>
     <p class="card-description">${description}</p>
     <a href="" class="card-link" data-id=${id}>Edit</a>
     <button class="card-button" data-id=${id}>Delete</button>
   </div> 
   </div>
   </div>
   </a>
    `
    return singlecard;
}
pitchCreateBtn.addEventListener("click",()=>{
    let product={
        title:pitchTitleInput.value,
        price:pitchPriceInput.value,
        category:pitchCategoryInput.value,
        image:pitchImageInput.value,
        founder:pitchfounderInput.value,
    }
  fetch("https://backend-data-2ujr.onrender.com/pitches",{
    method:"POST",
    headers:{
        'content-type':'application/json',
    },
    body:JSON.stringify(product)
  }).then((res)=>res.json())
  .then((data)=>{
    console.log(data)
    alert("product add...")
  }).catch((err)=>{
    console.log(err)
    alert("")
  })
}) 
   
// /+++++++++++++++++++++++++++++++++++ DELETE +++++++++++++++++++++++++++++++++++++====//
 
document.addEventListener("click",(e)=>{

 if(e.target.classList.contains("card-button"))
  {
    delteproduct(e.target.dataset.id)
  }
})
function delteproduct(id){
fetch(`https://backend-data-2ujr.onrender.com/pitches/${id}`,{
method:'DELETE'
})
.then((res)=>res.json())
.then((data)=>{
  alert("delete...")
  console.log(data);
})
.catch((err)=>console.log(err))
}

  //  /=================================filter==========================================//


  filterFood.addEventListener("click",()=>{
    let filterFood=productData.filter((el)=>el.category=="Food")
    console.log(filterFood)
    cardList(filterFood)
  })

  filterElectronics.addEventListener("click",()=>{
    let filterElectronics =productData.filter((el)=>el.category=="Electronics")
    console.log(filterElectronics)
    cardList(filterElectronics)
  })

  filterPersonalCare.addEventListener("click",()=>{
    let filterPersonalCare=productData.filter((el)=>el.category=="Personal Care")
    console.log(filterPersonalCare)
    cardList(filterPersonalCare)
  })

  // sorting part //

  sortAtoZBtn.addEventListener("click",()=>{
    const sortAtoZdata=productData.sort((a,b)=>a.price-b.price)
    cardList(sortAtoZdata)
  })

  sortZtoABtn.addEventListener("click",()=>{
    const sortAtoZdata=productData.sort((a,b)=>b.price-a.price)
    cardList(sortAtoZdata)
  })