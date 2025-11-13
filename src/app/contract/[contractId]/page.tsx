"use client"
import style from '@/styles/contracts.module.css'
import Navbar from '@/components/navbar'
import Statusbar from '@/components/statusbar'
import Link from 'next/link'
import Userlist from '@/components/Userlist'
import { toast } from 'react-toastify';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAxiosWithToken } from '@/axios/AxiosObj'
import Follow from '@/components/follow'
import { useRouter } from 'next/navigation'
import { getRefreshToken } from '@/function/auth'
import secureLocalStorage from 'react-secure-storage'

export default function Home({ params }: any) {

  const [countdownElement, setCountdownElement] = useState("");
  const [futureDate, setFutureDate]: any = useState();
  const [sentDate, setSentDate]: any = useState();

  const [contractStatus, setContractStatus]: any = useState('Waiting');


  // ------------------- Status -------------------

  // Expired -
  // Closed -

  // Waiting 
  // Rejected
  // Accepted
  // Delivered


  const route = useRouter();
  const { userDetails }: any = useSelector((state: RootState) => state.auth);

  const [user, setUser]: any = useState({
    username: 'Loading...',
    email: 'Loading...',
    profilepic: 'astist.png',
  });

  // useEffect(() => {
  //   // Call getRefreshToken initially
  //   getRefreshToken();

  //   // Set up the interval to call getRefreshToken every 9 minutes
  //   const intervalId = setInterval(() => {
  //     getRefreshToken();
  //   }, 9 * 60 * 1000); // 9 minutes in milliseconds

  //   // Clean up the interval when the component unmounts
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);


  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);

  useEffect(() => {
    const { contractId } = params
    if (contractId !== "Loading..." && contractId) {
      fetchContractDetails(contractId);
    } else {
      route.push(`/chat`);
    }
  }, [params]);

  const fetchContractDetails = async (contractId: any) => {
    try {
      const response = await getAxiosWithToken({
        method: 'GET',
        url: `contract/${contractId}`, // Adjust the API endpoint as needed
      });
      if (response.success) {
        await setContractDetail(response.data[0])
      } else {
        route.push(`/chat`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [contractdetail, setContractDetail]: any = useState({
    buyerd: {
      profilepic: 'osky1.jpg',
      artistname: 'Loading...',
    },
    sellerd: {
      profilepic: 'osky1.jpg',
      artistname: 'Loading...',
    },
    buyer: 'Loading...',
    seller: 'Loading...',
    delivertime: {
      type1: typeof (Date),
      date: "Loading...",
      time: "Loading..."
    },
    senttime: {
      type1: typeof (Date),
      date: "Loading...",
      time: "Loading..."
    },
    status: "Waiting",
    contractid: "Waiting",
    deadline: "Loading...",
    productd: {
      postdate: "Loading...",
      posttime: "Loading...",
      prodslug: "Loding...",
      productCategory: "Loading...",
      productPrice: "Loading...",
      productTitle: "Loading...",
      status: "Loading...",
      username: "Loading...",
    }
  });

  const handleContractAR = async (reponse: any) => {
    try {
      const data = {
        status: reponse,
      };
      const response = await getAxiosWithToken({
        method: 'PATCH',
        url: `contract/${contractdetail.contractid}`, // Adjust the API endpoint as needed
        data: data
      });
      if (response.success) {
        toast.success("Your response has been sent to buyer");
        setContractStatus(reponse);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error(error);
      // throw new Error('Something went wrong while fetching user details.');
    }
  }

  useEffect(() => {
    const futureDate2 = contractdetail.delivertime.type1 ? new Date(contractdetail.delivertime.type1) : null;
    const sentDate2 = contractdetail.senttime.type1 ? new Date(contractdetail.senttime.type1) : null;

    setFutureDate(futureDate2);
    setSentDate(sentDate2);
    setContractStatus(contractdetail.status);
  }, [contractdetail]);

  // Timing
  // Timing
  useEffect(() => {
    let countdownInterval: any;

    async function updateCountdown() {
      const now = new Date().getTime(); // Move this line here to get the current time
      if (contractdetail.status == "Waiting") {
        // Sent Date
        let timeRemaining = sentDate ? (86400000 * 1) - (now - sentDate.getTime()) : 0;

        // checking the status with time
        if (timeRemaining < 0) {
          setContractStatus("Expired");
          await handleContractAR("Expired")
        } else {
          const months = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 30)); // Assuming an average month length of 30 days
          timeRemaining %= 1000 * 60 * 60 * 24 * 30;
          const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          timeRemaining %= 1000 * 60 * 60 * 24;
          const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
          timeRemaining %= 1000 * 60 * 60;
          const minutes = Math.floor(timeRemaining / (1000 * 60));
          timeRemaining %= 1000 * 60;
          const seconds = Math.floor(timeRemaining / 1000);

          let countdownText = '';
          if (months > 0) {
            countdownText += `${months} ${months === 1 ? 'month' : 'months'}`;
          }
          if (days > 0) {
            countdownText += `${countdownText.length > 0 ? ' ' : ''}${days} ${days === 1 ? 'day' : 'days'}`;
          }

          countdownText += `${countdownText.length > 0 ? ' ' : ''}${hours} hours ${minutes} minutes ${seconds} seconds`;

          setCountdownElement(countdownText);
        }
      } else if (contractdetail.status == "Accepted" && futureDate) {
        let timeRemaining = futureDate.getTime() - now;

        if (timeRemaining < 0) {
          clearInterval(countdownInterval);
          setContractStatus("Expired");
          handleContractAR("Expired")
        } else {
          const months = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 30)); // Assuming an average month length of 30 days
          timeRemaining %= 1000 * 60 * 60 * 24 * 30;
          const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          timeRemaining %= 1000 * 60 * 60 * 24;
          const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
          timeRemaining %= 1000 * 60 * 60;
          const minutes = Math.floor(timeRemaining / (1000 * 60));
          timeRemaining %= 1000 * 60;
          const seconds = Math.floor(timeRemaining / 1000);

          let countdownText = '';
          if (months > 0) {
            countdownText += `${months} ${months === 1 ? 'month' : 'months'}`;
          }
          if (days > 0) {
            countdownText += `${countdownText.length > 0 ? ' ' : ''}${days} ${days === 1 ? 'day' : 'days'}`;
          }

          countdownText += `${countdownText.length > 0 ? ' ' : ''}${hours} hours ${minutes} minutes ${seconds} seconds`;

          setCountdownElement(countdownText);
        }
      }
    }

    if (contractStatus !== "Expired" && (contractdetail.status === "Waiting" || (contractdetail.status === "Accepted" && futureDate))) {
      updateCountdown();
      countdownInterval = setInterval(updateCountdown, 1000);
      return () => clearInterval(countdownInterval);
    }
  }, [futureDate, contractStatus, countdownElement, sentDate]);

  // Upload product
  // Product Video
  const [producttt, setProducttt] = useState('');
  const [producturl, setProductUrl] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  // Set Video
  const handleProductChange = (event: any) => {
    if (contractStatus == "Accepted") {
      // 100 MB
      if (event.target.files[0].size <= 104857600) {
        if (event.target.files[0].type.includes('video')) {
          // Set selected video and its URL
          const selectedVideo = event.target.files[0];
          const videoUrl = URL.createObjectURL(new Blob([selectedVideo], { type: 'video/mp4' }));
          setProducttt(selectedVideo);
          setProductUrl(videoUrl);
        } else {
          // setMediaerror("Videos are allowed")
          toast.error("Only video is allowed");
        }
      } else {
        // setMediaerror("Video size should be less than 100 MB")
        toast.error("Video size should be less than 100 MB");
      }
    }
  }

  // Upload image in the file 
  const mediaUpload = async () => {
    if (producttt && producttt !== '') {
      const data = new FormData()
      data.append('media', producttt)
      try {
        const response: any = await fetch(`${process.env.API_URL}/contract/media`, {
          method: 'POST',
          body: data,
          headers: {
            Authorization: 'Bearer ' + secureLocalStorage.getItem('access'),
          },
        })
        // console.log(response)
        const responseData = await response.json();
        if (responseData.success = true) {
          return responseData.fileName
        } else {
          toast.error("Vă rugăm să încercați din nou!");
          return false;
        }
      } catch (error) {
        // Handle error or dispatch error-related actions here
        toast.error("Ceva n-a mers bine. Vă rugăm să încercați din nou");
        console.log(error);
        return false;
      }
    } else {
      toast.error("Please select the media first");
      return false;
    }
  }

  const handleSendProduct = async () => {
    if (contractStatus === "Accepted") {

      const productMedia = await mediaUpload();
      if (!productMedia) {
        toast.error("Vă rugăm să selectați mai întâi imaginea");
        return false;
      }

      try {
        const data = {
          status: "Delivered",
          product: productMedia,
        };
        const response = await getAxiosWithToken({
          method: 'PATCH',
          url: `contract/${contractdetail.contractid}`, // Adjust the API endpoint as needed
          data: data
        });
        if (response.success) {
          toast.success("Your product has been sent");
          setContractStatus("Delivered");
        } else {
          toast.error(response.msg);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Contract should be accepted first");
    }
  }
  const [reviewRating, setReviewRating] = useState('');
  const [reviewTopic, setReviewTopic] = useState('');

  const [downloaded, setDownloaded] = useState(false);

  // Event handler to update selectedValue when a radio button is changed
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    if (name == "reviewTopic") {
      setReviewTopic(value)
    }
    if (name == "starRadio") {
      setReviewRating(value);
    }
  };

  const handleClickDownload = () => {
    const mediaUrl = process.env.URL + "/contract/" + contractdetail.productfile;

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = mediaUrl;

    // Determine the file name (you may need to extract it from the URL)
    const fileName = `${contractdetail.productd.productTitle + "-" + contractdetail.contractid}.mp4`; // Replace with actual file name

    // Set the download attribute with the file name
    anchor.download = fileName;

    // Programmatically trigger a click event to start the download
    anchor.click();
    setDownloaded(true)
  };


  const handleSendReview = async () => {

    if (!downloaded) {
      toast.error("Please download the product first");
      return false;
    }
    if (!reviewRating) {
      toast.error("Please Rate the product");
      return false;
    }
    try {
      const data = {
        status: "Closed",
        reviewRating: reviewRating,
        reviewTopic: reviewTopic,
      };
      const response = await getAxiosWithToken({
        method: 'PATCH',
        url: `contract/${contractdetail.contractid}`, // Adjust the API endpoint as needed
        data: data
      });
      if (response.success) {
        toast.success("Your review has been sent");
        setContractStatus("Closed");
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error(error);
    }
    console.log(reviewRating)
    console.log(reviewTopic)
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
            {/* Status Bar */}
            <Statusbar />
            {/* Status Bar */}
            <div className={style.feed_with_user}>
              <div className={style.feed_posts}>
                <div className={style.dm}>
                  <div className={style.user_info} >
                    {/* Page viewer and seller are same (For Seller) */}
                    {user.username === contractdetail.seller ? (
                      <>
                        {contractdetail.buyerd && (
                          <div className={style.left}>
                            <Image src={`/artist_img/${contractdetail.buyerd.profilepic}`} alt="" width={70} height={70} />
                            <div className={style.info}>
                              <h1 className={style.artistname}>{contractdetail.buyerd.artistname}</h1>
                              <p className={style.username}><b>{contractdetail.buyer}</b></p>
                            </div>
                          </div>
                        )}
                        <div className={style.gotoprofile}>
                          {contractdetail.buyer && (
                            <Link href={`/profile/${contractdetail.buyer}`}>
                              <h4>Vizitează profilul</h4>{" "}
                            </Link>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {contractdetail.sellerd && (
                          <div className={style.left}>
                            <Image src={`/artist_img/${contractdetail.sellerd.profilepic}`} alt="" width={70} height={70} />
                            <div className={style.info}>
                              <h1 className={style.artistname}>{contractdetail.sellerd.artistname}</h1>
                              <p className={style.username}><b>{contractdetail.seller}</b></p>
                            </div>
                          </div>
                        )}
                        <div className={style.gotoprofile}>
                          {contractdetail.seller && (
                            <Link href={`/profile/${contractdetail.seller}`}>
                              <h4>Vizitează profilul</h4>{" "}
                            </Link>
                          )}
                        </div>
                      </>
                    )}

                  </div>
                  <div className={style.chat} >
                    {/* // when status is waiting   */}
                    {contractdetail ? (
                      contractStatus == "Waiting" ? (
                        <>
                          {user.username === contractdetail.seller ? (
                            <>
                              <h2 style={{ textAlign: "center" }}>
                                Ai primit un contract
                                <i className="fa-solid fa-file-signature" style={{ marginLeft: 10 }} />
                              </h2>
                              <div className={style.card}>
                                <h3 className={style.prod_title}>Produsul pe care utilizatorul vrea să-l cumpere:</h3>
                                <Link href={`/product/${contractdetail.productd.prodslug}`}>
                                  <h3 className={style.prod_titlefr}><span>{contractdetail.productd.productTitle}</span></h3>
                                </Link>
                              </div>
                              <div className={`${style.prett} ${style.card}`}>
                                <h3>Preț:</h3>
                                <h3 className={style.pret}><span style={{ color: "6657DA" }}>{contractdetail.productd.productPrice} RON</span></h3>
                              </div>
                              <div className={style.card}>
                                <h3>Perioada în care trebuie să livrezi serviciul/produsul:</h3>
                                <h3 className={style.perioada}><span style={{ color: "6657DA" }}>{contractdetail.deadline} ({contractdetail.delivertime.date})</span></h3>
                              </div>
                              <button id="accept" onClick={() => handleContractAR("Accepted")}>Acceptă oferta</button>
                              <button id="refuz" className={style.refuz} onClick={() => handleContractAR("Rejected")}>Refuză oferta</button>
                            </>
                          ) : (
                            <div>
                              <h1><span style={{ color: "#6657DA" }}>Contractul a fost trimis!</span> Se așteaptă răspunsul producătorului.</h1>
                              <h2>Oferta expiră în {countdownElement}</h2>
                            </div>
                          )}
                        </>
                      ) : null
                    ) : null}

                    {/* // when status is Accepted   */}
                    {contractdetail ? (
                      contractStatus == "Accepted" ? (
                        <>
                          {user.username == contractdetail.seller
                            ?
                            (
                              <div>
                                <div className={style.form}>
                                  <label htmlFor="prodInput">
                                    <h3
                                      id="file-name"
                                      style={{

                                        cursor: "pointer",
                                        padding: "40px 20px",
                                        background: "#00000046",
                                        borderRadius: "10px",
                                        color: "white",
                                        textAlign: "center",
                                        fontFamily: `"DM Sans", sans-serif`,
                                        fontWeight: "normal",
                                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                        
                                        backgroundImage: 'url(/img/prd.png)',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover' 
                                        
                                      }}
                                    >
                                      Încarcă produsul aici
                                    </h3>
                                  </label>
                                  <p className={style.error}>Asigură-te că ai încărcat produsul</p>
                                  <input type="file" id="prodInput" onChange={handleProductChange} style={{ display: "none" }} accept="video/mp4,video/x-m4v,video/*" />
                                  <br />
                                  
                                  <div className={style.card}>
                                    <h3>
                                      Ești sigur sigur că acest fișier vrei să fie trimis ca produsul final?
                                    </h3>
                                    <div className={style.lbl}>
                                      <h3 style={{ display: "flex" }}>
                                        <label htmlFor="chckbox" className={style.cfp}>
                                          <i className="fa-solid fa-paper-plane"></i>
                                        </label>
                                        <input type="checkbox" name="" id="chckbox" className={style.chckbox} />
                                        <span style={{ color: "#6657DA" }}>Da, acest fișier va fi trimis ca produs final</span>
                                      </h3>
                                    </div>
                                  </div>
                                  <p className={style.error}>Asigură-te că ai bifat căsuța liberă</p>
                                  <button className={style.sendProd} onClick={handleSendProduct}>Trimite produsul</button>
                                </div>
                                <h2>
                                  Contractul expiră în {countdownElement}
                                </h2>
                              </div>
                            )
                            :
                            (
                              <>
                                <h1>
                                  Încă <span>se lucrează</span> la produs. Vei primi <span>o notificare</span> când acesta va fi
                                  livrat!
                                </h1>
                                <h2>
                                  Contractul expiră în {countdownElement}
                                </h2>
                              </>
                            )
                          }
                        </>
                      ) : null
                    ) : null}

                    {/* // when status is Delivered   */}
                    {contractdetail ? (
                      contractStatus == "Delivered" ? (
                        <>
                          {user.username == contractdetail.seller
                            ?
                            (<div><h1>Produsul a fost livrat cumpărătorului. Suma a fost creditată în portofel. Aceasta va fi disponibilă pentru retragere după 3 zile. Dacă nu a fost raportată nici o problemă.</h1></div>)
                            :
                            (<div><h2 className={style.titlpag}>Produsul a fost livrat!
                              <i className="fa-solid fa-truck-ramp-box"></i></h2>
                              <h3
                                style={{
                                  cursor: "pointer",
                                  padding: "40px 20px",
                                  background: "#00000046",
                                  borderRadius: "10px",
                                  color: "white",
                                  textAlign: "center",
                                  fontFamily: `"DM Sans", sans-serif`,
                                  fontWeight: "normal",
                                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                  marginBottom: "20px",
                                  backgroundImage: 'url(/img/prd.png)',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover' 
                                }}
                                onClick={handleClickDownload}
                              >
                                Click aici pentru a descărca produsul{" "}
                              </h3>
                              <div className={style.card}>
                                <h3>
                                  Cum a fost experiența ta?
                                </h3>
                                <div className={style.rating}>
                                  <input value="1" name="starRadio" id="star-1" type="radio" onChange={handleChangeInput} />
                                  <label htmlFor="star-1">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
                                  </label>
                                  <input value="2" name="starRadio" id="star-2" type="radio" onChange={handleChangeInput} />
                                  <label htmlFor="star-2">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
                                  </label>
                                  <input value="3" name="starRadio" id="star-3" type="radio" onChange={handleChangeInput} />
                                  <label htmlFor="star-3">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
                                  </label>
                                  <input value="4" name="starRadio" id="star-4" type="radio" onChange={handleChangeInput} />
                                  <label htmlFor="4">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
                                  </label>
                                  <input value="5" name="starRadio" id="star-5" type="radio" onChange={handleChangeInput} />
                                  <label htmlFor="star-5">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
                                  </label>
                                </div>
                              </div>
                              <div className={style.card} style={{backgroundColor:'#00000046', borderRadius:'10px', marginTop:'20px'}}>
                              <h3 className={style.raporttitle}>Raportează (opțional): </h3>
                              <h5 className={style.timprap}>
                                Timpul de raportare a unei probleme la acest produs este de{" "}
                                <span>23 de ore</span> și <span>59 de minute</span>
                              </h5>
                              <select className={style.raport} name="reviewTopic" onChange={handleChangeInput}>
                                <option value="0" selected hidden>Selectează motivul raportării</option>
                                <option value="Spam">Spam</option>
                                <option value="Violență">Violență</option>
                                <option value="Scam sau fraudă">Scam sau fraudă</option>
                                <option value="Nuditate">Nuditate</option>
                                <option value="Altceva">Altceva</option>
                              </select>
                              <button>Raportează</button>
                              </div>
                              <button onClick={handleSendReview}>Încheie contractul</button>
                              <h4 className={style.inccontr}>
                                <input type="checkbox" style={{marginRight:'10px'}} />
                                După încheierea contractului nu vei mai putea descărca acest produs. 
                                <span style={{color:'#6657da'}}> Asigură-te că l-ai descărcat!</span>  
                              </h4></div>
                            )
                          }
                        </>
                      ) : null
                    ) : null}

                    {/* // when status is Rejected */}
                    {contractdetail ? (
                      contractStatus == "Rejected" ?
                        (
                          <>
                            {user.username == contractdetail.seller
                              ?
                              (<div><h1>Ați <span style={{ color: "#6657DA" }} >respins</span> acest contract.</h1></div>)
                              :
                              (<div><h1> Producătorul <span>a respins</span> acest contract. Vă rugăm să <span>încercați din nou</span> mai târziu sau să <span>luați legătura</span> cu acesta.</h1></div>)
                            }
                          </>)
                        :
                        (null)
                    ) : null}

                    {/* // when status is expired  */}
                    {contractdetail ? (
                      contractStatus == "Expired" ?
                        (<div><h1>Acest contract <span style={{ color: "6657DA" }}>a expirat.</span></h1></div>)
                        :
                        (null)
                    ) : null}

                    {/* // when status is closed  */}
                    {contractdetail ? (
                      contractStatus == "Closed" ?
                        (<div><h1>AContractul <span style={{ color: "6657DA" }}>s-a încheia.</span></h1></div>)
                        :
                        (null)
                    ) : null}
                  </div>
                </div>
              </div>
              {/* User list starts */}
              <Userlist /> 
              {/* User list ends */}
            </div>
            
          </div>
        </div>
      </div >
    </main>
  )
}
