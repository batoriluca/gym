var changeLeaderboardA = document.getElementById("changetoartist");
var changeLeaderboardS = document.getElementById("changetoseller");
var a = true;

changeLeaderboardS.addEventListener("click", () => {
    document.querySelector(".leaderboard-artist").setAttribute("style", "display:none;")
    if (window.innerWidth > 1500) {

        document.querySelector(".leaderboard-seller").setAttribute("style", "display:flex;")
    } else {
        document.querySelector(".leaderboard-seller").setAttribute("style", "display:block;")
    }
    a = false;
})

changeLeaderboardA.addEventListener("click", () => {
    document.querySelector(".leaderboard-seller").setAttribute("style", "display:none;")

    if (window.innerWidth > 1500) {
        document.querySelector(".leaderboard-artist").setAttribute("style", "display:flex;")
    } else {
        document.querySelector(".leaderboard-artist").setAttribute("style", "display:block;")
    }
    a = true;

})

window.addEventListener("resize", () => {
    if (a === true) {
        if (window.innerWidth > 1500) {
            document.querySelector(".leaderboard-artist").setAttribute("style", "display:flex;")
        } else {
            document.querySelector(".leaderboard-artist").setAttribute("style", "display:block;")
        }
    } else {
        if (window.innerWidth > 1500) {

            document.querySelector(".leaderboard-seller").setAttribute("style", "display:flex;")
        } else {
            document.querySelector(".leaderboard-seller").setAttribute("style", "display:block;")
        }
    }
})