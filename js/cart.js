const menu = document.getElementById("menuNav")
const menuBtn = document.getElementById("menu-btn")
const removeBtn = document.getElementsByClassName("remove-btn")
const productContainer = document.getElementById("product-container")
const paymentShow = document.getElementById("payment-show")
const cartDBjson = localStorage.getItem("cartDB")
const cartArray = JSON.parse(cartDBjson)
const cart = cartArray || []

menuBtn.addEventListener("click", () => {

  menu.classList.toggle("menu-open");
})




function createProductCards() {

  cart.forEach(item => {

    productContainer.innerHTML += `<div class="product-card">
    <img class="product-image" src=${item.url} alt="Versace Eros" />
    <div class="product-info">
      <h3>Versace Eros</h3>
      <p>Eau de Toilette</p>
      <div class="product-details">
        <span>Price</span>
        <p>$139</p>
        <span>Volume</span>
        <p>100ml</p>
      </div>
    </div>
    <button class="remove-btn">Remove item</button>
  </div>`

  })
  for (let i = 0; i < cartArray.length; i++) {
    console.log("in");
    removeBtn[i].addEventListener('click', () => {
      console.log(i);
      cartArray.splice(i, 1)
      console.log(cartArray);
      if (cartArray.length === 0) {
        paymentShow.style.display = 'none'
      }
      productContainer.removeChild(productContainer.childNodes[i])
      localStorage.setItem("cartDB", JSON.stringify(cartArray))
    })


  }

}



if (cart.length === 0) {
  paymentShow.style.display = 'none'
  productContainer.innerHTML = `
    <div class="add-product-div">
    <h3><button class="add-products-button">
    <a href="./gallery.html">add products</a>
    </button></h3>
  </div> `
  
} else {
  paymentShow.style.display = 'block'
  createProductCards()
}


