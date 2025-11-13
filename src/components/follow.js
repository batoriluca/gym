import React, { useState, useEffect } from 'react';
import { getAxiosWithToken } from '@/axios/AxiosObj'

const Follow = ({ username, followBy, follower }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (Array.isArray(followBy)) {
      if (followBy.includes(follower)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [username, followBy, follower]);

  const followUser = async () => {
    try {
      const responseFollow = await getAxiosWithToken({
        method: 'POST',
        url: `user/follow/${username}`,
      });
      if (responseFollow.follows === true) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={() => followUser(username)}>
      {liked ? 'Nu mai urmări' : 'Urmărește'}
    </button>
  );
};

export default Follow;
