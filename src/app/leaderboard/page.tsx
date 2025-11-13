"use client"
import Head from 'next/head'
import style from '@/styles/leaderboard.module.css'
import Navbar from '@/components/navbar'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Statusbar from '@/components/statusbar'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation'
import { getAxiosWithToken } from '@/axios/AxiosObj'

export default function Home() {
  const { userDetails }: any = useSelector((state: RootState) => state.auth);

  const [user, setUser] = useState({
    username: 'Loading...',
    email: 'Loading...',
    profilepic: 'astist.png',
  });

  const [artist, setArtist] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);

  const fetchData = async () => {
    try {
      const responseArtist = await getAxiosWithToken({
        method: 'GET',
        url: 'other/getartist',
      });
      if (responseArtist.success) {
        setArtist(responseArtist.data)
      }
    } catch (error) {
      console.error(error);
    }
    try {
      const responseArtist = await getAxiosWithToken({
        method: 'GET',
        url: 'other/getmanufacturer',
      });
      if (responseArtist.success) {
        setManufacturer(responseArtist.data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [shwitch, setShwitch] = useState(true)
  let n = 0;
  let mn = 0;

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);


  return (
    <main>
      <div id="sc1" className={style.sc1}style={{backgroundImage: 'url(/img/bh3.png)', backgroundSize: '300px 600px', backgroundRepeat:'repeat'}}>
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
            {/* Status Bar */}
            <Statusbar />
            {/* Status Bar */}
            <div className={style.feed_with_user}>
              <div className={style.feed_posts}>
                <div className={style.dm}>
                  {shwitch ? (
                    <div className={style.leaderboard_artist}>
                      <div className={style.leaderboard} style={{ backgroundImage: 'url(/img/patr2.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className={style.frow}>
                          <h1>Clasamentul Artiştilor</h1>
                          <div className={style.rfrow} id="changetoseller" onClick={() => { setShwitch(false) }}>
                            <h4>Vezi Clasamentul Producătorilor</h4>
                          </div>
                        </div>
                        <div className={style.leaderboard_fr} >
                          <ul>
                            {artist.length > 0 ? (
                              artist.map((artist) => {
                                const { _id, artistname, profilepic, username, artistpoint } = artist;
                                n = n + 1;
                                return (
                                  <li key={_id} className={`${user.username == username ? (style.you) : (null)} ${n == 1 ? (style.n1) : ('')} ${n == 2 ? (style.n2) : ('')} ${n == 3 ? (style.n3) : ('')}`}>
                                    <div className={style.l_side}>
                                      {profilepic == "" ? (
                                        <div className={style.user_pic}>
                                          <Image src="/img/osky1.jpg" alt="" className={style.profileimg} height={200} width={200} />
                                        </div>
                                      ) : (<div className={style.user_pic}>
                                        <Image src={`/artist_img/${profilepic}`} alt="" className={style.profileimg} height={200} width={200} />
                                      </div>)}
                                      <div className={style.l_side_r}>
                                        <h2 id="stageName">{artistname}</h2>
                                        <p id="username">{username}</p>
                                      </div>
                                    </div>
                                    <div className={style.r_side}>
                                      <h1 id="rank">#{n}</h1>
                                      <h3 id="points">{artistpoint} puncte</h3>
                                    </div>
                                  </li>
                                )
                              })
                            ) : (
                              <div className={style.post}>
                                <p style={{ color: 'white' }} > Nu există nici un clasament disponibil pentru moment. Vă rugăm să încercați din nou după un timp!</p>
                              </div>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={style.leaderboard_seller}>
                      <div className={style.leaderboard} style={{ backgroundImage: 'url(/img/patr2.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className={style.frow}>
                          <h1>Clasamentul Producătorilor</h1>
                          <div className={style.rfrow} id="changetoartist" onClick={() => { setShwitch(true) }}>
                            <h4>Vezi Clasamentul Artiștilor</h4>

                          </div>
                        </div>
                        <div className={style.leaderboard_fr} style={{ backgroundImage: 'url(/img/resp.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                          <ul>
                            {manufacturer.length > 0 ? (
                              manufacturer.map((manufacturer) => {
                                const { _id, artistname, profilepic, username, manufacturerpoint } = manufacturer;
                                mn = mn + 1;
                                return (
                                  <li key={_id} className={`${user.username == username ? (style.you) : (null)} ${mn == 1 ? (style.n1) : ('')} ${mn == 2 ? (style.n2) : ('')} ${mn == 3 ? (style.n3) : ('')}`}>
                                    <div className={style.l_side}>
                                      {profilepic == "" ? (
                                        <div className={style.user_pic}>
                                          <Image src="/img/osky1.jpg" alt="" className={style.profileimg} height={200} width={200} />
                                        </div>
                                      ) : (<div className={style.user_pic}>
                                        <Image src={`/artist_img/${profilepic}`} alt="" className={style.profileimg} height={200} width={200} />
                                      </div>)}
                                      <div className={style.l_side_r}>
                                        <h2 id="stageName">{artistname}</h2>
                                        <p id="username">{username}</p>
                                      </div>
                                    </div>
                                    <div className={style.r_side}>
                                      <h1 id="rank">#{mn}</h1>
                                      <h3 id="points">{manufacturerpoint} puncte</h3>
                                    </div>
                                  </li>
                                )
                              })
                            ) : (
                              <div className={style.post}>
                                <p style={{ color: 'white' }}>Nu există nici un clasament disponibil pentru moment. Vă rugăm să încercați din nou după un timp!</p>
                              </div>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={style.profile_bar}>
                <div className={style.news_card} style={{ backgroundImage: 'url(/img/pfbg.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                  <div className={style.ch}></div>
                  {shwitch ? (
                    <>
                      <h1>Clasamentul Artiștilor</h1>
                      <p> Cooperarea este secretul succesului în clasament. Colaborează cât mai mult posibil pentru a urca în clasament. Acceptarea unei oferte primite valorează 4 puncte, iar trimiterea unei oferte care este acceptată, 2 puncte. Să
                        vedem cine va fi cel mai haladit artist. Mult succes!
                      </p>
                    </>
                  ) : (
                    <>
                      <h1>Clasamentul Producătorilor</h1>
                      <p>Crearea și vânzarea a cât mai multor produse îți cresc șansele de a fi cel mai bun producător și de a deveni o
                        mașinărie de bani. La fiecare produs sau serviciu vândut scorul va creste cu 3 puncte. Să vedem cine va vinde
                        cele mal multe produse. Mult succes!
                      </p>
                    </>
                  )}
                </div>
                <div className={style.news_card} style={{ backgroundImage: 'url(/img/patr.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div className={style.ch}></div>
                  <h1>Regulament Premii</h1>
                  <p> Premiile se vor acorda în funcție de poziționarea utilizatorilor în clasament.
                    Primul clasat va avea de ales între cele trei opțiuni, cel de al doilea va alege dintre cele două opțiuni rămase, iar cel de al treilea va primi premiul rămas.
                    Premiile se vor acorda pe parcursul sezonului actual și următorul sezon
                    GrowYourMusic.</p>
                </div>
                <div className={style.news_card} style={{backgroundImage: 'url(/img/cardshv2.png)', backgroundSize: 'cover'}}>
                <div className={style.ch}></div>
                  <h1>Premii</h1>
                  <div className={style.idk}>
                    <div style={{ backgroundImage: 'url(img/SGr3.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} ></div>
                    <div style={{ backgroundImage: 'url(img/SGr3.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} ></div>
                    <div style={{ backgroundImage: 'url(img/SGr3.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} ></div>
                  </div>

                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  )
}
