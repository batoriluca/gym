"use client";
import * as Yup from 'yup'
import Image from 'next/image'
import { useFormik } from 'formik';
import { useState } from "react"
import style from '@/styles/createaccount.module.css'
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useDispatch } from "react-redux";
import { userCreate } from '@/store/slices/AuthSlice';
import { AppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';
import { InputError } from '@/components/component'

const initialValues = {
  email: "",
  username: "",
  password: "",
  cpassword: "",
}

export default function Home() {

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checkbox, setCheckbox] = useState(false)

  const handleClick = () => {
    if (checkbox) {
      setCheckbox(!checkbox)
    } else {
      setCheckbox(true)
    }
  }

  const registerSchema = Yup.object({
    email: Yup.string().email("Trebuie să fie un e-mail").required("Vă rugăm să introduceți ID-ul de e-mail"),
    username: Yup.string().min(3, "Trebuie să aibă cel puțin 3 caractere").max(10).required("vă rugăm să introduceți numele de utilizator"),
    password: Yup.string().min(6, "Trebuie să aibă cel puțin 6 caractere").max(25).required("te rog introdu parola"),
    cpassword: Yup.string().required("vă rugăm să introduceți confirmarea parolei").oneOf([Yup.ref("password")], "Ambele parole trebuie să se potrivească"),
  })

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,

    onSubmit: async (values) => {
      setLoading(true)
      if (!checkbox) {
        toast.error("please check the checkbox");
        setLoading(false)
        return null;
      }
      const username = values.username;
      const email = values.email;
      const password = values.password;
      const data = { username, email, password };

      try {
        const createStatus = await dispatch(userCreate(data));
        if (createStatus.payload.success) {
          toast.success(createStatus.payload.msg);
          router.push(`/${createStatus.payload.redirect}`)
        } else {
          toast.success(createStatus.payload.msg);
          setLoading(false)
        }
      } catch (e:any) {
        console.log(e)
        toast.error(e.response.data.msg);
        setLoading(false)
      }
      setLoading(false)
    }
  })

  return (
    <main>
      <div className={style.container}>
        <div className={style.sc1} id="ssc1" >
          <video autoPlay muted loop playsInline className={style.vidbg}>
            <source src="/img/log.mp4" type="video/mp4" />
          </video>
          <div className={style.intro}>
            <h3>Creează Cont</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email || ""}
                  name='email'
                  placeholder="Email"
                />
                <InputError error={errors.email} touched={touched.email} />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Nume de utilizator"
                  maxLength={10}
                  id="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username || ""}
                  name='username'
                />
                <InputError error={errors.username} touched={touched.username} />
              </div>
              <input
                type="password"
                id="password"
                name='password'
                autoComplete="password"
                placeholder="Parola"
                maxLength={20}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password || ""}
              />
              <InputError error={errors.password} touched={touched.password} />
              <input
                type="password"
                id="cpassword"
                name='cpassword'
                autoComplete="c-password"
                placeholder="Parola"
                maxLength={20}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cpassword || ""}
              />
              <InputError error={errors.cpassword} touched={touched.cpassword} />
              <div className={style.accepttc}>
                <div className={`${style.checkboxtc} ${checkbox ? style.active : ''}`} onClick={handleClick}></div>
                <p className={style.accepttc}>
                  Am citit & accept
                  <Link href={'/tc'} style={{ marginLeft: '5px' }}>
                    <u>termenii și condițiile</u>
                  </Link>
                </p>
              </div>
              {loading == true ? (<button type='submit' disabled className={`${style.action_btn} ${style.submitPayment} ${style.loading}`}></button>) : (<button type='submit' className={`${style.action_btn} ${style.submitPayment}`}>Creează cont</button>)}
            </form>
            <Link href="/">
              <Image src="/img/GYM_banner.png" alt='Logo' width={200} height={100} />
            </Link>
            <p>pentru artisti &amp; producatori la inceput de drum</p>
          </div>
        </div>
      </div>
    </main>
  )
}
