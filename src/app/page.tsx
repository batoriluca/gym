import style from '@/styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'

export default function Home() {
  return (
    <main>
      <div className={style.container} >
        <div className={style.topbar}>
          <div className={style.ls}>
            <Image width={600} height={600} src="/img/Group 12.png" alt="" />
          </div>
          <div className={style.rs}>
            <Link href={`${process.env.URL}/autentificare`}>
              <button className={style.bgMov}>
                <p>Autentificare </p>
              </button>
            </Link>
            <Link href={`${process.env.URL}/createaccount`}>
              <button className={style.bgMovDeschis}>
                <p>Creează Cont</p>

              </button>
            </Link>
          </div>
        </div>
        <div className={style.sc1} id="scc1" style={{backgroundImage: 'url(img/bh2.png)', backgroundSize: '300px 600px', backgroundRepeat:'repeat'}}>
        {/*<img width={300} height={300} src="/img/shadow.png" alt="" className={style.light}/>*/}
        <img width={600} height={600} src="/img/cerc.png" alt="" className={style.cerc}/> 
       
          <div className={style.intro}>
            <Image width={600} height={600} src="/img/GYM_banner.png" className={style.logo} alt="" />
            <p>pentru artisti &amp; producatori la inceput de drum</p>
          </div>
          <div className={style.scrollfm}>
            <div className={style.icons}>
              <i className="fa-solid fa-chevron-down" />
              <i className="fa-solid fa-chevron-down" />
              <i className="fa-solid fa-chevron-down" />
            </div>
            <p className={style.scrollfmp}>scroll pentru mai mult</p>
          </div>
        </div>
        <div className={style.sc2} style={{backgroundImage: 'url(img/bh3.png)', backgroundSize: '300px 600px', backgroundRepeat:'repeat'}}>
          {/* <Image width={600} height={600} src="/img/Group 12@2x.png" alt=""> */}
          <img width={600} height={600} src="/img/el1.png" alt="" /> 
          <div className={style.offert}>
            <h2>
              Primii <span className={style.green}>500 de utilizatori</span> ce își creează
              cont beneficiază de un <span className={style.orange}>mare avantaj </span>în
              ambele clasamente.
            </h2>
            <p>
              Creează-ți acum contul, beneficiază de un avans în fața celorlalți
              utilizatori în ambele clasamente și bucură-te de cele 7 zile gratis!
            </p>
          </div>
          <div className={style.buttons}>
            <Link href={`${process.env.URL}/autentificare`}>
              <button className={style.bgGreen}>
                <p>Autentificare</p>
              </button>
            </Link>
            <Link href={`${process.env.URL}/createaccount`}>
              <button className={style.bgOrange}>
                <p>Creează Cont</p>
              </button>
            </Link>
          </div>
          {/*<img width={300} height={300} src="/img/shadow.png" alt="" className={style.light}/> */}
        </div>
        <div className={style.cards}>
          <div className={`${style.card} ${style.leftText} ${style.leftTextdh}`} id='card1' style={{backgroundImage: 'url(img/bh2.png)', backgroundSize: '300px 600px', backgroundRepeat:'repeat'}}>
            <div className={style.content}>
              <div className={style.lp}>
                <h4 className={style.green}>CÂȘTIGĂ PREMII</h4>
                <h1>Obține premii de la nume mari din industria muzicala</h1>
                <p>Colaborează, vinde și cumpără produse muzicale pentru a ajunge în topul clasamentului și ai șansa de a obține premii de la GrowYourMusic & mulți alții. Mult succes!</p>
                <Link href="/createaccount">
                  <button className={style.bgMov}>Creează Cont</button>
                </Link>
              </div>
              <div className={style.rp}>
                {/* <div className={style.shMov} /> */}
                <i className="fa-solid fa-trophy" />
              </div>
            </div>
          </div>
          <div className={`${style.card} ${style.rightText}`} id='card2' style={{backgroundImage: 'url(img/bh3.png)', backgroundSize: '300px 600px', backgroundRepeat:'repeat'}}>
            <div className={style.content}>
              <div className={style.lp}>
                <i className="fa-solid fa-sack-dollar" />
              </div>
              <div className={style.rp}>
                <h4 className={style.orange}>SURSĂ DE BANI</h4>
                <h1>Câștigă bani prin vânzarea de produse/servicii muzicale</h1>
                <p>
                  Vândutul produselor sau al serviciilor muzicale te vor aduce în
                  topul Clasamentului Producătorilor, dar îți vor garanta și o sumă de
                  bani aleasă de tine pe fiecare contract încheiat!{" "}
                </p>
                <Link href="/createaccount">
                  <button className={style.bgMovDeschis}>Creează Cont</button>
                </Link>
              </div>
            </div>
          </div>
          <div className={`${style.card} ${style.leftText} ${style.leftTextdh}`} id='card3' style={{backgroundImage: 'url(img/bh2.png)', backgroundSize: '300px 600px', backgroundRepeat:'repeat'}}>
            <div className={style.content}>
              <div className={style.lp}>
                <h4 className={style.green}>EVOLUEAZĂ</h4>
                <h1>Colaborează cu alți artiști și producători talentați</h1>
                <p>
                  Colaborarea este cheia succesului. Cooperează cu câți mai mulți
                  artiști/producători, lansează muzică de calitate pentru a-ți
                  dezvolta cariera și pentru a-ți crește punctele din Clasamentul
                  Artiștilor.
                </p>
                <Link href="/createaccount">
                  <button className={style.bgMov}>Creează Cont</button>
                </Link>
              </div>
              <div className={style.rp}>
                <i className="fa-solid fa-arrow-trend-up" />
              </div>
            </div>
          </div>
        </div>
        <footer className={style.footerr} style={{backgroundImage: 'url(img/bh4.png)', backgroundSize: '300px 600px', backgroundRepeat:'repeat'}}>
        <img width={300} height={300} src="/img/fd.png" alt="" className={style.fd}/>
          <Image width={600} height={600} src="/img/GYM_banner.png" alt="" className={style.logoo} />
          <p>pentru artisti &amp; producatori la inceput de drum</p>
          <h1>SOCIAL MEDIA</h1>
          <div className={style.socialmed}>
            <Image width={600} height={600} src="/img/Group_1.png" alt="" />
            <a href="https://www.instagram.com/growyourmusic.ro/" target='_blank'><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.youtube.com/channel/UC7WCSzZMpwCOn4BLiNf1aGQ" target='_blank'><i className="fa-brands fa-youtube"></i></a>
            <a href="https://www.tiktok.com/@growyourmusic.ro" target='_blank'><i className="fa-brands fa-tiktok"></i></a>
          </div>
          <h1>APLICAȚII</h1>
          <div className={style.app}>
            {/*<i className="fa-brands fa-app-store-ios" />
            <Image width={600} height={600} src="/img/logogym.png" alt="" />
            <i className="fa-brands fa-google-play" />*/}
            <h3>COMING SOON
            </h3>
          </div>
          <h1>CONTACT</h1>
          <Link href="emailto:contact@growyourmusic.ro"><h3>contact@growyourmusic.ro</h3></Link>
          <Link href="tc"><h3 className={style.tc}>Termeni și Condiții</h3></Link>
          
        </footer>
      </div>
      <Script src="/js/feed.js" crossOrigin="anonymous" defer rel="preload" />
    </main>
  )
}
