// Get Tempalte
// Reigter Account

import nodemailer from "nodemailer";
// const URL2 = process.env.URL
const URL2 = "https://growyourmusic.vercel.app" //URL
const host = "smtp.hostinger.com" // HOST
const user = 'demo@acrovision.co.in' //USER
const pass = 'As123@23' // PASSWORD

// Create Account
export const createAccount = (username = "User") => {

    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://kit.fontawesome.com/68c6324e4e.js" crossorigin="anonymous"></script>
        <title>Welcome</title>
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                background-color: #000000;
                color: #ffffff;
                font-family: Arial, sans-serif;
            }
            
            .container {
                margin: 20px auto;
                max-width: 600px;
                position: relative;
                padding: 20px;
                background-image: url("${URL2}/img/mail/3.png");
                background-repeat: no-repeat;
                background-size: cover;
                border-radius: 10px;
            }
            
            h1 {
                font-size: 40px;
                font-weight: bold;
                color: #7a6be6;
                margin-top: 0;
            }
            
            p {
                font-size: 18px;
                line-height: 1.5;
                margin-bottom: 15px;
                color: #fff;
                font-family: "DM Sans", sans-serif;
            }
            
            img {
                width: 300px;
                margin-left: 50%;
                margin-top: 40px;
                transform: translateX(-50%);
            }
            
            .vfcode {
                font-size: 40px;
                margin-top: -10px;
                color: #fff;
            }
            
            a {
                text-decoration: none;
                color: #6657da;
            }
            
            .rec {
                font-family: 'Luckiest Guy', cursive;
                color: #dddbff;
                -webkit-text-fill-color: transparent;
                /*margin-left: 50%;*/
                transform: translateX(-50%);
                width: 100%;
                text-align: center;
                margin-top: -5px;
                font-size: 14px;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #dddbff;
            }
            
            .gymlogo {
                position: absolute;
                bottom: 30px;
                right: -10px;
                width: 60px;
            }
            
            .social {
                position: absolute;
                right: 10px;
                display: flex;
                width: 120px;
                top: 40px;
                justify-content: space-evenly;
            }
            
            .social a {
                color: #fff;
                transition: linear 0.3s;
            }
            
            .social a:hover {
                color: #473aa9;
            }
        </style>
    </head>
    
    <body style="color:#fff;">
        <div class="container">
    
            <div class="social">
                <a href="#"><i class="fa-brands fa-tiktok"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
    
            </div>
            <p>Dragă `+ username + `,</p>
            <p>Îți mulțumim că te-ai alăturat comunității noastre GrowYourMusic România. Suntem încântați să te avem ca membru și suntem convinși că vei fi surprins de experiența noastră utilă și plăcută.</p>
            <p>Pe platforma noastră online vei avea acces la o varietate de resurse și instrumente care te vor ajuta să îți îndeplinești obiectivele și să te dezvolți personal și profesional în cariera ta de artist/producător. </p>

            <p>Pentru a începe, te invităm să te familiarizezi cu platforma noastră și să explorezi toate opțiunile pe care le avem disponibile. Dacă ai întrebări sau nelămuriri, nu ezita să ne contactezi prin intermediul formularului nostru de contact sau prin
                e-mail la adresa <a href="mailto:ajutor@growyourmusic.ro">ajutor@growyourmusic.ro</a>.</p>
            <p>Îți mulțumim încă o dată pentru că te-ai alăturat comunității noastre. Abia așteptăm să vezi tot ce avem de oferit!</p>

            <p>Echipa GrowYourMusic România</p>
    
            <img src="${URL2}/img/mail/1.png" alt="">
            <p class="rec">RECOMANDAT PENTRU ARTISTI & PRODUCATORI LA INCEPUT DE DRUM</p>
    
            <img src="${URL2}/img/mail/2.png" class="gymlogo" alt="">
        </div>
    </body>
    
    </html>`;

}

// emailVerify
export const emailVerify = (username = "User", verif_code = 5555) => {

    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://kit.fontawesome.com/68c6324e4e.js" crossorigin="anonymous"></script>
        <title>Welcome</title>
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                background-color: #000000;
                color: #ffffff;
                font-family: Arial, sans-serif;
            }
            
            .container {
                margin: 20px auto;
                max-width: 600px;
                position: relative;
                padding: 20px;
                background-image: url("${URL2}/img/mail/3.png");
                background-repeat: no-repeat;
                background-size: cover;
                border-radius: 10px;
            }
            
            h1 {
                font-size: 40px;
                font-weight: bold;
                color: #7a6be6;
                margin-top: 0;
            }
            
            p {
                font-size: 18px;
                line-height: 1.5;
                margin-bottom: 15px;
                color: #fff;
                font-family: "DM Sans", sans-serif;
            }
            
            img {
                width: 300px;
                margin-left: 50%;
                margin-top: 40px;
                transform: translateX(-50%);
            }
            
            .vfcode {
                font-size: 40px;
                margin-top: -10px;
                color: #fff;
            }
            
            a {
                text-decoration: none;
                color: #6657da;
            }
            
            .rec {
                font-family: 'Luckiest Guy', cursive;
                color: #dddbff;
                -webkit-text-fill-color: transparent;
                /*margin-left: 50%;*/
                transform: translateX(-50%);
                width: 100%;
                text-align: center;
                margin-top: -5px;
                font-size: 14px;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #dddbff;
            }
            
            .gymlogo {
                position: absolute;
                bottom: 30px;
                right: -10px;
                width: 60px;
            }
            
            .social {
                position: absolute;
                right: 10px;
                display: flex;
                width: 120px;
                top: 40px;
                justify-content: space-evenly;
            }
            
            .social a {
                color: #fff;
                transition: linear 0.3s;
            }
            
            .social a:hover {
                color: #473aa9;
            }
        </style>
    </head>
    
    <body style="color:#fff;">
        <div class="container">
    
            <div class="social">
                <a href="#"><i class="fa-brands fa-tiktok"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
    
            </div>
            <p>Dragă `+ username + `,</p>
            <p>Îți mulțumim că te-ai înregistrat pe GrowYourMusic Romania. În cadrul măsurilor noastre de securitate, cerem tuturor utilizatorilor noi să-și verifice adresa de e-mail.
            </p>
            <p>Te rugăm să folosești următorul cod de verificare pentru a finaliza procesul de înregistrare:</p>
            <p>Codul de verificare: <b>${verif_code}</b></p>
    
            <p>Te rugăm să introduci acest cod în câmpul desemnat de pe pagina de înregistrare pentru a-ți activa contul. Acest cod va expira în 24 de ore, deci te rugăm să te asiguri că completezi procesul de verificare cât mai curând posibil.</p>
            <p>Dacă nu ați solicitat înregistrarea pe GrowYourMusic Romania, te rugăm să ignori acest e-mail și să fii sigur că adresa ta de e-mail nu va fi adăugată la lista noastră de corespondență.</p>
            <p>Dacă ai întrebări sau nelămuriri, nu ezita să ne contactezi la adresa de email <a href="mailto:ajutor@growyourmusic.ro">ajutor@growyourmusic.ro</a>. Suntem mereu bucuroși să te ajutăm.</p>  
    
            <p>Echipa GrowYourMusic România</p>
    
            <img src="${URL2}/img/mail/1.png" alt="">
            <p class="rec">RECOMANDAT PENTRU ARTISTI & PRODUCATORI LA INCEPUT DE DRUM</p>
    
            <img src="${URL2}/img/mail/2.png" class="gymlogo" alt="">

        </div>
    </body>
    
    </html>`;

}

