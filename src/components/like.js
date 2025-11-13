"use client"
import React, { useState, useEffect } from 'react';
import style from '../styles/feed.module.css';
import { PostLike } from '@/function/post'

const Like = ({ postid = '', likedBy, username }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(false);

  useEffect(() => {
    if (Array.isArray(likedBy)) {
      if (likedBy.includes(username)) {
        setLikes(true);
      } else {
        setLikes(false);
      }
    }
  }, [username, likedBy]);

  const likePost = async (postid) => {
    // const data = { postid };

    const likeAction = await PostLike(postid);
    // console.log(likeAction);
    // return null;
    if (likeAction.liked == true) {
      setLiked(true);
    } else {
      setLiked(false);
    }

    if (Array.isArray(likedBy)) {
      if (likedBy.includes(username)) {
        setLikes(true);
      } else {
        setLikes(false);
      }
    }
  };

  return (
    <div className={`${style.like_btn} ${liked ? style.liked : likes ? style.liked : ''}`}
      onClick={() => likePost(postid)}
    >
      <i className="fa-solid fa-volume-high" />
    </div>
  );
};

export default Like;
