"use client"
import style from '@/styles/contracts.module.css'
import Navbar from '@/components/navbar'
import Statusbar from '@/components/statusbar'
import Link from 'next/link'
import Userlist from '@/components/Userlist'
import { toast } from 'react-toastify';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { getUserDetails } from '@/function/user'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation'
import { getAxiosWithToken } from '@/axios/AxiosObj'

export default function Home({ params }: any) {
  const { userDetails }: any = useSelector((state: RootState) => state.auth);
  const route = useRouter();

  const [user, setUser] = useState({
    username: 'Loading...',
    email: 'Loading...'
  });

  const [receiverDetails, setReceiverDetails]: any = useState({
    username: 'Loading...',
    email: 'Loading...',
    artistname: 'Loading...',
    profilepic: 'astist.png',
    product: []
  });

  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);

  useEffect(() => {
    const { username } = params
    if (username !== "Loading..." && username) {
      fetchUserDetails(username);
    } else {
      route.push(`/chat`);
    }
  }, [params]);

  const fetchUserDetails = async (username: any) => {
    try {
      const user = await getUserDetails(username);
      if (user == false) {
        return route.push(`/chat`);
      }
      await setReceiverDetails(user[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const [prodPrice, setProdPrice] = useState(null);
  const [prodId, setProdId] = useState("");
  const [deadLine, setDeadLine] = useState(null);

  const handleProductChange = (event: any) => {
    if (event.target.name = "productDetail1") {
      setProdId(event.target.value)
      setProdPrice(event.target.selectedOptions[0].getAttribute('data-price'))
    }
  }
  const handleProductChange2 = (event: any) => {
    if (event.target.name = "produtDetails2") {
      setDeadLine(event.target.value)
    }
  }

  const handleContract = async () => {
    if (prodId !== '0' && prodId !== null && prodId !== '') {
      if (deadLine !== null) {
        if (prodPrice !== null && receiverDetails.username !== 'Loading...') {
          const data = {
            productid: prodId,
            productprice: prodPrice,
            deadline: deadLine,
          };
          try {
            const response = await getAxiosWithToken({
              method: 'POST',
              url: `contract/${receiverDetails.username}`,
              data: data,
            });

            if (response.success) {
              toast.success(response.msg);
              route.push(`/chat/${receiverDetails.username}`);
            } else {
              toast.error(response.msg);
            }
          } catch (error) {
            toast.error("Something went wrong, Please try again..!!");
          }
        } else {
          toast.error("Something went wrong, Please try again..!!");
        }
      } else {
        toast.error("Please select the delivery time");
      }
    } else {
      toast.error("Please select the product");
    }
  };
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
            {/* Status Bar */}
            <Statusbar />
            {/* Status Bar */}
            <div className={style.feed_with_user}>
              <div className={style.feed_posts}>
                <div className={style.dm}>
                  <div className={style.user_info} >
                    <div className={style.left}>
                      <Image src={`/artist_img/${receiverDetails.profilepic}`} alt="" width={70} height={70} />
                      <div className={style.info}>
                        <h1 className={style.artistname}>{receiverDetails.artistname}</h1>
                        <p className={style.username}>{receiverDetails.username}</p>
                      </div>
                    </div>
                    <div className={style.gotoprofile}>
                      <Link href={`/profile/${receiverDetails.username}`}>
                        <h4>Vizitează profilul</h4>{" "}
                      </Link>
                    </div>
                  </div>
                  <div className={style.chat} >
                    <h2 >
                      Creează un contract
                      <i className="fa-solid fa-file-signature " style={{ marginLeft: 10 }} />
                    </h2>
                    <div className={style.card}>
                      <h3>
                        Selectează produsul pe care vrei să-l cumperi de la acest utilizator:
                      </h3>
                      <select
                        defaultValue="Nu este selectat nimic"
                        name='productDetail1'
                        onChange={handleProductChange}
                      >
                        <option data-id={0} value={0}>Nu este selectat nimic</option>
                        {receiverDetails.product.length > 0 ? (
                          receiverDetails.product.map((product: any) => {
                            const { _id, productTitle, productid, productPrice } = product
                            return (
                              <option key={_id} data-price={productPrice} value={productid}>{productTitle}</option>
                            )
                          })
                        ) : (null)}
                      </select>
                    </div>
                    <div
                      className={`${style.prett} ${style.card}`}

                    >
                      <h3>Preț:</h3>
                      <h3 className={style.pret}>{prodPrice} RON</h3>
                    </div>
                    <div className={style.card}>
                      <h3>Selectează perioada în care trebuie să îți fie livrat serviciul/produsul:</h3>
                      <select
                        defaultValue=""
                        name='produtDetails2'
                        onChange={handleProductChange2}
                      >
                        <option hidden>Nu este selectat nimic</option>
                        <option value={"o-săptămână"}>O săptămână</option>
                        <option value={"două-săptămâni"}>Două săptămâni</option>
                        <option value={"o-lună"}>O lună</option>
                      </select>
                    </div>
                    <div className={style.cardBtn}>
                      <button onClick={handleContract}>Trimite contractul producătorului</button>
                    </div>
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