const rightA = document.getElementById("arrowRight");
const leftA = document.getElementById("arrowLeft");

var move = 1;

var px = 800;

leftA.addEventListener("click", () => {
    if (window.innerWidth > 1500) {
        px = 800;
    } else if (window.innerWidth <= 1500 && window.innerWidth > 850) {
        px = 650;
    } else if (window.innerWidth <= 850 && window.innerWidth > 650) {
        px = 500;
    } else if (window.innerWidth <= 650 && window.innerWidth > 500) {
        px = 400;
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
    if (window.innerWidth > 1500) {
        px = 800;
    } else if (window.innerWidth <= 1500 && window.innerWidth > 850) {
        px = 650;
    } else if (window.innerWidth <= 850 && window.innerWidth > 650) {
        px = 500;
    } else if (window.innerWidth <= 650 && window.innerWidth > 500) {
        px = 400;
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
    if (window.innerWidth > 1500) {
        px = 800;
    } else if (window.innerWidth <= 1500 && window.innerWidth > 850) {
        px = 650;
    } else if (window.innerWidth <= 850 && window.innerWidth > 650) {
        px = 500;
    } else if (window.innerWidth <= 650 && window.innerWidth > 500) {
        px = 400;
    } else if (window.innerWidth <= 500) {
        px = 250;
    }
    var rightApx = (3 - move) * px + 20;
    var leftApx = (move - 1) * px + 20;
    document.querySelector("#arrowLeft").setAttribute("style", "left: " + leftApx + "px;")
    document.querySelector(".img-part").setAttribute("style", "transform:translateX(-" + (move - 1) * px + "px);")
    document.querySelector("#arrowRight").setAttribute("style", "right: " + rightApx + "px;")
})

const vid = document.querySelector("#source");
const file = document.querySelector("#fileInput3");

const videoP = document.getElementById("videoP");



file.addEventListener("change", function() {
    const choosedImg = this.files[0];

    if (choosedImg) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            vid.setAttribute("src", reader.result)
            videoP.style.display = "block";
            videoP.load();
            videoP.play();
        })
        reader.readAsDataURL(choosedImg);
    }

})

const img = document.querySelector("#sourceImg");
const fileImg = document.querySelector("#fileInputImg");

const imgP = document.getElementById("imgP");



fileImg.addEventListener("change", function() {
    const choosedImg = this.files[0];

    if (choosedImg) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            imgP.setAttribute("src", reader.result)
            document.querySelector(".image").setAttribute("style", "height:100%;")
        })
        reader.readAsDataURL(choosedImg);
    }

})

const img2 = document.querySelector("#sourceImg");
const fileImg2 = document.querySelector("#fileInputImg2");

const imgP2 = document.getElementById("imgP2");



fileImg2.addEventListener("change", function() {
    const choosedImg2 = this.files[0];

    if (choosedImg2) {
        const reader2 = new FileReader();
        reader2.addEventListener("load", () => {
            imgP2.setAttribute("src", reader2.result)
            document.querySelector(".image2").setAttribute("style", "height:100%;")
        })
        reader2.readAsDataURL(choosedImg2);
    }

})