"use client";
import * as Yup from 'yup'
import Image from 'next/image'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import style from '@/styles/emailverif.module.css'
import { AppDispatch, RootState } from '@/store/store';
import { getAxiosWithToken } from '@/axios/AxiosObj';
import Cookies from 'js-cookie';
import secureLocalStorage from 'react-secure-storage';
import { setAccessToken } from '@/store/slices/AuthSlice';

const initialValues = {
  verif_code: "",
}

export default function Home(props: any) {

  const { userDetails }: any = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState()
  useEffect(() => {
    setEmail(userDetails.email)
  }, [userDetails])

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const veritySchema = Yup.object({
    verif_code: Yup.number().integer("Trebuie să fie un număr!").min(5, "Trebuie să conțină cel puțin 5 cifre").required("Vă rugăm să introduceți codul de verificare"),
  })

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: veritySchema,

    onSubmit: async (values, action) => {

      setLoading(true)
      const data = { verif_code: values.verif_code }

      try {
        const response = await getAxiosWithToken({
          method: 'POST',
          url: 'auth/emailverif',
          data: data,
        });
        if (response.success == true) {
          toast.success(response.msg)
          Cookies.set('p', response.p);
          secureLocalStorage.setItem('access', response.t);
          await dispatch(setAccessToken(response.t));
          router.push('/payment')
          action.resetForm();
        } else {
          toast.error(response.msg)
          setLoading(false)
        }
      } catch (error) {
        // Handle error or dispatch error-related actions here
        console.log(error)
        setLoading(false)
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
            <h3>Creează Cont</h3>
            <h6>Am trimis un cod de verificare la adresa de email: {email}</h6>
            <form onSubmit={handleSubmit}>
              {/* <div>
                <p>GYM-</p> */}
              <input
                type="number"
                maxLength={6}
                placeholder="Cod de verificare"
                id="verif_code"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.verif_code || ""}
                name='verif_code'
              />
              {/* </div> */}
              {errors.verif_code && touched.verif_code ? <p className={style.from_error}>{errors.verif_code}</p> : null}
              {loading == true ? (<button type='submit' disabled className={`${style.action_btn} ${style.loading}`}></button>) : (<button type='submit' className={`${style.action_btn}`}>Verifică codul</button>)}

              <p style={{ marginTop: "30px" }} >Resend</p>
            </form>
            <Image src="/img/gym_banner.png" className={style.logo} alt="" width={100} height={100} />
            <p>pentru artisti &amp; producatori la inceput de drum</p>
          </div>
        </div>
      </div>
    </main>
  )
}
