"use client"
import * as Yup from 'yup'
import style from '@/styles/forgotpw.module.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { getAxiosWithToken } from '@/axios/AxiosObj';

const initialValues = {
  password: "",
  cpassword: "",
}

export default function Home() {
  // Find User Account 
  const [findUser, setFindUser] = useState(false)
  const [userList, setUserList] = useState(false)
  const [username, setUsername] = useState("")
  const [userDetails, setUserDetails]: any = useState([])
  const router = useRouter();
  const [verifyCode, setVerifyCode] = useState(false)
  const [verifyFode, setVerifyFode] = useState()

  const [passwordChange, setPasswordChange] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (findUser == false && userList == false && verifyCode == false && passwordChange == false) {
      setFindUser(true)
    }
  }, [])

  // give value to var
  const NhandleChange = (e: any) => {
    if (e.target.name = "username") {
      setUsername(e.target.value);
    }
  }
  const NhdandleChange = (e: any) => {
    if (e.target.name = "verifyFode") {
      setVerifyFode(e.target.value);
    }
  }

  const findUserAccount = async () => {
    if (username !== "" && username !== " ") {
      const data = { username: username, fuction: "finduser" }
      setLoading(true)
      const response = await getAxiosWithToken({
        method: 'POST',
        url: `auth/forgetpwd`,
        data: data
      });
      if (response.success == true) {
        setLoading(false)
        setUserList(true)
        setFindUser(false)
        setUserDetails(response.userdetail);
        toast.success('Detalii utilizator găsite');
      } else {
        setLoading(false)
        toast.error(response.msg);
      }
    } else {
      setLoading(false)
      toast.error('Vă rugăm să introduceți adresa dvs. de e-mail sau numele de utilizator');
    }
  }
  const selectUser = async () => {
    if (username !== "" && username !== " ") {
      const data = { username: username, fuction: "sendemail" }
      const response = await getAxiosWithToken({
        method: 'POST',
        url: `auth/forgetpwd`,
        data: data
      });
      if (response.success == true) {
        setUserList(false)
        setVerifyCode(true)
        toast.success('Codul de verificare a fost trimis pe e-mail');
      } else {
        toast.error(response.msg);
      }
    } else {
      toast.error('Vă rugăm să introduceți adresa dvs. de e-mail sau numele de utilizator');
    }
  }
  const verifyEMail = async () => {
    if (username !== "" && username !== " " && verifyFode !== "" && verifyFode !== " ") {
      const data = { username: username, fuction: "verifycode", verify_code: verifyFode }
      const response = await getAxiosWithToken({
        method: 'POST',
        url: `auth/forgetpwd`,
        data: data
      });
      if (response.success == true) {
        setVerifyCode(false)
        setPasswordChange(true)
        toast.success('Codul de verificare a fost potrivit');
      } else {
        toast.error(response.msg);
      }
    } else {
      toast.error('Vă rugăm să introduceți adresa dvs. de e-mail sau numele de utilizator');
    }
  }

  const changePwdSchema = Yup.object({
    password: Yup.string().min(6, "It must be at least 6 char").max(25).required("Please Enter Password"),
    cpassword: Yup.string().required("Please Enter Confirm Password").oneOf([Yup.ref("password")], "Both password must be match"),
  })

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: changePwdSchema,

    onSubmit: async (values, action) => {
      setLoading(true)
      const password = values.password;
      const data = { username: username, fuction: "newpassword", password: password }
      const response = await getAxiosWithToken({
        method: 'POST',
        url: `auth/forgetpwd`,
        data: data
      });
      if (response.success == true) {
        toast.success('Parola dvs. a fost schimbată.');
        router.push("/autentificare")
      } else {
        toast.error(response.msg);
      }
    }
  })

  return (
    <main>
      <div className={style.container}>
      <div className={style.sc1} id="ssc1" >  
          <video autoPlay muted loop playsInline className={style.vidbg}>         
            <source src="/img/log.mp4" type="video/mp4"/>       
          </video>
          <div className={style.intro}>
            {findUser ? (
              <>
                <h3>Găsește-ți Contul</h3>
                <input
                  type="text"
                  placeholder="introduceți adresa dvs. de e-mail sau numele de utilizator"
                  id="username"
                  name='username'
                  onChange={NhandleChange}
                  value={username || ""}
                />
                {loading == true ? (<button type='submit' disabled className={`${style.action_btn} ${style.loading}`}></button>) : (<button type='submit' onClick={findUserAccount} className={`${style.action_btn}`}>Găsește</button>)}
              </>
            ) : (null)
            }
            {verifyCode ? (
              <>
                <h3>Introduceți codul de verificare</h3>
                <input
                  type="text"
                  placeholder="Cod de verificare"
                  id="verifyFode"
                  name='verifyFode'
                  onChange={NhdandleChange}
                  value={verifyFode || ""}
                />
                {loading == true ? (<button type='submit' disabled className={`${style.action_btn} ${style.loading}`}></button>) : (<button type='submit' onClick={verifyEMail} className={`${style.action_btn}`}>Mai departe</button>)}
              </>
            ) : (null)
            }
            {userList ? (
              <div className={style.UserList}>
                <h3>Selectați contul</h3>
                <br />
                <div className={style.UserBox} style={{ cursor: "pointer" }} onClick={selectUser}>
                  <div className={style.ProfileBox}>
                    <Image src={`/artist_img/${userDetails.profilepic}`} alt="" priority width={120} height={120} className={style.profileimg} />
                  </div>
                  <span>{userDetails.username}</span>
                </div>
              </div>
            ) : (null)
            }
            {passwordChange ? (
              <form onSubmit={handleSubmit}>
                <h3>Resetare Parolă</h3>
                <input
                  type="password"
                  placeholder="Parola Nouă"
                  id="password"
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password || ""}
                />
                {errors.password && touched.password ? <p className={style.from_error}>{errors.password}</p> : null}
                <input
                  type="password"
                  placeholder="Confirmă Parola Nouă"
                  id="cpassword"
                  name='cpassword'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cpassword || ""}
                />
                {errors.cpassword && touched.cpassword ? <p className={style.from_error}>{errors.cpassword}</p> : null}
                {loading == true ? (<button type='submit' disabled className={`${style.action_btn} ${style.submitPayment} ${style.loading}`}></button>) : (<button type='submit' className={`${style.action_btn} ${style.submitPayment}`}>Resetează Parola</button>)}
              </form>
            ) : (null)
            }
            <Link href="/">
              <Image width={200} height={200} src="/img/GYM_banner.png" className={style.logo} alt="" />
            </Link>
            <p>pentru artisti &amp; producatori la inceput de drum</p>
          </div>
        </div>
      </div>
    </main>
  )
}