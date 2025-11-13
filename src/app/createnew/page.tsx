"use client"
import Head from 'next/head'
import style from '@/styles/createnew.module.css'
import Navbar from '@/components/navbar'
import { useState, useEffect } from 'react'
// import Userlist from '@/components/userlist'
import Statusbar from '@/components/statusbar'
import { BiArrowBack } from "react-icons/bi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAxiosWithToken } from '@/axios/AxiosObj'
import { getRefreshToken } from '@/function/auth'
import Userlist from '@/components/Userlist'
import secureLocalStorage from 'react-secure-storage'

export default function Home(props: any) {

  const { userDetails }: any = useSelector((state: RootState) => state.auth);

  const router = useRouter();
  const [videopost, setVideoPost] = useState(false)
  const [postProcess, setPostProcess] = useState(false)
  const [imgpost, setImgPost] = useState(false)
  const [textpost, setTextPost] = useState(false)
  const [allpost, setAllPost] = useState(true)

  const [textContent, setTextContent] = useState(null)

  // Preview URL
  let [image, setImage] = useState("")
  let [video, setVideo] = useState("")

  const [media, setMedia] = useState('')
  const [mediaeerror, setMediaerror] = useState("")

  const [user, setUser]: any = useState({});

  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);

  const hanlderClick = (e: any) => {
    // Set the appropriate post type
    setTextPost(e.target.name === 'text');
    setVideoPost(e.target.name === 'video');
    setImgPost(e.target.name === 'img');
    setAllPost(false);
    setTextContent(null);

    // if (e.target.name == "text") {
    //   setTextpost(true)
    //   setAllPost(false)
    //   setTextContent(null)
    // } else if (e.target.name == "video") {
    //   setVideoPost(true)
    //   setAllPost(false)
    //   setTextContent(null)
    // } else if (e.target.name == "img") {
    //   setAllPost(false)
    //   setImgpost(true)
    //   setTextContent(null)
    // }
  }
  useEffect(() => {
    // Call getRefreshToken initially
    getRefreshToken();

    // Set up the interval to call getRefreshToken every 9 minutes
    const intervalId = setInterval(() => {
      getRefreshToken();
    }, 9 * 60 * 1000); // 9 minutes in milliseconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const hanlderClickBack = () => {
    setVideoPost(false)
    setImgPost(false)
    setTextPost(false)
    setAllPost(true)
    setTextContent(null)
    setVideo("")
    setImage("")
  }

  // give value to var
  const handleChange = (e: any) => {
    if (e.target.name === "textContent") {
      setTextContent(e.target.value);
    }
  }

  // Set image 
  const handleImageChange = (event: any) => {
    // 2 MB
    if (event.target.files[0].size <= 2097152) {
      if (event.target.files[0].type.includes('image')) {
        // Set selected image and its URL
        const selectedImage = event.target.files[0];
        const imageUrl = URL.createObjectURL(selectedImage);
        setMedia(selectedImage);
        setImage(imageUrl);
      } else {
        setMediaerror("Only jpeg, jpg and png images are allowed")
        toast.error("Only Image is allowed");
      }
    } else {
      setMediaerror("Image size should be less than 2 MB")
      toast.error("Image size should be less than 2 MB");
    }
  }

  // Set video
  const handleVideoChange = (event: any) => {
    // 100 MB
    if (event.target.files[0].size <= 104857600) {
      if (event.target.files[0].type.includes('video')) {
        // Set selected video and its URL
        const selectedVideo = event.target.files[0];
        const videoUrl = URL.createObjectURL(new Blob([selectedVideo], { type: 'video/mp4' }));
        setMedia(selectedVideo);
        setVideo(videoUrl);
      } else {
        setMediaerror("Videos are allowed")
        toast.error("Only video is allowed");
      }
    } else {
      setMediaerror("Video size should be less than 100 MB")
      toast.error("Video size should be less than 100 MB");
    }
  }

  // Upload image in the file 
  const mediaUpload = async () => {
    if (media && media !== '') {
      const data = new FormData();
      data.append('media', media);
      try {
        const response: any = await fetch(`${process.env.API_URL}/post/media`, {
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

  // Handle the Post
  const hanldePost = async () => {
    let data = { textContent, image, video }

    // This is Text Post 
    if (textpost == true) {
      if (textContent == null) {
        toast.error('Please fill required field');
        return null;
      }
      data.textContent = textContent;
    }

    if (imgpost == true) {
      if (image == '') {
        toast.error('Please fill required field');
        return null;
      }
      const uploadedImage = await mediaUpload();
      if (uploadedImage == false) {
        toast.error("Vă rugăm să selectați mai întâi imaginea");
        return false;
      }
      data.image = uploadedImage;
    }

    if (videopost == true) {
      if (video == '') {
        toast.error('Please fill required field');
        return null;
      }
      const uploadedVideo = await mediaUpload();
      // const uploadedVideo = '';
      if (uploadedVideo == false) {
        toast.error("Vă rugăm să selectați mai întâi imaginea");
        return false;
      }
      data.video = uploadedVideo;
    }

    // console.log(data)
    try {
      setPostProcess(true)
      const response = await getAxiosWithToken({
        method: 'POST',
        url: 'post',
        data: data,
      });
      if (response.success === true) {
        toast.success(response.msg);
        router.push('/feed');
      } else {
        toast.error(response.msg)
        setPostProcess(false)
      }
    } catch (error) {
      // Handle error or dispatch error-related actions here
      toast.error("Ceva n-a mers bine. Vă rugăm să încercați din nou");
      console.log(error);
      setPostProcess(false)
    }
    setPostProcess(false)
  }

  return (
    <main>
      <div id="sc1" className={style.sc1}style={{backgroundImage: 'url(/img/bh3.png)', backgroundSize: '300px 600px', backgroundRepeat:'repeat'}}>
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
                  {allpost && <div className={style.p1}>
                    <h1>Selectează tipul de postare:</h1>
                    <div className={style.options}>
                      <div className={`${style.option} ${style.video_card}`} >
                        
                        <div className={style.card_cont}>
                          <h2>VIDEO</h2>
                          <p>
                            Postează un video pentru a le arăta și celorlalți utilizatori o
                            parte din viitoarele tale proiecte.
                          </p>
                          <button id="selectVid" name='video' onClick={hanlderClick}>Selectează</button>
                          <i className="fa-solid fa-video" />
                        </div>
                      </div>
                      <div className={`${style.option} ${style.text_card}`} >
                      
                        <div className={style.card_cont}>
                          <h2>TEXT</h2>
                          <p>
                            Împărtășește-ți gândurile cu alți utilizatori prin postarea text.
                          </p>
                          <button id="selectTxt" name='text' onClick={hanlderClick}>Selectează</button>
                          <i className="fa-solid fa-quote-left" />
                        </div>
                      </div>
                      <div className={`${style.option} ${style.img_card}`} >
                      
                        <div className={style.card_cont}>
                          <h2>IMAGINE</h2>
                          <p>
                            Postează o imagine pentru a le arăta și altor utilizatori momente din
                            cariera ta muzicală.
                          </p>
                          <button id="selectImg" name='img' onClick={hanlderClick}>Selectează</button>
                          <i className="fa-solid fa-camera" />
                        </div>
                      </div>
                    </div>
                  </div>}

                  {videopost && <div className={style.video_post}>

                    <div className={style.post} id="postCreate">
                      <div className={style.fullpost} style={{ backgroundImage: 'url(/img/patr.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className={style.user_detcontent}>
                          <div className={style.user_details}>
                            <Image src={`/artist_img/${user.profilepic}`} alt="" className={style.profileimg} width={100} height={100} />

                            <div className={style.user_name}><b>{user.username}</b></div>
                          </div>
                        </div>
                        <div className={style.post_cont}>
                          <input
                            type="file"
                            name="videoInput"
                            id="fileInput"
                            onChange={handleVideoChange}
                            accept="video/mp4,video/x-m4v,video/*"
                          />
                          <label htmlFor="fileInput">
                            <i className="fa-solid fa-circle-plus" />
                          </label>
                          <video
                            preload="auto"
                            controlsList="nodownload"
                            disablePictureInPicture={true}
                            className="fixed-aspect-ratio"
                            id="videoP"
                            src={video}
                          />
                        </div>
                        <div className={style.post_info}>
                          <textarea
                            placeholder="Scrie aici ceva..."
                            rows={2}
                            name='textContent'
                            id='videotext'
                            onChange={handleChange}
                            value={textContent || ""}
                          />
                        </div>

                      </div>
                    </div>
                    {postProcess ? <div className={style.submit_btn} > Se creează postarea</div> : <input type="submit" onClick={hanldePost} className={style.submit_btn} value="Creează postarea" id="vidPostSubmit" />}
                    {postProcess ? <button title='Posting....'>Alege alt tip de postare</button> : <button onClick={hanlderClickBack}>Alege alt tip de postare</button>}
                  </div>}

                  {textpost && <div className={style.text_post}>
                    <div className={style.post} id="postCreate">
                      <div className={style.fullpost} style={{ backgroundImage: 'url(/img/patr.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className={style.user_detcontent}>
                          <div className={style.user_details}>
                            <Image src={`/artist_img/${user.profilepic}`} alt="" className={style.profileimg} width={100} height={100} />
                            <div className={style.user_name}><b>{user.username}</b></div>
                          </div>
                        </div>
                        <div className={`${style.post_info} ${style.post_info1}`}>
                          <textarea
                            placeholder="Scrie aici ceva..."
                            rows={10}
                            onChange={handleChange}
                            value={textContent || ""}
                            name='textContent'
                            id='textContent'
                          />
                        </div>

                      </div>
                    </div>
                    {postProcess ? <div className={style.submit_btn} > Se creează postarea</div> : <input type="submit" onClick={hanldePost} className={style.submit_btn} defaultValue="Creează postarea" id="txtPostSubmit" />}
                    {postProcess ? <button title='Posting....'>Alege alt tip de postare</button> : <button onClick={hanlderClickBack}>Alege alt tip de postare</button>}
                  </div>}

                  {imgpost && <div className={style.img_post}>


                    <div className={style.post} id="postCreate">
                      <div className={style.fullpost} style={{ backgroundImage: 'url(/img/patr.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className={style.user_detcontent}>
                          <div className={style.user_details}>
                            <Image src={`/artist_img/${user.profilepic}`} alt="" className={style.profileimg} width={100} height={100} />
                            <div className={style.user_name}>{user.username}</div>
                          </div>
                        </div>
                        <div className={style.post_cont}>
                          <input
                            type="file"
                            name="imgInput"
                            id="fileInputImg"
                            onChange={handleImageChange}
                            accept="image/png, image/jpeg, image/jpg"
                          />
                          <label htmlFor="fileInputImg">
                            <i className="fa-solid fa-circle-plus" />
                          </label>
                          <div className={style.image}>
                            {image ? (<Image src={image} alt="" id="imgP" width={100} height={100} />) : (null)}
                          </div>
                        </div>
                        <div className={style.post_info}>
                          <textarea
                            placeholder="Scrie aici ceva..."
                            rows={2}
                            onChange={handleChange}
                            value={textContent || ""}
                            name='textContent'
                            id='imagetext'
                          />
                        </div>

                      </div>
                    </div>
                    {postProcess ? <div className={style.submit_btn} > Se creează postarea</div> : <input type="submit" onClick={hanldePost} className={style.submit_btn} value="Creează postarea" id="imgPostSubmit" />}
                    {postProcess ? <button title='Posting....' >Alege alt tip de postare</button> : <button onClick={hanlderClickBack}>Alege alt tip de postare</button>}
                  </div>}

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
