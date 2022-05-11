const aboutGrowBtn = document.getElementById("aboutbuttongrow");
const aboutGrowxBtn = document.getElementById("aboutbuttongrowx");

aboutGrowBtn.addEventListener("click", () => {
    document.querySelector("#aboutbuttongrow").setAttribute("style", "display:none;")
    document.querySelector("#aboutbuttongrowx").setAttribute("style", "display:block;")
    document.querySelector(".about-card p").setAttribute("style", "display:block;")
})

aboutGrowxBtn.addEventListener("click", () => {

    document.querySelector("#aboutbuttongrow").setAttribute("style", "display:block;")
    document.querySelector("#aboutbuttongrowx").setAttribute("style", "display:none;")
    document.querySelector(".about-card p").setAttribute("style", "display:none;")
})