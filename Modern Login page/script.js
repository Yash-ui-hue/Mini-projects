const login = document.getElementById("login");
const loginToggle = document.querySelector(".toggle-button");
loginToggle.addEventListener("click",()=> {
    login.classList.add('active');
})

const singup = document.getElementById("signup");
singup.addEventListener("click", ()=> {
    login.classList.remove('active')
})