"use client"
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import style from '@/styles/newchat.module.css'
import Statusbar from '@/components/statusbar'
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { getAxiosWithToken } from '@/axios/AxiosObj';
import Userlist from '@/components/Userlist'
import { useSelector } from 'react-redux'

export default function Home() {
  const { userDetails } = useSelector((state: any) => state.auth);
  const [searchedUser, setSearchedUser]: any = useState([]);
  const [searchedUser2, setSearchedUser2]: any = useState([]);

  const handleSearchUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchUser = e.target.value.trim();

    if (searchUser.length > 2) {
      try {
        const response = await getAxiosWithToken({
          method: 'GET',
          url: `user?search=${searchUser}`,
        });

        if (response.success) {
          setSearchedUser(response.data);
        } else {
          setSearchedUser([]);
        }
      } catch (error) {
        // Handle error or dispatch error-related actions here
        setSearchedUser([]);
        console.log(error);
      }
    } else {
      setSearchedUser([]);
    }
  };

  useEffect(() => {
    if (searchedUser.length !== 0 && userDetails && userDetails.username) {
      const filteredSearchedUser = searchedUser.filter((user: any) => user.username !== userDetails.username);
      setSearchedUser2(filteredSearchedUser)
    } else {
      setSearchedUser2(searchedUser)
    }
  }, [searchedUser, userDetails])

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
            {/* Status Bar */}
            <Statusbar action={false} />
            {/* Status Bar */}
            <div className={style.feed_with_user}>
              <div className={style.feed_posts}>
                <div className={style.dm}>
                  <div className={style.searchbox} >
                    <div className={style.search_input}>
                      <input
                        type="text"
                        name="userSeach"
                        onChange={handleSearchUser}
                        placeholder='Explorează'
                        className={style.searchInput}
                      />
                    </div>
                    <div className={style.search_icon}>
                      <AiOutlineSearch />
                    </div>
                  </div>
                  <h1 className={style.results_title}>
                    Rezultate
                  </h1>
                  <div className={style.results} >
                    <ul>
                      {searchedUser2.length > 0 ? (
                        searchedUser2.map((seacherUser: any) => {
                          return (
                            <li key={seacherUser.username} style={{ backgroundImage: 'url(/img/cardshv2.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                              <div className={style.ch}></div>
                              <div className={style.left_side}>
                                <Image src={`/artist_img/${seacherUser.profile}`} alt="" width={200} height={200} className={style.user_profileimg} />
                                <div className={style.user_data}>
                                  <h3 className={style.user_stagename}>{seacherUser.artistname}</h3>
                                  <p className={style.user_username}>{seacherUser.username}</p>
                                </div>
                              </div>
                              <div className={style.right_side}>
                                <Link href={`/profile/${seacherUser.username}`}>Profil</Link>
                                <Link href={`/chat/${seacherUser.username}`}>Mesaj</Link>
                              </div>
                            </li>
                          )
                        })
                      ) : (
                        <p className={style.nouser}>Explorează conturile altor utilizatori și începe colaborările!</p>
                      )}
                    </ul>
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
