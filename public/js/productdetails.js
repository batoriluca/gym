const arrow_left = document.getElementById("arrowLeft");
const arrow_right = document.getElementById("arrowRight");

var productScreen = 1;

const img_partEl = document.getElementById("img_part");
const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");

arrow_left.addEventListener("click", () => {
    if (productScreen === 2 || productScreen === 3) {
        productScreen--;
        img_partEl.style.transform = 'translateX(calc(100% / 3 * ' + productScreen + '*-1))';
        arrowLeft.style.left = 'calc(100% / 3 * ' + productScreen + '*-1)';
        arrowRight.style.transform = 'translateX(calc(100% / 3 * ' + productScreen + '*-1))';
        console.log(img_partEl)
    }

})

arrow_right.addEventListener("click", () => {
    if (productScreen === 1 || productScreen === 2) {
        productScreen++;
        img_partEl.style.transform = 'translateX(calc(100% / 3 * ' + (productScreen - 1) + '*-1))';
        arrowLeft.style.left = 'calc(100% / 3 * ' + productScreen + '*-1)';
        console.log(100 / 3 * (productScreen - 1) * -1)
    }

})