const menu = document.getElementById("menuNav")
const menuBtn = document.getElementById("menu-btn")
const cardImg = document.getElementsByClassName("cardImg")
const galleryHtmlArray = []
menuBtn.addEventListener("click", () => {
    menu.classList.toggle("menu-open");
})

cardImg[0].addEventListener("click", () => {
    console.log(cardImg);
})
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
