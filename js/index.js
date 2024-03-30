const menu = document.getElementById("menuNav")
const menuBtn = document.getElementById("menu-btn")
const cardImg = document.getElementsByClassName("cardImg")
const galleryHtmlArray = []
const cartCount = document.getElementById('cart-count')

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("menu-open");
})

cardImg[0].addEventListener("click", () => {
    console.log(cardImg);

})

function setLocalStorageItems() {
const userObj = localStorage.getItem("userObj")
const cartDB = localStorage.getItem("cartDB")
if (!userObj && !cartDB) {
    localStorage.setItem("userObj","{}")
    localStorage.setItem("cartDB","[]")
}else{
    cartArray = JSON.parse(localStorage.getItem("cartDB"))
    cartCount.textContent =cartArray.length
}  
}
setLocalStorageItems()

async function getData() {
    try {
        const response = await fetch('https://picsum.photos/v2/list?page=2&limit=100');
        const json = await response.json();
        return json
    } catch (error) {
        console.log(error);
    }
}
getData().then(data => saveDataInStorage(data));


function saveDataInStorage(data) {
    localStorage.setItem("picsDB", JSON.stringify(data))
}
