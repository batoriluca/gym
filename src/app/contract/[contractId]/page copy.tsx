"use client"
import Head from 'next/head'
import style from '@/styles/contracts.module.css'
import Navbar from '@/components/navbar'
import Statusbar from '@/components/statusbar'
import Link from 'next/link'
import Userlist from '@/components/Userlist'
import { toast } from 'react-toastify';
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function Home(props: any) {

  const [countdownElement, setCountdownElement] = useState("");
  const [user, setUser] = useState({
    username: 'Loading...',
    email: 'Loading...',
    profilepic: 'astist.png',
  });
  const [contractdetail, setContractDetail] = useState({
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
  // Product Video
  const [producttt, setProducttt] = useState('');
  const [producturl, setProductUrl] = useState('');
  const [productname, setProductName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    setUser(props.userdetails.userdetail[0]);
    setContractDetail(props.contractdetails.contract[0]);
    console.log(props);
  }, [props]);

  const futureDate = new Date(contractdetail.delivertime.type1);
  const sentDate = new Date(contractdetail.senttime.type1);

  useEffect(() => {
    function updateCountdown() {
      if (contractdetail.status === "Waiting") {
        const now = new Date().getTime();
        // const timeRemaining = 86400000 - (now - sentDate.getTime());
        const timeRemaining = (86400000 * 2) - (now - sentDate.getTime());
        if (timeRemaining < 0) {
          setCountdownElement("CEXPIRED");
        } else {
          const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
          setCountdownElement(`${hours} ore ${minutes} minute și ${seconds} secunde`);
        }
      } else if (contractdetail.status === "Accepted") {
        const now = new Date().getTime();
        const timeRemaining = futureDate.getTime() - now;
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        if (timeRemaining < 0) {
          clearInterval(countdownInterval);
          setCountdownElement("EXPIRED");
        } else {
          setCountdownElement(`${days} zile ${hours} ore ${minutes} minute și ${seconds} secunde`);
        }
      }
    }
    let countdownInterval: any;
    if (countdownElement !== "CEXPIRED") {
      updateCountdown();
      countdownInterval = setInterval(updateCountdown, 1000);
      return () => clearInterval(countdownInterval);
    }
  }, [futureDate, contractdetail.status, countdownElement, sentDate]);

  useEffect(() => {
    async function updateContractStatus() {
      if (countdownElement === 'CEXPIRED' || countdownElement === 'EXPIRED') {
        const data = {
          status: 'ex',
          contractid: contractdetail.contractid,
        };
        const update = await fetch(`${process.env.API_URL}/updatecontract`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        await update.json();
      }
    }
    updateContractStatus();
  }, [countdownElement, contractdetail.contractid]);


  const handleContractAR = async (reponse: any) => {
    const data = {
      status: reponse,
      contractid: contractdetail.contractid,
    };
    const update = await fetch(`${process.env.API_URL}/updatecontract`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const reponsse = await update.json();

    if (reponsse.success == true) {
      toast.success("Your response has been sent to buyer", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setContractDetail({ ...contractdetail, status: reponsse.status });
    } else {
      toast.error("Somethings went wrong...!, Please try again later", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

  }

  // Set Video
  const handleProductChange = (event: any) => {
    if (contractdetail.status === "Accepted") {
      if (event.target.files[0].size <= 94371840) {
        const selectedImage = event.target.files[0];
        const imageUrl = URL.createObjectURL(new Blob([selectedImage]))
        setProducttt(selectedImage);
        setProductUrl(imageUrl);
      } else {
        toast.error("Product size should be less than 90 MB", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Contract should be accepted first", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  // Upload video in the file 
  const videoUpload = async () => {
    if (contractdetail.status === "Accepted") {
      if (producttt !== '') {
        const data = new FormData()
        data.append('file', producttt)

        const res = await fetch(`${process.env.API_URL}/uploadproduct`, {
          method: 'POST',
          body: data
        })
        const res2 = await res.json()
        if (res2.success == true) {
          if (res2.filename.newFilename) {
            setProductName(res2.filename.newFilename)
          } else {
            setProductName('')
            toast.error("Please Try again...!!!", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        } else {
          toast.error("Please Try again...!!!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        setProductName('')
      }
    } else {
      toast.error("Contract should be accepted first", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const handleSendProduct = async () => {
    if (contractdetail.status === "Accepted") {
      await videoUpload();
      if (productname !== '') {
        const data = {
          status: "De",
          product: productname,
          contractid: contractdetail.contractid,
        };
        const update = await fetch(`${process.env.API_URL}/updatecontract`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        const reponsse = await update.json();
        if (reponsse.success == true) {
          toast.success("Your response has been sent to buyer", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setContractDetail({ ...contractdetail, status: reponsse.status });
        } else {
          toast.error("Somethings went wrong...!, Please try again later", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        toast.error("Please select product first", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

    } else {
      toast.error("Contract should be accepted first", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

  }


  return (
    <main>
      <div id="sc1" className={style.sc1} style={{backgroundImage: 'url(/img/bh3.png)', backgroundSize: '300px 600px', backgroundRepeat:'repeat'}}>
      <div className={style.carousel}>
            <img src="/img/muzic.png" alt="" className={style.bgimg}/>
            <img src="/img/muzic.png" alt="" className={style.bgimg}/>
          </div>
        <div className={style.main_container}>
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
                  <div className={style.user_info}>
                    {user.username == contractdetail.seller
                      ?
                      (
                        <>
                          <div className={style.left}>
                            <Image src={`/artist_img/${contractdetail.buyerd.profilepic}`} alt="" width={70} height={70} />
                            <div className={style.info}>
                              <h1 className={style.artistname}>{contractdetail.buyerd.artistname}</h1>
                              <p className={style.username}><b>{contractdetail.buyer}</b></p>
                            </div>
                          </div>
                          <div className={style.gotoprofile}>
                            <Link href={`/profile/${contractdetail.buyer}`}>
                              <h4>Vizitează profilul</h4>{" "}

                            </Link>
                          </div>
                        </>
                      )
                      :
                      (
                        <>
                          <div className={style.left}>
                            <Image src={`/artist_img/${contractdetail.sellerd.profilepic}`} alt="" width={70} height={70} />
                            <div className={style.info}>
                              <h1 className={style.artistname}>{contractdetail.sellerd.artistname}</h1>
                              <p className={style.username}><b>{contractdetail.seller}</b></p>
                            </div>
                          </div>
                          <div className={style.gotoprofile}>
                            <Link href={`/profile/${contractdetail.seller}`}>
                              <h4>Vizitează profilul</h4>{" "}

                            </Link>
                          </div>
                        </>
                      )
                    }
                  </div>
                  <div className={style.chat}>
                    {contractdetail.status == "Waiting" && countdownElement !== 'CEXPIRED'
                      ?
                      (
                        <>
                          {user.username == contractdetail.seller
                            ?
                            (
                              <>
                                <h2 style={{ textAlign: "center" }}>
                                  Ai primit un contract
                                  <i className="fa-solid fa-file-signature" style={{ marginLeft: 10 }} />
                                </h2>
                                <div className={style.card}>
                                  <h3 className={style.prod_title}>Produsul pe care utilizatorul vrea să-l cumpere:</h3>
                                  <Link href={`/product/${contractdetail.productd.prodslug}`}>
                                    <h3 className={style.prod_titlefr} ><span>{contractdetail.productd.productTitle}</span></h3>
                                  </Link>
                                </div>
                                <div
                                  className={`${style.prett} ${style.card}`}

                                >
                                  <h3>Preț:</h3>
                                  <h3 className={style.pret} ><span style={{ color: "6657DA" }}>{contractdetail.productd.productPrice} RON</span></h3>
                                </div>
                                <div className={style.card}>
                                  <h3>Perioada în care trebuie să livrezi serviciul/produsul:</h3>
                                  <h3 className={style.perioada} ><span style={{ color: "6657DA" }}>{contractdetail.deadline} ({contractdetail.delivertime.date})</span></h3>
                                </div>
                                <button id="accept" onClick={() => handleContractAR("Accepted")}>Acceptă oferta</button>
                                <button id="refuz" className={style.refuz} onClick={() => handleContractAR("Rejected")}>Refuză oferta</button>
                              </>
                            )
                            :
                            (
                              <div><h1><span style={{ color: "#6657DA" }}>Contractul a fost trimis!</span> Se așteaptă răspunsul producătorului.</h1>
                                <h2>Oferta expiră în {countdownElement}</h2>
                              </div>
                            )
                          }
                        </>
                      )
                      :
                      (null)
                    }
                    {contractdetail.status == "Accepted"
                      ?
                      (
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
                                        background: "#6657da",
                                        borderRadius: "10px",
                                        color: "#313131",
                                        textAlign: "center",
                                        fontFamily: `"DM Sans", sans-serif`,
                                        fontWeight: "900",
                                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                        border: "#6c5ce7 1px solid"

                                      }}
                                    >
                                      Încarcă produsul aici

                                    </h3>
                                  </label>
                                  <p className={style.error}>Asigură-te că ai încărcat produsul</p>
                                  <input type="file" id="prodInput" onChange={handleProductChange} style={{ display: "none" }} />
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
                                  {/* <Link href="/moneyws"> */}
                                  <button className={style.sendProd} onClick={handleSendProduct}>Trimite produsul</button>
                                  {/* </Link> */}
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
                      )
                      :
                      (null)
                    }
                    {contractdetail.status == "Rejected"
                      ?
                      (
                        <>
                          {user.username == contractdetail.seller
                            ?
                            (<div><h1>Ați <span style={{ color: "#6657DA" }} >respins</span> acest contract.</h1></div>)
                            :
                            (<div><h1> Producătorul <span>a respins</span> acest contract. Vă rugăm să <span>încercați din nou</span> mai târziu sau să <span>luați legătura</span> cu acesta.</h1></div>)
                          }
                        </>
                      )
                      :
                      (null)
                    }
                    {contractdetail.status == "Delivered"
                      ?
                      (
                        <>
                          {user.username == contractdetail.seller
                            ?
                            (<div><h1>Produsul a fost livrat cumpărătorului. Suma a fost creditată în portofel. Aceasta va fi disponibilă pentru retragere după 3 zile. Dacă nu a fost raportată nici o problemă.</h1></div>)
                            :
                            (<div><h2 className={style.titlpag}>Produsul a fost livrat!
                              <i className="fa-solid fa-truck-ramp-box"></i></h2>
                              <Link href="/img/petrica.png" download="" className={style.downloadProd}>
                                <h3
                                  style={{

                                    cursor: "pointer",
                                    padding: "40px 20px",
                                    background: "#6657da",
                                    borderRadius: "10px",
                                    color: "#313131",
                                    textAlign: "center",
                                    fontFamily: `"DM Sans", sans-serif`,
                                    fontWeight: "900",
                                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                    border: "#6c5ce7 1px solid",
                                    marginBottom: "20px"
                                  }}>
                                  Click aici pentru a descărca produsul{" "}

                                </h3>
                              </Link>
                              <div className={style.card}>
                                <h3>
                                  Cum a fost experiența ta?
                                </h3>
                                <div className={style.rating}>
                                  <input value="star-1" name="star-radio" id="star-1" type="radio" />
                                  <label htmlFor="star-1">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
                                  </label>
                                  <input value="star-1" name="star-radio" id="star-2" type="radio" />
                                  <label htmlFor="star-2">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
                                  </label>
                                  <input value="star-1" name="star-radio" id="star-3" type="radio" />
                                  <label htmlFor="star-3">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
                                  </label>
                                  <input value="star-1" name="star-radio" id="star-4" type="radio" />
                                  <label htmlFor="star-4">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
                                  </label>
                                  <input value="star-1" name="star-radio" id="star-5" type="radio" />
                                  <label htmlFor="star-5">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
                                  </label>
                                </div>
                              </div>
                              <h3 className={style.raporttitle}>Raportează (opțional): </h3>
                              <h4 className={style.timprap}>
                                Timpul de raportare a unei probleme la acest produs este de{" "}
                                <span>23 de ore</span> și <span>59 de minute</span>
                              </h4>
                              <select name="" id="" className={style.raport}>
                                <option value="" selected hidden>
                                  Selectează motivul raportării
                                </option>
                                <option value="">Spam</option>
                                <option value="">Violență</option>
                                <option value="">Scam sau fraudă</option>
                                <option value="">Nuditate</option>
                                <option value="">Altceva</option>
                              </select>
                              <i className="fa-solid fa-arrow-right-long" id="sendraport" />
                              <br />
                              <Link href="/contracts">
                                <button>Încheie contractul</button>
                              </Link>
                              <h4 className={style.inccontr}>
                                <input type="checkbox" />
                                După încheierea contractului nu vei mai putea descărca acest produs.
                                Asigură-te că l-ai descărcat!
                              </h4></div>)
                          }
                        </>
                      )
                      :
                      (null)
                    }
                    {contractdetail.status == "Expired" || countdownElement == 'CEXPIRED'
                      ?
                      (<div><h1>Acest contract <span style={{ color: "6657DA" }}>a expirat.</span></h1></div>)
                      :
                      (null)
                    }

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
