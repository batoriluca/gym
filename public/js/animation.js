
// Some random colors
let numBalls = 50;
let balls = [];

let screen1 = document.getElementById("sc1");
console.log("dsd")
for (let i = 0; i < numBalls; i++) {
    let ball = document.createElement("i");
    if (i % 3 === 0) {
        ball.classList.add("fa");
        ball.classList.add("fa-arrow-trend-up");
        ball.classList.add("fas");
        ball.classList.add("fa-solid");
        ball.style.color = "#6657DA";
    } else if (i % 3 === 1) {
        ball.classList.add("fa");
        ball.classList.add("fa-music");
        ball.classList.add("fas");
        ball.classList.add("fa-solid");
        ball.style.color = "#6657DA";
    } else {
        ball.classList.add("fa");
        ball.classList.add("fa-sack-dollar");
        ball.classList.add("fas");
        ball.classList.add("fa-solid");
        ball.style.color = "#6657DA";
    }

    ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
    ball.style.top = `${Math.floor(Math.random() * 100)}vh`;

    ball.style.transform = `scale(${Math.random()})`;
    ball.style.fontSize = `${Math.random() + 1}em`;

    balls.push(ball);
    screen1.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
    let to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),
        y: Math.random() * 12,
    };

    let anim = el.animate(
        [
            { transform: "translate(0, 0)" },
            { transform: `translate(${to.x}rem, ${to.y}rem)` },
        ],
        {
            duration: (Math.random() + 1) * 2000, // random duration
            direction: "alternate",
            fill: "both",
            iterations: Infinity,
            easing: "ease-in-out",
        }
    );
});