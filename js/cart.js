const menu = document.getElementById("menuNav")
const menuBtn = document.getElementById("menu-btn")
const removeBtn = document.getElementsByClassName("remove-btn")
const checkout = document.getElementsByClassName("checkout")
const productContainer = document.getElementById("product-container")
const paymentShow = document.getElementById("payment-show")
const payBtn = document.getElementById("payBtn")
let total = document.getElementById("total")
const cartDBjson = localStorage.getItem("cartDB")
const cartArray = JSON.parse(cartDBjson)
const cart = cartArray || []
let price = 0

menuBtn.addEventListener("click", () => {

  menu.classList.toggle("menu-open");
})


function createProductCards() {
  cart.forEach(item => {
    price += Number(item.price)
    total.textContent = price
    productContainer.innerHTML += `<div class="product-card">
    <img class="product-image" src=${item.url} alt="Versace Eros" />
    <div class="product-info">
      <h3>${item.name}</h3>
      <div class="product-details">
        <span>Price</span>
        <p><span>${item.price}</span>$</p>
      </div>
    </div>
    <button class="remove-btn">Remove item</button>
  </div>`

  })
  for (let i = 0; i < cartArray.length; i++) {
    removeBtn[i].addEventListener('click', () => {
      price -= Number(cartArray[i].price) 
      console.log(price);
      total.textContent = price
      console.log(total);
      cartArray.splice(i, 1)
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
payBtn.addEventListener('click',()=>{
if (checkout[0].value.length > 15 && checkout[1].value.length > 3  && checkout[2].value.length === 3) {
  localStorage.setItem("cartDB", "[]")
  alert('Thank you for buying in picshop')
  setTimeout(() =>  location.reload(), 1000)
 
}else{
  alert("put your card details")
}
})


