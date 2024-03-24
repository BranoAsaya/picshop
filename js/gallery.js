const galleryGrid = document.getElementById("photo-grid")
const dialog = document.getElementById("dialog")
const popUpImg = document.getElementById("popUpImg")
const btnClose = document.getElementById("btn-close")
const picsDBtypeJSON = localStorage.getItem("picsDB")
const htmlData = localStorage.getItem("htmlData")
const picsDB = JSON.parse(picsDBtypeJSON)
const gallery = document.getElementById("gallery")
let data = JSON.parse(htmlData)

const menu = document.getElementById("menuNav")
const menuBtn = document.getElementById("menu-btn")
const galleryHtmlArray = []
menuBtn.addEventListener("click", () => {
    menu.classList.toggle("menu-open");
})


function showPhotos(data, tag) {
    const photos = data
    const fragment = new DocumentFragment()
    for (let i = 1; i < photos.length; i++) {
        let figure = document.createElement('figure')
        let img = document.createElement('img')
        figure.className = `gallery-frame gallery-item-${i}`
        img.src = photos[i].download_url
        img.className = "gallery-img img"
        img.alt = `Gallery image ${i}`
        img.loading = "lazy"
        img.id = i
        img.addEventListener("load", () => {
            img.classList.add('loaded')
        })
        img.addEventListener("click", () => {
            dialog.showModal()
            popUpImg.src = photos[i].download_url
            console.log("img clicked");
        })
        figure.appendChild(img)
        fragment.appendChild(figure)
    }
    tag.appendChild(fragment)
}
showPhotos(picsDB, gallery)

btnClose.addEventListener('click',()=>{
    dialog.close()
})


