const btn = document.getElementById("themeBtn");
const body = document.body;
const navbar = document.getElementById("navbar");

body.classList.add("dark-mode");

btn.addEventListener("click", () => {

    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");

    if(body.classList.contains("light-mode")){
        navbar.classList.remove("navbar-dark","bg-dark");
        navbar.classList.add("navbar-light","bg-light");

        btn.innerHTML = '<i class="bi bi-sun-fill"></i>';
        btn.classList.remove("btn-outline-light");
        btn.classList.add("btn-outline-dark");
    }
    else{
        navbar.classList.remove("navbar-light","bg-light");
        navbar.classList.add("navbar-dark","bg-dark");

        btn.innerHTML = '<i class="bi bi-moon-fill"></i>';
        btn.classList.remove("btn-outline-dark");
        btn.classList.add("btn-outline-light");
    }
});