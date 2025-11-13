"use client"
import Head from 'next/head'
import style from '@/styles/post.module.css'
import Navbar from '@/components/navbar'
import { useEffect, useState } from 'react';
import Statusbar from '@/components/statusbar'
import Image from 'next/image'
import Link from 'next/link'
// import Follow from '../../components/follow'
import 'react-toastify/dist/ReactToastify.css';
import Router, { useRouter } from 'next/navigation';
import Post from '@/components/post';
import { getRefreshToken } from '@/function/auth';
import { getPostDetails } from '@/function/post';
// import Like from '../../components/like'

export default function Home({ params }: any) {

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


  const [post, setPost]: any = useState({
    imagecontent: "",
    postdate: "Loading...",
    posttime: "Loading...",
    status: "Loading...",
    textcontent: "Loading...",
    user: {
      artistname: "Loading...",
      description: "Loading...",
      featurefee: "Loading...",
      follows: "Loading...",
      followBy: Array,
      profilepic: "astist.png"
    },
    username: "Loading...",
    videocontent: ""
  });

  const route = useRouter();

  useEffect(() => {
    const { postId } = params;

    if (!postId) {
      route.push(`/feed`);
      // return false;
    }else{
      updatePostDetails(postId);
    }
  }, [params]);


  const updatePostDetails = async (postId: any) => {
    const postResponse = await getPostDetails(postId);
    if (postResponse == false) {
      return route.push(`/feed`);
    }
    setPost(postResponse[0])
  }

  return (
    <>
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
            {/* Status Bar */}
            <Statusbar action={false} />
            {/* Status Bar */}
            <div className={style.feed_with_user}>
              <div className={style.feed_posts}>
                <div className={style.dm}>
                  <Post postDetails={post} />
                </div>
              </div>
              <div className={style.profile_bar} style={{ backgroundImage: 'url(/img/prof.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div className={style.div_info2}>
                  <Image src={`/artist_img/${post.user.profilepic}`} alt="" width={400} height={300} className={style.imgBg} />
                  <Image src={`/artist_img/${post.user.profilepic}`} alt="" width={400} height={300} className={style.imgPrinc} />
                  {/* <Image src={`/artist_img/astist.png`} alt="" width={400} height={300} className={style.imgBg} />
                  <Image src={`/artist_img/astist.png`} alt="" width={400} height={300} className={style.imgPrinc} /> */}
                </div>
                <div className={style.div_info}>
                  <h1 className={style.h12}>{post.user.artistname}</h1>
                  <h1 className={style.h11}>{post.user.artistname}</h1>
                </div>
                <div className={`${style.div_info} ${style.div_inf}`} >
                  <p className={style.username}>
                    @{post.username}
                  </p>
                </div>
                <div className={`${style.div_info} ${style.div_inf}`}>
                  <p>Preț de colaborare:</p>
                  <h2>{post.user.featurefee} RON</h2>
                </div>
                <div className={`${style.div_info} ${style.div_inf}`}>
                  <p>Descriere:</p>
                  <h6>{post.user.description}</h6>
                </div>
                <div className={style.flex}>
                  <div className={`${style.div_info} ${style.div_inf}`}>
                    <p>Clasamentul Artiștilor:</p>
                    <h2>#1</h2>
                  </div>
                  <div className={`${style.div_info} ${style.div_inf}`}>
                    <p>Clasamentul Producătorilor:</p>
                    <h2>#24</h2>
                  </div>
                </div>
                {/* {post.username == user.username ?
                  (<div className={style.flex}><Link href={`${process.env.URL}/changeprofile`}>Editează profilul</Link></div>)
                  :
                  (<div className={style.flex}><Follow username={post.username} follower={user.username} followBy={post.user.followBy} /><Link href={`${process.env.URL}/chat/${user.username}`}>Mesaj</Link></div>)
                } */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}