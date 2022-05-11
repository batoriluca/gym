const likeBtn = document.querySelectorAll("#like");

setLeftSideHeight();

function setLeftSideHeight() {
    if (window.innerWidth > 1500) {
        var posts = document.querySelectorAll(".post");
        var s = 1000;
        posts.forEach(post => {
            s += post.offsetHeight + 10;
        })

        document.querySelector(".left-side").setAttribute("style", "height:" + s + "px;");
    } else {

        document.querySelector(".left-side").setAttribute("style", "height:auto;");
    }
}
window.addEventListener("resize", () => {
    setLeftSideHeight();
})




likeBtn.forEach(likeB => {
    likeB.addEventListener("click", () => {
        var bgAtr = likeB.getAttribute("style");
        if (bgAtr === null) {
            likeB.setAttribute("style", "background-image: linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%);");
        } else if (bgAtr !== null) {
            likeB.removeAttribute("style");
        }
    })
});