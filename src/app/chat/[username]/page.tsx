"use client"
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import style from '@/styles/chat.module.css'
import Userlist from '@/components/Userlist'
import Statusbar from '@/components/statusbar'
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation'
import { getUserDetails } from '@/function/user'
import { getAxiosWithToken } from '@/axios/AxiosObj'
import { toast } from 'react-toastify'

export default function Home({ params }: any) {
  const { userDetails }: any = useSelector((state: RootState) => state.auth);
  const divRef: any = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState({
    username: 'Loading...',
    email: 'Loading...',
    profilepic: 'astist.png'
  });
  const [receiverDetails, setReceiverDetails] = useState({
    username: 'Loading...',
    artistname: 'Loading...',
    profilepic: 'astist.png'
  });

  // Scroll Down
  const scrollDown = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
      divRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  // Scroll Top
  const scrollTop = () => {
    if (divRef.current) {
      divRef.current.scrollTop = 0;
      divRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }
  const [chats, setChats]: any = useState([]);
  const [msg, setMsg] = useState('');
  const [contextMessageId, setContextMessageId] = useState(null)

  useEffect(() => {
    setUser(userDetails);
    if (username === user.username) {
      route.push(`/chat`);
    }
  }, [userDetails]);

  const route = useRouter();

  const { username } = params
  useEffect(() => {
    if (username !== "Loading..." && username) {
      fetchUserDetails(username);
    } else {
      route.push(`/profile`);
    }

    if (username == user.username) {
      route.push(`/chat`);
    }

  }, [params]);

  const fetchUserDetails = async (username: any) => {
    if (username === user.username) {
      route.push(`/chat`);
    }
    try {
      const user = await getUserDetails(username);
      if (user == false) {
        return route.push(`/profile`);
      }
      await setReceiverDetails(user[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // This is for hide delete option
  useEffect(() => {
    function handleClickOutside(e: any) {
      setContextMessageId(null)
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [setContextMessageId])

  // This is for delete msg 
  async function handleDelete(_id: any) {
    console.log("Message :", _id);
  }

  // Show delete option to that chat
  const handleContextMenu = (event: any, messageId: any) => {
    event.preventDefault()
    setContextMessageId(messageId)
  }

  // Function for send message to user
  const sendMsg = async () => {
    if (msg && msg !== "" && msg !== " " && msg.trim() !== "") {
      const data = { msg }
      try {
        const response = await getAxiosWithToken({
          method: 'POST',
          url: `chat/${username}`,
          data: data
        });
        if (response.success) {
          setMsg('');
        } else {
          toast.error(response.msg)
        }
      } catch (error) {
        // Handle error or dispatch error-related actions here
        console.log(error);
      }

    }
  }

  // Function for fetch all the chat with this user
  const getChatss = async () => {
    try {
      const response = await getAxiosWithToken({
        method: 'GET',
        url: `chat/${username}`,
      });

      if (response.success) {
        setChats(response.chat);
      }
    } catch (error) {
      // Handle error or dispatch error-related actions here

      console.log(error);
    }

    scrollDown();
  }

  // Call the function 
  // getChatss();

  // Call the function 

  useEffect(() => {
    // scrollDown();
  }, [msg])

  useEffect(() => {
    const interval = setInterval(() => {
      getChatss();
      // scrollDown();

      if (username === user.username) {
        route.push(`/chat`);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);


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
            <Statusbar action={false} />
            {/* Status Bar */}
            <div className={style.feed_with_user}>
              <div className={style.feed_posts}>
                <div className={style.dm}>
                  <div className={style.user_info} >
                    <div className={style.left}>
                      <div className={style.profile_pic}>
                        <Image src={`/artist_img/${receiverDetails.profilepic}`} alt="" className={style.profileImg} width={100} height={100} />
                      </div>
                      <div className={style.info}>
                        <h1 className={style.artistname}>{receiverDetails.artistname || "Artist Name"}</h1>
                        <p className={style.username}>{receiverDetails.username || "Username"}</p>
                      </div>
                    </div>
                    <div className={style.gotoprofile}>
                      <Link href={`/profile/${receiverDetails.username}`}>
                        <h4>Vizitează profilul</h4>
                      </Link>
                    </div>
                  </div>
                  <div className={style.chat} ref={divRef} >
                    {chats.length > 0 ?
                      chats.map((chat: any) => {
                        const { _id, username, message, senttime, sentdate, type } = chat
                        const isOpen = contextMessageId === _id
                        return (
                          <>
                            <div
                              key={_id}
                              className={`message ${isOpen ? 'context-menu-open' : ''} ${style.newrow}`}
                            // onContextMenu={(event) => handleContextMenu(event, _id)}
                            // onBlur={() => setContextMessageId(null)}
                            // onFocus={() => setContextMessageId(_id)}
                            >
                              <div className={`${username == user.username ? `${style.sent}` : `${style.recived}`} ${style.msg_box}`}>
                                {type && type == "contract" ? (<p>{message}</p>) : (<p dangerouslySetInnerHTML={{ __html: message }}></p>)}
                                <h6 className={style.time}>{senttime}</h6>
                              </div>
                              {isOpen && (
                                <div className="context-menu">
                                  <button onClick={() => handleDelete(_id)}>Delete</button>
                                </div>
                              )}
                            </div>
                          </>
                        )
                      })
                      : <h4 style={{position: 'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', color: '#ffd218', textAlign:'center' }}>Nu ai nicio conversație cu {receiverDetails.username}</h4>
                    }
                  </div>
                  <div className={style.send_input} >
                    <input type="text" id="msgInput" className={style.msgInput} value={msg || ""} onChange={(e) => { setMsg(e.target.value) }} placeholder="Scrie aici" />
                    <i className="fas fa-paper-plane" id="sendmsg" onClick={sendMsg} />
                    {receiverDetails.username == "Loading..." ? (<i className="fas fa-file-signature" id="sendcon" />) : (<Link href={`/contract/create/${receiverDetails.username}`}>
                      <i className="fas fa-file-signature" id="sendcon" style={{color:'#ffd218'}} />
                    </Link>)
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
      </div>
    </main>
  )
}
