const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");
const imgPartEl = document.getElementById("img_part");
let productScreen = 1;

arrowLeft.addEventListener("click", () => {
    if (productScreen >= 2 && productScreen <= 3) {
        productScreen--;
        imgPartEl.style.transform = `translateX(calc(100% / 3 * ${productScreen - 1} * -1))`;
        /*arrowLeft.style.left = `calc(100% / 3 * ${productScreen - 1} + 20px)`;
        arrowRight.style.right = `calc(100% / 3 * ${3 - productScreen} - 10px)`;*/
    }
});

arrowRight.addEventListener("click", () => {
    if (productScreen >= 1 && productScreen <= 2) {
        productScreen++;
        imgPartEl.style.transform = `translateX(calc(100% / 3 * ${productScreen - 1} * -1))`;
        /*arrowLeft.style.left = `calc(100% / 3 * ${productScreen - 1} + 20px)`;
        arrowRight.style.right = `calc(100% / 3 * ${3 - productScreen } - 10px)`;*/
    }
});

const vid = document.querySelector("#source");
const file = document.querySelector("#fileInput3");

const videoP = document.getElementById("videoP");



// file.addEventListener("change", function() {
//     const choosedImg = this.files[0];

//     if (choosedImg) {
//         const reader = new FileReader();
//         reader.addEventListener("load", () => {
//             // vid.setAttribute("src", reader.result)
//             videoP.style.display = "block";
//             videoP.load();
//             videoP.play();
//         })
//         reader.readAsDataURL(choosedImg);
//     }

// })

const img = document.querySelector("#sourceImg");
const fileImg = document.querySelector("#fileInputImg");

const imgP = document.getElementById("imgP");



// fileImg.addEventListener("change", function() {
//     const choosedImg = this.files[0];

//     if (choosedImg) {
//         const reader = new FileReader();
//         reader.addEventListener("load", () => {
//             imgP.setAttribute("src", reader.result)
//             document.querySelector(".image").setAttribute("style", "height:100%;")
//         })
//         reader.readAsDataURL(choosedImg);
//     }

// })

const img2 = document.querySelector("#sourceImg");
const fileImg2 = document.querySelector("#fileInputImg2");

const imgP2 = document.getElementById("imgP2");



// fileImg2.addEventListener("change", function() {
//     const choosedImg2 = this.files[0];

//     if (choosedImg2) {
//         const reader2 = new FileReader();
//         reader2.addEventListener("load", () => {
//             imgP2.setAttribute("src", reader2.result)
//             document.querySelector(".image2").setAttribute("style", "height:100%;")
//         })
//         reader2.readAsDataURL(choosedImg2);
//     }

// })