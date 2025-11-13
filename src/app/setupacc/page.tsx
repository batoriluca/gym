"use client"
import * as Yup from 'yup'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react'
import { FaSignOutAlt } from "react-icons/fa";
import style from '@/styles/setupacc.module.css'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getAxiosWithToken } from '@/axios/AxiosObj';
import secureLocalStorage from 'react-secure-storage';
import { setAccessToken, userLogOut } from '@/store/slices/AuthSlice';

const initialValues = {
  artistname: "",
  featurefee: "",
  description: "",
}

export default function SetUp() {

  const { userDetails }: any = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const logout = async () => {
    await dispatch(userLogOut())
  }

  const [username, setUsername] = useState("Loading...")

  const [image, setImage] = useState('')
  const [media, setMedia] = useState('')
  const [profileerror, setProfileerror] = useState("")

  const setupSchema = Yup.object({
    artistname: Yup.string().required("Vă rugăm să introduceți numele artistului").min(3, "Trebuie să aibă cel puțin 3 caractere").max(25, "Trebuie să aibă cel mult 10 caractere"),
    featurefee: Yup.number().required("Vă rugăm să introduceți taxa de colaborare").min(2, "Trebuie să aibă cel puțin 2 cifre"),
    description: Yup.string().min(15, "Trebuie să aibă cel puțin 15 caractere").max(150, "Trebuie să aibă cel puțin 150 caractere").required("Vă rugăm să ne spuneți despre dvs"),
  })

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setUsername(userDetails.username)
  }, [userDetails])

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: setupSchema,

    onSubmit: async (values, action) => {

      const artistname = values.artistname;
      const featurefee = values.featurefee;
      const description = values.description;

      const filenamea = await imageUpload();
      if (!filenamea) {
        toast.error("Vă rugăm să selectați mai întâi imaginea");
        return false;
      }

      const data = { artistname, description, featurefee, profile: filenamea };
      setLoading(true)
      try {
        const response = await getAxiosWithToken({
          method: 'PATCH',
          url: 'user',
          data: data,
        });
        if (response.success === true) {
          toast.success(response.msg);
          Cookies.set('p', response.p);
          secureLocalStorage.setItem('access', response.t);
          await dispatch(setAccessToken(response.t));
          router.push(`${response.redirect}`)
        } else {
          toast.error(response.msg)
          setLoading(false)
        }
      } catch (error) {
        // Handle error or dispatch error-related actions here
        toast.error("Ceva n-a mers bine. Vă rugăm să încercați din nou");
        console.log(error);
        setLoading(false)
      }

    }
  })
  const handleImageChange = (event: any) => {
    if (event.target.files[0]) {
      const selectedImage = event.target.files[0];

      // Check if the file size is less than or equal to 5MB (5242880 bytes)
      if (selectedImage.size <= 5242880) {
        // Check if the file type is an image (jpeg, jpg, or png)
        if (selectedImage.type.includes('image/jpeg') || selectedImage.type.includes('image/jpg') || selectedImage.type.includes('image/png')) {
          const imageUrl = URL.createObjectURL(selectedImage);
          setMedia(selectedImage);
          setImage(imageUrl);
          setProfileerror(''); // Reset any previous error message
        } else {
          setProfileerror('Sunt permise doar imagini jpeg, jpg și png');
          toast.error('Sunt permise doar imagini jpeg, jpg și png');
        }
      } else {
        setProfileerror('Dimensiunea imaginii trebuie să fie mai mică de 5 MB');
        toast.error('Dimensiunea imaginii trebuie să fie mai mică de 5 MB');
      }
    }
  };

  const imageUpload = async () => {
    if (media !== '') {
      const data = new FormData()
      data.append('profile', media)
      try {
        const response: any = await fetch(`${process.env.API_URL}/user/profile`, {
          method: 'POST',
          body: data,
          headers: {
            Authorization: 'Bearer ' + secureLocalStorage.getItem('access'),
          },
        })
        const responseData = await response.json();
        if (responseData.success = true) {
          return responseData.fileName
        } else {
          toast.error("Vă rugăm să încercați din nou!");
          setProfileerror("Vă rugăm să încercați din nou!")
          return false;
        }
      } catch (error) {
        // Handle error or dispatch error-related actions here
        toast.error("Ceva n-a mers bine. Vă rugăm să încercați din nou");
        console.log(error);
        return false;
      }
    } else {
      setProfileerror("Vă rugăm să selectați mai întâi imaginea")
      toast.error("Vă rugăm să selectați mai întâi imaginea");
    }
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
          <div className={style.content_contanier}>
            <div className={style.status_bar}>
              <div className={style.greets_to_user}>
                <p>Hello, {username.charAt(0).toUpperCase() + username.slice(1)}</p>
              </div>
              <div className={style.sidebar_icon}>
                <FaSignOutAlt onClick={logout} />
              </div>
            </div>
            <div className={style.feed_with_user}>
            <div className={style.profile_bar_resp} >
                <div className={style.div_info2}>
                  <Image src={image !== '' ? (`${image}`) : (`/artist_img/userprofile.png`)} alt="" className={style.imgBg} width={400} height={400} priority={true} />
                  <Image src={image !== '' ? (`${image}`) : (`/artist_img/userprofile.png`)} alt="" className={style.imgPrinc} width={400} height={400} priority={true} />
                </div>
                <div className={style.div_infos}>
                  <div className={`${style.div_info} ${style.artistname}`}>
                    <h1 className={style.h12}>{values.artistname || "Numele artistului"}</h1>
                    <h1 className={style.h11}>{values.artistname || "Numele artistului"}</h1>
                  </div>
                  <div className={`${style.div_info} ${style.div_inf}`}>
                    <p className={style.username}>
                      @{username}
                    </p>
                  </div>
                  <div className={`${style.div_info} ${style.div_inf}`}>
                    <p>Preț de colaborare:</p>
                    <h2>{values.featurefee || 0} RON</h2>
                  </div>
                  <div className={`${style.div_info} ${style.div_inf}`}>
                    <p>Descriere:</p>
                    <h6>{values.description || "Spune ceva despre tine"}</h6>
                  </div>
                </div>
              </div>
              <div className={style.feed_posts}>
                <div className={style.dm}>
                  <form onSubmit={handleSubmit} method="POST">
                    <div className={style.r_side}>
                      <div className={style.changeimg_input} >
                        
                        <h1>Imaginea de profil</h1>
                        <input
                          style={{ display: "none" }}
                          type="file"
                          name="imgInput"
                          id="fileInputImg"
                          onChange={handleImageChange}
                          accept="image/png, image/jpeg, image/jpg"
                        />
                        <label htmlFor="fileInputImg">
                          <h2 style={{ cursor: "pointer" }}>Apasă aici pentru a schimba imaginea </h2>
                        </label>
                        {profileerror ? <p className={style.from_error}>{profileerror}</p> : null}
                      </div>
                      <div className={style.all_inputs} >
                        <div className={style.artistname_input}>
                          <h1>Nume de scenă</h1>
                          <input
                            type="text"
                            placeholder="Schimbă numele de scenă"
                            id="artistname"
                            name='artistname'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.artistname || ""}
                          />
                          {errors.artistname && touched.artistname ? <p className={style.from_error}>{errors.artistname}</p> : null}
                        </div>
                        <div className={style.featurefee_input}>
                          <h1>Preţ de colaborare</h1>
                          <input
                            type="number"
                            placeholder="Schimbă preţul de colaborare"
                            className={style.featurefee}
                            id="featurefee"
                            name='featurefee'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.featurefee || ""}
                          />
                          {errors.featurefee && touched.featurefee ? <p className={style.from_error}>{errors.featurefee}</p> : null}
                        </div>
                        <div className={style.artistname_input}>
                          <h1>Descriere</h1>
                          <textarea
                            placeholder="Schimbă descrierea"
                            id="description"
                            name='description'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description || ""}
                          />
                          {errors.description && touched.description ? <p className={style.from_error}>{errors.description}</p> : null}
                        </div>
                        
                      </div>
                      <div className={style.savechanges}>
                          {loading == true ? (<button type='submit' disabled className={`${style.action_btn} ${style.loading}`}></button>) : (<button type='submit' className={`${style.action_btn}`}>Salvează</button>)}
                        </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className={style.profile_bar} >
                <div className={style.div_info2}>
                  <Image src={image !== '' ? (`${image}`) : (`/artist_img/userprofile.png`)} alt="" className={style.imgBg} width={400} height={400} priority={true} />
                  <Image src={image !== '' ? (`${image}`) : (`/artist_img/userprofile.png`)} alt="" className={style.imgPrinc} width={400} height={400} priority={true} />
                </div>
                <div className={style.div_infos}>
                  <div className={`${style.div_info} ${style.artistname}`}>
                    <h1 className={style.h12}>{values.artistname || "Numele artistului"}</h1>
                    <h1 className={style.h11}>{values.artistname || "Numele artistului"}</h1>
                  </div>
                  <div className={`${style.div_info} ${style.div_inf}`}>
                    <p className={style.username}>
                      @{username}
                    </p>
                  </div>
                  <div className={`${style.div_info} ${style.div_inf}`}>
                    <p>Preț de colaborare:</p>
                    <h2>{values.featurefee || 0} RON</h2>
                  </div>
                  <div className={`${style.div_info} ${style.div_inf}`}>
                    <p>Descriere:</p>
                    <h6>{values.description || "Spune ceva despre tine"}</h6>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  )
}
