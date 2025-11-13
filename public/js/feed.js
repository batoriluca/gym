// Some random colors

const numBalls = 50;
const balls = [];


const screen1 = document.getElementById("sc1");
if (screen1) {

    for (let i = 0; i < numBalls; i++) {
        let ball = document.createElement("i");
        if (i % 3 == 0) {
            ball.classList.add("fa-solid");
            ball.classList.add("fa-arrow-trend-up");
        } else if (i % 3 == 1) {
            ball.classList.add("fa-solid");
            ball.classList.add("fa-music");
        } else {
            ball.classList.add("fa-solid");
            ball.classList.add("fa-sack-dollar");
        }
        ball.style.color = "#6657DA";

        if (screen.width < 560) {
            ball.style.left = `${Math.floor(Math.random() * 40)}vw`;
            ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
        } else if (screen.width < 560) {
            ball.style.left = `${Math.floor(Math.random() * 65)}vw`;
            ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
        } else if (screen.width < 960) {
            ball.style.left = `${Math.floor(Math.random() * 75)}vw`;
            ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
        } else if (screen.width < 1050) {
            ball.style.left = `${Math.floor(Math.random() * 85)}vw`;
            ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
        } else {
            ball.style.left = `${Math.floor(Math.random() * 90)}vw`;
            ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
        }
        ball.style.transform = `scale(${Math.random()})`;

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
            ], {
                duration: (Math.random() + 1) * 2000, // random duration
                direction: "alternate",
                fill: "both",
                iterations: Infinity,
                easing: "ease-in-out",
            }
        );
    });
    // if (document.getElementById("sureLogOut")) {
    //     console.log("ssss")
    //     const logoutbtn = document.getElementById("logout");
    //     const delaccbtn = document.getElementById("delacc");
    //     const backlog = document.getElementById("backlog");
    //     const backdel = document.getElementById("backdel");
    //     logoutbtn.addEventListener("click", () => {
    //         /*document.querySelector(".delete_acc").setAttribute("style", "display:none;")*/
    //         document.querySelector("#sureLogOut").setAttribute("style", "display:block;")
    //         document.querySelector("#sureDeleteAcc").setAttribute("style", "display:none;")
    //     })
    //     delaccbtn.addEventListener("click", () => {
    //         /*document.querySelector(".delete_acc").setAttribute("style", "display:none;")*/
    //         document.querySelector("#sureDeleteAcc").setAttribute("style", "display:block;")
    //         document.querySelector("#sureLogOut").setAttribute("style", "display:none;")
    //     })
    //     backlog.addEventListener("click", () => {
    //         /*document.querySelector(".delete_acc").setAttribute("style", "display:none;")*/
    //         document.querySelector("#sureLogOut").setAttribute("style", "display:none;")
    //     })
    //     backdel.addEventListener("click", () => {
    //         /*document.querySelector(".delete_acc").setAttribute("style", "display:none;")*/
    //         document.querySelector("#sureDeleteAcc").setAttribute("style", "display:none;")
    //     })
    // }
} else if (document.getElementById("scc1")) {
    // Some random colors

/*
    const numBalls = 50;
    const balls = [];

    const screen1 = document.getElementById("scc1");


    for (let i = 0; i < numBalls; i++) {

        let ball = document.createElement("i");
        ball.classList.add("bcsc1");
        if (i % 3 == 0) {
            ball.classList.add("fa-solid");
            ball.classList.add("fa-arrow-trend-up");

        } else if (i % 3 == 1) {
            ball.classList.add("fa-solid");
            ball.classList.add("fa-music");

        } else {
            ball.classList.add("fa-solid");
            ball.classList.add("fa-sack-dollar");
        }
        ball.style.color = '#1B1B1B';
        ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;



        balls.push(ball);
        screen1.append(ball);
    }

    // Keyframes
    balls.forEach((el, i, ra) => {
        let to = {
            x: Math.random() * (i % 2 === 0 ? -11 : 11),
            y: Math.random() * 12
        };

        let anim = el.animate(
            [
                { transform: "translate(0, 0)" },
                { transform: `translate(${to.x}rem, ${to.y}rem)` }
            ], {
                duration: (Math.random() + 1) * 2000, // random duration
                direction: "alternate",
                fill: "both",
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );
    });

*/
    const numBallsCard1 = 50;
    const ballsCard1 = [];

    const card1 = document.getElementById("card1");

    for (let i = 0; i < numBallsCard1; i++) {

        let ballCard1 = document.createElement("i");
        ballCard1.classList.add("bc2");
        if (i % 4 == 0) {
            ballCard1.classList.add("fa-solid");
            ballCard1.classList.add("fa-arrow-trend-up");

        } else if (i % 4 == 1) {
            ballCard1.classList.add("fa-solid");
            ballCard1.classList.add("fa-music");

        } else if (i % 4 == 2) {
            ballCard1.classList.add("fa-solid");
            ballCard1.classList.add("fa-sack-dollar");
        } else {

            ballCard1.classList.add("fa-solid");
            ballCard1.classList.add("fa-trophy");

        }
        ballCard1.style.color = '#a29bfe1c';
        ballCard1.style.animation = 'none';
        ballCard1.style.opacity = '0.4';
        ballCard1.style.zIndex = '1';
        ballCard1.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ballCard1.style.top = `${Math.floor(Math.random() * 100)+10}vh`;




        ballsCard1.push(ballCard1);
        card1.append(ballCard1);
    }

    ballsCard1.forEach((el, i, ra) => {
        let to = {
            x: Math.random() * (i % 2 === 0 ? -11 : 11),
            y: Math.random() * 12
        };

        let anim = el.animate(
            [
                { transform: "translate(0, 0)" },
                { transform: `translate(${to.x}rem, ${to.y}rem)` }
            ], {
                duration: (Math.random() + 1) * 1500, // random duration
                direction: "alternate",
                fill: "both",
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );
    });

    const numBallsCard2 = 50;
    const ballsCard2 = [];

    const card2 = document.getElementById("card2");

    for (let i = 0; i < numBallsCard2; i++) {

        let ballCard2 = document.createElement("i");
        ballCard2.classList.add("bc2");
        if (i % 4 == 0) {
            ballCard2.classList.add("fa-solid");
            ballCard2.classList.add("fa-arrow-trend-up");

        } else if (i % 4 == 1) {
            ballCard2.classList.add("fa-solid");
            ballCard2.classList.add("fa-music");

        } else if (i % 4 == 2) {
            ballCard2.classList.add("fa-solid");
            ballCard2.classList.add("fa-sack-dollar");
        } else {
            ballCard2.classList.add("fa-solid");
            ballCard2.classList.add("fa-trophy");
        }
        ballCard2.style.color = '#a29bfe1c';
        ballCard2.style.animation = 'none';
        ballCard2.style.opacity = '0.4';
        ballCard2.style.zIndex = '1';
        ballCard2.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ballCard2.style.top = `${Math.floor(Math.random() * 100)+10}vh`;




        ballsCard2.push(ballCard2);
        card2.append(ballCard2);
    }
    ballsCard2.forEach((el, i, ra) => {
        let to = {
            x: Math.random() * (i % 2 === 0 ? -11 : 11),
            y: Math.random() * 12
        };

        let anim = el.animate(
            [
                { transform: "translate(0, 0)" },
                { transform: `translate(${to.x}rem, ${to.y}rem)` }
            ], {
                duration: (Math.random() + 1) * 2000, // random duration
                direction: "alternate",
                fill: "both",
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );
    });
} else if (document.getElementById("ssc1")) {
    const numBalls = 50;
    const balls = [];

    const screen1 = document.getElementById("ssc1");


    for (let i = 0; i < numBalls; i++) {

        let ball = document.createElement("i");
        ball.classList.add("bcsc1");
        if (i % 3 == 0) {
            ball.classList.add("fa-solid");
            ball.classList.add("fa-arrow-trend-up");

        } else if (i % 3 == 1) {
            ball.classList.add("fa-solid");
            ball.classList.add("fa-music");

        } else {
            ball.classList.add("fa-solid");
            ball.classList.add("fa-sack-dollar");
        }
        if (i % 5 == 0 || i % 5 == 3 || i % 5 == 2) {
            ball.style.animationName = `anmBgI`;
            ball.style.animationIterationCount = `infinite`;
            ball.style.animationDuration = `6s`;
            ball.style.animationTimingFunction = `ease-in`;

        }
        ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;



        balls.push(ball);
        screen1.append(ball);
    }

    // Keyframes
    balls.forEach((el, i, ra) => {
        let to = {
            x: Math.random() * (i % 2 === 0 ? -11 : 11),
            y: Math.random() * 12
        };

        let anim = el.animate(
            [
                { transform: "translate(0, 0)" },
                { transform: `translate(${to.x}rem, ${to.y}rem)` }
            ], {
                duration: (Math.random() + 1) * 2000, // random duration
                direction: "alternate",
                fill: "both",
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );
    });

}