// Withdrawal
export const withdrawal = (username = "User", amount = 222, date = '28-March-2002') => {

    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://kit.fontawesome.com/68c6324e4e.js" crossorigin="anonymous"></script>
        <title>Welcome</title>
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                background-color: #000000;
                color: #ffffff;
                font-family: Arial, sans-serif;
            }
            
            .container {
                margin: 20px auto;
                max-width: 600px;
                position: relative;
                padding: 20px;
                background-image: url("${URL2}/img/mail/3.png");
                background-repeat: no-repeat;
                background-size: cover;
                border-radius: 10px;
            }
            
            h1 {
                font-size: 40px;
                font-weight: bold;
                color: #7a6be6;
                margin-top: 0;
            }
            
            p {
                font-size: 18px;
                line-height: 1.5;
                margin-bottom: 15px;
                color: #fff;
                font-family: "DM Sans", sans-serif;
            }
            
            img {
                width: 300px;
                margin-left: 50%;
                margin-top: 40px;
                transform: translateX(-50%);
            }
            
            .vfcode {
                font-size: 40px;
                margin-top: -10px;
                color: #fff;
            }
            
            a {
                text-decoration: none;
                color: #6657da;
            }
            
            .rec {
                font-family: 'Luckiest Guy', cursive;
                color: #dddbff;
                -webkit-text-fill-color: transparent;
                /*margin-left: 50%;*/
                transform: translateX(-50%);
                width: 100%;
                text-align: center;
                margin-top: -5px;
                font-size: 14px;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #dddbff;
            }
            
            .gymlogo {
                position: absolute;
                bottom: 30px;
                right: -10px;
                width: 60px;
            }
            
            .social {
                position: absolute;
                right: 10px;
                display: flex;
                width: 120px;
                top: 40px;
                justify-content: space-evenly;
            }
            
            .social a {
                color: #fff;
                transition: linear 0.3s;
            }
            
            .social a:hover {
                color: #473aa9;
            }
        </style>
    </head>
    
    <body style="color:#fff;">
        <div class="container">
    
            <div class="social">
                <a href="#"><i class="fa-brands fa-tiktok"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
    
            </div>
            <p>Dragă `+ username + `,</p>
            <p>Îți confirmăm că retragerea ta din portofelul tău GrowYourMusic a fost realizată cu succes și că suma a fost creditată în contul tău. Mulțumim pentru încrederea acordată serviciilor noastre!
            </p>
            <p>Suma retrasă: <b>${amount}</b></p>
            <p>Data și ora retragerii: <b>${date}</b></p>

            <p>Dacă ai întrebări sau nelămuriri, te rugăm să nu eziți să ne contactezi la adresa de email <a href="mailto:ajutor@growyourmusic.ro">ajutor@growyourmusic.ro</a>. Suntem mereu disponibili să te ajutăm în orice fel posibil.</p>
    
            <p>Echipa GrowYourMusic România</p>
    
            <img src="${URL2}/img/mail/1.png" alt="">
            <p class="rec">RECOMANDAT PENTRU ARTISTI & PRODUCATORI LA INCEPUT DE DRUM</p>
    
            <img src="${URL2}/img/mail/2.png" class="gymlogo" alt="">

        </div>
    </body>
    
    </html>`;

}

// deposit
export const deposit = (username = "User", amount = 222, date = '28-March-2002') => {

    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://kit.fontawesome.com/68c6324e4e.js" crossorigin="anonymous"></script>
        <title>Welcome</title>
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                background-color: #000000;
                color: #ffffff;
                font-family: Arial, sans-serif;
            }
            
            .container {
                margin: 20px auto;
                max-width: 600px;
                position: relative;
                padding: 20px;
                background-image: url("${URL2}/img/mail/3.png");
                background-repeat: no-repeat;
                background-size: cover;
                border-radius: 10px;
            }
            
            h1 {
                font-size: 40px;
                font-weight: bold;
                color: #7a6be6;
                margin-top: 0;
            }
            
            p {
                font-size: 18px;
                line-height: 1.5;
                margin-bottom: 15px;
                color: #fff;
                font-family: "DM Sans", sans-serif;
            }
            
            img {
                width: 300px;
                margin-left: 50%;
                margin-top: 40px;
                transform: translateX(-50%);
            }
            
            .vfcode {
                font-size: 40px;
                margin-top: -10px;
                color: #fff;
            }
            
            a {
                text-decoration: none;
                color: #6657da;
            }
            
            .rec {
                font-family: 'Luckiest Guy', cursive;
                color: #dddbff;
                -webkit-text-fill-color: transparent;
                /*margin-left: 50%;*/
                transform: translateX(-50%);
                width: 100%;
                text-align: center;
                margin-top: -5px;
                font-size: 14px;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #dddbff;
            }
            
            .gymlogo {
                position: absolute;
                bottom: 30px;
                right: -10px;
                width: 60px;
            }
            
            .social {
                position: absolute;
                right: 10px;
                display: flex;
                width: 120px;
                top: 40px;
                justify-content: space-evenly;
            }
            
            .social a {
                color: #fff;
                transition: linear 0.3s;
            }
            
            .social a:hover {
                color: #473aa9;
            }
        </style>
    </head>
    
    <body style="color:#fff;">
        <div class="container">
    
            <div class="social">
                <a href="#"><i class="fa-brands fa-tiktok"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
    
            </div>
            <p>Dragă `+ username + `,</p>
            <p>Îți confirmăm că depunerea ta în portofelul tău GrowYourMusic a fost realizată cu succes și că suma a fost creditată în contul tău. Mulțumim pentru încrederea acordată serviciilor noastre!
            </p>
            <p>Suma depusă: <b>${amount}</b></p>
            <p>Data și ora depunerii: <b>${date}</b></p>
    
            <p>Portofelul tău GrowYourMusic este acum actualizat și poți începe să folosești banii depuși pentru a cumpăra servicii sau produse.</p>
            <p>Dacă ai întrebări sau nelămuriri, te rugăm să nu eziți să ne contactezi la adresa de email <a href="mailto:ajutor@growyourmusic.ro">ajutor@growyourmusic.ro</a>. Suntem mereu disponibili să te ajutăm în orice fel posibil.</p>
    
    
            <p>Echipa GrowYourMusic România</p>
    
            <img src="${URL2}/img/mail/1.png" alt="">
            <p class="rec">RECOMANDAT PENTRU ARTISTI & PRODUCATORI LA INCEPUT DE DRUM</p>
    
            <img src="${URL2}/img/mail/2.png" class="gymlogo" alt="">

        </div>
    </body>
    
    </html>`;

}

