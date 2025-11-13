"use client"
import React from "react";
import style from "@/styles/statusbar.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from 'react-redux';

const StatusBar = ({ action = true }) => {

  const { userDetails } = useSelector((state) => state.auth);
  const [actions, setActions] = useState();
  const [userDetailass, setUserDetailass] = useState({ "username": "Loading...", profilepic: "profile.png" });

  useEffect(() => {
    setActions(action);
  }, [action]);
  
  useEffect(() => {
    setUserDetailass(userDetails);
  }, [userDetails]);

  return (
    <div className={style.status_bar}>
      <div className={style.greets_to_user}>
        <p style={{ textTransform: "capitalize" }}>{userDetailass ? `Hello, ${userDetailass?.artistname || 'Artist'}` : 'Hello, Artist'}</p>
      </div>
      <div className={style.container_searchbar}>
        {actions ? (
          
          <a className={style.searchbox} href="http://localhost:3000/chat">
          <AiOutlineSearch />
          <h3>Explorează</h3>
        </a>
        ) : null}
        <div className={style.user_btns}>
          <Link href={`${process.env.URL}/news`}>
            {" "}
            <IoMdNotifications />
          </Link>
          <div className={style.user_pic}>
            <Link href={`${process.env.URL}/profile/${userDetailass.username}`}>
              <Image
                src={`/artist_img/${userDetailass?.profilepic}`}
                srcSet={`/artist_img/${userDetailass?.profilepic}`}
                className={style.profileimg}
                alt="Not Found"
                width={100}
                height={100}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
