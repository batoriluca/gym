const rightA = document.getElementById("arrowRight");
const leftA = document.getElementById("arrowLeft");

var move = 1;

var px = 700;

leftA.addEventListener("click", () => {
    if (window.innerWidth > 850) {
        px = 700;
    } else if (window.innerWidth <= 850 && window.innerWidth > 650) {
        px = 550;
    } else if (window.innerWidth <= 650 && window.innerWidth > 500) {
        px = 420;
    } else if (window.innerWidth <= 500) {
        px = 250;
    }
    if (move !== 1) {
        var rightApx = (3 - move) * px + 20;
        var leftApx = (move - 1) * px + 20;
        move--;
        rightApx += px;
        leftApx -= px;
        document.querySelector(".img-part").setAttribute("style", "transform:translateX(-" + (move - 1) * px + "px);")
        document.querySelector("#arrowRight").setAttribute("style", "right: " + rightApx + "px;")
        document.querySelector("#arrowLeft").setAttribute("style", "left: " + leftApx + "px;")
    }
})

rightA.addEventListener("click", () => {
    if (window.innerWidth > 850) {
        px = 700;
    } else if (window.innerWidth <= 850 && window.innerWidth > 650) {
        px = 550;
    } else if (window.innerWidth <= 650 && window.innerWidth > 500) {
        px = 420;
    } else if (window.innerWidth <= 500) {
        px = 250;
    }
    if (move !== 3) {
        var rightApx = (3 - move) * px + 20;
        var leftApx = (move - 1) * px + 20;
        move++;
        rightApx -= px;
        leftApx += px;
        document.querySelector(".img-part").setAttribute("style", "transform:translateX(-" + (move - 1) * px + "px);")
        document.querySelector("#arrowRight").setAttribute("style", "right: " + rightApx + "px;")
        document.querySelector("#arrowLeft").setAttribute("style", "left: " + leftApx + "px;")
    }
})

window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
        px = 700;
    } else if (window.innerWidth <= 850 && window.innerWidth > 650) {
        px = 550;
    } else if (window.innerWidth <= 650 && window.innerWidth > 500) {
        px = 420;
    } else if (window.innerWidth <= 500) {
        px = 250;
    }
    var rightApx = (3 - move) * px + 20;
    var leftApx = (move - 1) * px + 20;
    document.querySelector("#arrowLeft").setAttribute("style", "left: " + leftApx + "px;")
    document.querySelector(".img-part").setAttribute("style", "transform:translateX(-" + (move - 1) * px + "px);")
    document.querySelector("#arrowRight").setAttribute("style", "right: " + rightApx + "px;")
})