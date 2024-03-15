const logInPage = document.getElementById('login-page')
const inputField = document.getElementsByClassName('input-field')
const textFill = document.getElementsByClassName('text-fill')
const btnSubmit = document.getElementById('btn-submit')
const bannerImg = document.getElementById('banner-img')
const title = document.getElementById('title')
const usersDB = [{ email: "admin@picshop.com", password: "B4rfv5tgb" }]
// let userLogIn = "{}"
let flag = true

function updateDB() {}

function checkIfUserLogIn() {
    const usersArray = localStorage.getItem("usersDB")
    const userObj = localStorage.getItem("userObj")
    if (userObj !== "{}" && userObj) {
        return userObj
        
    } else {
           localStorage.setItem("userObj", "{}")
           localStorage.setItem("usersDB", "{}")
           localStorage.setItem("picsDB", "{}")
           localStorage.setItem("picObj", "{}")
           return false
    }
 

} checkIfUserLogIn()


function userSignUp(usersArray, userObject) {
    const emailValid = userObject.email.match(".+@picshop\.com")
    const passwordValid = userObject.password.length > 5 ? true : false
    const userObjString = JSON.stringify(userObject)
    // const userObjParse = JSON.parse(userObjString)
console.log("in userSignUp");
    if (emailValid && passwordValid) {
        const index = usersArray.findIndex(user => {
            return user.email === userObject.email
        })
        if (index < 0) {
            usersArray.push(userObject)
            localStorage.setItem("userObj", userObjString)

        } else { alert("PicShop Account already exists") }
    }
    else {
        alert("Please enter @picshop.com email and longer password")
    }

}

function userLogIn(usersArray, userObject) {
    console.log("in userLogIn");
    const userObjString = JSON.stringify(userObject)
    const index = usersArray.findIndex(user => {
        return user.email === userObject.email
    })
     const passwordValid = usersArray[index].password === userObject.password 
     console.log(passwordValid);

    if (index !== -1) {
        localStorage.setItem("userObj", userObjString)

    } else { alert("problem userLogIn") }

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
    const BtnId = textFill[2].id
    const newUser = { email, password }
  
    if (BtnId === "SignUp") {
        userSignUp(usersDB, newUser)
    } else {
        console.log("in");
        userLogIn(usersDB, newUser)
        
    }

    console.log(usersDB);
}
)

