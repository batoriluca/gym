"use client"
import Head from 'next/head'
import Statusbar from '@/components/statusbar'
import style from '@/styles/withdraw.module.css'
import Navbar from '@/components/navbar'
import Userlist from '@/components/Userlist';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { toast } from 'react-toastify'
import { getAxiosWithToken } from '@/axios/AxiosObj'
import { useRouter } from 'next/navigation'

const initialValues = {
  fullName: "",
  ibannumber: "",
}

export default function Home(props: any) {

  const router = useRouter();
  const [withdrawAmount, setWithdrawAmount]: any = useState('')
  const [withdrawAmountInput, setWithdrawAmountInput]: any = useState('')

  const [loading, setLoading] = useState(false);

  const withdrawalSchema = Yup.object({
    fullName: Yup.string().required("Vă rugăm să introduceți numele complet"),
    ibannumber: Yup.string().required("Vă rugăm să introduceți numărul dvs. IBAN"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: withdrawalSchema,

    onSubmit: async (values, action) => {
      setLoading(true)
      const data = {
        "fullName": values.fullName,
        "ibannumber": values.ibannumber,
        "withdrawAmount": withdrawAmountInput,
      };

      try {
        const response = await getAxiosWithToken({
          method: 'POST',
          url: 'payment/withdraw',
          data: data,
        });
        if (response.success === true) {
          toast.success(response.msg);
          router.push(`${response.redirect}`)
        } else {
          toast.error(response.msg)
        }
      } catch (error) {
        // Handle error or dispatch error-related actions here
        toast.error("Ceva n-a mers bine. Vă rugăm să încercați din nou");
        console.log(error);
      }
    }
  })

  const handleTypeInput = (e: any) => {
    let { name, value } = e.target
    if (name == "withAmount") {
      let getAmount2 = value;
      setWithdrawAmountInput(value)
      let getTax = (getAmount2 * 8) / 100;
      getAmount2 = getAmount2 - getTax;
      setWithdrawAmount(getAmount2.toFixed(1))
    }
  }

  return (
    <main>
      <div id="sc1" className={style.sc1} style={{backgroundImage: 'url(img/bh3.png)', backgroundSize: '300px 600px', backgroundRepeat:'repeat'}}>
      <div className={style.shadoww}></div>
          <div className={style.shadoww2}></div>
          <div className={style.bgbh} style={{backgroundImage: 'url(img/dark.png)', backgroundSize: 'cover'}}></div>
          <div className={style.carousel}>
            <img src="/img/muzic.png" alt="" className={style.bgimg}/>
            <img src="/img/muzic.png" alt="" className={style.bgimg}/>
          </div>
        <div className={style.main_container}>
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
                  <div className={style.deposit_card}>
                    <div className={`${style.checkoutt} ${style.forch}`} >
                      
                      <h1>Retragere</h1>
                      <input type="number" placeholder='Suma de retragere' value={withdrawAmountInput} name='withAmount' className={style.winput} onChange={handleTypeInput} />
                      {/* {withdrawAmount && withdrawAmount !== '' ? (<h3>Vei primi: {withdrawAmount} RON </h3>) : (null)} */}
                      <h6>Suma minimă de retragere este de 50RON</h6>
                      {/* <p>ATENȚIE! Comisionul per tranzacție este de 8%! </p> */}
                    </div>
                    <div className={`${style.checkoutt} ${style.forch2}`} >
                    
                      <form onSubmit={handleSubmit}>
                        <div className={style.inputDiv}>
                          <label htmlFor="Field-nameInput">Nume întreg</label>
                          <input dir="ltr" type="text" name="fullName" onBlur={handleBlur} value={values.fullName || ""} id="Field-nameInput" onChange={handleChange} placeholder="Nume întreg" aria-invalid="false" aria-required="true" />
                          {errors.fullName && touched.fullName ? <p className={style.from_error}>{errors.fullName}</p> : null}
                        </div>
                        <div className={style.inputDiv}>
                          <label htmlFor="Field-numberInput">IBAN</label>
                          <input dir="ltr" type="text"  name="ibannumber" onBlur={handleBlur} value={values.ibannumber || ""} id="Field-numberInput" onChange={handleChange}  placeholder="IBAN" autoComplete="billing cc-number" aria-invalid="false" aria-describedby="knownCardBrandDesc cardBrandIconsDesc" aria-required="true" style={{ paddingRight: "51.2px" }} />
                          {errors.ibannumber && touched.ibannumber ? <p className={style.from_error}>{errors.ibannumber}</p> : null}
                        </div>
                        
                        
                        <button id="submit" className={style.submitBtn}><span>Retrage</span></button>
                      </form>
                    </div>
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
