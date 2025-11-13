"use client"
import React from 'react';
import style from "@/styles/postprofile.module.css";
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

const Postprf = ({ postDetails }) => {
    const route = useRouter();

    
   
    const { userDetails } = useSelector((state) => state.auth);

    

    let { _id, postid, username, user, textcontent, imagecontent, videocontent, likedBy, postdate, posttime } = postDetails;
    
    return (
        <div className={style.post} key={_id} style={{ backgroundImage: 'url(/img/cardshv2.png)', backgroundSize: 'cover' }}>
            <div className={style.ch}></div>
            
            {imagecontent == "" ? null : (<div className={style.post_cont} ><Image src={`/posts/${imagecontent}`} alt={textcontent || "Not Found"} width={600} height={500} onClick={() => { route.push(`/feed/${postid}`) }} /></div>)}
            {videocontent == "" ? null : (<div className={style.post_contvid} ><video src={`/posts/${videocontent}`}  loop muted preload="true" controlsList="nodownload" onClick={() => { route.push(`/feed/${postid}`) }} /></div>)}
            {videocontent == "" ? null : (<div className={style.post_contvid} ><video src={`/posts/${videocontent}`}  loop muted preload="true" controlsList="nodownload" onClick={() => { route.push(`/feed/${postid}`) }} /></div>)}
            {textcontent == "" ? null : (<div className={style.post_conttxt} ><h3 onClick={() => { route.push(`/feed/${postid}`) }}>{textcontent}</h3></div>)}
                
            
           
        </div>
    );
};

export default Postprf;
