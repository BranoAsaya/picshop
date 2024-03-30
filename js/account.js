const logInPage = document.getElementById('login-page')
const inputField = document.getElementsByClassName('input-field')
const textFill = document.getElementsByClassName('text-fill')
const accountSection = document.getElementsByClassName('account-section')
const btnSubmit = document.getElementById('btn-submit')
const bannerImg = document.getElementById('banner-img')
const title = document.getElementById('title')
const galleryLink = document.getElementById('galleryLink')
const btnLogOut = document.getElementById('btn-logout')
let usersDB = [{ email: "admin@picshop.com", password: "B4rfv5tgb" ,username:"Boss",phone:"0"}]
let user = "{}"
let flag = true

const menu = document.getElementById("menuNav")
const menuBtn = document.getElementById("menu-btn")

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("menu-open");
})




function updateDB() {
    const usersArray = localStorage.getItem("usersDB")
    const usersDBArrayString = JSON.stringify(usersDB)
    if (usersArray) {
        usersDB = JSON.parse(usersArray)
    } else {
        localStorage.setItem("usersDB", usersDBArrayString)

    }

} updateDB()

function checkIfUserLogIn() {
    const userObj = localStorage.getItem("userObj")

    if (userObj !== "{}" && userObj) {
        accountSection[0].style.display = "none"
        accountSection[1].style.display = "block"
        return userObj

    } else {
        accountSection[0].style.display = "block"
        accountSection[1].style.display = "none"    

    }


} checkIfUserLogIn()


function userSignUp(usersArray, userObject) {
    const emailValid = userObject.email.match(".+@picshop\.com")
    const passwordValid = userObject.password.length > 5 ? true : false

    if (emailValid && passwordValid) {
        const index = usersArray.findIndex(user => {
            return user.email === userObject.email
        })
        if (index < 0) {
            usersArray.push(userObject)
            const userObjTypeJSON = JSON.stringify(userObject)
            const usersDBtypeJSON = JSON.stringify(usersArray)
             localStorage.setItem("userObj", userObjTypeJSON)
            localStorage.setItem("usersDB", usersDBtypeJSON)
            checkIfUserLogIn()
            galleryLink.click()
            alert("welcome " + userObject.username)
        } else {
            inputField[0].value = ""
            inputField[1].value = ""
            inputField[2].value = ""
            inputField[3].value = ""
            alert("PicShop Account already exists")
        }
    }
    else {
        inputField[0].value = ""
        inputField[1].value = ""
        inputField[2].value = ""
        inputField[3].value = ""
        alert("Please enter @picshop.com email and longer password")
    }

}

function userLogIn(usersArray, userObject) {

    const index = usersArray.findIndex(user => {
        return user.email === userObject.email
    })
    const passwordValid = usersArray[index].password === userObject.password ? true : false
    if (passwordValid) {
        const userObjTypeJSON = JSON.stringify(userObject)
        localStorage.setItem("userObj", userObjTypeJSON)
        checkIfUserLogIn()
        galleryLink.click()
        alert("welcome " + userObject.username)
    } else { alert("problem userLogIn") }

}

function userLogOut() {
    localStorage.setItem("userObj", false)
}

logInPage.addEventListener('click', (e) => {
    e.preventDefault()

    inputField[2].style.display = flag ? "none" : "block"
    inputField[3].style.display = flag ? "none" : "block"
    bannerImg.style = flag ? "filter: grayscale(100%);" : "filter: grayscale(0%);"
    textFill[0].textContent = flag ? "Enter" : "Create"
    textFill[1].textContent = flag ? "Don't" : "Already"
    textFill[2].textContent = flag ? "Sign Up" : "Log in"
    textFill[3].textContent = flag ? "Log in" : "Sign Up"
    textFill[2].id = flag ? "LogIn" : "SignUp"
    flag = flag ? false : true
})

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    const email = inputField[0].value
    const password = inputField[1].value
    const username = inputField[2].value
    const phone = inputField[3].value
    const BtnId = textFill[2].id
    const newUser = { email, password, username, phone }
    if (BtnId === "SignUp") {
        userSignUp(usersDB, newUser)
    } else {
        userLogIn(usersDB, newUser)
    }
}
)
btnLogOut.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.setItem("userObj", "{}")
    checkIfUserLogIn()
}
)


