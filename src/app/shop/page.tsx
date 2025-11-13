"use client"
import style from '@/styles/shop.module.css'
import Navbar from '@/components/navbar'
import Statusbar from '@/components/statusbar'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import Userlist from '@/components/Userlist'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getProducts } from '@/function/product'
import { getAxiosWithToken } from '@/axios/AxiosObj'
import { LoaderS } from '@/components/loader'

export default function Home(props: any) {
  const { userDetails }: any = useSelector((state: RootState) => state.auth);

  const [user, setUser] = useState({
    username: 'Loading...',
    email: 'Loading...',
    profilepic: 'astist.png',
  });

  const [productss, setProductss] = useState([]);
  const [productRAW, setProductRAW] = useState([]);

  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const products = await getProducts();
      await setProductRAW(products?.data);
      await setProductss(products?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // fetchUserDetails();
  }, []);


  const onFilterShop = async (e: any) => {
    const filter = e.target.value;
    try {
      const response = await getAxiosWithToken({
        method: 'GET',
        url: `product?search=${filter}`, // Adjust the API endpoint as needed
      });

      if (response.success == true) {
        setProductss(response.data);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong while fetching user details.');
    }
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
                  <div className={style.filter} style={{ backgroundImage: 'url(/img/cardshv2.png)', backgroundSize: 'cover' }}>
                    <div className={style.ch}></div>
                    <Link href="/product">
                      <i className="far fa-plus-square" />
                    </Link>
                    <div className={style.left}>
                      <select id="products" onChange={onFilterShop}>
                        <option value="all">Toate </option>
                        <option value="beats">Beats</option>
                        <option value="visual">Visual/Artwork</option>
                        <option value="musicvid">Music Video Edit</option>
                        <option value="mixmas">Mix Master</option>
                      </select>
                      {/* <i className="fa-solid fa-angle-down" id="selectDown" /> */}
                    </div>
                  </div>
                  <div className={style.products}>
                    {productss.length > 0 ? (
                      productss.map((product) => {
                        const { _id, productid, user, prodslug, productTitle, productPrice, image2, image1, video } = product;
                        const { artistname, profilepic } = user;
                        return (
                          <div className={style.product} key={_id} style={{ backgroundImage: 'url(/img/pfbg.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                            {/* <Image src="/img/artwork.jpeg" width={400} height={400} className={style.productMainImg} alt=" " /> */}
                            {image1 && image2 == "" ? (<Image src={`/product/${image1}`} width={400} height={400} className={style.productMainImg} alt={productTitle} />) : (null)}
                            {image2 && image1 == "" ? (<Image src={`/product/${image2}`} width={400} height={400} className={style.productMainImg} alt={productTitle} />) : (null)}
                            {image1 && image2 ? (<Image src={`/product/${image1}`} width={400} height={400} className={style.productMainImg} alt={productTitle} />) : (null)}
                            <div className={style.details_prod}>
                              <h1 className={style.prodTitle}>{productTitle}</h1>
                              <p id="price" className={style.priiice}>Preţ: {productPrice} RON</p>
                              <div className={style.bottom_part}>
                                <div className={style.profile}>
                                  <Image src={`/artist_img/${profilepic}`} alt=" " width={30} height={30} />
                                  <div className={style.username}><p>{artistname}</p></div>
                                </div>
                                <div className={style.details_prod_check}>
                                  <Link href={`${process.env.URL}/product/${prodslug}`}><h4 style={{color:'#6657da'}}>Vezi detalii</h4></Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <LoaderS />
                    )}

                  </div>
                </div>
              </div>
              {/* User list starts */}
              <Userlist />
              {/* User list ends */}
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}