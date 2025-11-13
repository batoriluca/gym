"use client"
import style from '@/styles/login.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Image from 'next/image'
import { useState } from 'react';
import Link from 'next/link';
import { userLogin } from '@/store/slices/AuthSlice';
import { useDispatch } from "react-redux";
import { AppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { InputError } from '@/components/component';

const initialValues = {
  email: "",
  password: "",
}

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const loginSchema = Yup.object({
    email: Yup.string().required("Vă rugăm să introduceți adresa de e-mail / username-ul"),
    password: Yup.string().min(6, "Trebuie să conțină cel puțin 6 caractere").max(25).required("Vă rugăm să introduceți parola"),
  })
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,

    onSubmit: async (values, action) => {
      setLoading(true)
      const email = values.email;
      const password = values.password;
      const data = { email, password };
      const logStatus = await dispatch(userLogin(data));

      if (logStatus.payload.success) {
        router.push(`/${logStatus.payload.redirect}`)
      } else {
        toast.error(logStatus.payload.msg);
        setLoading(false)
      }
    }
  })

  return (
    <main>
      <div className={style.container}>
        <div className={style.sc1} id="ssc1" >
          <video autoPlay muted loop playsInline className={style.vidbg}>
            <source src="/img/log.mp4" type="video/mp4" />
          </video>
          <div className={style.intro} >
            <h3>Autentificare</h3>
            <form onSubmit={handleSubmit} autoComplete='false'>
              <input
                type="text"
                placeholder="Nume de utilizator"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email || ""}
                name='email'
              />
              <InputError error={errors.email} touched={touched.email} />
              <input
                type="password"
                placeholder="Parola"
                autoComplete="false"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password || ""}
                name='password'
              />
              <InputError error={errors.password} touched={touched.password} />
              <Link href={'/uitatparola'} className={style.frgtpw}>Ai uitat parola?</Link>
              {loading == true ? (<button type='submit' disabled className={`${style.action_btn} ${style.loading}`}></button>) : (<button type='submit' className={`${style.action_btn}`}>Autentifică-te</button>)}
            </form>
            <Link href="/">
              <Image width={200} height={200} src="/img/GYM_banner.png" className={style.logo} alt="Logo" />
            </Link>
            <p>pentru artisti &amp; producatori la inceput de drum</p>
          </div>
        </div>
      </div>
    </main>
  )
}
