"use client"
import React from "react";
import style from "@/styles/userlist.module.css";
import Image from 'next/image'
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { getChats } from '@/function/chats'
import { useSelector } from 'react-redux';
import { LoaderS } from '@/components/loader';

const UserList = () => {

  const { userDetails } = useSelector((state) => state.auth);
  const [chats, setChats] = useState([]);
  const route = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      getChatss();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getChatss = async () => {
    const chats = await getChats();
    if (chats.success == true) {
      setChats(chats.chats);
    } else {
      setChats([])
    }
  }

  const handleChat = async (username) => {
    const receiver = username
    route.push(`${process.env.URL}/chat/${receiver}`);
  }

  return (
    <div className={style.profile_bar} >
      <div className={style.frow}>
        <h5>Listă Contacte</h5>
      </div>
      <ul className={style.ul_list}>
        {chats.length > 0 ? (
          chats.map((chat) => {
            const { _id, receiver, sender, receiverr, senderr, lastmessage, seenmessage } = chat;
            let chatwith = "";
            let profilepic = "";
            let artistname = "";
            let seenCheck = false;

            if (sender == userDetails.username) {
              seenCheck = seenmessage.sender
              chatwith = receiver
              profilepic = receiverr.profilepic;
              artistname = receiverr.artistname;
            } else {
              seenCheck = seenmessage.receiver
              profilepic = senderr.profilepic;
              artistname = senderr.artistname;
              chatwith = sender
            }

            return (
              <li className={`${!seenCheck ? `${style.notif}` : ''}`} key={_id.toString()} onClick={() => handleChat(chatwith)} >
                <div className={style.ch}></div>
                <Image src={`/artist_img/${profilepic}`} srcSet={`/artist_img/${profilepic}`} alt="ds" className={style.profileImg} width={100} height={100} />
                <div className={style.message}>
                  <h1 className={style.artistname}>{artistname}</h1>
                  <p>{lastmessage}</p>
                </div>
              </li>
            )
          })

        ) : (
          <li className={style.send}>
            <LoaderS />
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