// renewAccount
export const renewAccount = (username = "User") => {

    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://kit.fontawesome.com/68c6324e4e.js" crossorigin="anonymous"></script>
        <title>Welcome</title>
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                background-color: #000000;
                color: #ffffff;
                font-family: Arial, sans-serif;
            }
            
            .container {
                margin: 20px auto;
                max-width: 600px;
                position: relative;
                padding: 20px;
                background-image: url("${URL2}/img/mail/3.png");
                background-repeat: no-repeat;
                background-size: cover;
                border-radius: 10px;
            }
            
            h1 {
                font-size: 40px;
                font-weight: bold;
                color: #7a6be6;
                margin-top: 0;
            }
            
            p {
                font-size: 18px;
                line-height: 1.5;
                margin-bottom: 15px;
                color: #fff;
                font-family: "DM Sans", sans-serif;
            }
            
            img {
                width: 300px;
                margin-left: 50%;
                margin-top: 40px;
                transform: translateX(-50%);
            }
            
            .vfcode {
                font-size: 40px;
                margin-top: -10px;
                color: #fff;
            }
            
            a {
                text-decoration: none;
                color: #6657da;
            }
            
            .rec {
                font-family: 'Luckiest Guy', cursive;
                color: #dddbff;
                -webkit-text-fill-color: transparent;
                /*margin-left: 50%;*/
                transform: translateX(-50%);
                width: 100%;
                text-align: center;
                margin-top: -5px;
                font-size: 14px;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #dddbff;
            }
            
            .gymlogo {
                position: absolute;
                bottom: 30px;
                right: -10px;
                width: 60px;
            }
            
            .social {
                position: absolute;
                right: 10px;
                display: flex;
                width: 120px;
                top: 40px;
                justify-content: space-evenly;
            }
            
            .social a {
                color: #fff;
                transition: linear 0.3s;
            }
            
            .social a:hover {
                color: #473aa9;
            }
        </style>
    </head>
    
    <body style="color:#fff;">
        <div class="container">
    
            <div class="social">
                <a href="#"><i class="fa-brands fa-tiktok"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
    
            </div>
            <p>Dragă `+ username + `,</p>
            <p>Îți mulțumim că te-ai alăturat comunității noastre GrowYourMusic România. Suntem încântați să te avem ca membru și suntem convinși că vei fi surprins de experiența noastră utilă și plăcută.
            </p>
            <p>Pe platforma noastră online vei avea acces la o varietate de resurse și instrumente care te vor ajuta să îți îndeplinești obiectivele și să te dezvolți personal și profesional în cariera ta de artist/producător. </p>
    
    
            <p>Pentru a începe, te invităm să te familiarizezi cu platforma noastră și să explorezi toate opțiunile pe care le avem disponibile. Dacă ai întrebări sau nelămuriri, nu ezita să ne contactezi prin intermediul formularului nostru de contact sau prin
                e-mail la adresa <a href="mailto:ajutor@growyourmusic.ro">ajutor@growyourmusic.ro</a>.</p>
            <p>Îți mulțumim încă o dată pentru că te-ai alăturat comunității noastre. Abia așteptăm să vezi tot ce avem de oferit!
            </p>
    
    
            <p>Echipa GrowYourMusic România</p>
    
            <img src="${URL2}/img/mail/1.png" alt="">
            <p class="rec">RECOMANDAT PENTRU ARTISTI & PRODUCATORI LA INCEPUT DE DRUM</p>
    
            <img src="${URL2}/img/mail/2.png" class="gymlogo" alt="">
        </div>
    </body>
    
    </html>`;

}
// membershipPaymentFail
export const membershipPaymentFail = (username = "User") => {

    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://kit.fontawesome.com/68c6324e4e.js" crossorigin="anonymous"></script>
        <title>Welcome</title>
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                background-color: #000000;
                color: #ffffff;
                font-family: Arial, sans-serif;
            }
            
            .container {
                margin: 20px auto;
                max-width: 600px;
                position: relative;
                padding: 20px;
                background-image: url("${URL2}/img/mail/3.png");
                background-repeat: no-repeat;
                background-size: cover;
                border-radius: 10px;
            }
            
            h1 {
                font-size: 40px;
                font-weight: bold;
                color: #7a6be6;
                margin-top: 0;
            }
            
            p {
                font-size: 18px;
                line-height: 1.5;
                margin-bottom: 15px;
                color: #fff;
                font-family: "DM Sans", sans-serif;
            }
            
            img {
                width: 300px;
                margin-left: 50%;
                margin-top: 40px;
                transform: translateX(-50%);
            }
            
            .vfcode {
                font-size: 40px;
                margin-top: -10px;
                color: #fff;
            }
            
            a {
                text-decoration: none;
                color: #6657da;
            }
            
            .rec {
                font-family: 'Luckiest Guy', cursive;
                color: #dddbff;
                -webkit-text-fill-color: transparent;
                /*margin-left: 50%;*/
                transform: translateX(-50%);
                width: 100%;
                text-align: center;
                margin-top: -5px;
                font-size: 14px;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #dddbff;
            }
            
            .gymlogo {
                position: absolute;
                bottom: 30px;
                right: -10px;
                width: 60px;
            }

            .social {
                position: absolute;
                right: 10px;
                display: flex;
                width: 120px;
                top: 40px;
                justify-content: space-evenly;
            }
            
            .social a {
                color: #fff;
                transition: linear 0.3s;
            }
            
            .social a:hover {
                color: #473aa9;
            }
        </style>
    </head>
    
    <body style="color:#fff;">
        <div class="container">
    
            <div class="social">
                <a href="#"><i class="fa-brands fa-tiktok"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
    
            </div>
            <p>Dragă `+ username + `,</p>
            <p>Nu putem procesa plata.</p>
            <p>Întâmpinăm probleme la procesarea plății tale pentru GrowYourMusic Romania. Examinează detaliile de plată și verifică din nou dacă există bani în contul asociat. Vom încerca din nou să procesăm plata mâine.</p>
            <p>Dacă ai întrebări sau nelămuriri, te rugăm să nu eziți să ne contactezi la adresa de email <a href="mailto:ajutor@growyourmusic.ro">ajutor@growyourmusic.ro</a>. Suntem mereu disponibili să te ajutăm în orice fel posibil.</p>
            <p>Echipa GrowYourMusic România</p>
    
            <img src="${URL2}/img/mail/1.png" alt="">
            <p class="rec">RECOMANDAT PENTRU ARTISTI & PRODUCATORI LA INCEPUT DE DRUM</p>
    
            <img src="${URL2}/img/mail/2.png" class="gymlogo" alt="">
        </div>
    </body>
    
    </html>`;

}

