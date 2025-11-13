"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar'
import { useEffect, useState } from 'react'
import { getUserDetails } from '@/function/user'
import { getRefreshToken } from '@/function/auth'
import { getPosts } from '@/function/post'
import style from '@/styles/feed.module.css'
import Statusbar from '@/components/statusbar'
import Post from '@/components/post'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setUserDetails } from '@/store/slices/AuthSlice';
import { LoaderS } from '@/components/loader';
import { ImageComponent } from '@/components/component';

export default function Home(props: any) {

  const dispatch = useDispatch<AppDispatch>();
  const route = useRouter();
  const [posts, setPosts] = useState([]);
  const [userDetailsArry, setUserDetailsArry]: any = useState([]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const user = await getUserDetails();
      const post = await getPosts();
      await setUserDetailsArry(user[0]);
      await setPosts(post?.data);
      await dispatch(setUserDetails(user[0]));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Call getRefreshToken initially
    getRefreshToken();

    // Set up the interval to call getRefreshToken every 9 minutes
    const intervalId = setInterval(() => {
      getRefreshToken();
    }, 9 * 60 * 1000); // 9 minutes in milliseconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  return (
    <main>
      <div id="sc1" className={style.sc1} style={{ backgroundImage: 'url(/img/bh3.png)', backgroundSize: '300px 600px', backgroundRepeat: 'repeat' }}>
        <div className={style.shadoww}></div>
        <div className={style.shadoww2}></div>
        <div className={style.bgbh} style={{ backgroundImage: 'url(/img/dark.png)', backgroundSize: 'cover' }}></div>
        <div className={style.carousel}>
          <img src="/img/muzic.png" alt={"Not Found"} className={style.bgimg} />
          <img src="/img/muzic.png" alt={"Not Found"} className={style.bgimg} />
        </div>

        <div className={style.main_container} >

          <div className={style.navbar_contanier}>
            <Navbar />
          </div>
          <div className={style.content_contanier}>
            <Statusbar action={true} />
            <div className={style.feed_with_user}>
              <div className={style.feed_posts}>
                {posts.length > 0 ? (
                  posts.map((post: any) => {
                    return (
                      <Post postDetails={post} key={post._id} deleteOption={false} />
                    )
                  })
                ) : (
                  <div className={style.loader}>
                    {/* <p>Nu există nicio postare momentan. Te rugăm să încerci mai încolo!</p> */}
                    <LoaderS />
                  </div>
                )}
              </div>
              <div className={style.profile_bar}>

                <div className={style.user_detail} style={{ backgroundImage: 'url(/img/pfbg.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                  <div className={style.ch}></div>
                  <div className={style.ch2}></div>
                  <div className={style.user_detail_with_image}>
                    <div className={style.profile_pic}>
                    
                      <ImageComponent src={`/artist_img/${userDetailsArry.profilepic}`} value={userDetailsArry.profilepic} alt={userDetailsArry.profilepic || "Not Found"} width={120} height={120} className={style.profileimg} />
                    </div>
                    <div className={style.feat}>
                      <h3 className={style.full_name}>{userDetailsArry.artistname}</h3>
                      <h3 className={style.username}>{userDetailsArry.username}</h3>
                    </div>
                  </div>
                  <div className={style.price}>
                    <h3 className={style.price_title}>Preț de colaborare:</h3>
                    <h3 className={style.pricee}>{userDetailsArry.featurefee}RON</h3>

                  </div>
                  <div className={style.bio}>
                    <h3 className={style.bio_title}>
                      Descriere:
                    </h3>
                    <p>{userDetailsArry.description}</p>
                  </div>
                  <div className={style.edit}>
                    <button onClick={() => { route.push("changeprofile") }}><h4>Editează</h4></button>
                  </div>
                </div>
                <div className={style.news_card} style={{ backgroundImage: 'url(/img/cardshv.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                  <div className={style.ch}></div>
                  <div className={style.ch2}></div>
                  <h1>Verifică noutăţile #GrowYourMusic!</h1>
                  <p>Citeşte ultimele notificări primite.</p>
                  <p className={style.news_pb}>
                    #GrowYourMusicDELUXEComingSoon
                  </p>
                  <Link href="/news">
                    <button><h4>Verifică-le aici</h4></button>
                  </Link>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* <Notifi /> */}
    </main>
  )
}
