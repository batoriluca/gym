"use client"
import Head from 'next/head'
import style from '@/styles/product.module.css'
import Navbar from '@/components/navbar'
import Statusbar from '@/components/statusbar'
import Image from 'next/image'
import Link from 'next/link';
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getProductDetails } from '@/function/product'

export default function Home({ params }: any) {
  const { userDetails }: any = useSelector((state: RootState) => state.auth);

  const [user, setUser]: any = useState({ username: 'Loading...', });

  const [productss, setProductss]: any = useState({
    image1: "",
    image2: "",
    postdate: "Loading...",
    posttime: "Loading...",
    prodslug: "",
    username: "Loading...",
    productCategory: "Loading...",
    productDescription: "Loading...",
    productPrice: "Loading...",
    productTitle: "Loading...",
    productid: "Loading...",
    status: "Loading...",
    user: { profilepic: '', artistname: 'Loading...' },
    video: "",
  });

  const route = useRouter();

  const [deleteModel, setDeleteModel] = useState(false);

  const deleteProduct = () => {
    setDeleteModel(true)
  }

  const cancelDelete = () => {
    setDeleteModel(false)
  }

  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);


  const confirmDelete = async () => {
    // if (deleteProductId !== '' && user.username !== "Loading") {
    //   // const data = {
    //   //   "postid": deleteProductId,
    //   //   "username": user.username,
    //   // };

    //   // let res = await fetch(`${process.env.API_URL}/deletePost`, {
    //   //   method: 'POST',
    //   //   headers: {
    //   //     'Content-Type': 'application/json',
    //   //   },
    //   //   body: JSON.stringify(data),
    //   // })
    //   // let response = await res.json()
    //   // if (response.success == true) {
    //   //   toast.success(response.msg)
    //   //   router.push(`/feed`);
    //   // } else {
    //   //   toast.error(response.msg);
    //   // }
    //     router.push(`/shop`);

    // } else {
    //   toast.error("Vă rugăm să încercați din nou");
    // }
  }
  

  useEffect(() => {
    const { product_slug } = params;
    if (!product_slug) {
      route.push(`/shop`);
    } else {
      productSDetails(product_slug);
    }
  }, [params]);

  const productSDetails = async (product_slug: any) => {
    const postResponse = await getProductDetails(product_slug);
    if (postResponse == false) {
      return route.push(`/feed`);
    }
    setProductss(postResponse[0])
  }

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
          <div className={style.navbar_contanier}>
            <Navbar />
          </div>
          <div className={style.content_contanier}>
            <Statusbar />
            <div className={style.feed_with_user}>
              <div className={style.feed_posts}>
                <div className={style.dm}>
                  <div className={style.detailscard}>
                    <i className="fa-solid fa-arrow-left-long" id="arrowLeft" />
                    <div id="img_part" className={style.img_part}>
                      {productss.image1 == '' ? null :
                        (<div className={style.img2}>
                          <Image width={200} height={200} src="/img/osky1.jpg" alt="" id="img1" />
                        </div>)}
                      {productss.image2 == '' ? null :
                        (<div className={style.img2}>
                          <Image width={200} height={200} src="/img/osky1.jpg" alt="" id="img2" />
                        </div>)}
                      {productss.video == '' ? null :
                        (<div className={style.vid1}>
                          <video
                            preload="auto"
                            controlsList="nodownload"
                            disablePictureInPicture={true}
                            className="fixed-aspect-ratio"
                            id="vid1"
                            controls
                            src='/posts/1679379092221_pexels-rostislav-uzunov-5680034.mp4'
                          />
                        </div>)}
                    </div>
                    <i className="fa-solid fa-arrow-right-long" id="arrowRight" />
                    <div className={style.last_part}>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.profile_bar}>
                
                <div className={style.productdetaill} >
                  <div className={style.ch}></div>
                  <h3>Titlul produsului:</h3>
                  <h1 className={style.detail_title}>{productss.productTitle}</h1>
                </div>
                <div className={style.productdetaill} >
                  <div className={style.ch}></div>
                  <h3>Prețul produsului:</h3>
                  <h1 className={style.detail_price}>{productss.productPrice} RON</h1>
                </div>
                <div className={style.productdetaill} >
                  <div className={style.ch}></div>
                  <h3>Categoria produsului:</h3>
                  <h1 className={style.detail_categ}>
                    {productss.productCategory}
                  </h1>
                </div>
                <div className={style.productdetaill} >
                  <div className={style.ch}></div>
                  <h3>Rating-ul produsului:</h3>
                  <h1 className={style.detail_rating}>
                    5.0/5.0
                    <i className="fa-solid fa-music" style={{ marginLeft: 5, color: 'rgb(124, 64, 255)' }} />
                  </h1>
                </div>
                <div className={style.productdetaill} >
                  <div className={style.ch}></div>
                  <h3>Descrierea produsului:</h3>
                  <h1 className={style.detail_desc}>
                    {productss.productDescription}
                  </h1>
                </div>

                <div className={style.lastrow}>
                  <div className={style.profile}>

                    <Link href={`/profile/${productss.username}`}>
                      <Image src={`/artist_img/${productss.user.profilepic}`} width={100} height={100} alt="" />
                    </Link>
                    <Link href={`/profile/${productss.username}`}>
                      <p style={{color:'white'}}>
                        {productss.user.artistname}
                      </p>
                    </Link>
                  </div>
                  {user.username === productss.username ?
                    (<Link href={`#`}  onClick={() => deleteProduct()} ><h2>Șterge produsul<i className="fa-solid fa-trash" id="deleteProduct"></i></h2></Link>)
                    :
                    (<Link href={`/chat/${productss.username}`}><h2>Contactați utilizatorul</h2></Link>)
                  }
                </div>
                {deleteModel ? (<div className={style.warningcard} style={{ backgroundImage: 'url(/img/cardshv2.png)', backgroundSize: 'cover' }}>
                  <div className={style.ch}></div>
                  <h2>ATENȚIE</h2>
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <h6>Ești sigur că vrei să ștergeți acest produs?</h6>
                  <p>Nu îl vei putea recupera!</p>
                  <div className="rowOp">
                    <button >Sunt sigur!</button>
                    <button onClick={cancelDelete}>Înapoi</button>
                  </div>
                </div>) : (null)}
              </div>
            </div>

          </div>
        </div>
      </div >
      <Script
        src="/js/product.js"
      />
    </main>
  )
}