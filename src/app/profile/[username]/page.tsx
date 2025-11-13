"use client"
import style from '@/styles/profile.module.css'
import Navbar from '@/components/navbar'
import Statusbar from '@/components/statusbar'
import Image from 'next/image'
import Link from 'next/link';
import Script from 'next/script'
import { useEffect, useState } from 'react'
import Follow from '@/components/follow'
import { getUserDetails } from '@/function/user'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation'
import Postprf from '@/components/postforprofile'

export default function Home({ params }: any) {

  const { userDetails }: any = useSelector((state: RootState) => state.auth);

  const [user, setUser]: any = useState({ username: 'Loading...' });

  const [user2, setUser2]: any = useState({
    username: 'Loading...',
    email: 'Loading...',
    artistname: 'Loading...',
    featurefee: 'Loading...',
    description: 'Loading...',
    profilepic: 'astist.png',
    follows: 'astist.png',
    followBy: Array,
  });

  const [postss, setPostss] = useState([]);
  const [productss, setProductss] = useState([]);

  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);

  const route = useRouter();

  useEffect(() => {
    const { username } = params
    if (username !== "Loading..." && username) {
      fetchUserDetails(username);
    } else {
      route.push(`/profile`);
    }
  }, [params]);

  const fetchUserDetails = async (username: any) => {
    try {
      const user = await getUserDetails(username);
      if (user == false) {
        return route.push(`/profile`);
      }
      await setUser2(user[0]);
      await setPostss(user[0].post)
      await setProductss(user[0].product)
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <main>
      <div id="sc1" className={style.sc1} style={{ backgroundImage: 'url(/img/bh3.png)', backgroundSize: '300px 600px', backgroundRepeat: 'repeat' }}>
        <div className={style.shadoww}></div>
        <div className={style.shadoww2}></div>
        <div className={style.bgbh} style={{ backgroundImage: 'url(/img/dark.png)', backgroundSize: 'cover' }}></div>
        <div className={style.carousel}>
          <img src="/img/muzic.png" alt="" className={style.bgimg} />
          <img src="/img/muzic.png" alt="" className={style.bgimg} />
        </div>

        <div className={style.main_container} >
          <div className={style.navbar_contanier}><Navbar /></div>
          <div className={style.content_contanier}>
            <Statusbar />
            <div className={style.feed_with_user}>
            <div className={style.profile_bar_resp} >
                <div className={style.div_info2}>
                  <Image src={`/artist_img/${user2.profilepic}`} alt="" width={400} height={300} className={style.imgBg} />
                  <Image src={`/artist_img/${user2.profilepic}`} alt="" width={400} height={300} className={style.imgPrinc} />
                </div>
                <div className={style.div_infos}>
                  <div className={`${style.div_info} ${style.artistname}`}>
                    <h1 className={style.h12}>{user2.artistname}</h1>
                    <h1 className={style.h11}>{user2.artistname}</h1>
                  </div>
                  <div className={`${style.div_info} ${style.div_inf}`}><p className={style.username}>@{user2.username}</p></div>
                  <div className={`${style.div_info} ${style.div_inf}`}><p>Preț de colaborare:</p><h2>{user2.featurefee} RON</h2></div>
                  <div className={`${style.div_info} ${style.div_inf}`}><p>Descriere:</p><h6>{user2.description}</h6></div>
                  <div className={style.flex}>
                    <div className={`${style.div_info} ${style.div_inf}`}><p>Clasamentul Artiștilor:</p><h2>#1</h2></div>
                    <div className={`${style.div_info} ${style.div_inf}`}><p>Clasamentul Producătorilor:</p><h2>#24</h2></div>
                  </div>
                  {user2.username == user.username ?
                    (<div className={style.flex} ><Link href={`${process.env.URL}/changeprofile`} style={{ width: '100%', textAlign: 'center' }}>Editează profilul</Link></div>)
                    :
                    (<div className={style.flex}><Follow username={user2.username} follower={user.username} followBy={user2.followBy} /><Link href={`${process.env.URL}/chat/${user.username}`}>Mesaj</Link></div>)
                  }
                </div>
              </div>
              <div className={style.feed_posts}>
                <div className={style.dm}>
                  <div className={style.postsorprods}>
                    <button id='posts' style={{ backgroundColor: '#ffffff1a', border:"1px solid #ffd11867", color:"#ffd218", cursor: 'default' }}>Postări</button>
                    <button id='prods' style={{ backgroundColor: 'transparent', cursor: 'pointer' }}>Produse</button>
                  </div>
                  <div className={style.posts} id="postsDiv">
                    {postss.length > 0 ? (
                      postss.map((post, index) => {
                        return (
                          // "Hello"
                          <Postprf postDetails={post} key={index}  />
                        )
                      })
                    ) : (
                      <div className={style.marian}>
                        {user2.username == user.username ? (
                          <p>Nu ai publicat nicio postare. <Link href={`${process.env.URL}/createnew`} style={{ color: 'rgb(216, 216, 216)' }}>Postează acum</Link></p>
                        ) : (
                          <p>Utilizatorul nu a publicat nicio postare.</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className={style.products} id="productsDiv">
                    {productss.length > 0 ? (
                      productss.map((product) => {
                        const { _id, productid, prodslug, productTitle, productPrice, image2, image1, video, status } = product;
                        return (
                          <div key={_id}>
                            {user2.username !== user.username && status == "Active" ? (
                              <div className={style.product} style={{ backgroundImage: 'url(/img/pfbg.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                {image1 && image2 == "" ? (<Image src={`/product/${image1}`} width={400} height={400} className={style.productMainImg} alt={productTitle} />) : (null)}
                                {image2 && image1 == "" ? (<Image src={`/product/${image2}`} width={400} height={400} className={style.productMainImg} alt={productTitle} />) : (null)}
                                {image1 && image2 ? (<Image src={`/product/${image1}`} width={400} height={400} className={style.productMainImg} alt={productTitle} />) : (null)}
                                <div className={style.details_prod}>
                                  <h1 className={style.prodTitle}>{productTitle}</h1>
                                  <p id="price" className={style.priiice}>Preţ: {productPrice} RON</p>
                                  <div className={style.bottom_part}>
                                    <div className={style.profile}>
                                      <Image src={`/artist_img/${user2.profilepic}`} alt=" " width={100} height={100} />
                                      <div className={style.username}>
                                        <p>{user2.artistname}</p>
                                      </div>
                                    </div>
                                    <div className={style.details_prod_check}>
                                      <Link href={`${process.env.URL}/product/${prodslug}`}>
                                        <h4>Vezi detalii</h4>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                            {user2.username === user.username && (
                              <div className={style.product} style={{ backgroundImage: 'url(/img/pfbg.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                {image1 && image2 == "" ? (<Image src={`/product/${image1}`} width={400} height={400} className={style.productMainImg} alt={productTitle} />) : (null)}
                                {image2 && image1 == "" ? (<Image src={`/product/${image2}`} width={400} height={400} className={style.productMainImg} alt={productTitle} />) : (null)}
                                {image1 && image2 ? (<Image src={`/product/${image1}`} width={400} height={400} className={style.productMainImg} alt={productTitle} />) : (null)}
                                <div className={style.details_prod}>
                                  <h1 className={style.prodTitle}>{productTitle}</h1>
                                  <p id="price" className={style.priiice}>Preţ: {productPrice} RON</p>
                                  <div className={style.bottom_part}>
                                    <div className={style.profile}>
                                      <Image src={`/artist_img/${user2.profilepic}`} alt=" " width={100} height={100} />
                                      <div className={style.username}>
                                        <p>{user2.artistname}</p>
                                      </div>
                                    </div>
                                    <div className={style.details_prod_check}>
                                      <Link href={`${process.env.URL}/product/${prodslug}`}>
                                        <h4>Vezi detalii</h4>

                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })
                    ) : (
                      <div className={style.marian}>
                        {user2.username == user.username ? (<p>Nu ați încărcat niciun produs. <Link href={`${process.env.URL}/createnew`} style={{ color: 'rgb(216, 216, 216)' }}>Încărcați acum</Link></p>) : (<p>Utilizatorul nu a încărcat niciun produs.</p>)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={style.profile_bar} >
                <div className={style.div_info2}>
                  <Image src={`/artist_img/${user2.profilepic}`} alt="" width={400} height={300} className={style.imgBg} />
                  <Image src={`/artist_img/${user2.profilepic}`} alt="" width={400} height={300} className={style.imgPrinc} />
                </div>
                <div className={style.div_infos}>
                  <div className={`${style.div_info} ${style.artistname}`}>
                    <h1 className={style.h12}>{user2.artistname}</h1>
                    <h1 className={style.h11}>{user2.artistname}</h1>
                  </div>
                  <div className={`${style.div_info} ${style.div_inf}`}><p className={style.username}>@{user2.username}</p></div>
                  <div className={`${style.div_info} ${style.div_inf}`}><p>Preț de colaborare:</p><h2>{user2.featurefee} RON</h2></div>
                  <div className={`${style.div_info} ${style.div_inf}`}><p>Descriere:</p><h6>{user2.description}</h6></div>
                  <div className={style.flex}>
                    <div className={`${style.div_info} ${style.div_inf}`}><p>Clasamentul Artiștilor:</p><h2>#1</h2></div>
                    <div className={`${style.div_info} ${style.div_inf}`}><p>Clasamentul Producătorilor:</p><h2>#24</h2></div>
                  </div>
                  {user2.username == user.username ?
                    (<div className={style.flex} ><Link href={`${process.env.URL}/changeprofile`} style={{ width: '100%', textAlign: 'center' }}>Editează profilul</Link></div>)
                    :
                    (<div className={style.flex}><Follow username={user2.username} follower={user.username} followBy={user2.followBy} /><Link href={`${process.env.URL}/chat/${user.username}`}>Mesaj</Link></div>)
                  }
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Script
        src="/js/useraccount.js"
      />
    </main>
  )
}
