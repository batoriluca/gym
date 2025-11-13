"use client"
import Statusbar from '@/components/statusbar'
import style from '@/styles/news.module.css'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAxiosWithToken } from '@/axios/AxiosObj'

export default function Home(props: any) {

  const { userDetails }: any = useSelector((state: RootState) => state.auth);

  const [user, setUser]: any = useState({ username: 'Loading...', });

  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);

  const [notifications, setNotifications]: any = useState([]);
  const [artistPoint, setArtistPoint]: any = useState(false);
  const [sellerPoint, setSellerPoint]: any = useState(false);

  const [artist, setArtist]: any = useState({
    artistname: 'Loading...',
    profilepic: 'userprofile.png',
  });
  const [manufacturer, setManufacturer]: any = useState({
    artistname: 'Loading...',
    profilepic: 'userprofile.png',
  });

  useEffect(() => {
    getArtistManu();
  }, []);


  const getArtistManu = async () => {
    try {
      const responseModi = await getAxiosWithToken({
        method: 'GET',
        url: 'other/getmanufacturer',
      });
      if (responseModi.success) {
        setManufacturer(responseModi.data[0])
      }
    } catch (error) {
      console.error(error);
    }

    try {
      const responseArtist = await getAxiosWithToken({
        method: 'GET',
        url: 'other/getartist',
      });
      if (responseArtist.success) {
        setArtist(responseArtist.data[0])
      }
    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    getNotification();
    getPoint();
  }, []);

  const getNotification = async () => {
    try {
      const responseNotification = await getAxiosWithToken({
        method: 'GET',
        url: 'other/getnotification',
      });
      if (responseNotification.success) {
        setNotifications(responseNotification.data)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getPoint = async () => {
    try {
      const responsePoint = await getAxiosWithToken({
        method: 'GET',
        url: 'other/getprogress',
      });
      if (responsePoint.success) {
        setArtistPoint(responsePoint.data.post.postStatus)
        setSellerPoint(responsePoint.data.product.postStatus)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <div id="sc1" className={style.sc1} style={{backgroundImage: 'url(/img/bh3.png)', backgroundSize: '300px 600px', backgroundRepeat:'repeat'}}>
      <div className={style.shadoww}></div>
          <div className={style.shadoww2}></div>
          <div className={style.bgbh} style={{backgroundImage: 'url(/img/dark.png)', backgroundSize: 'cover'}}></div>
          <div className={style.carousel}>
            <img src="/img/muzic.png" alt="" className={style.bgimg}/>
            <img src="/img/muzic.png" alt="" className={style.bgimg}/>
          </div>
          
        <div className={style.main_container} >
          <div className={style.navbar_contanier}>
            <Navbar />
          </div>
          <div className={style.content_contanier}>
            <Statusbar />
            <div className={style.feed_with_user}>
              <div className={style.feed_posts}>
                <div className={style.dm}>
                  <div className={style.r_side}>
                    <div className={style.media_card} >
                      <div className={style.displflx}>
                        <div className={style.l_side}>
                          <h1>Social Media</h1>
                          <h3>Pentru a fi la curent cu toate noutățile GrowYourMusic te invităm să ne urmărești pe conturile noastre de social media!</h3>
                        </div>
                        <div className={style.social_icons}>
                          <a href="https://www.instagram.com/growyourmusic.ro/"><i className="fa-brands fa-instagram"></i></a>
                          <a href="https://www.tiktok.com/@growyourmusic.ro"><i className="fa-brands fa-tiktok"></i></a>
                          <a href="https://www.youtube.com/channel/UC7WCSzZMpwCOn4BLiNf1aGQ"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                      </div>
                    </div>
                    <div className={style.monthly_cards}>
                      <div className={style.artistofthemonth} >
                        <Image width={200} height={200} src={`/artist_img/${artist?.profilepic}`} className={style.profileimgblur} alt="" />
                        <Image width={200} height={200} src={`/artist_img/${artist?.profilepic}`} className={style.profileimg} alt="" />
                        <div className={style.blok}>
                          <h2>Artistul Lunii</h2>
                          <h3>TBA</h3>
                        </div>
                      </div>
                      <div className={style.sellerofthemonth} >
                        <Image width={200} height={200} src={`/artist_img/${manufacturer?.profilepic}`} className={style.profileimgblur} alt="" />
                        <Image width={200} height={200} src={`/artist_img/${manufacturer?.profilepic}`} className={style.profileimg} alt="" />
                        <div className={style.blok}>
                          <h2>Producătorul Lunii</h2>
                          <h3>TBA</h3>
                        </div>
                      </div>
                    </div>
                    <div className={style.quests} >
                      <h1>MISIUNI</h1>
                      <div className={style.q1}>
                        <h4>
                          Creează 12 postări pentru a primi 1 punct în clasamentul artiștilor
                        </h4>
                        <div className={`${style.checked_q1} ${artistPoint ? (style.completed) : (null)}`}>
                          <i className="fa-solid fa-check" />
                        </div>
                      </div>
                      <div className={style.q2}>
                        <h4>
                          Creează 7 produse pentru a primi 1 punct în clasamentul vânzătorilor{" "}
                        </h4>
                        <div className={`${style.checked_q2} ${sellerPoint ? (style.completed) : (null)}`}>
                          <i className="fa-solid fa-check" />
                        </div>
                      </div>
                      <h1>DESPRE MISIUNI</h1>
                      <p>
                        Completează aceste misiuni în fiecare lună pentru a avea un avantaj în
                        fața celorlalți și pentru a avansa în clasament. Terminându-le, mai
                        mulți utilizatori îți vor vedea conținutul.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.profile_bar}>
                <div className={style.frow}>
                </div>

                {notifications && Array.isArray(notifications) && notifications.length > 0 ? (
                  notifications.map((item, index) => (
                    <div className={`${style.notification} ${style.volume_vid}`} key={index} >
                      <Image width={200} height={200} src="/img/osky1.jpg" alt="" className={style.profileimg} />
                      <div className={style.notifblock}>
                        <div className={style.notification_content}>
                          <p className={style.notif_username}>
                           <Link href={`${item?.byUser}`}>{item?.senderr?.artistname}</Link>
                          </p>
                          <p className={style.notif_text}>{item?.message}</p>
                        </div>
                        <div className={style.p2}>
                          <p className={style.post_thumbnail}>
                            
                              <Link href="/vidpost">Vezi Postarea</Link>
                            
                          </p>
                        </div>
                      </div>
                    </div>

                  ))
                ) : (<div className={`${style.notification}`} style={{ justifyContent: "center" }}>
                  <div className={style.notifblock}>
                    <div className={style.notification_content}>
                      <p className={style.notif_text}>
                        Nicio notificare
                      </p>
                    </div>
                  </div>
                </div>)}

              </div>
            </div>
            
          </div>
        </div>
      </div >
    </main>
  )
}
