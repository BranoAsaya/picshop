const menu = document.getElementById("menuNav")
const menuBtn = document.getElementById("menu-btn")
const cardImg = document.getElementsByClassName("cardImg")

menuBtn.addEventListener("click",()=>{
    menu.classList.toggle("menu-open");
})

cardImg[0].addEventListener("click",()=>{
    console.log(cardImg);
})
