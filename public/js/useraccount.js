var postsOn = true;

const postsBtn = document.getElementById('posts');
const prodsBtn = document.getElementById('prods');
const productsDiv = document.getElementById('productsDiv');
const postsDiv = document.getElementById('postsDiv');


prodsBtn.addEventListener("click", () => {
    if (postsOn === true) {

        postsBtn.style.backgroundColor = "transparent";
        postsBtn.style.cursor = "pointer";
        postsBtn.style.color= "white";
        prodsBtn.style.color="#ffd218"
        prodsBtn.style.border="1px solid #ffd11867";
        postsBtn.style.border="none";
        prodsBtn.style.backgroundColor = "#ffffff1a";
        prodsBtn.style.cursor = "default";
        productsDiv.style.display = "grid";
        postsDiv.style.display = "none";
        postsOn = false;
    }

})

postsBtn.addEventListener("click", () => {
    if (postsOn === false) {
        productsDiv.style.display = "none";
        postsDiv.style.display = "grid";
        prodsBtn.style.backgroundColor = "transparent";
        prodsBtn.style.cursor = "pointer";
        postsBtn.style.backgroundColor = "#ffffff1a";
        postsBtn.style.cursor = "default";
        prodsBtn.style.color= "white";
        postsBtn.style.color="#ffd218"
        postsBtn.style.border="1px solid #ffd11867";
        prodsBtn.style.border="none";
        postsOn = true;
    }

})