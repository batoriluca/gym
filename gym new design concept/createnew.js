const backToCardsVid = document.getElementById("backVideo");
const backToCardsTxt = document.getElementById("backText");
const backToCardsImg = document.getElementById("backImg");



var selectVid = document.getElementById("selectVid")
var selectTxt = document.getElementById("selectTxt")
var selectImg = document.getElementById("selectImg")

selectVid.addEventListener("click", () => {

    document.querySelector(".p1").setAttribute("style", "display:none;")
    document.querySelector(".video-post").setAttribute("style", "display:block;")


})

selectImg.addEventListener("click", () => {

    document.querySelector(".p1").setAttribute("style", "display:none;")
    document.querySelector(".img-post").setAttribute("style", "display:block;")


})

selectTxt.addEventListener("click", () => {

    document.querySelector(".p1").setAttribute("style", "display:none;")
    document.querySelector(".text-post").setAttribute("style", "display:block;")


})



backToCardsVid.addEventListener("click", () => {

    document.querySelector(".p1").setAttribute("style", "display:block;")
    document.querySelector(".video-post").setAttribute("style", "display:none;")


})
backToCardsTxt.addEventListener("click", () => {

    document.querySelector(".p1").setAttribute("style", "display:block;")
    document.querySelector(".text-post").setAttribute("style", "display:none;")


})
backToCardsImg.addEventListener("click", () => {

    document.querySelector(".p1").setAttribute("style", "display:block;")
    document.querySelector(".img-post").setAttribute("style", "display:none;")


})



const vid = document.querySelector("#source");
const file = document.querySelector("#fileInput");

const videoP = document.getElementById("videoP");



file.addEventListener("change", function() {
    const choosedImg = this.files[0];

    if (choosedImg) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            vid.setAttribute("src", reader.result)
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