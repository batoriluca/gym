const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");
const imgPartEl = document.getElementById("img_part");
let productScreen = 1;

arrowLeft.addEventListener("click", () => {
  if (productScreen >= 2 && productScreen <= 3) {
    productScreen--;
    imgPartEl.style.transform = `translateX(calc(100% / 3 * ${productScreen - 1} * -1))`;
    console.log(100 / 3 * (productScreen - 1) * -1);
  }
});

arrowRight.addEventListener("click", () => {
  if (productScreen >= 1 && productScreen <= 2) {
    productScreen++;
    imgPartEl.style.transform = `translateX(calc(100% / 3 * ${productScreen - 1} * -1))`;
    console.log(100 / 3 * (productScreen - 1) * -1);
  }
});
