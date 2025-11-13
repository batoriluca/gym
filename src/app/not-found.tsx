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
            <h3>404 eroare</h3>
            <h5>Pagina nu a fost găsită</h5>
            <h5>Ne pare rău, dar pagina pe care încercați să o accesați nu a fost găsită. Acest lucru poate fi cauzat de o adresă URL incorectă sau de o pagină care a fost ștearsă sau mutată.</h5>
            <a href="https://www.growyourmusic.ro/"><button > <h6>GrowYourMusic Romania</h6></button></a>
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
