import style from '@/styles/404.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <main>
      <div className={style.container}>
      <div className={style.sc1} id="ssc1" >  
          <video autoPlay muted loop playsInline className={style.vidbg}>         
            <source src="/img/log.mp4" type="video/mp4"/>       
          </video>
          <div className={style.intro}>
            <h3>Tranzacția a eșuat</h3>
            <h5>Verifică dacă datele introduse sunt corecte sau reîncearcă mai târziu.</h5>
            <a href="https://www.growyourmusic.ro/settings"><button > <h6>Revino la setări</h6></button></a>
            <h5>Mulțumim pentru înțelegere!</h5>

            <Link href="/">
              <Image width={200} height={200} src="/img/GYM_banner.png" className={style.logo} alt="" />
            </Link>
            <p>pentru artisti &amp; producatori la inceput de drum</p>
          </div>
        </div>
      </div>
    </main>
  )
}