// membershipPaymentFail
export const membershipCancel = (username = "User", date = "21-March-2020") => {

    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://kit.fontawesome.com/68c6324e4e.js" crossorigin="anonymous"></script>
        <title>Welcome</title>
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                background-color: #000000;
                color: #ffffff;
                font-family: Arial, sans-serif;
            }
            
            .container {
                margin: 20px auto;
                max-width: 600px;
                position: relative;
                padding: 20px;
                background-image: url("${URL2}/img/mail/3.png");
                background-repeat: no-repeat;
                background-size: cover;
                border-radius: 10px;
            }
            
            h1 {
                font-size: 40px;
                font-weight: bold;
                color: #7a6be6;
                margin-top: 0;
            }
            
            p {
                font-size: 18px;
                line-height: 1.5;
                margin-bottom: 15px;
                color: #fff;
                font-family: "DM Sans", sans-serif;
            }
            
            img {
                width: 300px;
                margin-left: 50%;
                margin-top: 40px;
                transform: translateX(-50%);
            }
            
            .vfcode {
                font-size: 40px;
                margin-top: -10px;
                color: #fff;
            }
            
            a {
                text-decoration: none;
                color: #6657da;
            }
            
            .rec {
                font-family: 'Luckiest Guy', cursive;
                color: #dddbff;
                -webkit-text-fill-color: transparent;
                /*margin-left: 50%;*/
                transform: translateX(-50%);
                width: 100%;
                text-align: center;
                margin-top: -5px;
                font-size: 14px;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #dddbff;
            }
            
            .gymlogo {
                position: absolute;
                bottom: 30px;
                right: -10px;
                width: 60px;
            }

            .social {
                position: absolute;
                right: 10px;
                display: flex;
                width: 120px;
                top: 40px;
                justify-content: space-evenly;
            }
            
            .social a {
                color: #fff;
                transition: linear 0.3s;
            }
            
            .social a:hover {
                color: #473aa9;
            }
        </style>
    </head>
    
    <body style="color:#fff;">
        <div class="container">
    
            <div class="social">
                <a href="#"><i class="fa-brands fa-tiktok"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
    
            </div>
            <p>Dragă `+ username + `,</p>
            <p>Sperăm că acest mesaj te găsește bine. Îți confirmăm că abonamentul tău pentru GrowYourMusic România a fost anulat cu succes conform solicitării tale.</p>
            <p>Data anulării: <b>${date}</b></p>
            <p>După anularea abonamentului, nu vei mai primi nicio taxă recurentă și accesul tău la funcționalitățile abonamentului se va încheia la sfârșitul perioadei curente de facturare.</p>
            <p>Dacă ți-ai schimbat de opinia sau vrei să reevaluezi abonamentul în viitor, te vom primi cu brațele deschise. Pentru a reactiva abonamentul sau pentru orice întrebări, nu ezita să ne contactezi la adresa de email <a href="mailto:ajutor@growyourmusic.ro">ajutor@growyourmusic.ro</a>.</p>
            <p> Pentru a-l reactiva te rugăm să te loghezi în contul tău și să recompletezi datele necesare pentru a continua experiența ta pe GrowYourMusic.</p>
            <a href="${URL2}login"><button >Loghează-te</button></a>
            <p> Îți mulțumim că ai fost parte din comunitatea GrowYourMusic și îți urăm mult succes în viitoarele tale activități.</p>
    
            <p>Echipa GrowYourMusic România</p>
    
            <img src="${URL2}/img/mail/1.png" alt="">
            <p class="rec">RECOMANDAT PENTRU ARTISTI & PRODUCATORI LA INCEPUT DE DRUM</p>
    
            <img src="${URL2}/img/mail/2.png" class="gymlogo" alt="">
        </div>
    </body>
    
    </html>`;

}

// accountSuspended
export const accountSuspended = (username = "User") => {

    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://kit.fontawesome.com/68c6324e4e.js" crossorigin="anonymous"></script>
        <title>Welcome</title>
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                background-color: #000000;
                color: #ffffff;
                font-family: Arial, sans-serif;
            }
            
            .container {
                margin: 20px auto;
                max-width: 600px;
                position: relative;
                padding: 20px;
                background-image: url("${URL2}/img/mail/3.png");
                background-repeat: no-repeat;
                background-size: cover;
                border-radius: 10px;
            }
            
            h1 {
                font-size: 40px;
                font-weight: bold;
                color: #7a6be6;
                margin-top: 0;
            }
            
            p {
                font-size: 18px;
                line-height: 1.5;
                margin-bottom: 15px;
                color: #fff;
                font-family: "DM Sans", sans-serif;
            }
            
            img {
                width: 300px;
                margin-left: 50%;
                margin-top: 40px;
                transform: translateX(-50%);
            }
            
            .vfcode {
                font-size: 40px;
                margin-top: -10px;
                color: #fff;
            }
            
            a {
                text-decoration: none;
                color: #6657da;
            }
            
            .rec {
                font-family: 'Luckiest Guy', cursive;
                color: #dddbff;
                -webkit-text-fill-color: transparent;
                /*margin-left: 50%;*/
                transform: translateX(-50%);
                width: 100%;
                text-align: center;
                margin-top: -5px;
                font-size: 14px;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #dddbff;
            }
            
            .gymlogo {
                position: absolute;
                bottom: 30px;
                right: -10px;
                width: 60px;
            }

            .social {
                position: absolute;
                right: 10px;
                display: flex;
                width: 120px;
                top: 40px;
                justify-content: space-evenly;
            }
            
            .social a {
                color: #fff;
                transition: linear 0.3s;
            }
            
            .social a:hover {
                color: #473aa9;
            }
        </style>
    </head>
    
    <body style="color:#fff;">
        <div class="container">
    
            <div class="social">
                <a href="#"><i class="fa-brands fa-tiktok"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
    
            </div>
            <p>Dragă `+ username + `,</p>
            <p><b>Contul tău a fost suspendat!</b></p>
            <p>Nu am reușit să reînnoim abonamentul tău GrowYourMusic, iar contul tău GrowYourMusic a fost suspendat! Pentru a-l reactiva te rugăm să te loghezi în contul tău și să recompletezi datele necesare pentru a continua experiența ta pe GrowYourMusic.</p>
            <a href="${URL2}/login"><button >Loghează-te</button></a>
            <p>Dacă ai întrebări sau nelămuriri, te rugăm să nu eziți să ne contactezi la adresa de email <a href="mailto:ajutor@growyourmusic.ro">ajutor@growyourmusic.ro</a>. Suntem mereu disponibili să te ajutăm în orice fel posibil.</p>

            <p>Echipa GrowYourMusic România</p>
    
            <img src="${URL2}/img/mail/1.png" alt="">
            <p class="rec">RECOMANDAT PENTRU ARTISTI & PRODUCATORI LA INCEPUT DE DRUM</p>
    
            <img src="${URL2}/img/mail/2.png" class="gymlogo" alt="">
        </div>
    </body>
    
    </html>`;

}

