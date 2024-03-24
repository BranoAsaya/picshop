const menu = document.getElementById("menuNav")
const menuBtn = document.getElementById("menu-btn")

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("menu-open");
})
