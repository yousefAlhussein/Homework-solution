const html = document.documentElement;

document.getElementById("themeBtn").addEventListener("click", () => {

    const currentTheme = html.getAttribute("data-bs-theme");

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-bs-theme", newTheme);

});