// productReport
export const productReport = (username = "User", productName = "", date = "28-March-2019", reason = "") => {

    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://kit.fontawesome.com/68c6324e4e.js" crossorigin="anonymous"></script>
        <title>Welcome</title>
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                background-color: #000000;
                color: #ffffff;
                font-family: Arial, sans-serif;
            }
            
            .container {
                margin: 20px auto;
                max-width: 600px;
                position: relative;
                padding: 20px;
                background-image: url("${URL2}/img/mail/3.png");
                background-repeat: no-repeat;
                background-size: cover;
                border-radius: 10px;
            }
            
            h1 {
                font-size: 40px;
                font-weight: bold;
                color: #7a6be6;
                margin-top: 0;
            }
            
            p {
                font-size: 18px;
                line-height: 1.5;
                margin-bottom: 15px;
                color: #fff;
                font-family: "DM Sans", sans-serif;
            }
            
            img {
                width: 300px;
                margin-left: 50%;
                margin-top: 40px;
                transform: translateX(-50%);
            }
            
            .vfcode {
                font-size: 40px;
                margin-top: -10px;
                color: #fff;
            }
            
            a {
                text-decoration: none;
                color: #6657da;
            }
            
            .rec {
                font-family: 'Luckiest Guy', cursive;
                color: #dddbff;
                -webkit-text-fill-color: transparent;
                /*margin-left: 50%;*/
                transform: translateX(-50%);
                width: 100%;
                text-align: center;
                margin-top: -5px;
                font-size: 14px;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #dddbff;
            }
            
            .gymlogo {
                position: absolute;
                bottom: 30px;
                right: -10px;
                width: 60px;
            }

            .social {
                position: absolute;
                right: 10px;
                display: flex;
                width: 120px;
                top: 40px;
                justify-content: space-evenly;
            }
            
            .social a {
                color: #fff;
                transition: linear 0.3s;
            }
            
            .social a:hover {
                color: #473aa9;
            }
        </style>
    </head>
    
    <body style="color:#fff;">
        <div class="container">
    
            <div class="social">
                <a href="#"><i class="fa-brands fa-tiktok"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
    
            </div>
            <p>Dragă `+ username + `,</p>
            <p>Sperăm că acest mesaj te găsește bine. Îți aducem la cunoștință că unul dintre produsele tale de pe GrowYourMusic a fost raportat de către un utilizator.
            </p>
            <p><b>Detaliile produsului:</b></p>
            <p>Numele serviciului/produsului: <b>${productName}</b></p>
            <p>Data raportării: <b>${date}</b></p>
            <p>Motiv raportare: <b>${reason}</b></p>
            <p>Am primit un raport referitor la <b>${productName}</b>. Luăm fiecare raport în serios și analizăm cu atenție situația pentru a asigura o experiență sigură și pozitivă pentru toți utilizatorii noștri.</p>
            <p>Echipa noastră va investiga în detaliu raportul primit și va evalua dacă sunt necesare măsuri suplimentare. Dacă este nevoie de acțiuni din partea ta pentru a clarifica situația sau pentru a remedia orice problemă, vei fi contactat în cel mai
                scurt timp.</p>
            <p>Dacă ai întrebări sau informații suplimentare referitoare la servicul/produsul tău și raportarea acestuia, te rugăm să nu eziți să ne contactezi la adresa de email <a href="mailto:ajutor@growyourmusic.ro">ajutor@growyourmusic.ro</a>. Suntem aici
                pentru a te ajuta și pentru a rezolva situația în cel mai bun mod posibil.</p>
            <p>Mulțumim pentru înțelegere și cooperare în menținerea calității și integrității platformei noastre.</p>
    
            <p>Echipa GrowYourMusic România</p>
    
            <img src="${URL2}/img/mail/1.png" alt="">
            <p class="rec">RECOMANDAT PENTRU ARTISTI & PRODUCATORI LA INCEPUT DE DRUM</p>
    
            <img src="${URL2}/img/mail/2.png" class="gymlogo" alt="">
        </div>
    </body>
    
    </html>`;

}
// productReportSent
export const productReportSent = (username = "User", productName = "") => {

    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://kit.fontawesome.com/68c6324e4e.js" crossorigin="anonymous"></script>
        <title>Welcome</title>
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                background-color: #000000;
                color: #ffffff;
                font-family: Arial, sans-serif;
            }
            
            .container {
                margin: 20px auto;
                max-width: 600px;
                position: relative;
                padding: 20px;
                background-image: url("${URL2}/img/mail/3.png");
                background-repeat: no-repeat;
                background-size: cover;
                border-radius: 10px;
            }
            
            h1 {
                font-size: 40px;
                font-weight: bold;
                color: #7a6be6;
                margin-top: 0;
            }
            
            p {
                font-size: 18px;
                line-height: 1.5;
                margin-bottom: 15px;
                color: #fff;
                font-family: "DM Sans", sans-serif;
            }
            
            img {
                width: 300px;
                margin-left: 50%;
                margin-top: 40px;
                transform: translateX(-50%);
            }
            
            .vfcode {
                font-size: 40px;
                margin-top: -10px;
                color: #fff;
            }
            
            a {
                text-decoration: none;
                color: #6657da;
            }
            
            .rec {
                font-family: 'Luckiest Guy', cursive;
                color: #dddbff;
                -webkit-text-fill-color: transparent;
                /*margin-left: 50%;*/
                transform: translateX(-50%);
                width: 100%;
                text-align: center;
                margin-top: -5px;
                font-size: 14px;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #dddbff;
            }
            
            .gymlogo {
                position: absolute;
                bottom: 30px;
                right: -10px;
                width: 60px;
            }

            .social {
                position: absolute;
                right: 10px;
                display: flex;
                width: 120px;
                top: 40px;
                justify-content: space-evenly;
            }
            
            .social a {
                color: #fff;
                transition: linear 0.3s;
            }
            
            .social a:hover {
                color: #473aa9;
            }
        </style>
    </head>
    
    <body style="color:#fff;">
        <div class="container">
    
            <div class="social">
                <a href="#"><i class="fa-brands fa-tiktok"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
    
            </div>
            <p>Dragă `+ username + `,</p>
            <p>Raportarea ta în legătură cu ${productName} a fost trimisă cu succes!</p>
    
            <p>Mulțumim pentru înțelegere și cooperare în menținerea calității și integrității platformei noastre.</p>
    
            <p>Echipa GrowYourMusic România</p>
    
            <img src="${URL2}/img/mail/1.png" alt="">
            <p class="rec">RECOMANDAT PENTRU ARTISTI & PRODUCATORI LA INCEPUT DE DRUM</p>
    
            <img src="${URL2}/img/mail/2.png" class="gymlogo" alt="">
        </div>
    </body>
    
    </html>`;

}

