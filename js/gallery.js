const galleryGrid = document.getElementById("photo-grid")
const dialog = document.getElementById("dialog")
const popUpImg = document.getElementById("popUpImg")
const artistName = document.getElementById("artist-name")
const picPrice = document.getElementById('pic-price')
const btnClose = document.getElementById("btn-close")
const btnAdd = document.getElementById("btn-add")
const picsDBtypeJSON = localStorage.getItem("picsDB")
const cartDBtypeJSON = localStorage.getItem("cartDB")
const userObjJSON = localStorage.getItem("userObj")
const picsDB = JSON.parse(picsDBtypeJSON)
const cartDB = JSON.parse(cartDBtypeJSON)
const gallery = document.getElementById("gallery")
const imgFrame = document.getElementsByClassName("gallery-img")
const pageNumber = document.getElementsByClassName("page-number")
const btnCart = document.getElementsByClassName("btn-cart")
const cartCount = document.getElementById('cart-count')
const cartItem = { url: '', name: '' ,price:''}
const arrayCart = cartDB || []
let min = -1
let max = 10


const menu = document.getElementById("menuNav")
const menuBtn = document.getElementById("menu-btn")
const galleryHtmlArray = []
menuBtn.addEventListener("click", () => {
    menu.classList.toggle("menu-open");
})


function createPhotosElements(data, tag) {
    
    const photos = data
    const fragment = new DocumentFragment()
    let index = 0
    for (let i = 1; i < photos.length; i++) {
        index++
        let figure = document.createElement('figure')
        let img = document.createElement('img')
        figure.className = `gallery-frame gallery-item-${index}`
        figure.id = `gallery-frame-${i}`
        img.src = photos[i].download_url
        img.className = "gallery-img img"
        img.name = photos[i].author
        img.alt = `Gallery-image-${i}-${photos[i].width}`
        img.loading = "lazy"
        img.addEventListener("load", () => {
            img.classList.add('loaded')
        })
        figure.appendChild(img)
        fragment.appendChild(figure)
        if (index > 9) {
            index = 0
        }
    }
    tag.appendChild(fragment)
}
createPhotosElements(picsDB, gallery)


btnClose.addEventListener('click', () => {
    dialog.close()
})


btnAdd.addEventListener('click', () => {

    btnAdd.style = "background-color: #4CfFD0;"
    const index = arrayCart.findIndex(item => {
        return item.url === cartItem.url
    })
    if (index < 0) {
        arrayCart.push({ url: cartItem.url, name: cartItem.name ,price:cartItem.price})
        cartCount.textContent = arrayCart.length
        btnCart[1].style = "background-color:limegreen; border-radius: 5px;"
        localStorage.setItem('cartDB', JSON.stringify(arrayCart))
    }
    setTimeout(() => btnAdd.style = "background-color:limegreen", 1000)

})


setTimeout(() => userObjJSON === '{}' ? alert("please log-in") : "", 1000)


function filterImagesByRange() {

    const length = 99
    for (let i = 0; i < length; i++) {
        if (i > min & i < max) {
            imgFrame[i].style.display = "block"
            gallery.childNodes[i].style = "pointer-events: auto;"
            continue
        }
        imgFrame[i].style.display = "none"
        gallery.childNodes[i].style = "pointer-events: none;"
    }
    cartArray = JSON.parse(localStorage.getItem("cartDB"))
    cartCount.textContent = cartArray.length
}
filterImagesByRange()


function dialogHandler() {

    for (let i = 0; i < gallery.childNodes.length; i++) {
        gallery.childNodes[i].addEventListener('click', () => {
            popUpImg.src = gallery.childNodes[i].childNodes[0].currentSrc
            artistName.textContent = gallery.childNodes[i].childNodes[0].name
            picPrice.textContent =gallery.childNodes[i].childNodes[0].alt.slice(16)
            cartItem.url = popUpImg.src
            cartItem.name = artistName.textContent
            cartItem.price = picPrice.textContent
            dialog.showModal()
        })

    }
}
dialogHandler()


function paginationHandler() {
    pageNumber[1].classList.add("active")
    let prevPage = 1

    for (let i = 0; i < 7; i++) {
        pageNumber[i].addEventListener('click', (e) => {
            e.preventDefault()
            window.scrollTo(0, 0);
            if (i == 1) {
                min = -1
                max = 10
                pageNumber[prevPage].classList.remove("active")
                pageNumber[i].classList.add("active")
                filterImagesByRange()
            } else {
                min = 10 * i - 1
                max = min + 10 + 1
                filterImagesByRange()
                pageNumber[1].classList.remove("active")
                pageNumber[prevPage].classList.remove("active")
                prevPage = i
                pageNumber[i].classList.add("active")

            }

        })
    }

}
paginationHandler()