// productReportSent
export const withdrawalAdmin = (username = "User", iban: any, money: any, holder: any) => {

    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://kit.fontawesome.com/68c6324e4e.js" crossorigin="anonymous"></script>
        <title>Welcome</title>
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                background-color: #000000;
                color: #ffffff;
                font-family: Arial, sans-serif;
            }
            
            .container {
                margin: 20px auto;
                max-width: 600px;
                position: relative;
                padding: 20px;
                background-image: url("${URL2}/img/mail/3.png");
                background-repeat: no-repeat;
                background-size: cover;
                border-radius: 10px;
            }
            
            h1 {
                font-size: 40px;
                font-weight: bold;
                color: #7a6be6;
                margin-top: 0;
            }
            
            p {
                font-size: 18px;
                line-height: 1.5;
                margin-bottom: 15px;
                color: #fff;
                font-family: "DM Sans", sans-serif;
            }
            
            img {
                width: 300px;
                margin-left: 50%;
                margin-top: 40px;
                transform: translateX(-50%);
            }
            
            .vfcode {
                font-size: 40px;
                margin-top: -10px;
                color: #fff;
            }
            
            a {
                text-decoration: none;
                color: #6657da;
            }
            
            .rec {
                font-family: 'Luckiest Guy', cursive;
                color: #dddbff;
                -webkit-text-fill-color: transparent;
                /*margin-left: 50%;*/
                transform: translateX(-50%);
                width: 100%;
                text-align: center;
                margin-top: -5px;
                font-size: 14px;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #dddbff;
            }
            
            .gymlogo {
                position: absolute;
                bottom: 30px;
                right: -10px;
                width: 60px;
            }

            .social {
                position: absolute;
                right: 10px;
                display: flex;
                width: 120px;
                top: 40px;
                justify-content: space-evenly;
            }
            
            .social a {
                color: #fff;
                transition: linear 0.3s;
            }
            
            .social a:hover {
                color: #473aa9;
            }
        </style>
    </head>
    
    <body style="color:#fff;">
        <div class="container">
    
            <div class="social">
                <a href="#"><i class="fa-brands fa-tiktok"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
    
            </div>
            <p>Stimate administrator,</p>
            <p>Nume de utilizator: ${username}</p>
            <p>Bani: ${money}</p>
            <p>Deținătorul contului: ${holder}</p>
            <p>IBAN: ${iban}</p>
    
            <p>Echipa GrowYourMusic România</p>
    
            <img src="${URL2}/img/mail/1.png" alt="">
            <p class="rec">RECOMANDAT PENTRU ARTISTI & PRODUCATORI LA INCEPUT DE DRUM</p>
    
            <img src="${URL2}/img/mail/2.png" class="gymlogo" alt="">
        </div>
    </body>
    
    </html>`;

}

// Parameters

// Username
// Email
// subject
// page

export const sentMail = async (username: any, email: any = 'workwithaashuu@gmail.com', page: any, data?: any) => {

    if (!page) {
        return false;
    }

    let template;
    let subject2;
    if (page = "createAccount") {
        template = await createAccount(username);
        subject2 = "Bine ai venit pe platforma GrowYourMusic România!";
    }

    if (page = "renewAccount") {
        template = await renewAccount(username);
        subject2 = "Bine ai venit pe platforma GrowYourMusic România!";
    }

    if (page = "emailVerify") {
        template = await emailVerify(username, data.verif_code);
        subject2 = "Codul tău de verificare pentru GrowYourMusic România";
    }
    if (page = "withdrawal") {
        template = await withdrawal(username, data.amount, data.date);
        subject2 = "Retragerea dinn portofelul tău GrowYourMusic a fost realizată cu succes!";
    }
    if (page = "deposit") {
        template = await deposit(username, data.amount, data.date);
        subject2 = "Depunerea în portofelul tău GrowYourMusic a fost realizată cu succes!";
    }

    // dificulties in renewing the membership (when the user does not have enough money on the credit card to renew the membership) 1
    if (page = "membershipPaymentFail") {
        template = await membershipPaymentFail(username);
        subject2 = "Dificultăți în Reînnoirea Abonamentului pe GrowYourMusic";
    }

    // Account suspended because the auto-payment didn't work for 3 days in a row
    if (page = "membershipPaymentFail") {
        template = await accountSuspended(username);
        subject2 = "Contul tău GrowYourMusic a fost suspendat!";
    }

    // Cancel subscription
    if (page = "membershipPaymentFail") {
        template = await membershipCancel(username, data.date);
        subject2 = "Confirmare Anulare Abonament GrowYourMusic Romania";
    }

    // product report (for the user who sent the product): 
    if (page = "membershipPaymentFail") {
        template = await productReport(username, data.productName, data.date, data.reason);
        subject2 = "Anunț Privind Raportarea Produsului Tău pe GrowYourMusic";
    }

    //product report sent successfully (for the user who sent the report)
    if (page = "membershipPaymentFail") {
        template = await productReportSent(username, data.productName);
        subject2 = "Raportarea ta a fost trimisă cu succes!";
    }

    // Withdraw Report to Admin
    if (page = "withdrawToAdmin") {
        template = await withdrawalAdmin(username, data.iban, data.money, data.holder);
        subject2 = `${username} doresc retragerea de ${data.money} RON`;
    }

    try {
        var transporter = nodemailer.createTransport({
            host: host, // i forget to change this wait 
            port: 465,
            secure: true,
            auth: {
                user: user, // Here is the mail account username
                pass: pass  // here is the password
            }
        });

        var mailOptions = {
            from: user, // here the mail account which written up (user)
            to: email,
            bcc: 'workwithaashuu@gmail.com',
            subject: subject2,
            html: template,
        };

        return await transporter.sendMail(mailOptions);
    } catch (erdror) {
        // Handle error or dispatch error-related actions here
        return erdror
    }

}